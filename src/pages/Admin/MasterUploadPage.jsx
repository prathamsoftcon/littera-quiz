import React from 'react';
import Panel from '../../components/Panel';
import MasterUpload from '../../features/admin/MasterUpload';
import { useTranslation } from '../../context/TranslationContext';

export default function MasterUploadPage() {
  const { t } = useTranslation();
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">{t('adminMasterUploadEyebrow')}</p>
        <h2>{t('adminMasterUploadTitle')}</h2>
      </div>

      <div className="grid one">
        <Panel>
          <MasterUpload />
        </Panel>
      </div>
    </div>
  );
}
