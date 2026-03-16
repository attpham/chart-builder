import { useState, useCallback } from 'react';
import { defaultData, defaultOptions } from '../utils/defaultData';

export function useChartConfig() {
  const [chartType, setChartType] = useState('bar');
  const [data, setData] = useState(defaultData);
  const [options, setOptions] = useState(defaultOptions);

  const updateChartType = useCallback((type) => {
    setChartType(type);
    if (type === 'donut') {
      setOptions(prev => ({ ...prev, pieStyle: { ...prev.pieStyle, cutout: '50%' } }));
    } else if (type === 'pie') {
      setOptions(prev => ({ ...prev, pieStyle: { ...prev.pieStyle, cutout: '0%' } }));
    }
  }, []);

  const updateData = useCallback((newData) => {
    setData(newData);
  }, []);

  const updateOptions = useCallback((newOptions) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const updateDatasetColor = useCallback((index, color) => {
    setData(prev => {
      const newDatasets = [...prev.datasets];
      newDatasets[index] = { ...newDatasets[index], backgroundColor: color };
      return { ...prev, datasets: newDatasets };
    });
  }, []);

  const applyPalette = useCallback((colors) => {
    setData(prev => {
      const newDatasets = prev.datasets.map((ds, i) => ({
        ...ds,
        backgroundColor: colors[i % colors.length]
      }));
      return { ...prev, datasets: newDatasets };
    });
  }, []);

  const addRow = useCallback(() => {
    setData(prev => {
      const newLabel = `Label ${prev.labels.length + 1}`;
      const newDatasets = prev.datasets.map(ds => ({
        ...ds,
        data: [...ds.data, Math.floor(Math.random() * 20) + 1]
      }));
      return { labels: [...prev.labels, newLabel], datasets: newDatasets };
    });
  }, []);

  const removeRow = useCallback((index) => {
    setData(prev => {
      const newLabels = prev.labels.filter((_, i) => i !== index);
      const newDatasets = prev.datasets.map(ds => ({
        ...ds,
        data: ds.data.filter((_, i) => i !== index)
      }));
      return { labels: newLabels, datasets: newDatasets };
    });
  }, []);

  const addSeries = useCallback(() => {
    const colors = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#9966FF', '#C9CBCF'];
    setData(prev => {
      const newDs = {
        label: `Series ${prev.datasets.length + 1}`,
        data: prev.labels.map(() => Math.floor(Math.random() * 20) + 1),
        backgroundColor: colors[prev.datasets.length % colors.length]
      };
      return { ...prev, datasets: [...prev.datasets, newDs] };
    });
  }, []);

  const removeSeries = useCallback((index) => {
    setData(prev => {
      const newDatasets = prev.datasets.filter((_, i) => i !== index);
      return { ...prev, datasets: newDatasets };
    });
  }, []);

  const updateLabel = useCallback((index, value) => {
    setData(prev => {
      const newLabels = [...prev.labels];
      newLabels[index] = value;
      return { ...prev, labels: newLabels };
    });
  }, []);

  const updateCellValue = useCallback((dsIndex, rowIndex, value) => {
    setData(prev => {
      const newDatasets = [...prev.datasets];
      const newData = [...newDatasets[dsIndex].data];
      newData[rowIndex] = parseFloat(value) || 0;
      newDatasets[dsIndex] = { ...newDatasets[dsIndex], data: newData };
      return { ...prev, datasets: newDatasets };
    });
  }, []);

  const updateSeriesLabel = useCallback((dsIndex, value) => {
    setData(prev => {
      const newDatasets = [...prev.datasets];
      newDatasets[dsIndex] = { ...newDatasets[dsIndex], label: value };
      return { ...prev, datasets: newDatasets };
    });
  }, []);

  return {
    chartType,
    data,
    options,
    updateChartType,
    updateData,
    updateOptions,
    updateDatasetColor,
    applyPalette,
    addRow,
    removeRow,
    addSeries,
    removeSeries,
    updateLabel,
    updateCellValue,
    updateSeriesLabel
  };
}
