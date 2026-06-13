import React, { useMemo, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from '../context/TranslationContext';
import { SearchableDropdownField, TextInputField } from './OnboardingFormFields';

const emptySchoolData = {
  schoolName: "",
  village: "",
  crc: "",
  block: "",
  district: "",
};

const schoolDatabase = {
  MP123: { schoolName: "Govt High School", village: "Rampur", crc: "CRC-01", block: "Bhopal", district: "Bhopal" },
  CG456: { schoolName: "Model Public School", village: "Tikrapara", crc: "CRC-07", block: "Raipur", district: "Raipur" },
};

const schoolOptions = Object.entries(schoolDatabase).map(([code, data]) => ({
  code,
  ...data,
}));

const formCopy = {
  student: {
    titleKey: 'studentOnboarding',
    nameLabelKey: 'studentName',
    namePlaceholderKey: 'enterStudentName',
    autoFieldColor: '#1d4ed8',
    fetchButtonStyle: {
      minWidth: '74px',
      height: '42px',
      padding: '0 15px',
      borderRadius: '8px',
      border: '1px solid #7dd3fc',
      background: 'linear-gradient(180deg, #e0f2fe 0%, #bfdbfe 100%)',
      color: '#075985',
      fontWeight: 800,
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 8px 16px rgba(14, 165, 233, 0.18)'
    },
  },
  teacher: {
    titleKey: 'teacherOnboarding',
    nameLabelKey: 'teacherName',
    namePlaceholderKey: 'enterTeacherName',
    autoFieldColor: '#1e3a8a',
    fetchButtonStyle: {
      minWidth: '74px',
      height: '42px',
      padding: '0 15px',
      borderRadius: '8px',
      border: '1px solid #93c5fd',
      background: 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)',
      color: '#1e3a8a',
      fontWeight: 800,
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 8px 16px rgba(37, 99, 235, 0.16)'
    },
  },
};

