import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeSwitch: () => void;
  onSuccess: (payload: { user: { name: string; email: string; isAdmin: boolean }, token: string }) => void;
}

export function AuthDialog({ isOpen, onClose, mode, onModeSwitch, onSuccess }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (formData.email.toLowerCase().includes('admin')) {
          await api.registerAdmin(formData.email, formData.password);
        } else {
          await api.register(formData.email, formData.password);
        }
        toast({
          title: 'Account created!',
          description: 'You can now start shopping for sweets!',
        });
        const loginRes = await api.login(formData.email, formData.password);
        const isAdmin = loginRes.user.role === 'ADMIN';
        onSuccess({
          user: {
            name: formData.name || formData.email.split('@')[0],
            email: loginRes.user.email,
            isAdmin,
          },
          token: loginRes.token,
        });
      } else {
        const loginRes = await api.login(formData.email, formData.password);
        const isAdmin = loginRes.user.role === 'ADMIN';
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${loginRes.user.email}`,
        });
        onSuccess({
          user: {
            name: formData.name || formData.email.split('@')[0],
            email: loginRes.user.email,
            isAdmin,
          },
          token: loginRes.token,
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again.';
      toast({
        title: 'Authentication failed',
        description: message,
      });
    } finally {
      setIsLoading(false);
      setFormData({ name: '', email: '', password: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 text-5xl">
            {mode === 'login' ? '🍬' : '🎉'}
          </div>
          <DialogTitle className="font-display text-2xl">
            {mode === 'login' ? 'Welcome Back!' : 'Join Sweet Shop'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Sign in to access your account and order history'
              : 'Create an account to start shopping for delicious sweets'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>{mode === 'login' ? 'Sign In' : 'Create Account'}</>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onModeSwitch}
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onModeSwitch}
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Tip: Use "admin" in your email to get admin access
        </p>
      </DialogContent>
    </Dialog>
  );
}
