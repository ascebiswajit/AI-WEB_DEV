import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, ExternalLink, Heart, CheckCircle } from 'lucide-react';
import { AITool } from '@/lib/exportUtils';

interface ToolCardProps {
  tool: AITool;
  isTried: boolean;
  isSaved: boolean;
  onTriedChange: (checked: boolean) => void;
  onSavedChange: (checked: boolean) => void;
  onViewDetails: () => void;
}

export function ToolCard({
  tool,
  isTried,
  isSaved,
  onTriedChange,
  onSavedChange,
  onViewDetails,
}: ToolCardProps) {
  const getPricingColor = (pricing: string) => {
    if (pricing === 'Free') return 'bg-green-100 text-green-800';
    if (pricing.includes('Free')) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {tool.category}
            </CardDescription>
          </div>
          {tool.featured && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <Badge className={`text-xs ${getPricingColor(tool.pricing)}`}>
            {tool.pricing}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{tool.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(tool.link, '_blank')}
              className="px-3"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`tried-${tool.id}`}
                checked={isTried}
                onCheckedChange={onTriedChange}
              />
              <label 
                htmlFor={`tried-${tool.id}`} 
                className="text-sm font-medium cursor-pointer flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                Tried
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`saved-${tool.id}`}
                checked={isSaved}
                onCheckedChange={onSavedChange}
              />
              <label 
                htmlFor={`saved-${tool.id}`} 
                className="text-sm font-medium cursor-pointer flex items-center gap-1"
              >
                <Heart className="h-4 w-4 text-red-500" />
                Saved
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}