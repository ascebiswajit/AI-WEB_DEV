import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { exportToCSV, exportToPDF, AITool } from '@/lib/exportUtils';
import { toast } from 'sonner';

interface ExportButtonsProps {
  tools: AITool[];
  triedTools: string[];
  savedTools: string[];
}

export function ExportButtons({ tools, triedTools, savedTools }: ExportButtonsProps) {
  const handleExportCSV = () => {
    try {
      exportToCSV(tools, triedTools, savedTools);
      toast.success('CSV exported successfully!');
    } catch (error) {
      toast.error('Failed to export CSV');
      console.error('CSV export error:', error);
    }
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(tools, triedTools, savedTools);
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error('PDF export error:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        className="flex items-center gap-2"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
}