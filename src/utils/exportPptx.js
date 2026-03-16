import pptxgen from 'pptxgenjs';

export function exportToPptx(chartConfig) {
  const pptx = new pptxgen();
  const slide = pptx.addSlide();

  const typeMap = {
    bar: 'bar',
    horizontalBar: 'bar',
    stackedBar: 'bar',
    line: 'line',
    area: 'line',
    pie: 'pie',
    donut: 'doughnut'
  };

  const chartData = chartConfig.data.datasets.map(ds => ({
    name: ds.label,
    labels: chartConfig.data.labels,
    values: ds.data
  }));

  const opts = {
    x: 0.5, y: 0.5, w: 9, h: 6,
    chartColors: chartConfig.data.datasets.map(ds => ds.backgroundColor.replace('#', '')),
    showTitle: !!chartConfig.options.title.text,
    title: chartConfig.options.title.text,
    showLegend: chartConfig.options.legend.display,
    legendPos: chartConfig.options.legend.position[0],
    ...(chartConfig.chartType === 'donut' ? { holeSize: 50 } : {}),
    ...(chartConfig.chartType === 'stackedBar' ? { barGrouping: 'stacked' } : {}),
    ...(chartConfig.chartType === 'horizontalBar' ? { barDir: 'bar' } : { barDir: 'col' }),
  };

  slide.addChart(typeMap[chartConfig.chartType], chartData, opts);
  pptx.writeFile({ fileName: 'chart.pptx' });
}
