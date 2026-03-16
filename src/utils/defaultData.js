export const defaultData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    { label: 'Series 1', data: [12, 19, 3, 5], backgroundColor: '#4BC0C0' },
    { label: 'Series 2', data: [8, 15, 7, 12], backgroundColor: '#36A2EB' }
  ]
};

export const defaultOptions = {
  title: { text: 'My Chart', font: 'Open Sans', size: 24, bold: true, italic: false },
  legend: { display: true, position: 'top' },
  axes: {
    x: { display: true, title: '', gridLines: true },
    y: { display: true, title: '', gridLines: true }
  },
  backgroundColor: '#FFFFFF',
  barStyle: { borderRadius: 4, barThickness: 'flex', gap: 0.3 },
  lineStyle: { tension: 0.4, pointRadius: 4, lineWidth: 2, fill: false },
  pieStyle: { cutout: '0%', spacing: 2, rotation: 0 },
  fonts: { family: 'Open Sans', axisSize: 12, labelSize: 14 }
};
