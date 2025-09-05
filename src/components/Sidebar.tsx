import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  pricingFilter: string[];
  onPricingChange: (pricing: string, checked: boolean) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  pricingFilter,
  onPricingChange,
  minRating,
  onRatingChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const pricingOptions = ['Free', 'Free + Paid', 'Free Trial + Paid'];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Mobile close button */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => 
                        onCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label htmlFor={category} className="text-sm font-medium">
                      {category}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pricingOptions.map((pricing) => (
                  <div key={pricing} className="flex items-center space-x-2">
                    <Checkbox
                      id={pricing}
                      checked={pricingFilter.includes(pricing)}
                      onCheckedChange={(checked) => 
                        onPricingChange(pricing, checked as boolean)
                      }
                    />
                    <Label htmlFor={pricing} className="text-sm font-medium">
                      {pricing}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Minimum Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0</span>
                    <span className="font-medium">{minRating.toFixed(1)}+</span>
                    <span>5</span>
                  </div>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => onRatingChange(value[0])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}