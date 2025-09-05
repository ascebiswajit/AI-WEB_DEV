import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { AITool } from '@/lib/exportUtils';

interface ToolDetailProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ToolDetail({ tool, isOpen, onClose }: ToolDetailProps) {
  if (!tool) return null;

  const getPricingColor = (pricing: string) => {
    if (pricing === 'Free') return 'bg-green-100 text-green-800';
    if (pricing.includes('Free')) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getPopularityLevel = (popularity: number) => {
    if (popularity >= 90) return { label: 'Very High', color: 'text-green-600' };
    if (popularity >= 80) return { label: 'High', color: 'text-blue-600' };
    if (popularity >= 70) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Growing', color: 'text-gray-600' };
  };

  const popularityInfo = getPopularityLevel(tool.popularity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {tool.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                {tool.category}
              </DialogDescription>
            </div>
            {tool.featured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Featured
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges and Stats */}
          <div className="flex flex-wrap gap-3">
            <Badge className={`${getPricingColor(tool.pricing)}`}>
              {tool.pricing}
            </Badge>
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{tool.rating}/5</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className={`text-sm font-medium ${popularityInfo.color}`}>
                {popularityInfo.label} Popularity
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
              <p className="text-gray-700">{tool.category}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Pricing Model</h4>
              <p className="text-gray-700">{tool.pricing}</p>
            </div>
          </div>

          {/* Popularity Score */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Popularity Score</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${tool.popularity}%` }}
                />
              </div>
              <span className="text-blue-800 font-medium">{tool.popularity}/100</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => window.open(tool.link, '_blank')}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Official Site
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}