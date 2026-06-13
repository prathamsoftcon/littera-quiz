import React, { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function TextInputField({ label, value, onChange, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={fieldWrapStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{ ...inputStyle, ...(isFocused ? inputFocusStyle : {}) }}
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
  const [isFocused, setIsFocused] = useState(false);
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
    <div style={fieldWrapStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              blurTimeoutRef.current = setTimeout(() => setIsOpen(false), 120);
            }}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              ...inputStyle,
              ...(isFocused && !disabled ? inputFocusStyle : {}),
              paddingRight: '38px',
              cursor: disabled ? 'not-allowed' : 'text',
              background: disabled ? '#f3f6fa' : '#fff',
              color: disabled ? '#8a97a8' : '#0f172a',
              textTransform
            }}
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
            style={{
              ...iconButtonStyle,
              background: search && isSearching ? '#fee2e2' : '#edf4ff',
              color: search && isSearching ? '#b91c1c' : '#2563eb',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.65 : 1
            }}
            aria-label={search && isSearching ? `Clear ${label}` : `Open ${label} options`}
          >
            {search && isSearching ? <CloseIcon sx={{ fontSize: 15 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 19 }} />}
          </button>

          {isOpen && !disabled && (
            <div style={dropdownStyle}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onMouseDown={() => {
                      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
                      handleSelect(option);
                    }}
                    style={dropdownItemStyle}
                  >
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{option.label}</span>
                    {option.meta && (
                      <span style={{ color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {option.meta}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div style={emptyDropdownStyle}>No options found</div>
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
    <div style={fieldWrapStyle}>
      <label style={labelStyle}>{label}</label>
      <div
        style={{
          ...inputStyle,
          background: '#eff6ff',
          color,
          display: 'flex',
          alignItems: 'center',
          border: '1px dashed #93c5fd'
        }}
      >
        {value || autoFilledText}
      </div>
    </div>
  );
}

export const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '12px',
  fontWeight: 700,
  color: '#1e293b'
};

export const inputStyle = {
  width: '100%',
  height: '42px',
  border: '1px solid #c7d3e3',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '13px',
  color: '#0f172a',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
  transition: 'border-color 160ms ease, box-shadow 160ms ease, background 160ms ease'
};

const fieldWrapStyle = {
  minWidth: 0
};

const inputFocusStyle = {
  borderColor: '#38bdf8',
  boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.14), 0 4px 10px rgba(15, 23, 42, 0.05)'
};

const iconButtonStyle = {
  position: 'absolute',
  right: '7px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '28px',
  height: '28px',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  transition: 'background 160ms ease, color 160ms ease, transform 160ms ease'
};

const dropdownStyle = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: '180px',
  overflowY: 'auto',
  border: '1px solid #d6e1ee',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 18px 34px rgba(15, 23, 42, 0.16)'
};

const dropdownItemStyle = {
  width: '100%',
  minHeight: '38px',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '2px',
  border: 'none',
  borderBottom: '1px solid #e2e8f0',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
  padding: '9px 12px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '13px'
};

const emptyDropdownStyle = {
  minHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 10px',
  color: '#64748b',
  fontSize: '13px'
};
