
import React from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, BookOpen, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>You need to log in to view your profile</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-black text-white text-xl">
                  {currentUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{currentUser.name}</CardTitle>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg flex items-center">
                    <BookOpen className="h-8 w-8 mr-4" />
                    <div>
                      <p className="text-xl font-bold">0</p>
                      <p className="text-sm text-gray-500">Enrolled Subjects</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center">
                    <Calendar className="h-8 w-8 mr-4" />
                    <div>
                      <p className="text-xl font-bold">0</p>
                      <p className="text-sm text-gray-500">Study Sessions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">No recent activity to display</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
