
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ArrowLeft } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import VideoConference from '@/components/VideoConference';
import { StudySession as StudySessionType, Subject } from '@/types';
import { getStudySession, getSubject } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const StudySession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<StudySessionType | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        
        const sessionData = await getStudySession(id);
        if (!sessionData) {
          throw new Error("Study session not found");
        }
        
        setSession(sessionData);
        
        const subjectData = await getSubject(sessionData.subjectId);
        if (subjectData) {
          setSubject(subjectData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load session details:', error);
        toast({
          title: "Error",
          description: "Failed to load study session details",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, toast]);
  
  const joinSession = () => {
    if (session?.status === 'active') {
      setHasJoined(true);
      toast({
        title: "Session Joined",
        description: "You've successfully joined the study session",
      });
    } else {
      toast({
        title: "Cannot Join",
        description: "This session is not currently active",
        variant: "destructive"
      });
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded-md w-1/3 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!session) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Study Session Not Found</h1>
          <p className="mb-6">The study session you're looking for doesn't exist or has been removed.</p>
          <Link to="/study-sessions">
            <Button>Browse All Study Sessions</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to={`/subjects/${session.subjectId}`} className="text-brand-purple hover:text-brand-deep-purple mb-4 inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Subject
        </Link>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={
              session.status === 'active' ? 'bg-green-100 text-green-800' :
              session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }>
              {session.status}
            </Badge>
            
            {subject && (
              <Badge variant="outline">{subject.name}</Badge>
            )}
            
            <Badge variant="secondary">
              <Calendar className="mr-1 h-3 w-3" /> 
              {new Date(session.startTime).toLocaleString()}
            </Badge>
            
            <Badge variant="secondary">
              <Users className="mr-1 h-3 w-3" /> 
              {session.currentParticipants}/{session.maxParticipants} participants
            </Badge>
          </div>
          
          {!hasJoined && session.status === 'active' && (
            <Button 
              onClick={joinSession}
              className="mb-8 bg-brand-purple hover:bg-brand-deep-purple"
            >
              Join Study Session
            </Button>
          )}
          
          {hasJoined ? (
            <VideoConference sessionId={session.id} sessionTitle={session.title} />
          ) : session.status === 'scheduled' ? (
            <div className="bg-white border rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">This session is scheduled to start soon</h2>
              <p className="text-gray-600 mb-6">
                Come back at {new Date(session.startTime).toLocaleString()} to join the session.
              </p>
              <div className="flex justify-center">
                <Calendar className="h-24 w-24 text-brand-purple" />
              </div>
            </div>
          ) : session.status === 'completed' ? (
            <div className="bg-white border rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">This session has ended</h2>
              <p className="text-gray-600 mb-4">
                This study session is no longer available to join.
              </p>
              <Link to="/study-sessions">
                <Button>Browse Active Sessions</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join this study session</h2>
              <p className="text-gray-600 mb-6">
                Click the button above to join this active study session.
              </p>
              <div className="flex justify-center">
                <Video className="h-24 w-24 text-brand-purple" />
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default StudySession;
