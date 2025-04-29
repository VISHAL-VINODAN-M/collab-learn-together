
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Book, LogOut, User } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-black" />
          <span className="text-xl font-bold text-black">
            Class Collab
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/subjects" className="text-gray-700 hover:text-black transition-colors">
            Subjects
          </Link>
          <Link to="/study-sessions" className="text-gray-700 hover:text-black transition-colors">
            Study Sessions
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-black transition-colors">
            Resources
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                  <Avatar>
                    <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
                    <AvatarFallback className="bg-black text-white">
                      {currentUser?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-courses" className="flex items-center">
                    <Book className="mr-2 h-4 w-4" />
                    My Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:bg-red-50 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-black hover:bg-gray-800 text-white">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
