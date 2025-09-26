import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileModal({ open, onOpenChange }: UserProfileModalProps) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log("Logging out...");
    onOpenChange(false);
    navigate('/');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Player Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Player Identity */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mx-auto">
              ⬢
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                You are Player 456
              </h3>
              <p className="text-sm text-muted-foreground">
                Anonymous identity in the game
              </p>
            </div>
          </div>
          
          <Separator className="bg-border" />
          
          {/* Actions */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Your identity remains completely anonymous. No personal information is stored or shared.
            </p>
            
            <Button 
              onClick={handleLogOut}
              variant="destructive"
              className="w-full flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Leave the Game
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}