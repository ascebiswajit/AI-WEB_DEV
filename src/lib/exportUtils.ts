import { jsPDF } from 'jspdf';

export interface AITool {
  id: string;
  name: string;
  category: string;
  pricing: string;
  link: string;
  description: string;
  rating: number;
  popularity: number;
  featured: boolean;
}

export function exportToCSV(tools: AITool[], triedTools: string[], savedTools: string[]) {
  const headers = ['Name', 'Category', 'Pricing', 'Link', 'Description', 'Status'];
  
  const rows = tools.map(tool => {
    let status = '';
    if (triedTools.includes(tool.id)) status += 'Tried ';
    if (savedTools.includes(tool.id)) status += 'Saved';
    
    return [
      tool.name,
      tool.category,
      tool.pricing,
      tool.link,
      tool.description.replace(/,/g, ';'), // Replace commas to avoid CSV issues
      status.trim() || 'Not marked'
    ];
  });

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'ai-tools-checklist.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(tools: AITool[], triedTools: string[], savedTools: string[]) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('AI Tools Checklist', 20, 20);
  
  // Date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  
  let yPosition = 50;
  
  // Summary
  doc.setFontSize(14);
  doc.text('Summary:', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.text(`Total Tools: ${tools.length}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Tried: ${triedTools.length}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Saved: ${savedTools.length}`, 20, yPosition);
  yPosition += 15;
  
  // Tools list
  doc.setFontSize(14);
  doc.text('Tools List:', 20, yPosition);
  yPosition += 10;
  
  tools.forEach((tool) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    let status = '';
    if (triedTools.includes(tool.id)) status += '✓ Tried ';
    if (savedTools.includes(tool.id)) status += '⭐ Saved';
    
    doc.setFontSize(12);
    doc.text(`${tool.name} (${tool.category})`, 20, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.text(`Status: ${status || 'Not marked'}`, 25, yPosition);
    yPosition += 5;
    doc.text(`Pricing: ${tool.pricing}`, 25, yPosition);
    yPosition += 5;
    doc.text(`Link: ${tool.link}`, 25, yPosition);
    yPosition += 10;
  });
  
  doc.save('ai-tools-checklist.pdf');
}