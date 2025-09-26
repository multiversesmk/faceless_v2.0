import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Compass, 
  Plus, 
  Hash, 
  Users, 
  Settings, 
  Smile, 
  Paperclip,
  MoreHorizontal,
  Reply,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserProfileModal } from "@/components/modals/UserProfileModal";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar: string;
}

interface Channel {
  id: string;
  name: string;
  type: "text";
}

const MainApp = () => {
  const navigate = useNavigate();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(true);
  const [activeChannel, setActiveChannel] = useState("general");
  const [messageInput, setMessageInput] = useState("");

  // Mock data
  const servers = [
    { id: "1", name: "The Arena", icon: "🎯", active: true },
    { id: "2", name: "Digital Underground", icon: "🔒", active: false },
  ];

  const channels: Channel[] = [
    { id: "general", name: "general", type: "text" },
    { id: "memes", name: "memes", type: "text" },
    { id: "strategy", name: "strategy", type: "text" },
  ];

  const messages: Message[] = [
    {
      id: "1",
      author: "Player 067",
      content: "The game begins at midnight. Are you ready?",
      timestamp: new Date(Date.now() - 300000),
      avatar: "⬢"
    },
    {
      id: "2", 
      author: "Player 456",
      content: "Been waiting for this moment. Let's see what we're made of.",
      timestamp: new Date(Date.now() - 240000),
      avatar: "⬢"
    },
    {
      id: "3",
      author: "Player 001",
      content: "Remember, no real names. No faces. Only the game matters.",
      timestamp: new Date(Date.now() - 180000),
      avatar: "⬢"
    }
  ];

  const players = [
    { id: "1", name: "Player 067", status: "online" },
    { id: "2", name: "Player 456", status: "online" },
    { id: "3", name: "Player 001", status: "online" },
    { id: "4", name: "Player 218", status: "idle" },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Server Column (Far Left) */}
      <div className="w-18 bg-server-bg flex flex-col items-center py-3 space-y-2">
        <Button 
          variant="server-icon" 
          onClick={() => navigate('/discover')}
          className="group"
        >
          <Compass className="w-6 h-6" />
        </Button>
        
        <Separator className="w-8 bg-border" />
        
        <div className="flex flex-col space-y-2">
          {servers.map((server) => (
            <Button
              key={server.id}
              variant="server-icon"
              className={`group relative ${server.active ? 'shadow-glow-subtle' : ''}`}
            >
              <span className="text-lg">{server.icon}</span>
              {server.active && (
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary" />
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex-1" />
        
        <Button variant="server-icon" className="group">
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Channel Column (Left) */}
      <div className="w-60 bg-channel-bg flex flex-col">
        {/* Server Header */}
        <div className="h-12 flex items-center px-4 border-b border-border">
          <h2 className="font-semibold text-foreground">The Arena</h2>
        </div>

        {/* Channel List */}
        <ScrollArea className="flex-1 px-2 py-2">
          <div className="space-y-1">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Text Channels
            </div>
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={activeChannel === channel.id ? "channel-active" : "channel"}
                onClick={() => setActiveChannel(channel.id)}
              >
                <Hash className="w-4 h-4 mr-2" />
                {channel.name}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* User Info Panel */}
        <div className="h-14 bg-secondary/50 flex items-center px-2 border-t border-border">
          <div className="flex items-center flex-1">
            <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary font-bold mr-2">
              ⬢
            </div>
            <div className="text-sm">
              <div className="font-medium text-foreground">Player 456</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowUserProfile(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-chat-bg">
        {/* Chat Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center">
            <Hash className="w-5 h-5 text-muted-foreground mr-2" />
            <span className="font-semibold text-foreground">{activeChannel}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPlayerList(!showPlayerList)}
          >
            <Users className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-4">
            {messages.map((message, index) => {
              const isFirstInGroup = index === 0 || messages[index - 1].author !== message.author;
              
              return (
                <div key={message.id} className="group hover:bg-message-hover px-2 py-1 -mx-2">
                  {isFirstInGroup ? (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                        {message.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-medium text-foreground">
                            {message.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-foreground mt-1 break-words">
                          {message.content}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-11 text-foreground break-words">
                      {message.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder={`Message #${activeChannel}`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-20 bg-input border-border text-foreground"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Player List Sidebar */}
      {showPlayerList && (
        <div className="w-60 bg-channel-bg border-l border-border">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Online — {players.filter(p => p.status === 'online').length}
                </div>
                <div className="space-y-1">
                  {players.filter(p => p.status === 'online').map((player) => (
                    <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover">
                      <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        ⬢
                      </div>
                      <span className="text-sm text-foreground">{player.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {players.filter(p => p.status === 'idle').length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Idle — {players.filter(p => p.status === 'idle').length}
                  </div>
                  <div className="space-y-1">
                    {players.filter(p => p.status === 'idle').map((player) => (
                      <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover opacity-60">
                        <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                          ⬢
                        </div>
                        <span className="text-sm text-foreground">{player.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <UserProfileModal open={showUserProfile} onOpenChange={setShowUserProfile} />
    </div>
  );
};

export default MainApp;