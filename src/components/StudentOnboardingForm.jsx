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
    const data = schoolDatabase[schoolCode];
    if (data) setSchoolData(data);
    else {
      alert("School code not found");
      setSchoolData({ schoolName: "", village: "", crc: "", block: "", district: "" });
    }
  };

  const isValid = name && name.trim().length > 0 && schoolCode && schoolCode.trim().length > 0 && schoolData && schoolData.schoolName;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, borderRadius: 3 }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 720, mx: 'auto', transform: 'translateY(-30px)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Student Onboarding</Typography>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Student name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter student name" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>School code</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} placeholder="MP123" style={{ ...inputStyle, flex: 1 }} />
                <button onClick={handleFetch} style={{ padding: '0 18px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Fetch</button>
              </div>
            </div>

            <AutoField label="School name" value={schoolData.schoolName} />
            <AutoField label="Village" value={schoolData.village} />
            <AutoField label="CRC" value={schoolData.crc} />
            <AutoField label="Block" value={schoolData.block} />
            <AutoField label="District" value={schoolData.district} />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button onClick={() => isValid && onSave && onSave({ name, schoolCode, ...schoolData })} disabled={!isValid} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '10px', background: isValid ? '#0f766e' : '#94a3b8', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: isValid ? 'pointer' : 'not-allowed' }}>
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
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>{label}</label>
      <div style={{ ...inputStyle, background: '#e8f5ee', color: '#065f46', display: 'flex', alignItems: 'center' }}>{value || 'Auto-filled'}</div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: '40px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};
