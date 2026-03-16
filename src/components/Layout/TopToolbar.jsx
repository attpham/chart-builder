import React from 'react';

const fontFamilies = ['Open Sans', 'Arial', 'Roboto', 'Georgia', 'Times New Roman', 'Courier New'];

export default function TopToolbar({ options, onUpdateOptions }) {
  const update = (path, value) => {
    const keys = path.split('.');
    const newOpts = { ...options };
    let obj = newOpts;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = { ...obj[keys[i]] };
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onUpdateOptions(newOpts);
  };

  const fontSize = options.title?.size || 24;
  const isBold = options.title?.bold || false;
  const isItalic = options.title?.italic || false;
  const fontFamily = options.fonts?.family || 'Open Sans';

  return (
    <div className="h-[60px] bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <span className="font-bold text-gray-800 text-sm">ChartBuilder</span>
      </div>

      <div className="w-px h-8 bg-gray-200"/>

      {/* Font family */}
      <select
        value={fontFamily}
        onChange={e => update('fonts.family', e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 bg-white text-gray-700"
        style={{ fontFamily }}
      >
        {fontFamilies.map(f => (
          <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
        ))}
      </select>

      {/* Font size */}
      <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => update('title.size', Math.max(8, fontSize - 2))}
          className="px-2 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
        >
          −
        </button>
        <input
          type="number"
          value={fontSize}
          onChange={e => update('title.size', parseInt(e.target.value) || 14)}
          className="w-12 text-center text-sm border-none focus:outline-none py-1.5"
          min={8}
          max={72}
        />
        <button
          onClick={() => update('title.size', Math.min(72, fontSize + 2))}
          className="px-2 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
        >
          +
        </button>
      </div>

      {/* Bold */}
      <button
        onClick={() => update('title.bold', !isBold)}
        className={`w-9 h-9 rounded-lg text-sm font-bold border-2 transition-colors ${isBold ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => update('title.italic', !isItalic)}
        className={`w-9 h-9 rounded-lg text-sm italic border-2 transition-colors ${isItalic ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
      >
        I
      </button>
    </div>
  );
}
