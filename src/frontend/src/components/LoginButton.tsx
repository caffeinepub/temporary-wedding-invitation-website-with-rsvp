import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      className={
        isAuthenticated
          ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
          : 'bg-rose-600 hover:bg-rose-700 text-white'
      }
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Logging in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 mr-2" />
          Admin Login
        </>
      )}
    </Button>
  );
}
