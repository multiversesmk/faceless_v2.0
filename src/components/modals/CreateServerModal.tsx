import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Globe } from "lucide-react";

interface CreateServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateServerModal({ open, onOpenChange }: CreateServerModalProps) {
  const [serverName, setServerName] = useState("");
  const [serverType, setServerType] = useState<"private" | "public">("private");

  const handleCreateServer = () => {
    if (serverName.trim()) {
      // TODO: Implement server creation logic
      console.log("Creating server:", { name: serverName, type: serverType });
      onOpenChange(false);
      setServerName("");
      setServerType("private");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-semibold">
            Create a Server
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="server-name" className="text-foreground">
              Server Name
            </Label>
            <Input
              id="server-name"
              placeholder="Enter server name..."
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-foreground">Server Type</Label>
            <RadioGroup value={serverType} onValueChange={(value: "private" | "public") => setServerType(value)}>
              <div className="flex items-center space-x-3 p-3 border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="private" id="private" className="border-primary" />
                <div className="flex items-center space-x-2 flex-1">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="private" className="text-foreground font-medium cursor-pointer">
                      Private Room
                    </Label>
                    <p className="text-xs text-muted-foreground">Invite Only</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="public" id="public" className="border-primary" />
                <div className="flex items-center space-x-2 flex-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="public" className="text-foreground font-medium cursor-pointer">
                      Public Square
                    </Label>
                    <p className="text-xs text-muted-foreground">Discoverable</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            onClick={handleCreateServer} 
            className="w-full"
            variant="primary"
            disabled={!serverName.trim()}
          >
            Create Server
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}