import React, { useState, useRef } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import SegmentedControl from '../../components/SegmentedControl';

export default function QuestionSubmissionPanel({ onAction } = {}) {
  const { t } = useTranslation();
  const questionTypes = [
    { value: 'MCQ', label: t('teacherTypeMcq') },
    { value: 'Fill', label: t('teacherTypeFill') },
    { value: 'Match', label: t('teacherTypeMatch') },
    { value: 'Media', label: t('teacherTypeMedia') },
  ];
  const difficultyOptions = [
    { value: 'Easy', label: t('teacherDifficultyEasy') },
    { value: 'Medium', label: t('teacherDifficultyMedium') },
    { value: 'Hard', label: t('teacherDifficultyHard') },
  ];

  const [selectedType, setSelectedType] = useState('MCQ');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [questionText, setQuestionText] = useState('');
  const [answerData, setAnswerData] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const messageTimer = useRef(null);

  function showMessage(msg) {
    if (typeof onAction === 'function') onAction(msg);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => {
      if (typeof onAction === 'function') onAction('');
    }, 2800);
  }

  function handleSaveDraft() {
    if (!questionText.trim()) {
      showMessage(t('teacherMessageDraftNeedQuestion'));
      return;
    }
    showMessage(t('teacherMessageDraftSaved'));
  }

  function handleSubmit() {
    if (!questionText.trim() || !category.trim() || !subCategory.trim()) {
      showMessage(t('teacherMessageSubmitMissing'));
      return;
    }
    showMessage(t('teacherMessageSubmitSuccess'));
    setQuestionText('');
    setCategory('');
    setSubCategory('');
    setMediaUrl('');
    setAnswerData('');
  }

  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherSubmissionTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherSubmissionSubtitle')}</p>
        </div>
      </div>
      <SegmentedControl options={questionTypes} value={selectedType} onChange={setSelectedType} />
      <div className="teacher-form-row">
        <div>
          <label htmlFor="teacher-category">{t('teacherSubmissionCategory')}</label>
          <input
            id="teacher-category"
            className="teacher-input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder={t('teacherSubmissionCategoryPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="teacher-subcategory">{t('teacherSubmissionSubCategory')}</label>
          <input
            id="teacher-subcategory"
            className="teacher-input"
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
            placeholder={t('teacherSubmissionSubCategoryPlaceholder')}
          />
        </div>
      </div>
      <label htmlFor="teacher-question">{t('teacherSubmissionQuestionText')}</label>
      <textarea
        id="teacher-question"
        className="teacher-textarea"
        value={questionText}
        onChange={(event) => setQuestionText(event.target.value)}
        placeholder={t('teacherSubmissionQuestionPlaceholder')}
      />
      <div className="teacher-form-row">
        <div>
          <label htmlFor="teacher-media">{t('teacherSubmissionMediaUrl')}</label>
          <input
            id="teacher-media"
            className="teacher-input"
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
            placeholder={t('teacherSubmissionMediaPlaceholder')}
          />
        </div>
        <div>
          <label>{t('teacherSubmissionDifficulty')}</label>
          <SegmentedControl
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
          />
        </div>
      </div>
      <label htmlFor="teacher-answer">{t('teacherSubmissionAnswerData')}</label>
      <textarea
        id="teacher-answer"
        className="teacher-textarea"
        value={answerData}
        onChange={(event) => setAnswerData(event.target.value)}
        placeholder={t('teacherSubmissionAnswerPlaceholder')}
      />
      <div className="teacher-inline-actions">
        <button type="button" className="teacher-btn ghost" onClick={handleSaveDraft}>{t('teacherSubmissionSaveDraft')}</button>
        <button type="button" className="teacher-btn" onClick={handleSubmit}>{t('teacherSubmissionSubmit')}</button>
      </div>
    </article>
  );
}
