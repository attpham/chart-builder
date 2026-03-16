import React from 'react';

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-xs text-gray-600">{label}</label>
        <span className="text-xs text-gray-500 font-mono">{typeof value === 'number' ? value.toFixed(step < 1 ? 1 : 0) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}/>
      </button>
    </div>
  );
}

export default function ChartStyleControls({ chartType, options, onUpdateOptions }) {
  const update = (path, value) => {
    const keys = path.split('.');
    const newOpts = structuredClone(options);
    let obj = newOpts;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
      if (obj[k] == null || typeof obj[k] !== 'object') obj[k] = {};
      obj = obj[k];
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey !== '__proto__' && lastKey !== 'constructor' && lastKey !== 'prototype') {
      obj[lastKey] = value;
    }
    onUpdateOptions(newOpts);
  };

  const isBar = ['bar', 'horizontalBar', 'stackedBar'].includes(chartType);
  const isLine = ['line', 'area'].includes(chartType);
  const isPie = ['pie', 'donut'].includes(chartType);

  return (
    <div className="p-4 space-y-5">
      {/* Chart Title */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Chart Title</h3>
        <input
          type="text"
          placeholder="Enter chart title..."
          value={options.title?.text || ''}
          onChange={e => update('title.text', e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
        />
        <div className="flex gap-2">
          <button
            onClick={() => update('title.bold', !options.title?.bold)}
            className={`px-3 py-1 text-sm font-bold rounded-lg border-2 transition-colors ${options.title?.bold ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
          >
            B
          </button>
          <button
            onClick={() => update('title.italic', !options.title?.italic)}
            className={`px-3 py-1 text-sm italic rounded-lg border-2 transition-colors ${options.title?.italic ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
          >
            I
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Legend</h3>
        <Toggle
          label="Show Legend"
          checked={options.legend?.display !== false}
          onChange={v => update('legend.display', v)}
        />
        {options.legend?.display !== false && (
          <div>
            <label className="text-xs text-gray-600 block mb-1">Position</label>
            <select
              value={options.legend?.position || 'top'}
              onChange={e => update('legend.position', e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 bg-white"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        )}
      </div>

      {/* Axes (non-pie) */}
      {!isPie && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Axes</h3>
          <Toggle label="Show X Axis" checked={options.axes?.x?.display !== false} onChange={v => update('axes.x.display', v)} />
          <Toggle label="X Grid Lines" checked={options.axes?.x?.gridLines !== false} onChange={v => update('axes.x.gridLines', v)} />
          <input
            type="text"
            placeholder="X axis label..."
            value={options.axes?.x?.title || ''}
            onChange={e => update('axes.x.title', e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
          />
          <Toggle label="Show Y Axis" checked={options.axes?.y?.display !== false} onChange={v => update('axes.y.display', v)} />
          <Toggle label="Y Grid Lines" checked={options.axes?.y?.gridLines !== false} onChange={v => update('axes.y.gridLines', v)} />
          <input
            type="text"
            placeholder="Y axis label..."
            value={options.axes?.y?.title || ''}
            onChange={e => update('axes.y.title', e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
      )}

      {/* Bar Style */}
      {isBar && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bar Style</h3>
          <Slider label="Border Radius" min={0} max={20} step={1} value={options.barStyle?.borderRadius || 0} onChange={v => update('barStyle.borderRadius', v)} />
          <Slider label="Gap" min={0} max={1} step={0.1} value={options.barStyle?.gap || 0.3} onChange={v => update('barStyle.gap', v)} />
        </div>
      )}

      {/* Line Style */}
      {isLine && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Line Style</h3>
          <Slider label="Tension" min={0} max={1} step={0.1} value={options.lineStyle?.tension || 0} onChange={v => update('lineStyle.tension', v)} />
          <Slider label="Point Radius" min={0} max={10} step={1} value={options.lineStyle?.pointRadius || 4} onChange={v => update('lineStyle.pointRadius', v)} />
          <Slider label="Line Width" min={1} max={10} step={1} value={options.lineStyle?.lineWidth || 2} onChange={v => update('lineStyle.lineWidth', v)} />
        </div>
      )}

      {/* Pie/Donut Style */}
      {isPie && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pie Style</h3>
          {chartType === 'donut' && (
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-600">Cutout %</label>
                <span className="text-xs text-gray-500">{options.pieStyle?.cutout || '50%'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={5}
                value={parseInt(options.pieStyle?.cutout || 50)}
                onChange={e => update('pieStyle.cutout', `${e.target.value}%`)}
                className="w-full accent-blue-500"
              />
            </div>
          )}
          <Slider
            label="Rotation (deg)"
            min={0}
            max={360}
            step={5}
            value={options.pieStyle?.rotation || 0}
            onChange={v => update('pieStyle.rotation', v)}
          />
        </div>
      )}

      {/* Background Color */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Background</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={options.backgroundColor || '#FFFFFF'}
            onChange={e => update('backgroundColor', e.target.value)}
            className="w-10 h-10 rounded cursor-pointer border border-gray-200"
          />
          <span className="text-sm font-mono text-gray-600">{options.backgroundColor || '#FFFFFF'}</span>
        </div>
      </div>
    </div>
  );
}
