import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

import type { AuthState } from '../types/auth.types';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { account } = useSelector((state: RootState) => state.auth as AuthState);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
          <CardDescription>Welcome to your secure admin panel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Welcome back, {account?.username || 'Admin'}!</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-medium w-24">User ID:</span>
                <span>{account?.id || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">Username:</span>
                <span>{account?.username || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">Role:</span>
                <span className="capitalize">{account?.role || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Admin Functions</h2>
            <p className="text-gray-600 mb-4">
              This is a demo admin panel with mock functionality.
              In a real application, you would have access to various admin features here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full">View Users</Button>
              <Button variant="outline" className="w-full">Manage Content</Button>
              <Button variant="outline" className="w-full">System Settings</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout} className="w-full">Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
