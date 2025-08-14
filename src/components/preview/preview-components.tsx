"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FileText, Code } from "lucide-react";

interface PreviewComponentsProps {  
  className?: string;
  children?: React.ReactNode;
}

export function PreviewComponents({ className, children }: PreviewComponentsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <Card className={cn("not-prose bg-background", className)}>
      <CardHeader className="pb-0">
        {/* Tab Buttons */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'preview' ? 'outline' : 'ghost'}
            onClick={() => setActiveTab('preview')}
          >
            <FileText className="h-4 w-4" />
            Preview
          </Button>
          <Button
            variant={activeTab === 'code' ? 'outline' : 'ghost'}
            onClick={() => setActiveTab('code')}
          >
            <Code className="h-4 w-4" />
            Code
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {activeTab === 'preview' ? (
          <div>{children}</div>
        ) : (
          <div className="bg-muted p-4 rounded-md">
            <pre className="text-sm text-muted-foreground">
              <code>{`// Code view coming soon...`}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}