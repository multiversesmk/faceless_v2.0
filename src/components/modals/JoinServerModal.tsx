import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QrCode, Link } from "lucide-react";

interface JoinServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinServerModal({ open, onOpenChange }: JoinServerModalProps) {
  const [inviteLink, setInviteLink] = useState("");

  const handleJoinByLink = () => {
    if (inviteLink.trim()) {
      // TODO: Implement join logic
      console.log("Joining server with:", inviteLink);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-semibold">
            Join a Server
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="qr" className="text-sm">
              <QrCode className="w-4 h-4 mr-2" />
              SCAN QR CODE
            </TabsTrigger>
            <TabsTrigger value="link" className="text-sm">
              <Link className="w-4 h-4 mr-2" />
              USE INVITE LINK
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="qr" className="space-y-4">
            <div className="flex items-center justify-center h-48 bg-secondary border border-border">
              <div className="text-center text-muted-foreground">
                <QrCode className="w-12 h-12 mx-auto mb-2" />
                <p>Camera feed ready</p>
                <p className="text-sm">Point camera at QR code</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-link" className="text-foreground">
                Invite Link or Code
              </Label>
              <Input
                id="invite-link"
                placeholder="Enter invite link or room code..."
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            
            <Button 
              onClick={handleJoinByLink} 
              className="w-full"
              variant="primary"
              disabled={!inviteLink.trim()}
            >
              Join Server
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}