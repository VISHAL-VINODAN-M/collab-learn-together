
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, Users, X } from 'lucide-react';

type Participant = {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  stream?: MediaStream;
};

interface VideoConferenceProps {
  sessionId: string;
  sessionTitle: string;
}

const VideoConference: React.FC<VideoConferenceProps> = ({ sessionId, sessionTitle }) => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  // Mock participants for demo
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'user1', name: 'Jane Smith', isVideoOn: true, isAudioOn: false },
    { id: 'user2', name: 'Mike Johnson', isVideoOn: true, isAudioOn: true },
    { id: 'user3', name: 'Sarah Williams', isVideoOn: false, isAudioOn: true },
  ]);
  
  useEffect(() => {
    // This would be replaced with actual Agora SDK initialization
    console.log(`Joining session: ${sessionId}`);
    
    // Mock function to get user media
    const getMedia = async () => {
      try {
        // In a real implementation, this would connect to Agora SDK
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: false, 
          audio: false 
        });
        
        setLocalStream(stream);
        console.log('Local stream acquired');
        
        // Add self to participants (for demo)
        setParticipants(prev => [
          ...prev, 
          { 
            id: 'self', 
            name: 'You', 
            isVideoOn: false, 
            isAudioOn: false,
            stream 
          }
        ]);
        
      } catch (err) {
        console.error('Failed to get local stream', err);
      }
    };
    
    getMedia();
    
    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      console.log(`Leaving session: ${sessionId}`);
    };
  }, [sessionId]);
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In a real implementation, this would toggle audio in Agora SDK
    console.log(`Audio ${!isAudioOn ? 'unmuted' : 'muted'}`);
    
    // Update self in participants list (for demo)
    setParticipants(prev => 
      prev.map(p => p.id === 'self' ? { ...p, isAudioOn: !isAudioOn } : p)
    );
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In a real implementation, this would toggle video in Agora SDK
    console.log(`Video ${!isVideoOn ? 'turned on' : 'turned off'}`);
    
    // Update self in participants list (for demo)
    setParticipants(prev => 
      prev.map(p => p.id === 'self' ? { ...p, isVideoOn: !isVideoOn } : p)
    );
  };
  
  // Calculate grid layout based on number of participants
  const getGridClass = () => {
    const count = participants.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-2';
    return 'grid-cols-3';
  };
  
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-brand-deep-purple text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{sessionTitle}</h2>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <span>{participants.length} participants</span>
        </div>
      </div>
      
      <div className={`grid ${getGridClass()} gap-4 p-4 bg-gray-900 min-h-[400px]`}>
        {participants.map((participant) => (
          <div 
            key={participant.id}
            className="relative aspect-video bg-gray-800 rounded-md flex items-center justify-center overflow-hidden"
          >
            {participant.isVideoOn ? (
              <video 
                autoPlay 
                muted={participant.id === 'self'} 
                className="w-full h-full object-cover"
                // In a real app, this would be a stream from Agora SDK
              >
                <source src="https://example.com/placeholder-video.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="h-20 w-20 rounded-full bg-brand-purple flex items-center justify-center text-white text-2xl font-bold">
                {participant.name.charAt(0)}
              </div>
            )}
            
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
              <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                {participant.name} {participant.id === 'self' && '(You)'}
              </span>
              
              <div className="flex space-x-1">
                {!participant.isAudioOn && (
                  <div className="bg-red-500 rounded-full p-1">
                    <MicOff className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-800 flex justify-center items-center space-x-4">
        <Button 
          variant={isAudioOn ? "default" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleAudio}
        >
          {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant={isVideoOn ? "default" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleVideo}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Card className="m-4">
        <CardContent className="p-4">
          <p className="text-sm text-yellow-600 mb-2">
            <strong>Note:</strong> This is a placeholder for the Agora video conference SDK.
          </p>
          <p className="text-sm text-gray-600">
            In a production application, this component would integrate with the Agora SDK to provide real-time video conferencing capabilities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoConference;
