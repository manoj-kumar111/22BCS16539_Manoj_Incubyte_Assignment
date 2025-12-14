import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: SearchBarProps) {
  const [localRange, setLocalRange] = useState(priceRange);

  const handleRangeChange = (values: number[]) => {
    setLocalRange([values[0], values[1]]);
  };

  const applyPriceFilter = () => {
    onPriceRangeChange(localRange);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for sweets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 rounded-xl border-2 border-border bg-card pl-12 text-base shadow-soft transition-shadow focus:shadow-glow"
        />
      </div>

      {/* Price filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg" className="h-12 gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Price Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 rounded-xl p-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Price Range</Label>
              <p className="text-sm text-muted-foreground">
                ${localRange[0].toFixed(2)} - ${localRange[1].toFixed(2)}
              </p>
            </div>
            <Slider
              min={0}
              max={maxPrice}
              step={0.5}
              value={localRange}
              onValueChange={handleRangeChange}
              className="py-4"
            />
            <Button onClick={applyPriceFilter} className="w-full">
              Apply Filter
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
