
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Video, Calendar, Users } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Subject, Material, StudySession } from '@/types';
import { getSubject, getMaterials, getStudySessions } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        
        const subjectData = await getSubject(id);
        if (!subjectData) {
          throw new Error("Subject not found");
        }
        
        setSubject(subjectData);
        
        const materialsData = await getMaterials(id);
        setMaterials(materialsData);
        
        const allSessions = await getStudySessions();
        const subjectSessions = allSessions.filter(session => session.subjectId === id);
        setStudySessions(subjectSessions);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load subject details:', error);
        toast({
          title: "Error",
          description: "Failed to load subject details",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, toast]);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded-md w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md w-40"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!subject) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
          <p className="mb-6">The subject you're looking for doesn't exist or has been removed.</p>
          <Link to="/subjects">
            <Button>Browse All Subjects</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/subjects" className="text-brand-purple hover:text-brand-deep-purple mb-2 inline-block">
            &larr; Back to Subjects
          </Link>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={subject.imageUrl} 
                alt={subject.name} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getDifficultyColor(subject.difficulty)}>
                  {subject.difficulty}
                </Badge>
                <Badge variant="outline">{subject.category}</Badge>
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" /> 
                  {subject.enrolledCount.toLocaleString()} students
                </Badge>
              </div>
              <p className="text-gray-700 mb-6">{subject.description}</p>
              <Button className="bg-brand-purple hover:bg-brand-deep-purple">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="materials" className="mt-8">
          <TabsList className="border-b w-full justify-start rounded-none mb-6 pb-px">
            <TabsTrigger value="materials" className="rounded-t-md rounded-b-none">
              <Book className="mr-2 h-4 w-4" />
              Learning Materials
            </TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-t-md rounded-b-none">
              <Video className="mr-2 h-4 w-4" />
              Study Sessions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="pt-2">
            <h2 className="text-2xl font-bold mb-4">Learning Materials</h2>
            {materials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                  <Card key={material.id} className="card-hover">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={material.thumbnailUrl || subject.imageUrl} 
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline">
                          {material.type === 'video' ? (
                            <><Video className="mr-1 h-3 w-3" /> Video</>
                          ) : material.type === 'article' ? (
                            <><Book className="mr-1 h-3 w-3" /> Article</>
                          ) : material.type === 'quiz' ? (
                            <span>Quiz</span>
                          ) : (
                            <span>Flashcards</span>
                          )}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(material.createdAt).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2">{material.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link to={material.contentUrl} className="w-full">
                        <Button variant="outline" className="w-full">
                          {material.type === 'video' ? 'Watch Video' : 
                           material.type === 'article' ? 'Read Article' :
                           material.type === 'quiz' ? 'Take Quiz' : 'Study Flashcards'}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No materials available yet</h3>
                <p className="text-gray-600">Check back later for updates</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sessions" className="pt-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Study Sessions</h2>
              <Link to="/create-session">
                <Button>Create New Session</Button>
              </Link>
            </div>
            {studySessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studySessions.map((session) => (
                  <Card key={session.id} className="card-hover">
                    <CardHeader>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge className={
                          session.status === 'active' ? 'bg-green-100 text-green-800' :
                          session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {session.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          <Calendar className="inline mr-1 h-3 w-3" />
                          {new Date(session.startTime).toLocaleString()}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">
                          <Users className="inline mr-1 h-4 w-4" />
                          {session.currentParticipants}/{session.maxParticipants} participants
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/study-sessions/${session.id}`} className="w-full">
                        <Button 
                          className={session.status === 'active' ? 'bg-brand-purple hover:bg-brand-deep-purple w-full' : 'w-full'} 
                          variant={session.status === 'active' ? 'default' : 'outline'}
                        >
                          {session.status === 'active' ? 'Join Now' : 'View Details'}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No study sessions available</h3>
                <p className="text-gray-600 mb-4">Be the first to create a study session for this subject!</p>
                <Link to="/create-session">
                  <Button>Create Study Session</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SubjectDetail;
