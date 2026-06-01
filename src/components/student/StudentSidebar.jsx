import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentSidebar({ title, items, activeModule, setActiveModule }) {
  const { t } = useTranslation();
  return (
    <aside role="navigation" aria-label="Student menu" className="sticky top-0 h-screen rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col overflow-auto">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
        <div className="mt-5 space-y-2">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-current={activeModule === item.key ? 'true' : undefined}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                  activeModule === item.key
                    ? 'bg-sky-800 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => setActiveModule(item.key)}
            >
              {item.labelKey ? t(item.labelKey) : item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
