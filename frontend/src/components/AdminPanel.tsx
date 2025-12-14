import { useState } from 'react';
import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Package, RefreshCw, Loader2 } from 'lucide-react';
import { categories } from '@/data/mockSweets';
import { toast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onAddSweet: (sweet: Omit<Sweet, 'id'>) => void;
  onRestock: (sweetId: string, quantity: number) => void;
  sweets: Sweet[];
}

export function AdminPanel({ onAddSweet, onRestock, sweets }: AdminPanelProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSweet, setNewSweet] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [restockData, setRestockData] = useState({
    sweetId: '',
    quantity: '',
  });

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onAddSweet({
      name: newSweet.name,
      category: newSweet.category,
      price: parseFloat(newSweet.price),
      quantity: parseInt(newSweet.quantity),
      description: newSweet.description,
    });

    toast({
      title: 'Sweet added!',
      description: `${newSweet.name} has been added to the inventory.`,
    });

    setNewSweet({ name: '', category: '', price: '', quantity: '', description: '' });
    setIsLoading(false);
    setIsAddDialogOpen(false);
  };

  const handleRestock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onRestock(restockData.sweetId, parseInt(restockData.quantity));

    const sweet = sweets.find((s) => s.id === restockData.sweetId);
    toast({
      title: 'Restock successful!',
      description: `Added ${restockData.quantity} units to ${sweet?.name}.`,
    });

    setRestockData({ sweetId: '', quantity: '' });
    setIsLoading(false);
    setIsRestockDialogOpen(false);
  };

  return (
    <section id="admin" className="mb-12 rounded-2xl bg-secondary/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">Manage your sweet inventory</p>
        </div>
        <div className="flex gap-3">
          <Button variant="mint" onClick={() => setIsRestockDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restock
          </Button>
          <Button variant="candy" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Sweet
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Items</div>
              <div className="font-display text-xl font-bold">{sweets.length}</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-2">
              <Package className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
              <div className="font-display text-xl font-bold">
                {sweets.filter((s) => s.quantity === 0).length}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-caramel/20 p-2">
              <Package className="h-5 w-5 text-caramel" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
              <div className="font-display text-xl font-bold">
                {sweets.filter((s) => s.quantity > 0 && s.quantity <= 10).length}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-mint/20 p-2">
              <Package className="h-5 w-5 text-mint" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Stock</div>
              <div className="font-display text-xl font-bold">
                {sweets.reduce((acc, s) => acc + s.quantity, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sweet Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add New Sweet</DialogTitle>
            <DialogDescription>
              Add a new sweet to your inventory
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSweet} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                  placeholder="Sweet name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newSweet.category}
                  onValueChange={(value) => setNewSweet({ ...newSweet, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c.value !== 'all').map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newSweet.price}
                  onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Initial Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={newSweet.quantity}
                  onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newSweet.description}
                onChange={(e) => setNewSweet({ ...newSweet, description: e.target.value })}
                placeholder="Describe this sweet..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Sweet
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Restock Sweet</DialogTitle>
            <DialogDescription>
              Add more units to your inventory
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRestock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sweet">Select Sweet</Label>
              <Select
                value={restockData.sweetId}
                onValueChange={(value) => setRestockData({ ...restockData, sweetId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a sweet" />
                </SelectTrigger>
                <SelectContent>
                  {sweets.map((sweet) => (
                    <SelectItem key={sweet.id} value={sweet.id}>
                      {sweet.name} ({sweet.quantity} in stock)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="restockQuantity">Quantity to Add</Label>
              <Input
                id="restockQuantity"
                type="number"
                min="1"
                value={restockData.quantity}
                onChange={(e) => setRestockData({ ...restockData, quantity: e.target.value })}
                placeholder="Enter quantity"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !restockData.sweetId}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restocking...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restock
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
