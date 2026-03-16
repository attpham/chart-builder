import React from 'react';
import { useChartConfig } from './hooks/useChartConfig';
import TopToolbar from './components/Layout/TopToolbar';
import LeftSidebar from './components/Layout/LeftSidebar';
import Canvas from './components/Layout/Canvas';
import RightSidebar from './components/Layout/RightSidebar';
import ExportButtons from './components/Export/ExportButtons';

export default function App() {
  const config = useChartConfig();

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <TopToolbar
        options={config.options}
        onUpdateOptions={config.updateOptions}
      />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar
          chartType={config.chartType}
          onChartTypeChange={config.updateChartType}
        />
        <Canvas
          chartType={config.chartType}
          data={config.data}
          options={config.options}
        />
        <RightSidebar
          chartType={config.chartType}
          data={config.data}
          options={config.options}
          onUpdateOptions={config.updateOptions}
          onUpdateLabel={config.updateLabel}
          onUpdateCellValue={config.updateCellValue}
          onUpdateSeriesLabel={config.updateSeriesLabel}
          onAddRow={config.addRow}
          onRemoveRow={config.removeRow}
          onAddSeries={config.addSeries}
          onRemoveSeries={config.removeSeries}
          onUpdateDatasetColor={config.updateDatasetColor}
          onApplyPalette={config.applyPalette}
        />
      </div>
      <ExportButtons
        chartConfig={{
          chartType: config.chartType,
          data: config.data,
          options: config.options
        }}
      />
    </div>
  );
}
