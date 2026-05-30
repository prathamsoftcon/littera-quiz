import React from 'react';
import { useTranslation } from '../../context/TranslationContext';
import SegmentedControl from '../../components/SegmentedControl';

export default function QuestionSubmissionPanel({
  questionTypes,
  selectedType,
  onTypeChange,
  questionText,
  onQuestionTextChange,
  answerData,
  onAnswerDataChange,
  category,
  onCategoryChange,
  subCategory,
  onSubCategoryChange,
  mediaUrl,
  onMediaUrlChange,
  difficultyOptions,
  selectedDifficulty,
  onDifficultyChange,
  onSaveDraft,
  onSubmit,
}) {
  const { t } = useTranslation();
  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherSubmissionTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherSubmissionSubtitle')}</p>
        </div>
      </div>
      <SegmentedControl options={questionTypes} value={selectedType} onChange={onTypeChange} />
      <div className="teacher-form-row">
        <div>
          <label htmlFor="teacher-category">{t('teacherSubmissionCategory')}</label>
          <input
            id="teacher-category"
            className="teacher-input"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            placeholder={t('teacherSubmissionCategoryPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="teacher-subcategory">{t('teacherSubmissionSubCategory')}</label>
          <input
            id="teacher-subcategory"
            className="teacher-input"
            value={subCategory}
            onChange={(event) => onSubCategoryChange(event.target.value)}
            placeholder={t('teacherSubmissionSubCategoryPlaceholder')}
          />
        </div>
      </div>
      <label htmlFor="teacher-question">{t('teacherSubmissionQuestionText')}</label>
      <textarea
        id="teacher-question"
        className="teacher-textarea"
        value={questionText}
        onChange={(event) => onQuestionTextChange(event.target.value)}
        placeholder={t('teacherSubmissionQuestionPlaceholder')}
      />
      <div className="teacher-form-row">
        <div>
          <label htmlFor="teacher-media">{t('teacherSubmissionMediaUrl')}</label>
          <input
            id="teacher-media"
            className="teacher-input"
            value={mediaUrl}
            onChange={(event) => onMediaUrlChange(event.target.value)}
            placeholder={t('teacherSubmissionMediaPlaceholder')}
          />
        </div>
        <div>
          <label>{t('teacherSubmissionDifficulty')}</label>
          <SegmentedControl
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={onDifficultyChange}
          />
        </div>
      </div>
      <label htmlFor="teacher-answer">{t('teacherSubmissionAnswerData')}</label>
      <textarea
        id="teacher-answer"
        className="teacher-textarea"
        value={answerData}
        onChange={(event) => onAnswerDataChange(event.target.value)}
        placeholder={t('teacherSubmissionAnswerPlaceholder')}
      />
      <div className="teacher-inline-actions">
        <button type="button" className="teacher-btn ghost" onClick={onSaveDraft}>{t('teacherSubmissionSaveDraft')}</button>
        <button type="button" className="teacher-btn" onClick={onSubmit}>{t('teacherSubmissionSubmit')}</button>
      </div>
    </article>
  );
}
