import React from 'react';

const chartTypes = [
  {
    id: 'bar',
    label: 'Bar',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="20" width="8" height="16" fill="#4BC0C0" rx="1"/>
        <rect x="16" y="10" width="8" height="26" fill="#36A2EB" rx="1"/>
        <rect x="28" y="14" width="8" height="22" fill="#FF6384" rx="1"/>
      </svg>
    )
  },
  {
    id: 'horizontalBar',
    label: 'H. Bar',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="4" width="16" height="8" fill="#4BC0C0" rx="1"/>
        <rect x="4" y="16" width="26" height="8" fill="#36A2EB" rx="1"/>
        <rect x="4" y="28" width="20" height="8" fill="#FF6384" rx="1"/>
      </svg>
    )
  },
  {
    id: 'stackedBar',
    label: 'Stacked',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="24" width="8" height="12" fill="#4BC0C0" rx="1"/>
        <rect x="4" y="12" width="8" height="12" fill="#36A2EB"/>
        <rect x="16" y="20" width="8" height="16" fill="#4BC0C0" rx="1"/>
        <rect x="16" y="8" width="8" height="12" fill="#36A2EB"/>
        <rect x="28" y="22" width="8" height="14" fill="#4BC0C0" rx="1"/>
        <rect x="28" y="10" width="8" height="12" fill="#36A2EB"/>
      </svg>
    )
  },
  {
    id: 'line',
    label: 'Line',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polyline points="4,32 14,18 24,24 34,8" fill="none" stroke="#4BC0C0" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="4" cy="32" r="2.5" fill="#4BC0C0"/>
        <circle cx="14" cy="18" r="2.5" fill="#4BC0C0"/>
        <circle cx="24" cy="24" r="2.5" fill="#4BC0C0"/>
        <circle cx="34" cy="8" r="2.5" fill="#4BC0C0"/>
      </svg>
    )
  },
  {
    id: 'area',
    label: 'Area',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M4,32 L14,18 L24,24 L34,8 L34,36 L4,36 Z" fill="#4BC0C080"/>
        <polyline points="4,32 14,18 24,24 34,8" fill="none" stroke="#4BC0C0" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'pie',
    label: 'Pie',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="16" fill="#4BC0C0"/>
        <path d="M20,20 L20,4 A16,16 0 0,1 34.9,28 Z" fill="#36A2EB"/>
        <path d="M20,20 L34.9,28 A16,16 0 0,1 6,30 Z" fill="#FF6384"/>
      </svg>
    )
  },
  {
    id: 'donut',
    label: 'Donut',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="16" fill="#4BC0C0"/>
        <path d="M20,20 L20,4 A16,16 0 0,1 34.9,28 Z" fill="#36A2EB"/>
        <path d="M20,20 L34.9,28 A16,16 0 0,1 6,30 Z" fill="#FF6384"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
      </svg>
    )
  }
];

export default function LeftSidebar({ chartType, onChartTypeChange }) {
  return (
    <div className="w-[240px] bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Chart Types</h3>
        <div className="space-y-1">
          {chartTypes.map(ct => (
            <button
              key={ct.id}
              onClick={() => onChartTypeChange(ct.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                chartType === ct.id
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                  : 'bg-white border-2 border-transparent hover:border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">{ct.icon}</div>
              <span className="text-sm font-medium">{ct.label}</span>
              {chartType === ct.id && (
                <svg className="w-4 h-4 ml-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
