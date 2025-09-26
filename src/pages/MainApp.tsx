import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  Heart,
  Menu,
  X
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
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showMobileChannels, setShowMobileChannels] = useState(false);
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

  const ServerColumn = () => (
    <div className="w-full h-full bg-server-bg flex flex-col items-center py-3 space-y-2">
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
  );

  const ChannelColumn = () => (
    <div className="w-full h-full bg-channel-bg flex flex-col">
      {/* Server Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-border">
        <h2 className="font-semibold text-foreground">The Arena</h2>
        <Button 
          variant="ghost" 
          size="sm"
          className="md:hidden"
          onClick={() => setShowMobileChannels(false)}
        >
          <X className="w-4 h-4" />
        </Button>
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
              onClick={() => {
                setActiveChannel(channel.id);
                setShowMobileChannels(false);
              }}
              className="w-full justify-start"
            >
              <Hash className="w-4 h-4 mr-2" />
              {channel.name}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* User Info Panel */}
      <div className="h-14 bg-secondary/50 flex items-center px-2 border-t border-border">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-8 h-8 bg-primary/20 flex items-center justify-center text-primary font-bold mr-2 flex-shrink-0">
            ⬢
          </div>
          <div className="text-sm min-w-0">
            <div className="font-medium text-foreground truncate">Player 456</div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowUserProfile(true)}
          className="flex-shrink-0"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-12 bg-channel-bg border-b border-border flex items-center px-4">
        <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-16 p-0 bg-server-bg">
            <ServerColumn />
          </SheetContent>
        </Sheet>

        <Button 
          variant="ghost" 
          size="sm"
          className="ml-2"
          onClick={() => setShowMobileChannels(true)}
        >
          <Hash className="w-4 h-4 mr-2" />
          <span className="font-semibold">{activeChannel}</span>
        </Button>

        <div className="ml-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPlayerList(!showPlayerList)}
          >
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Server Column */}
      <div className="hidden md:flex w-18 flex-shrink-0">
        <ServerColumn />
      </div>

      {/* Desktop Channel Column */}
      <div className="hidden md:flex w-60 flex-shrink-0">
        <ChannelColumn />
      </div>

      {/* Mobile Channel Sheet */}
      <Sheet open={showMobileChannels} onOpenChange={setShowMobileChannels}>
        <SheetContent side="left" className="w-72 p-0 bg-channel-bg md:hidden">
          <ChannelColumn />
        </SheetContent>
      </Sheet>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-chat-bg min-w-0 mt-12 md:mt-0">
        {/* Desktop Chat Header */}
        <div className="hidden md:flex h-12 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center min-w-0">
            <Hash className="w-5 h-5 text-muted-foreground mr-2 flex-shrink-0" />
            <span className="font-semibold text-foreground truncate">{activeChannel}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPlayerList(!showPlayerList)}
            className="flex-shrink-0"
          >
            <Users className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-2 md:px-4">
          <div className="py-2 md:py-4 space-y-2 md:space-y-4">
            {messages.map((message, index) => {
              const isFirstInGroup = index === 0 || messages[index - 1].author !== message.author;
              
              return (
                <div key={message.id} className="group hover:bg-message-hover px-2 py-1 -mx-2 rounded-sm">
                  {isFirstInGroup ? (
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0 text-xs md:text-sm">
                        {message.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-medium text-foreground text-sm md:text-base truncate">
                            {message.author}
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-foreground mt-1 break-words text-sm md:text-base">
                          {message.content}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 flex space-x-1 flex-shrink-0">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                          <Reply className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                          <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-8 md:ml-11 text-foreground break-words text-sm md:text-base">
                      {message.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-2 md:p-4 border-t border-border md:border-t-0">
          <div className="relative">
            <Input
              placeholder={`Message #${activeChannel}`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-16 md:pr-20 bg-input border-border text-foreground text-sm md:text-base"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Player List Sidebar */}
      {showPlayerList && (
        <div className="hidden lg:flex w-60 bg-channel-bg border-l border-border flex-shrink-0">
          <div className="w-full p-4">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Online — {players.filter(p => p.status === 'online').length}
                </div>
                <div className="space-y-1">
                  {players.filter(p => p.status === 'online').map((player) => (
                    <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover rounded-sm">
                      <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        ⬢
                      </div>
                      <span className="text-sm text-foreground truncate">{player.name}</span>
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
                      <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover opacity-60 rounded-sm">
                        <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          ⬢
                        </div>
                        <span className="text-sm text-foreground truncate">{player.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Player List Sheet - only show on mobile when toggled */}
      <div className="lg:hidden">
        <Sheet open={showPlayerList} onOpenChange={setShowPlayerList}>
          <SheetContent side="right" className="w-72 p-4 bg-channel-bg">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Online — {players.filter(p => p.status === 'online').length}
                </div>
                <div className="space-y-1">
                  {players.filter(p => p.status === 'online').map((player) => (
                    <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover rounded-sm">
                      <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        ⬢
                      </div>
                      <span className="text-sm text-foreground truncate">{player.name}</span>
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
                      <div key={player.id} className="flex items-center space-x-2 p-1 hover:bg-message-hover opacity-60 rounded-sm">
                        <div className="w-6 h-6 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          ⬢
                        </div>
                        <span className="text-sm text-foreground truncate">{player.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <UserProfileModal open={showUserProfile} onOpenChange={setShowUserProfile} />
    </div>
  );
};

export default MainApp;