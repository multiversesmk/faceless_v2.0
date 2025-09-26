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
      
      <div className="text-center space-y-6 md:space-y-8 max-w-lg mx-auto px-4 sm:px-6">
        {/* Title with glitch effect on hover */}
        <div className="space-y-3 md:space-y-4">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-foreground hover:animate-glitch cursor-default select-none"
            style={{ fontWeight: 800 }}
          >
            FACELESS
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light px-4">
            No names. No faces. Just conversation.
          </p>
        </div>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Button 
            variant="primary"
            size="lg" 
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Swords className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Enter the Game</span>
          </Button>
          
          <Button 
            variant="secondary"
            size="lg" 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <PlusSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Create a Room</span>
          </Button>
        </div>

        {/* Tertiary Link */}
        <button
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto touch-manipulation"
        >
          <Compass className="w-4 h-4" />
          <span className="text-sm sm:text-base">Explore Public Squares</span>
        </button>
      </div>

      <JoinServerModal open={showJoinModal} onOpenChange={setShowJoinModal} />
      <CreateServerModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
};

export default LandingPage;