import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍬</span>
            <span className="font-display text-lg font-bold">
              Sweet<span className="text-primary">Shop</span>
            </span>
          </div>
          
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
  Made with <strong>Manoj</strong> for sweet lovers everywhere
</p>



          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sweet Shop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
