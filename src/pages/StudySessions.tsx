
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, Users, Video, Plus } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { StudySession } from '@/types';
import { getStudySessions, getSubject } from '@/data/mockData';

const StudySessions: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<StudySession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjectNames, setSubjectNames] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getStudySessions();
        setSessions(data);
        setFilteredSessions(data);
        
        // Load subject names for each session
        const subjectIds = [...new Set(data.map(session => session.subjectId))];
        const namesMap: {[key: string]: string} = {};
        
        for (const id of subjectIds) {
          const subject = await getSubject(id);
          if (subject) {
            namesMap[id] = subject.name;
          }
        }
        
        setSubjectNames(namesMap);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load study sessions:', error);
        setLoading(false);
      }
    };
    
    loadSessions();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter(session => 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subjectNames[session.subjectId]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSessions(filtered);
    }
  }, [searchTerm, sessions, subjectNames]);
  
  const filterByStatus = (status: 'all' | 'active' | 'scheduled' | 'completed') => {
    if (status === 'all') {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter(session => session.status === status);
      setFilteredSessions(filtered);
    }
  };
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const sessionDate = new Date(date);
    
    if (sessionDate.toDateString() === today.toDateString()) {
      return `Today, ${formatTime(sessionDate)}`;
    } else if (sessionDate.getDate() === today.getDate() + 1 && 
               sessionDate.getMonth() === today.getMonth() && 
               sessionDate.getFullYear() === today.getFullYear()) {
      return `Tomorrow, ${formatTime(sessionDate)}`;
    } else {
      return sessionDate.toLocaleDateString() + ', ' + formatTime(sessionDate);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Study Sessions</h1>
          <Link to="/create-session">
            <Button className="bg-brand-purple hover:bg-brand-deep-purple">
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search study sessions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" onValueChange={(value) => filterByStatus(value as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-2/3"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSessions.map((session) => (
              <Card key={session.id} className="card-hover">
                <CardHeader>
                  <CardTitle>{session.title}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 mt-1">
                    <Badge className={
                      session.status === 'active' ? 'bg-green-100 text-green-800' :
                      session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {session.status}
                    </Badge>
                    <Badge variant="outline">
                      {subjectNames[session.subjectId] || 'Loading...'}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDate(session.startTime)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      {session.currentParticipants}/{session.maxParticipants} participants
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/study-sessions/${session.id}`} className="w-full">
                    <Button 
                      className={session.status === 'active' ? 'bg-brand-purple hover:bg-brand-deep-purple w-full' : 'w-full'} 
                      variant={session.status === 'active' ? 'default' : 'outline'}
                    >
                      {session.status === 'active' ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Join Now
                        </>
                      ) : (
                        'View Details'
                      )}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No study sessions found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? (
                "Try adjusting your search or creating a new session"
              ) : (
                "There are no sessions available right now. Create a new one!"
              )}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mr-4"
              >
                Clear Search
              </Button>
            )}
            <Link to="/create-session">
              <Button>Create Study Session</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default StudySessions;
