import React from 'react';

export default function DataEditor({
  data,
  onUpdateLabel,
  onUpdateCellValue,
  onUpdateSeriesLabel,
  onAddRow,
  onRemoveRow,
  onAddSeries,
  onRemoveSeries
}) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Data Editor</h3>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left text-xs font-semibold text-gray-500 border-b border-gray-200 min-w-[80px]">
                Label
              </th>
              {data.datasets.map((ds, di) => (
                <th key={di} className="p-2 border-b border-gray-200 min-w-[80px]">
                  <div className="flex items-center gap-1">
                    <input
                      className="text-xs font-medium text-gray-600 bg-transparent border-none outline-none w-full text-center"
                      value={ds.label}
                      onChange={e => onUpdateSeriesLabel(di, e.target.value)}
                    />
                    {data.datasets.length > 1 && (
                      <button
                        onClick={() => onRemoveSeries(di)}
                        className="text-red-400 hover:text-red-600 flex-shrink-0"
                        title="Remove series"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-2 border-b border-gray-200 w-8">
                <button
                  onClick={onAddSeries}
                  className="text-blue-500 hover:text-blue-700 font-bold text-lg leading-none"
                  title="Add series"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.labels.map((label, ri) => (
              <tr key={ri} className="hover:bg-gray-50">
                <td className="p-1 border-b border-gray-100">
                  <input
                    className="w-full text-xs text-gray-700 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded px-1 py-0.5"
                    value={label}
                    onChange={e => onUpdateLabel(ri, e.target.value)}
                  />
                </td>
                {data.datasets.map((ds, di) => (
                  <td key={di} className="p-1 border-b border-gray-100">
                    <input
                      type="number"
                      className="w-full text-xs text-gray-700 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded px-1 py-0.5 text-center"
                      value={ds.data[ri] ?? 0}
                      onChange={e => onUpdateCellValue(di, ri, e.target.value)}
                    />
                  </td>
                ))}
                <td className="p-1 border-b border-gray-100 text-center">
                  {data.labels.length > 1 && (
                    <button
                      onClick={() => onRemoveRow(ri)}
                      className="text-red-400 hover:text-red-600"
                      title="Remove row"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={onAddRow}
        className="w-full py-2 text-sm text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
        </svg>
        Add Row
      </button>
    </div>
  );
}
