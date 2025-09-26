import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swords, PlusSquare, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JoinServerModal } from "@/components/modals/JoinServerModal";
import { CreateServerModal } from "@/components/modals/CreateServerModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
      </div>
      
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Title with glitch effect on hover */}
        <div className="space-y-4">
          <h1 
            className="text-6xl font-bold tracking-wider text-foreground hover:animate-glitch cursor-default select-none"
            style={{ fontWeight: 800 }}
          >
            FACELESS
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            No names. No faces. Just conversation.
          </p>
        </div>

        {/* Button Group */}
        <div className="flex gap-4 justify-center">
          <Button 
            variant="primary"
            size="lg" 
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2"
          >
            <Swords className="w-5 h-5" />
            Enter the Game
          </Button>
          
          <Button 
            variant="secondary"
            size="lg" 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <PlusSquare className="w-5 h-5" />
            Create a Room
          </Button>
        </div>

        {/* Tertiary Link */}
        <button
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto"
        >
          <Compass className="w-4 h-4" />
          Explore Public Squares
        </button>
      </div>

      <JoinServerModal open={showJoinModal} onOpenChange={setShowJoinModal} />
      <CreateServerModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
};

export default LandingPage;