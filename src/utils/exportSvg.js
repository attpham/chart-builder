import { toSvg } from 'html-to-image';

export async function exportToSvg() {
  const node = document.getElementById('chart-container');
  if (!node) return;
  const svgDataUrl = await toSvg(node);
  const link = document.createElement('a');
  link.download = 'chart.svg';
  link.href = svgDataUrl;
  link.click();
}
