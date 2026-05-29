import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from '../context/TranslationContext';

export default function StudentOnboardingForm({ initial = {}, onSave }) {
  const { t } = useTranslation();
  const [name, setName] = useState(initial.name || "");
  const [schoolCode, setSchoolCode] = useState(initial.schoolCode || "");

  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    village: "",
    crc: "",
    block: "",
    district: "",
  });

  const schoolDatabase = {
    MP123: { schoolName: "Govt High School", village: "Rampur", crc: "CRC-01", block: "Bhopal", district: "Bhopal" },
    CG456: { schoolName: "Model Public School", village: "Tikrapara", crc: "CRC-07", block: "Raipur", district: "Raipur" },
  };

  const handleFetch = () => {
    const data = schoolDatabase[schoolCode.trim().toUpperCase()];
    if (data) setSchoolData(data);
    else {
      alert(t('schoolCodeNotFound'));
      setSchoolData({ schoolName: "", village: "", crc: "", block: "", district: "" });
    }
  };

  const isValid = name && name.trim().length > 0 && schoolCode && schoolCode.trim().length > 0 && schoolData && schoolData.schoolName;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, width: '100%', maxWidth: 640, mx: 'auto', borderRadius: 3, border: '1px solid #dbe4f0', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
          {t('studentOnboarding')}
        </Typography>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            <div>
              <label style={labelStyle}>{t('studentName')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enterStudentName')}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>{t('schoolCode')}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                  placeholder="MP123"
                  style={{ ...inputStyle, flex: 1, textTransform: 'uppercase' }}
                />
                <button onClick={handleFetch} style={fetchButtonStyle}>{t('fetch')}</button>
              </div>
            </div>

            <AutoField label={t('schoolName')} value={schoolData.schoolName} autoFilledText={t('autoFilled')} />
            <AutoField label={t('village')} value={schoolData.village} autoFilledText={t('autoFilled')} />
            <AutoField label={t('crc')} value={schoolData.crc} autoFilledText={t('autoFilled')} />
            <AutoField label={t('block')} value={schoolData.block} autoFilledText={t('autoFilled')} />
            <AutoField label={t('district')} value={schoolData.district} autoFilledText={t('autoFilled')} />
          </div>
        </div>

        <div style={{ marginTop: '14px' }}>
          <button
            onClick={() => isValid && onSave && onSave({ name, schoolCode, ...schoolData })}
            disabled={!isValid}
            style={{
              width: '100%',
              padding: '11px',
              border: 'none',
              borderRadius: '10px',
              background: isValid ? 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)' : '#94a3b8',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 10px 18px rgba(37, 99, 235, 0.28)' : 'none'
            }}
          >
            {t('saveAndContinue')}
          </button>
        </div>
      </Paper>
    </Box>
  );
}

function AutoField({ label, value, autoFilledText }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ ...inputStyle, background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', border: '1px dashed #93c5fd' }}>{value || autoFilledText}</div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '12px',
  fontWeight: 700,
  color: '#334155'
};

const inputStyle = {
  width: '100%',
  height: '38px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '0 10px',
  fontSize: '13px',
  color: '#0f172a',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box'
};

const fetchButtonStyle = {
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #93c5fd',
  background: '#dbeafe',
  color: '#1d4ed8',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer'
};
