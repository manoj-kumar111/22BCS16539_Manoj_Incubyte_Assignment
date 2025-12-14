import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, ShoppingCart, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  isAdmin?: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
  cartCount?: number;
}

export function Header({
  isAuthenticated,
  userName,
  isAdmin,
  onLoginClick,
  onRegisterClick,
  onLogout,
  cartCount = 0,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍬</span>
          <h1 className="font-display text-xl font-bold text-foreground md:text-2xl">
            Sweet<span className="text-primary">Shop</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#sweets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Our Sweets
          </a>
          <a href="#categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Categories
          </a>
          {isAdmin && (
            <a href="#admin" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Admin Panel
            </a>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <User className="h-4 w-4 text-secondary-foreground" />
                <span className="text-sm font-medium text-secondary-foreground">{userName}</span>
                {isAdmin && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    Admin
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onLoginClick}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button variant="default" size="sm" onClick={onRegisterClick}>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute left-0 right-0 top-16 border-b border-border bg-background p-4 shadow-lg transition-all duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav className="flex flex-col gap-3">
          <a href="#sweets" className="text-sm font-medium text-foreground">
            Our Sweets
          </a>
          <a href="#categories" className="text-sm font-medium text-foreground">
            Categories
          </a>
          {isAdmin && (
            <a href="#admin" className="text-sm font-medium text-primary">
              Admin Panel
            </a>
          )}
          <div className="my-2 h-px bg-border" />
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{userName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout} className="justify-start">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onLoginClick} className="justify-start">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button variant="default" size="sm" onClick={onRegisterClick}>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
