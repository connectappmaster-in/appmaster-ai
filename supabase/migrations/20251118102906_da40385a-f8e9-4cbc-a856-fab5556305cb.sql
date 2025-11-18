-- RBAC & Subscription System Migration

-- Ensure app_role enum exists with all required values
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE app_role AS ENUM ('user', 'manager', 'admin', 'super_admin');
  END IF;
END $$;

-- Insert default permissions
INSERT INTO permissions (key, label, module, description) VALUES
('crm.read', 'CRM Read', 'crm', 'View CRM data'),
('crm.write', 'CRM Write', 'crm', 'Create and edit CRM data'),
('tickets.read', 'Tickets Read', 'tickets', 'View tickets'),
('tickets.assign', 'Assign Tickets', 'tickets', 'Assign tickets to users'),
('inventory.read', 'Inventory Read', 'inventory', 'View inventory'),
('inventory.transfer', 'Transfer Inventory', 'inventory', 'Transfer inventory items'),
('assets.read', 'Assets Read', 'assets', 'View assets'),
('assets.modify', 'Assets Modify', 'assets', 'Create and edit assets'),
('admin.manage_users', 'Manage Users', 'admin', 'Manage user accounts'),
('admin.manage_subscription', 'Manage Subscription', 'admin', 'Manage organisation subscription')
ON CONFLICT (key) DO NOTHING;

-- Update subscriptions table with plan enforcement
ALTER TABLE subscriptions
ALTER COLUMN limits SET DEFAULT '{"max_users": 3, "max_tools": 1, "features": ["crm_basic"]}'::jsonb;

-- Create function to check subscription limits
CREATE OR REPLACE FUNCTION check_subscription_limit(org_id UUID, limit_type TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_limit INTEGER;
  current_count INTEGER;
BEGIN
  -- Get the limit from subscription
  SELECT (limits->>limit_type)::INTEGER INTO current_limit
  FROM subscriptions
  WHERE organisation_id = org_id AND status = 'active';
  
  -- If unlimited (-1), always return true
  IF current_limit = -1 THEN
    RETURN TRUE;
  END IF;
  
  -- Check current count based on limit type
  IF limit_type = 'max_users' THEN
    SELECT COUNT(*) INTO current_count
    FROM users
    WHERE organisation_id = org_id AND status = 'active';
  ELSIF limit_type = 'max_tools' THEN
    SELECT COALESCE(array_length(active_tools, 1), 0) INTO current_count
    FROM organisations
    WHERE id = org_id;
  END IF;
  
  RETURN current_count < current_limit;
END;
$$;

-- Add audit log trigger for role changes
CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_logs (action_type, entity_type, entity_id, metadata)
  VALUES (
    'role_changed',
    'user_role',
    NEW.user_id::TEXT,
    jsonb_build_object('old_role', OLD.role, 'new_role', NEW.role)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER role_change_audit
AFTER UPDATE ON user_roles
FOR EACH ROW
WHEN (OLD.role IS DISTINCT FROM NEW.role)
EXECUTE FUNCTION log_role_change();