/**
 * EDIT PROFILE PAGE - CV UPLOAD AT TOP
 * ======================================
 * Better UX: Upload CV first, then review and edit auto-filled data
 */

import React, { useState } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import WorkInfo from '../components/WorkInfo'
import SkillInfo from '../components/SkillInfo'
import { useTheme } from '../context/ThemeContext'

const EditProfile = () => {
  const { isDarkMode } = useTheme();
  
  // MAIN FORM STATE
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    dob: "",
    emergencyContact: "",
    employeeId: "",
    department: "",
    designation: "",
    officeLocation: "",
    primarySkill: "",
    secondarySkill: "",
    experienceYears: ""
  });

  // CV PARSED DATA (arrays)
  const [cvData, setCvData] = useState({
    allSkills: [],
    workExperience: [],
    education: ""
  });

  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isParsingCV, setIsParsingCV] = useState(false);
  const [parseError, setParseError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // CV UPLOAD HANDLER - Parses immediately on upload
  const handleCVUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!validTypes.includes(file.type)) {
      setParseError('Please upload a PDF or DOCX file only');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setParseError('File size must be less than 10MB');
      return;
    }

    setIsParsingCV(true);
    setParseError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('📤 Uploading CV to parser backend...');
      
      const response = await fetch('http://localhost:8000/api/process-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process CV');
      }

      const data = await response.json();
      console.log('✅ CV parsed successfully:', data);

      // Store complete CV data
      setCvData({
        allSkills: data.allSkills || [],
        workExperience: data.workExperience || [],
        education: data.education || ""
      });

      // Auto-fill form fields
      setForm(prev => ({
        ...prev,
        fullName: data.fullName || prev.fullName,
        email: data.email || prev.email,
        contact: data.contact || prev.contact,
        dob: data.dob || prev.dob,
        emergencyContact: data.emergencyContact || prev.emergencyContact,
        designation: data.designation || prev.designation,
        department: data.department || prev.department,
        primarySkill: data.primarySkill || prev.primarySkill,
        secondarySkill: data.secondarySkill || prev.secondarySkill,
        experienceYears: data.experienceYears?.toString() || prev.experienceYears
      }));

      setCvFile(file);
      
    } catch (error) {
      console.error('❌ Error processing CV:', error);
      setParseError(error.message || 'Failed to process CV. Please try again.');
      setCvFile(null);
    } finally {
      setIsParsingCV(false);
    }
  };

  // RESET HANDLER
  const handleReset = () => {
    setForm({
      fullName: "", email: "", contact: "", dob: "", emergencyContact: "",
      employeeId: "", department: "", designation: "", officeLocation: "",
      primarySkill: "", secondarySkill: "", experienceYears: ""
    });
    setCvData({ allSkills: [], workExperience: [], education: "" });
    setCvFile(null);
    setParseError(null);
  };

  // SUBMIT HANDLER - Send to main HRMS backend
  const handleSubmit = async () => {
    // Basic validation
    if (!form.fullName || !form.email) {
      alert('❌ Please fill in at least Name and Email');
      return;
    }

    setLoading(true);

    try {
      // Prepare complete employee data
      const employeeData = {
        // Basic form fields
        ...form,
        
        // CV parsed arrays
        allSkills: cvData.allSkills,
        workExperience: cvData.workExperience,
        education: cvData.education,
        
        // Metadata
        submittedAt: new Date().toISOString(),
        hasCVData: cvData.allSkills.length > 0
      };

      console.log('📤 Submitting to main backend:', employeeData);

      // TODO: Replace with your actual HRMS backend URL
      const response = await fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(employeeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save employee data');
      }

      const result = await response.json();
      console.log('✅ Employee saved:', result);
      
      alert('✅ Profile saved successfully!');
      handleReset();
      
      // Optional: Redirect to employee list
      // navigate('/employees');
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert(`❌ Failed to save profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto'>
      {/* ========================================
          CV UPLOAD SECTION - AT TOP
          ======================================== */}
      <section className='w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-900 p-6 mb-6 animate-fadeInUp'>
        <div className='text-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2'>
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Your CV/Resume
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Upload your CV to auto-fill the form with AI-powered extraction
          </p>
        </div>

        {/* CV UPLOAD INPUT */}
        <div className='relative'>
          <input
            id="cv-upload-main"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCVUpload}
            disabled={isParsingCV}
            className='hidden'
          />
          <label 
            htmlFor="cv-upload-main"
            className={`cursor-pointer flex flex-col items-center justify-center gap-4 w-full p-8 border-3 border-dashed rounded-2xl transition-all duration-300 relative overflow-hidden ${
              isParsingCV 
                ? 'border-blue-400 dark:border-blue-600 bg-blue-100 dark:bg-blue-900/30 opacity-75 cursor-wait' 
                : cvFile
                ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                : 'border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-[1.02]'
            }`}
          >
            {/* Shimmer effect */}
            {!isParsingCV && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            
            {isParsingCV ? (
              <>
                <svg className="w-12 h-12 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="text-center">
                  <p className='text-lg font-semibold text-blue-700 dark:text-blue-300'>
                    🤖 AI is Processing Your CV...
                  </p>
                  <p className='text-sm text-blue-600 dark:text-blue-400 mt-1'>
                    Extracting skills, experience, and personal information
                  </p>
                </div>
              </>
            ) : cvFile ? (
              <>
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center">
                  <p className='text-lg font-semibold text-green-700 dark:text-green-300'>
                    ✅ {cvFile.name}
                  </p>
                  <p className='text-sm text-green-600 dark:text-green-400 mt-1'>
                    Successfully parsed • {cvData.allSkills.length} skills extracted
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
                    Click to upload a different CV
                  </p>
                </div>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-center">
                  <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
                    Click to Upload or Drag & Drop
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                    PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              </>
            )}
          </label>
        </div>

        {/* ERROR MESSAGE */}
        {parseError && (
          <div className="mt-4 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl animate-fadeInScale">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-red-700 dark:text-red-300">Failed to parse CV</p>
              <p className="text-sm text-red-600 dark:text-red-400">{parseError}</p>
            </div>
          </div>
        )}

        {/* SUCCESS STATS */}
        {cvFile && !parseError && cvData.allSkills.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cvData.allSkills.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Skills Found</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{cvData.workExperience.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Jobs Found</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{form.experienceYears || 0}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Years Exp</p>
            </div>
          </div>
        )}
      </section>

      {/* ========================================
          FORM SECTIONS
          ======================================== */}
      <ProfileInfo 
        form={form}
        onChange={handleChange}/>
      
      <WorkInfo 
        form={form}
        onChange={handleChange}/>
      
      {/* SkillInfo - Now simpler, no CV upload */}
      <SkillInfo 
        form={form}
        onChange={handleChange}/>

      {/* ========================================
          ACTION BUTTONS
          ======================================== */}
      <div className='w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center transition-all duration-300 animate-fadeInUp' style={{ animationDelay: '0.3s' }}>
        <button 
          onClick={handleReset}
          className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group'>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <svg className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="relative z-10">Reset Form</span>
        </button>
        
        <button 
          onClick={handleSubmit}
          disabled={loading || isParsingCV}
          className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white rounded-lg font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="relative z-10">Saving to Database...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="relative z-10">Save to HRMS</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default EditProfile