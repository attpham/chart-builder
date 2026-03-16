import React, { useState } from 'react';
import { exportToPptx } from '../../utils/exportPptx';
import { exportToSvg } from '../../utils/exportSvg';

export default function ExportButtons({ chartConfig }) {
  const [exporting, setExporting] = useState(null);

  const handlePptx = async () => {
    setExporting('pptx');
    try {
      await exportToPptx(chartConfig);
    } catch (e) {
      console.error('PPTX export failed:', e);
    } finally {
      setExporting(null);
    }
  };

  const handleSvg = async () => {
    setExporting('svg');
    try {
      await exportToSvg();
    } catch (e) {
      console.error('SVG export failed:', e);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="h-[56px] bg-white border-t border-gray-200 flex items-center justify-center gap-3 px-4 flex-shrink-0">
      <button
        onClick={handlePptx}
        disabled={exporting === 'pptx'}
        className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        {exporting === 'pptx' ? 'Exporting...' : 'Export PowerPoint'}
      </button>
      <button
        onClick={handleSvg}
        disabled={exporting === 'svg'}
        className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        {exporting === 'svg' ? 'Exporting...' : 'Export SVG'}
      </button>
    </div>
  );
}
