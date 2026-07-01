import React, { useRef, useState } from 'react';

export default function UploadBox({
  onFile,
  accepted = ['.csv', '.xlsx'],
  title = 'CSV / XLSX',
  chooseLabel = 'Choose file',
  emptyLabel = 'Drag file here or choose from device',
}) {
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [fileName, setFileName] = useState(null);

  function handleFiles(files) {
    const f = files && files[0];
    if (!f) return;
    setFileName(f.name);
    onFile && onFile(f);
  }

  function onClick(e) {
    e.stopPropagation();
    inputRef.current && inputRef.current.click();
  }

  function onDrop(e) {
    e.preventDefault();
    setHover(false);
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      handleFiles(dt.files);
    }
  }

  return (
    <div
      className={`upload-box cursor-pointer ${hover ? 'hover' : ''}`}
      onClick={onClick}
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accepted.join(',')}
        onChange={(e) => {
          if (e.target.files && e.target.files.length) handleFiles(e.target.files);
        }}
      />
      <div className="flex flex-col gap-1.5">
        <strong>{title}</strong>
        <span className="text-[13px]">{fileName || emptyLabel}</span>
        <div className="mt-1.5">
          <button className="secondary" onClick={(e) => { e.stopPropagation(); inputRef.current && inputRef.current.click(); }}>{chooseLabel}</button>
        </div>
      </div>
    </div>
  );
}
