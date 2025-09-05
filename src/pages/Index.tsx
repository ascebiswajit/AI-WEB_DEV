import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, Sparkles, TrendingUp, Users } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Sidebar } from '@/components/Sidebar';
import { ToolCard } from '@/components/ToolCard';
import { ToolDetail } from '@/components/ToolDetail';
import { ExportButtons } from '@/components/ExportButtons';
import { useTriedTools, useSavedTools } from '@/hooks/useLocalStorage';
import { AITool } from '@/lib/exportUtils';
import aiToolsData from '@/data/aiTools.json';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pricingFilter, setPricingFilter] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [triedTools, setTriedTools] = useTriedTools();
  const [savedTools, setSavedTools] = useSavedTools();

  const tools: AITool[] = aiToolsData;

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(tools.map(tool => tool.category))).sort();
  }, [tools]);

  // Filter tools based on search and filters
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(tool.category);
      
      const matchesPricing = pricingFilter.length === 0 || 
                           pricingFilter.includes(tool.pricing);
      
      const matchesRating = tool.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPricing && matchesRating;
    });
  }, [tools, searchTerm, selectedCategories, pricingFilter, minRating]);

  // Get featured tools
  const featuredTools = useMemo(() => {
    return tools.filter(tool => tool.featured).slice(0, 6);
  }, [tools]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handlePricingChange = (pricing: string, checked: boolean) => {
    setPricingFilter(prev => 
      checked 
        ? [...prev, pricing]
        : prev.filter(p => p !== pricing)
    );
  };

  const handleTriedChange = (toolId: string, checked: boolean) => {
    setTriedTools(prev => 
      checked 
        ? [...prev, toolId]
        : prev.filter(id => id !== toolId)
    );
  };

  const handleSavedChange = (toolId: string, checked: boolean) => {
    setSavedTools(prev => 
      checked 
        ? [...prev, toolId]
        : prev.filter(id => id !== toolId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">AI Tools Hub</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{tools.length} tools</span>
              </div>
              <ExportButtons 
                tools={filteredTools}
                triedTools={triedTools}
                savedTools={savedTools}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          pricingFilter={pricingFilter}
          onPricingChange={handlePricingChange}
          minRating={minRating}
          onRatingChange={setMinRating}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover the Best Free AI Tools
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Explore, try, and save your favorite AI tools. From chatbots to image generators, 
                find the perfect AI solution for your needs.
              </p>
              
              {/* Search Bar */}
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              {/* Quick Stats */}
              <div className="flex justify-center gap-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>{triedTools.length} tools tried</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span>{savedTools.length} tools saved</span>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={selectedCategories.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategories([])}
                className="rounded-full"
              >
                All Categories
              </Button>
              {categories.slice(0, 8).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category, !selectedCategories.includes(category))}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Featured Tools Section */}
            {!searchTerm && selectedCategories.length === 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Featured Tools</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isTried={triedTools.includes(tool.id)}
                      isSaved={savedTools.includes(tool.id)}
                      onTriedChange={(checked) => handleTriedChange(tool.id, checked)}
                      onSavedChange={(checked) => handleSavedChange(tool.id, checked)}
                      onViewDetails={() => setSelectedTool(tool)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Tools Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {searchTerm || selectedCategories.length > 0 ? 'Search Results' : 'All Tools'}
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({filteredTools.length} tools)
                  </span>
                </h3>
              </div>

              {filteredTools.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Sparkles className="h-16 w-16 mx-auto" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h4>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find more tools.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isTried={triedTools.includes(tool.id)}
                      isSaved={savedTools.includes(tool.id)}
                      onTriedChange={(checked) => handleTriedChange(tool.id, checked)}
                      onSavedChange={(checked) => handleSavedChange(tool.id, checked)}
                      onViewDetails={() => setSelectedTool(tool)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Tool Detail Modal */}
      <ToolDetail
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}