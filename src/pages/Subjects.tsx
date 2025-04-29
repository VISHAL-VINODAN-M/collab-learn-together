
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Subject } from '@/types';
import { getSubjects } from '@/data/mockData';

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load subjects:', error);
        setLoading(false);
      }
    };
    
    loadSubjects();
  }, []);
  
  // Extract unique categories from subjects
  const categories = [...new Set(subjects.map(subject => subject.category))];
  
  // Filter subjects based on search term, category, and difficulty
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? subject.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? subject.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Subjects</h1>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search subjects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select 
                className="border rounded-md p-2 w-full md:w-auto"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select 
                className="border rounded-md p-2 w-full md:w-auto"
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              >
                <option value="">All Difficulty Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="outline" className="flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="ml-1">×</button>
              </Badge>
            )}
            {selectedDifficulty && (
              <Badge variant="outline" className="flex items-center gap-1">
                {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty(null)} className="ml-1">×</button>
              </Badge>
            )}
            {(selectedCategory || selectedDifficulty) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-1/2 mt-2"></div>
                </CardHeader>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject) => (
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
                      <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ${
                        subject.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        subject.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {subject.difficulty}
                      </span>
                      <span className="text-gray-500">
                        {subject.enrolledCount.toLocaleString()} students
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-2">{subject.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Explore Subject
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No subjects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Subjects;
