import React, { useState } from 'react';
import DataEditor from '../Controls/DataEditor';
import ColorPicker from '../Controls/ColorPicker';
import ChartStyleControls from '../Controls/ChartStyleControls';

const tabs = ['Data', 'Style', 'Colors'];

export default function RightSidebar({
  chartType,
  data,
  options,
  onUpdateOptions,
  onUpdateLabel,
  onUpdateCellValue,
  onUpdateSeriesLabel,
  onAddRow,
  onRemoveRow,
  onAddSeries,
  onRemoveSeries,
  onUpdateDatasetColor,
  onApplyPalette
}) {
  const [activeTab, setActiveTab] = useState('Data');

  return (
    <div className="w-[300px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Data' && (
          <DataEditor
            data={data}
            onUpdateLabel={onUpdateLabel}
            onUpdateCellValue={onUpdateCellValue}
            onUpdateSeriesLabel={onUpdateSeriesLabel}
            onAddRow={onAddRow}
            onRemoveRow={onRemoveRow}
            onAddSeries={onAddSeries}
            onRemoveSeries={onRemoveSeries}
          />
        )}
        {activeTab === 'Style' && (
          <ChartStyleControls
            chartType={chartType}
            options={options}
            onUpdateOptions={onUpdateOptions}
          />
        )}
        {activeTab === 'Colors' && (
          <ColorPicker
            data={data}
            onUpdateDatasetColor={onUpdateDatasetColor}
            onApplyPalette={onApplyPalette}
          />
        )}
      </div>
    </div>
  );
}
