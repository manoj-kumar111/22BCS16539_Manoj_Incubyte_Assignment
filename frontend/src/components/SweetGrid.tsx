import { Sweet } from '@/types/sweet';
import { SweetCard } from './SweetCard';
import { Package } from 'lucide-react';

interface SweetsGridProps {
  sweets: Sweet[];
  isAdmin?: boolean;
  onPurchase: (sweet: Sweet) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (sweet: Sweet) => void;
}

export function SweetsGrid({ sweets, isAdmin, onPurchase, onEdit, onDelete }: SweetsGridProps) {
  if (sweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="mb-4 h-16 w-16 text-muted-foreground/50" />
        <h3 className="mb-2 font-display text-xl font-semibold text-muted-foreground">
          No sweets found
        </h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet.id}
          sweet={sweet}
          isAdmin={isAdmin}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
