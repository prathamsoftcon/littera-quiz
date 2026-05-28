import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function StudentOnboardingForm({ initial = {}, onSave }) {
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
      alert("School code not found");
      setSchoolData({ schoolName: "", village: "", crc: "", block: "", district: "" });
    }
  };

  const isValid = name && name.trim().length > 0 && schoolCode && schoolCode.trim().length > 0 && schoolData && schoolData.schoolName;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, width: '100%', maxWidth: 640, mx: 'auto', borderRadius: 3, border: '1px solid #dbe4f0', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Student Onboarding
        </Typography>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Student name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>School code</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                  placeholder="MP123"
                  style={{ ...inputStyle, flex: 1, textTransform: 'uppercase' }}
                />
                <button onClick={handleFetch} style={fetchButtonStyle}>Fetch</button>
              </div>
            </div>

            <AutoField label="School name" value={schoolData.schoolName} />
            <AutoField label="Village" value={schoolData.village} />
            <AutoField label="CRC" value={schoolData.crc} />
            <AutoField label="Block" value={schoolData.block} />
            <AutoField label="District" value={schoolData.district} />
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
              background: isValid ? 'linear-gradient(90deg, #0f766e 0%, #0d9488 100%)' : '#94a3b8',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 10px 18px rgba(15, 118, 110, 0.28)' : 'none'
            }}
          >
            Save and Continue
          </button>
        </div>
      </Paper>
    </Box>
  );
}

function AutoField({ label, value }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ ...inputStyle, background: '#f0fdf4', color: '#166534', display: 'flex', alignItems: 'center', border: '1px dashed #86efac' }}>{value || 'Auto-filled'}</div>
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
  border: '1px solid #99f6e4',
  background: '#ccfbf1',
  color: '#0f766e',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer'
};
