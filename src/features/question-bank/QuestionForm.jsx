import React, { useState } from 'react';
import SegmentedControl from '../../components/SegmentedControl';
import { Textarea } from '../../components/Input';

export default function QuestionForm({ initialData = null, onSave }) {
  const [type, setType] = useState(initialData?.type || 'mcq');
  const [text, setText] = useState(initialData?.text || '');

  return (
    <div>
      <SegmentedControl
        options={[
          { value: 'mcq', label: 'MCQ' },
          { value: 'fill', label: 'Fill' },
          { value: 'match', label: 'Match' },
          { value: 'media', label: 'Media' },
        ]}
        value={type}
        onChange={setType}
      />

      <label>Question text</label>
      <Textarea value={text} onChange={setText} />

      <div className="mt-3">
        <button onClick={() => onSave && onSave({ type, text })} className="primary">Save Draft</button>
        <button onClick={() => onSave && onSave({ type, text, submit: true })} className="primary ml-2">Submit for Approval</button>
      </div>
    </div>
  );
}