export default function OnboardingForm({ type = 'student', initial = {}, onSave }) {
  const { t } = useTranslation();
  const copy = formCopy[type] || formCopy.student;
  const [name, setName] = useState(initial.name || "");
  const [schoolCode, setSchoolCode] = useState(initial.schoolCode || "");
  const [schoolData, setSchoolData] = useState(emptySchoolData);
  const [selectedDistrict, setSelectedDistrict] = useState(initial.district || "");
  const [selectedBlock, setSelectedBlock] = useState(initial.block || "");
  const [selectedCrc, setSelectedCrc] = useState(initial.crc || "");
  const [selectedVillage, setSelectedVillage] = useState(initial.village || "");

  const toDropdownOptions = (items) => (
    [...new Set(items.filter(Boolean))]
      .sort((a, b) => a.localeCompare(b))
      .map((item) => ({ label: item, value: item }))
  );

  const districtOptions = useMemo(() => toDropdownOptions(schoolOptions.map((school) => school.district)), []);

  const blockOptions = useMemo(() => (
    toDropdownOptions(
      schoolOptions
        .filter((school) => school.district === selectedDistrict)
        .map((school) => school.block)
    )
  ), [selectedDistrict]);

  const crcOptions = useMemo(() => (
    toDropdownOptions(
      schoolOptions
        .filter((school) => school.district === selectedDistrict && school.block === selectedBlock)
        .map((school) => school.crc)
    )
  ), [selectedBlock, selectedDistrict]);

  const villageOptions = useMemo(() => (
    toDropdownOptions(
      schoolOptions
        .filter((school) => school.district === selectedDistrict && school.block === selectedBlock && school.crc === selectedCrc)
        .map((school) => school.village)
    )
  ), [selectedBlock, selectedCrc, selectedDistrict]);

  const schoolNameOptions = useMemo(() => (
    schoolOptions
      .filter((school) => (
        school.district === selectedDistrict &&
        school.block === selectedBlock &&
        school.crc === selectedCrc &&
        school.village === selectedVillage
      ))
      .map((school) => ({
        label: school.schoolName,
        value: school.code,
        meta: school.code,
        searchText: `${school.schoolName} ${school.code}`,
        school,
      }))
  ), [selectedBlock, selectedCrc, selectedDistrict, selectedVillage]);

  const clearSchool = () => {
    setSchoolCode("");
    setSchoolData(emptySchoolData);
  };

  const clearVillage = () => {
    setSelectedVillage("");
    clearSchool();
  };

  const clearCrc = () => {
    setSelectedCrc("");
    clearVillage();
  };

  const clearBlock = () => {
    setSelectedBlock("");
    clearCrc();
  };

  const clearDistrict = () => {
    setSelectedDistrict("");
    clearBlock();
  };

  const fillSchool = (school) => {
    setSchoolCode(school.code);
    setSelectedDistrict(school.district);
    setSelectedBlock(school.block);
    setSelectedCrc(school.crc);
    setSelectedVillage(school.village);
    setSchoolData({
      schoolName: school.schoolName,
      village: school.village,
      crc: school.crc,
      block: school.block,
      district: school.district,
    });
  };

  const handleFetch = () => {
    const school = schoolOptions.find((item) => item.code === schoolCode.trim().toUpperCase());
    if (school) {
      fillSchool(school);
      return;
    }

    alert(t('schoolCodeNotFound'));
    clearSchool();
  };

  const isValid =
    name && name.trim().length > 0 &&
    schoolCode && schoolCode.trim().length > 0 &&
    schoolData && schoolData.schoolName && schoolData.schoolName.length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={formCardSx}>
        <div style={headerStyle}>
          <div style={headerMarkStyle} />
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: 0 }}>
            {t(copy.titleKey)}
          </Typography>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={fieldsGridStyle}>
            <TextInputField
              label={t(copy.nameLabelKey)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(copy.namePlaceholderKey)}
            />

            <SearchableDropdownField
              label={t('schoolCode')}
              value={schoolCode}
              placeholder="MP123"
              options={schoolOptions.map((school) => ({
                label: school.code,
                value: school.code,
                meta: school.schoolName,
                searchText: `${school.code} ${school.schoolName}`,
                school,
              }))}
              onInputChange={(nextValue) => {
                setSchoolCode(nextValue);
                setSchoolData(emptySchoolData);
              }}
              onSelect={(option) => fillSchool(option.school)}
              onClear={clearSchool}
              textTransform="uppercase"
              endAddon={(
                <button onClick={handleFetch} style={copy.fetchButtonStyle}>
                  {t('fetch')}
                </button>
              )}
            />

            <SearchableDropdownField
              label={t('district')}
              value={selectedDistrict}
              placeholder={t('district')}
              options={districtOptions}
              onSelect={(option) => {
                setSelectedDistrict(option.value);
                setSelectedBlock("");
                setSelectedCrc("");
                setSelectedVillage("");
                clearSchool();
              }}
              onClear={clearDistrict}
            />

            <SearchableDropdownField
              label={t('block')}
              value={selectedBlock}
              placeholder={t('block')}
              options={blockOptions}
              disabled={!selectedDistrict}
              onSelect={(option) => {
                setSelectedBlock(option.value);
                setSelectedCrc("");
                setSelectedVillage("");
                clearSchool();
              }}
              onClear={clearBlock}
            />

            <SearchableDropdownField
              label={t('crc')}
              value={selectedCrc}
              placeholder={t('crc')}
              options={crcOptions}
              disabled={!selectedBlock}
              onSelect={(option) => {
                setSelectedCrc(option.value);
                setSelectedVillage("");
                clearSchool();
              }}
              onClear={clearCrc}
            />

            <SearchableDropdownField
              label={t('village')}
              value={selectedVillage}
              placeholder={t('village')}
              options={villageOptions}
              disabled={!selectedCrc}
              onSelect={(option) => {
                setSelectedVillage(option.value);
                clearSchool();
              }}
              onClear={clearVillage}
            />

            <SearchableDropdownField
              label={t('schoolName')}
              value={schoolData.schoolName}
              placeholder={t('schoolName')}
              options={schoolNameOptions}
              disabled={!selectedVillage}
              onSelect={(option) => fillSchool(option.school)}
              onClear={clearSchool}
            />
          </div>
        </div>

        <div style={{ marginTop: '14px' }}>
          <button
            onClick={() => isValid && onSave && onSave({ name, schoolCode, ...schoolData })}
            disabled={!isValid}
            style={isValid ? saveButtonStyle : disabledSaveButtonStyle}
          >
            {t('saveAndContinue')}
          </button>
        </div>
      </Paper>
    </Box>
  );
}

const formCardSx = {
  p: { xs: 2.25, sm: 3 },
  width: '100%',
  maxWidth: 700,
  mx: 'auto',
  borderRadius: '8px',
  border: '1px solid #d7e4f3',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
  boxShadow: '0 22px 54px rgba(15, 23, 42, 0.12)',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 52%, #22c55e 100%)',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  }
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const headerMarkStyle = {
  width: '9px',
  height: '30px',
  borderRadius: '8px',
  background: 'linear-gradient(180deg, #0ea5e9 0%, #2563eb 100%)',
  boxShadow: '0 8px 16px rgba(37, 99, 235, 0.22)'
};

const fieldsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '14px 12px',
  alignItems: 'start'
};

const saveButtonStyle = {
  width: '100%',
  minHeight: '44px',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  background: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 55%, #14b8a6 100%)',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
  boxShadow: '0 14px 26px rgba(37, 99, 235, 0.26)'
};

const disabledSaveButtonStyle = {
  ...saveButtonStyle,
  background: 'linear-gradient(90deg, #94a3b8 0%, #a8b5c6 100%)',
  cursor: 'not-allowed',
  boxShadow: 'none'
};
