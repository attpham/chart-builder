import React, { useState } from 'react';
import { palettes } from '../../utils/colorPalettes';

export default function ColorPicker({ data, onUpdateDatasetColor, onApplyPalette }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="p-4 space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Series Colors</h3>
        <div className="space-y-2">
          {data.datasets.map((ds, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-400 flex-shrink-0 shadow-sm"
                style={{ backgroundColor: ds.backgroundColor }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
              <span className="text-sm text-gray-700 flex-1">{ds.label}</span>
              <span className="text-xs text-gray-400 font-mono">{ds.backgroundColor}</span>
            </div>
          ))}
          {openIndex !== null && openIndex < data.datasets.length && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">{data.datasets[openIndex]?.label}</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.datasets[openIndex]?.backgroundColor || '#000000'}
                  onChange={e => onUpdateDatasetColor(openIndex, e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                />
                <input
                  type="text"
                  value={data.datasets[openIndex]?.backgroundColor || '#000000'}
                  onChange={e => {
                    const val = e.target.value;
                    if (/^#([0-9A-Fa-f]{0,6})$/.test(val)) {
                      if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                        onUpdateDatasetColor(openIndex, val);
                      }
                    }
                  }}
                  onBlur={e => {
                    const val = e.target.value;
                    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                      onUpdateDatasetColor(openIndex, data.datasets[openIndex]?.backgroundColor || '#000000');
                    }
                  }}
                  className="flex-1 text-sm font-mono border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Color Palettes</h3>
        <div className="space-y-2">
          {Object.entries(palettes).map(([name, colors]) => (
            <button
              key={name}
              onClick={() => onApplyPalette(colors)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
            >
              <div className="flex gap-1">
                {colors.slice(0, 5).map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-700 font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
