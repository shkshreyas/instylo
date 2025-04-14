import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Video } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const VideoCall = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [roomName, setRoomName] = useState('');
  const [activeRoom, setActiveRoom] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Check URL for room ID
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomParam = params.get('room');
    
    if (roomParam) {
      setRoomName(roomParam);
      setActiveRoom(roomParam);
    }
  }, [location]);

  // Function to handle room creation
  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please enter a room name to continue",
        variant: "destructive"
      });
      return;
    }
    
    setActiveRoom(roomName);
    
    // Add room ID to URL for sharing
    const url = new URL(window.location.href);
    url.searchParams.set('room', roomName);
    window.history.pushState({}, '', url.toString());
    
    toast({
      title: "Room created!",
      description: "Your video call room is ready",
    });
  };

  // Function to copy invite link
  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('room', activeRoom);
    navigator.clipboard.writeText(url.toString());
    
    setIsCopied(true);
    toast({
      title: "Link copied!",
      description: "Share this link to invite others to your call",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col px-3 md:px-6 gap-2 w-full mx-auto h-screen overflow-auto custom-scrollbar">
      <div className="flex items-center gap-2 sticky top-0 bg-dark-1 z-10 py-2">
        <Video className="w-8 h-8 text-primary-500" />
        <h1 className="text-xl font-bold text-light-1">Video Connect</h1>
      </div>
      
      {!activeRoom ? (
        <div className="flex flex-col gap-4 items-center justify-center flex-1 py-4">
          <div className="bg-dark-3 rounded-xl p-4 w-full max-w-lg border border-dark-4">
            <h2 className="text-lg font-bold text-light-1 mb-2">Create or Join a Video Call</h2>
            <p className="text-light-3 text-sm mb-4">
              Connect with friends, family or colleagues in real-time to chat, share moments, and stay connected.
            </p>
            
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="room-name" className="text-light-2 text-sm">
                  Room Name
                </label>
                <Input
                  id="room-name"
                  type="text"
                  placeholder="Enter a room name (e.g., friends-hangout)"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="bg-dark-4 border-dark-4 focus:border-primary-500 text-light-1"
                />
              </div>
              
              <Button 
                className="w-full bg-primary-500 hover:bg-primary-600"
                onClick={handleCreateRoom}
              >
                Start Call
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 flex-1 h-[calc(100vh-60px)]">
          <div className="flex flex-wrap gap-2 items-center justify-between sticky top-12 bg-dark-1 z-10 py-1">
            <div className="flex items-center gap-2">
              <span className="text-light-3 text-sm">Room:</span>
              <span className="text-primary-500 font-medium">{activeRoom}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="text-light-2 border-dark-4 hover:bg-dark-3 h-8"
              onClick={handleCopyLink}
            >
              <Copy className="w-3 h-3 mr-1" />
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
          
          <div className="w-full h-[calc(100vh-120px)] bg-dark-3 rounded-lg border border-dark-4 shadow-md overflow-hidden">
            {/* Jitsi iframe */}
            <iframe
              src={`https://meet.jit.si/${activeRoom}`}
              className="w-full h-full"
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              style={{ border: 0 }}
            ></iframe>
          </div>
          
          <div className="py-1 text-center text-light-3 text-xs">
            <p>Having trouble? Try refreshing the page or check your camera/microphone permissions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall; 