import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SweetCardProps {
  sweet: Sweet;
  isAdmin?: boolean;
  onPurchase: (sweet: Sweet) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (sweet: Sweet) => void;
}

const categoryEmojis: Record<string, string> = {
  chocolate: '🍫',
  gummy: '🐻',
  'hard-candy': '🍬',
  lollipop: '🍭',
  caramel: '🍯',
  mint: '🌿',
  sour: '🍋',
};

const categoryColors: Record<string, string> = {
  chocolate: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
  gummy: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  'hard-candy': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
  lollipop: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  caramel: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  mint: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
  sour: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
};

export function SweetCard({ sweet, isAdmin, onPurchase, onEdit, onDelete }: SweetCardProps) {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 10;

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-glow hover:-translate-y-1',
        isOutOfStock && 'opacity-75'
      )}
    >
      {/* Image placeholder with gradient */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-candy-pink-light to-mint-light">
        <div className="absolute inset-0 flex items-center justify-center text-8xl transition-transform duration-300 group-hover:scale-110">
          {categoryEmojis[sweet.category] || '🍬'}
        </div>
        
        {/* Stock badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
            <span className="rounded-full bg-destructive px-4 py-2 font-display text-sm font-bold text-destructive-foreground">
              Out of Stock
            </span>
          </div>
        )}
        
        {isLowStock && !isOutOfStock && (
          <Badge className="absolute right-3 top-3 bg-caramel text-foreground">
            Only {sweet.quantity} left!
          </Badge>
        )}

        {/* Admin actions */}
        {isAdmin && (
          <div className="absolute left-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onEdit?.(sweet)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onDelete?.(sweet)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category badge */}
        <Badge variant="secondary" className={cn('mb-2 w-fit', categoryColors[sweet.category])}>
          {categoryEmojis[sweet.category]} {sweet.category.replace('-', ' ')}
        </Badge>

        {/* Name */}
        <h3 className="mb-1 font-display text-lg font-semibold text-card-foreground">
          {sweet.name}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
          {sweet.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xl font-bold text-primary">
              ${sweet.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Package className="h-3 w-3" />
              {sweet.quantity} in stock
            </div>
          </div>
          
          <Button
            variant="candy"
            size="sm"
            disabled={isOutOfStock}
            onClick={() => onPurchase(sweet)}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
