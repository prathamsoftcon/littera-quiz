import React, { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function TextInputField({ label, value, onChange, placeholder }) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-bold text-slate-800">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[42px] w-full rounded-lg border border-[#c7d3e3] bg-white px-3 text-[13px] text-slate-950 shadow-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.14),0_4px_10px_rgba(15,23,42,0.05)]"
      />
    </div>
  );
}

export function SearchableDropdownField({
  label,
  value,
  placeholder,
  options = [],
  onSelect,
  onClear,
  onInputChange,
  disabled = false,
  textTransform = 'none',
  endAddon = null,
}) {
  const [search, setSearch] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const blurTimeoutRef = useRef(null);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return options;

    return options.filter((option) => {
      const labelText = String(option.label || "").toLowerCase();
      const valueText = String(option.value || "").toLowerCase();
      const searchText = String(option.searchText || "").toLowerCase();
      return labelText.includes(normalizedSearch) || valueText.includes(normalizedSearch) || searchText.includes(normalizedSearch);
    });
  }, [options, search]);

  const handleClear = () => {
    setSearch("");
    setIsSearching(false);
    setIsOpen(false);
    if (onClear) onClear();
  };

  const handleSelect = (option) => {
    setSearch(option.label);
    setIsSearching(false);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-bold text-slate-800">{label}</label>
      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const nextSearch = textTransform === 'uppercase' ? e.target.value.toUpperCase() : e.target.value;
              setSearch(nextSearch);
              setIsSearching(true);
              setIsOpen(true);
              if (onInputChange) onInputChange(nextSearch);
            }}
            onBlur={() => {
              blurTimeoutRef.current = setTimeout(() => setIsOpen(false), 120);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={`h-[42px] w-full rounded-lg border border-[#c7d3e3] px-3 pr-[38px] text-[13px] shadow-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.14),0_4px_10px_rgba(15,23,42,0.05)] disabled:cursor-not-allowed disabled:bg-[#f3f6fa] disabled:text-[#8a97a8] ${textTransform === 'uppercase' ? 'uppercase' : ''}`}
          />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (search && isSearching) {
                handleClear();
                return;
              }
              setIsOpen((open) => !open);
            }}
            disabled={disabled}
            className={`absolute right-[7px] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-0 p-0 transition disabled:cursor-not-allowed disabled:opacity-65 ${search && isSearching ? 'bg-red-100 text-red-700' : 'bg-[#edf4ff] text-blue-600'}`}
            aria-label={search && isSearching ? `Clear ${label}` : `Open ${label} options`}
          >
            {search && isSearching ? <CloseIcon sx={{ fontSize: 15 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 19 }} />}
          </button>

          {isOpen && !disabled && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-[180px] overflow-y-auto rounded-lg border border-[#d6e1ee] bg-white shadow-[0_18px_34px_rgba(15,23,42,0.16)]">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onMouseDown={() => {
                      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
                      handleSelect(option);
                    }}
                    className="grid min-h-[38px] w-full grid-cols-[minmax(0,1fr)] gap-0.5 border-0 border-b border-soft bg-gradient-to-b from-white to-[#f8fbff] px-3 py-[9px] text-left text-[13px] cursor-pointer"
                  >
                    <span className="font-bold text-slate-950">{option.label}</span>
                    {option.meta && (
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-slate-600">
                        {option.meta}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="flex min-h-[38px] items-center px-2.5 py-2 text-[13px] text-muted">No options found</div>
              )}
            </div>
          )}
        </div>
        {endAddon}
      </div>
    </div>
  );
}

export function AutoField({ label, value, autoFilledText, color }) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-bold text-slate-800">{label}</label>
      <div
        className="flex h-[42px] w-full items-center rounded-lg border border-dashed border-blue-300 bg-blue-50 px-3 text-[13px] shadow-sm"
        style={{ color }}
      >
        {value || autoFilledText}
      </div>
    </div>
  );
}

