import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PublicServer {
  id: string;
  name: string;
  description: string;
  playerCount: number;
  maxPlayers: number;
  tags: string[];
  icon: string;
}

const ServerDiscovery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for public servers
  const publicServers: PublicServer[] = [
    {
      id: "1",
      name: "The Digital Colosseum",
      description: "Battle your wits in strategic conversations and anonymous debates.",
      playerCount: 127,
      maxPlayers: 500,
      tags: ["Strategy", "Debate", "Active"],
      icon: "🏛️"
    },
    {
      id: "2", 
      name: "Midnight Marketplace",
      description: "Trade ideas, share secrets, and navigate the underground economy of thoughts.",
      playerCount: 89,
      maxPlayers: 200,
      tags: ["Trading", "Economics", "Underground"],
      icon: "🌙"
    },
    {
      id: "3",
      name: "The Glass Tower", 
      description: "Corporate whispers and anonymous insider information exchange.",
      playerCount: 234,
      maxPlayers: 1000,
      tags: ["Business", "Corporate", "Information"],
      icon: "🏢"
    },
    {
      id: "4",
      name: "Neon Nexus",
      description: "Cyberpunk culture enthusiasts gather to discuss the future of digital society.",
      playerCount: 156,
      maxPlayers: 300,
      tags: ["Cyberpunk", "Future", "Technology"],
      icon: "🌐"
    },
    {
      id: "5",
      name: "The Observatory",
      description: "Anonymous scientists and researchers share breakthrough discoveries.",
      playerCount: 78,
      maxPlayers: 150,
      tags: ["Science", "Research", "Discovery"],
      icon: "🔬"
    },
    {
      id: "6",
      name: "Shadow Parliament",
      description: "Political discussions without the noise of identity politics.",
      playerCount: 345,
      maxPlayers: 800,
      tags: ["Politics", "Democracy", "Debate"],
      icon: "🏛️"
    }
  ];

  const filteredServers = publicServers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinServer = (serverId: string) => {
    console.log("Joining server:", serverId);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Explore Public Squares
                </h1>
                <p className="text-muted-foreground">
                  Discover anonymous communities and join the conversation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 py-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Find a community..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground"
          />
        </div>
      </div>

      {/* Server Grid */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map((server) => (
            <Card key={server.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{server.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {server.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="w-3 h-3 mr-1" />
                          {server.playerCount}/{server.maxPlayers}
                        </div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground">
                  {server.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1">
                  {server.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs bg-secondary/50 text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleJoinServer(server.id)}
                  variant="primary"
                  className="w-full"
                >
                  Join Square
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No communities found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or explore different topics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerDiscovery;