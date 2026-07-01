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
    fetchButtonClass: 'border-sky-300 bg-gradient-to-b from-sky-100 to-blue-200 text-sky-800 shadow-[0_8px_16px_rgba(14,165,233,0.18)]',
  },
  teacher: {
    titleKey: 'teacherOnboarding',
    nameLabelKey: 'teacherName',
    namePlaceholderKey: 'enterTeacherName',
    autoFieldColor: '#1e3a8a',
    fetchButtonClass: 'border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900 shadow-[0_8px_16px_rgba(37,99,235,0.16)]',
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
        <div className="flex items-center gap-2.5">
          <div className="h-[30px] w-[9px] rounded-lg bg-gradient-to-b from-sky-500 to-blue-600 shadow-[0_8px_16px_rgba(37,99,235,0.22)]" />
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: 0 }}>
            {t(copy.titleKey)}
          </Typography>
        </div>

        <div className="mt-[18px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-start gap-x-3 gap-y-3.5">
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
                <button
                  onClick={handleFetch}
                  className={`h-[42px] min-w-[74px] cursor-pointer rounded-lg border px-[15px] text-[13px] font-extrabold ${copy.fetchButtonClass}`}
                >
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

        <div className="mt-3.5">
          <button
            onClick={() => isValid && onSave && onSave({ name, schoolCode, ...schoolData })}
            disabled={!isValid}
            className={`min-h-11 w-full rounded-lg border-0 p-3 text-[15px] font-extrabold text-white ${
              isValid
                ? 'cursor-pointer bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 shadow-[0_14px_26px_rgba(37,99,235,0.26)]'
                : 'cursor-not-allowed bg-gradient-to-r from-slate-400 to-slate-400 shadow-none'
            }`}
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
