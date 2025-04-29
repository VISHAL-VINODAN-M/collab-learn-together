
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Book, FileText, GraduationCap, School } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';

const features = [
  { 
    icon: <Book className="h-10 w-10 text-black" />, 
    title: 'Curated Learning Material', 
    description: 'Access organized and structured content for various subjects.' 
  },
  { 
    icon: <FileText className="h-10 w-10 text-black" />, 
    title: 'Live Group Study Sessions', 
    description: 'Join or create real-time video study groups with fellow students.' 
  },
  { 
    icon: <School className="h-10 w-10 text-black" />, 
    title: 'Collaborative Learning', 
    description: 'Learn together, share insights, and improve understanding through discussion.' 
  },
  { 
    icon: <GraduationCap className="h-10 w-10 text-black" />, 
    title: 'Progress Tracking', 
    description: 'Monitor your learning journey and track accomplishments over time.' 
  },
];

const popularSubjects = [
  { 
    id: '1', 
    name: 'Java Programming', 
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80', 
    enrolledCount: 1200,
    difficulty: 'intermediate' as const
  },
  { 
    id: '2', 
    name: 'Web Development', 
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80', 
    enrolledCount: 1500,
    difficulty: 'beginner' as const
  },
  { 
    id: '3', 
    name: 'Data Structures', 
    imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1000&q=80', 
    enrolledCount: 980,
    difficulty: 'advanced' as const
  },
];

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Learn Together, Grow Together
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-slideUp">
              Join our collaborative learning platform to connect with fellow students,
              share knowledge, and enhance your educational journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={isAuthenticated ? "/subjects" : "/register"}>
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 hover:text-gray-800">
                  {isAuthenticated ? 'Explore Subjects' : 'Join Now'}
                </Button>
              </Link>
              <Link to="/study-sessions">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Browse Study Sessions
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80" 
              alt="Students studying" 
              className="max-w-full md:max-w-md rounded-lg shadow-lg animate-fadeIn"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-black">Class Collab</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center card-hover"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Subjects</h2>
            <Link to="/subjects">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularSubjects.map((subject) => (
              <Link to={`/subjects/${subject.id}`} key={subject.id}>
                <Card className="h-full card-hover overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={subject.imageUrl} 
                      alt={subject.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        {subject.difficulty}
                      </span>
                      <span className="text-gray-500">
                        {subject.enrolledCount.toLocaleString()} students
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      View Subject
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already enhancing their education through collaborative learning.
          </p>
          <Link to={isAuthenticated ? "/subjects" : "/register"}>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              {isAuthenticated ? 'Explore Subjects' : 'Get Started Today'}
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
