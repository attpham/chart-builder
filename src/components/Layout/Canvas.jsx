import React from 'react';
import ChartPreview from '../Charts/ChartPreview';

export default function Canvas({ chartType, data, options }) {
  return (
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 overflow-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl aspect-[4/3] flex items-center justify-center">
        <div className="w-full h-full p-4">
          <ChartPreview chartType={chartType} data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
