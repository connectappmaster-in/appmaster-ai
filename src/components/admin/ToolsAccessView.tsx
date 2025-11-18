import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Package, Lock } from 'lucide-react';

interface Tool {
  name: string;
  category: string;
  description: string;
  enabled: boolean;
}

export const ToolsAccessView = () => {
  const [tools, setTools] = useState<Tool[]>([
    { name: 'CRM', category: 'Sales', description: 'Customer Relationship Management', enabled: true },
    { name: 'Invoicing', category: 'Finance', description: 'Generate and manage invoices', enabled: false },
    { name: 'Inventory', category: 'Manufacturing', description: 'Track inventory and stock', enabled: false },
    { name: 'Tickets', category: 'IT', description: 'Support ticket management', enabled: false },
    { name: 'Assets', category: 'IT', description: 'Asset tracking and management', enabled: false },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const toggleTool = async (toolName: string) => {
    setTools(prev => prev.map(tool => 
      tool.name === toolName ? { ...tool, enabled: !tool.enabled } : tool
    ));

    toast({
      title: 'Tool Updated',
      description: `${toolName} has been ${tools.find(t => t.name === toolName)?.enabled ? 'disabled' : 'enabled'}`,
    });
  };

  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tools Access Control</h1>
        <p className="text-muted-foreground">Enable/disable tools and set usage limits</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {category}
              </CardTitle>
              <CardDescription>{categoryTools.length} tools available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryTools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{tool.name}</h4>
                      {!tool.enabled && (
                        <Badge variant="secondary" className="gap-1">
                          <Lock className="h-3 w-3" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => toggleTool(tool.name)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
