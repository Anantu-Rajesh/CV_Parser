# CV Parsing & Autofill Implementation Guide

## Overview
This guide provides a comprehensive plan to implement CV parsing and autofill functionality in the react-app. The feature will allow users to upload PDF or DOCX files and automatically extract information to populate form fields.

---

## Architecture Decision

You need to choose between two approaches:

### Option 1: Frontend-Only Solution
**Pros:**
- No backend required
- Faster implementation
- Works entirely in browser
- No server costs

**Cons:**
- Limited parsing accuracy
- Larger bundle size (~2-3MB)
- Performance depends on client device
- Limited to basic text extraction

### Option 2: Backend Solution (Recommended)
**Pros:**
- Higher accuracy with NLP libraries
- Better performance
- More sophisticated parsing
- Can handle complex CV formats

**Cons:**
- Requires backend infrastructure
- Additional setup time
- Server costs

---

## Implementation Plan

### Phase 1: Setup Dependencies

#### For Frontend-Only Approach:
```bash
cd react-app
npm install pdf-parse mammoth
```

#### For Backend Approach:
```bash
# Backend setup (Python FastAPI example)
mkdir cv-parser-backend
cd cv-parser-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install fastapi uvicorn python-multipart
pip install PyPDF2 python-docx spacy
python -m spacy download en_core_web_sm
```

---

### Phase 2: File Structure

```
react-app/
├── src/
│   ├── hooks/
│   │   └── useCVParser.js          # Custom hook for CV parsing logic
│   ├── utils/
│   │   ├── textExtractor.js        # Extract text from PDF/DOCX
│   │   └── fieldMapper.js          # Map extracted text to form fields
│   ├── services/
│   │   └── api.js                  # API calls (if using backend)
│   └── pages/
│       └── EditProfile.jsx         # Already has CV upload UI
```

---

### Phase 3: Implementation Steps

#### Step 1: Create Text Extractor Utility

**File: `src/utils/textExtractor.js`**

```javascript
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';

// Set worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from PDF file
 * @param {File} file - PDF file object
 * @returns {Promise<string>} Extracted text
 */
export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Extract text from DOCX file
 * @param {File} file - DOCX file object
 * @returns {Promise<string>} Extracted text
 */
export const extractTextFromDOCX = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting DOCX text:', error);
    throw new Error('Failed to extract text from DOCX');
  }
};

/**
 * Universal text extractor - detects file type and extracts accordingly
 * @param {File} file - CV file (PDF or DOCX)
 * @returns {Promise<string>} Extracted text
 */
export const extractTextFromCV = async (file) => {
  const fileType = file.type;
  
  if (fileType === 'application/pdf') {
    return await extractTextFromPDF(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword'
  ) {
    return await extractTextFromDOCX(file);
  } else {
    throw new Error('Unsupported file type. Please upload PDF or DOCX files.');
  }
};
```

---

#### Step 2: Create Field Mapper Utility

**File: `src/utils/fieldMapper.js`**

```javascript
/**
 * Extract email from text using regex
 */
const extractEmail = (text) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : '';
};

/**
 * Extract phone number from text
 */
const extractPhone = (text) => {
  // Matches various phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const matches = text.match(phoneRegex);
  return matches ? matches[0].replace(/\s+/g, '') : '';
};

/**
 * Extract full name (typically appears first in CV)
 */
const extractFullName = (text) => {
  // Get first non-empty line (usually the name)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // Return if it looks like a name (2-4 words, each starting with capital)
    const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]+){1,3}$/;
    if (namePattern.test(firstLine)) {
      return firstLine;
    }
  }
  
  return '';
};

/**
 * Extract address from text
 */
const extractAddress = (text) => {
  // Look for common address patterns
  const addressRegex = /\d+\s+[\w\s]+,\s*[\w\s]+,\s*[A-Z]{2}\s*\d{5}/gi;
  const matches = text.match(addressRegex);
  return matches ? matches[0] : '';
};

/**
 * Extract skills from text
 */
const extractSkills = (text) => {
  const skillsSection = text.match(/skills?:(.*?)(?=\n\n|experience|education|$)/is);
  
  if (skillsSection) {
    const skillsText = skillsSection[1];
    // Split by common separators and clean
    const skills = skillsText
      .split(/[,;•\n]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0 && skill.length < 50);
    
    return skills.join(', ');
  }
  
  return '';
};

/**
 * Extract education information
 */
const extractEducation = (text) => {
  const educationSection = text.match(/education:(.*?)(?=\n\n|experience|skills|$)/is);
  
  if (educationSection) {
    return educationSection[1].trim();
  }
  
  return '';
};

/**
 * Extract work experience
 */
const extractExperience = (text) => {
  const experienceSection = text.match(/(?:experience|employment):(.*?)(?=\n\n|education|skills|$)/is);
  
  if (experienceSection) {
    return experienceSection[1].trim();
  }
  
  return '';
};

/**
 * Map extracted text to form fields
 * @param {string} text - Extracted CV text
 * @returns {Object} Mapped form data
 */
export const mapTextToFormFields = (text) => {
  const normalizedText = text.toLowerCase();
  
  return {
    fullName: extractFullName(text),
    email: extractEmail(text),
    contact: extractPhone(text),
    address: extractAddress(text),
    skills: extractSkills(normalizedText),
    education: extractEducation(normalizedText),
    experience: extractExperience(normalizedText),
  };
};

/**
 * Validate extracted data and calculate confidence score
 */
export const validateExtractedData = (data) => {
  const validations = {
    fullName: data.fullName && data.fullName.length > 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
    contact: data.contact && data.contact.length >= 10,
  };
  
  const validFields = Object.values(validations).filter(Boolean).length;
  const confidenceScore = (validFields / Object.keys(validations).length) * 100;
  
  return {
    isValid: validFields >= 2, // At least 2 fields should be valid
    confidenceScore: Math.round(confidenceScore),
    validations,
  };
};
```

---

#### Step 3: Create Custom Hook

**File: `src/hooks/useCVParser.js`**

```javascript
import { useState } from 'react';
import { extractTextFromCV } from '../utils/textExtractor';
import { mapTextToFormFields, validateExtractedData } from '../utils/fieldMapper';

/**
 * Custom hook for CV parsing functionality
 */
export const useCVParser = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);

  /**
   * Parse CV file and extract data
   * @param {File} file - CV file to parse
   * @returns {Promise<Object>} Extracted and mapped data
   */
  const parseCV = async (file) => {
    setIsProcessing(true);
    setError(null);
    setConfidenceScore(null);

    try {
      // Step 1: Extract text from file
      const extractedText = await extractTextFromCV(file);
      
      // Step 2: Map text to form fields
      const mappedData = mapTextToFormFields(extractedText);
      
      // Step 3: Validate extracted data
      const validation = validateExtractedData(mappedData);
      setConfidenceScore(validation.confidenceScore);
      
      if (!validation.isValid) {
        setError('Low confidence in extracted data. Please review and correct.');
      }
      
      setIsProcessing(false);
      return {
        success: true,
        data: mappedData,
        confidence: validation.confidenceScore,
        validation: validation.validations,
      };
    } catch (err) {
      setError(err.message || 'Failed to parse CV');
      setIsProcessing(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  return {
    parseCV,
    isProcessing,
    error,
    confidenceScore,
  };
};
```

---

#### Step 4: Integrate into EditProfile

**File: `src/pages/EditProfile.jsx`** (Update the handleCVUpload function)

```javascript
import { useCVParser } from '../hooks/useCVParser';

// Inside EditProfile component:
const { parseCV, isProcessing, error: parseError, confidenceScore } = useCVParser();

const handleCVUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setCvFile(file);
    
    // Parse the CV
    const result = await parseCV(file);
    
    if (result.success) {
      // Update form with extracted data
      setForm(prevForm => ({
        ...prevForm,
        ...result.data,
      }));
      
      // Show success message
      alert(`CV parsed successfully! Confidence: ${result.confidence}%`);
    } else {
      alert('Failed to parse CV: ' + result.error);
    }
  }
};
```

---

### Phase 4: Backend Implementation (Optional but Recommended)

#### Backend API Structure

**File: `cv-parser-backend/main.py`**

```python
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import docx
import spacy
import re
from io import BytesIO

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load spaCy model for NLP
nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(file_bytes):
    """Extract text from PDF bytes"""
    pdf_reader = PyPDF2.PdfReader(BytesIO(file_bytes))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file_bytes):
    """Extract text from DOCX bytes"""
    doc = docx.Document(BytesIO(file_bytes))
    text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    return text

def extract_email(text):
    """Extract email using regex"""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    matches = re.findall(email_pattern, text)
    return matches[0] if matches else None

def extract_phone(text):
    """Extract phone number"""
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    matches = re.findall(phone_pattern, text)
    return matches[0] if matches else None

def extract_name_nlp(text):
    """Extract name using NLP"""
    doc = nlp(text[:500])  # Process first 500 chars for efficiency
    
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def parse_cv_text(text):
    """Parse CV text and extract structured data"""
    return {
        "fullName": extract_name_nlp(text),
        "email": extract_email(text),
        "contact": extract_phone(text),
        "address": None,  # Implement address extraction
        "skills": None,   # Implement skills extraction
    }

@app.post("/api/parse-cv")
async def parse_cv(file: UploadFile = File(...)):
    """API endpoint to parse CV file"""
    try:
        file_bytes = await file.read()
        
        # Extract text based on file type
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(file_bytes)
        elif file.filename.endswith('.docx'):
            text = extract_text_from_docx(file_bytes)
        else:
            return {"error": "Unsupported file type"}
        
        # Parse the text
        parsed_data = parse_cv_text(text)
        
        return {
            "success": True,
            "data": parsed_data,
            "confidence": 85  # Calculate based on fields found
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### Frontend API Integration

**File: `src/services/api.js`** (Add this function)

```javascript
export const parseCVBackend = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8000/api/parse-cv', {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse CV: ' + error.message);
  }
};
```

---

## Phase 5: Testing Strategy

### Test Cases:

1. **Valid PDF Upload**
   - Upload a standard PDF CV
   - Verify all fields are populated
   - Check confidence score

2. **Valid DOCX Upload**
   - Upload a DOCX CV
   - Verify extraction works

3. **Invalid File Type**
   - Try uploading .txt, .jpg
   - Verify error handling

4. **Large File**
   - Upload 10MB+ file
   - Check performance and timeout handling

5. **Empty or Corrupted File**
   - Test error handling

6. **Multiple Formats**
   - Test various CV layouts
   - Test international formats

### Testing Checklist:
```
□ Email extraction accuracy > 90%
□ Phone extraction accuracy > 85%
□ Name extraction accuracy > 80%
□ File upload < 5 seconds for standard CV
□ Error messages are user-friendly
□ Form fields are properly populated
□ Previous data is not lost if parsing fails
□ Loading states are shown during processing
```

---

## Phase 6: UI/UX Enhancements

### Add these features to improve user experience:

1. **Progress Indicator**
   ```jsx
   {isProcessing && (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
         <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
         <p className="mt-4 text-gray-700 dark:text-gray-300">Parsing CV...</p>
       </div>
     </div>
   )}
   ```

2. **Confidence Score Display**
   ```jsx
   {confidenceScore && (
     <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
       <p className="text-sm text-blue-700 dark:text-blue-300">
         Extraction Confidence: {confidenceScore}%
       </p>
     </div>
   )}
   ```

3. **Review Prompt**
   ```jsx
   {confidenceScore < 70 && (
     <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
       <p className="text-sm text-yellow-700 dark:text-yellow-300">
         ⚠️ Low confidence. Please review extracted data.
       </p>
     </div>
   )}
   ```

---

## Phase 7: Error Handling

### Common Errors and Solutions:

| Error | Solution |
|-------|----------|
| "File too large" | Implement file size check (max 10MB) |
| "Unsupported format" | Show supported formats (.pdf, .docx) |
| "Failed to extract text" | Check if file is password-protected or corrupted |
| "No data found" | CV might be image-based (needs OCR) |
| "Low confidence" | Prompt user to review and correct fields |

### Implementation:

```javascript
const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF and DOCX files are supported');
  }
  
  return true;
};
```

---

## Timeline Estimate

| Phase | Time | Dependencies |
|-------|------|--------------|
| Phase 1: Setup | 30 mins | None |
| Phase 2: File Structure | 15 mins | Phase 1 |
| Phase 3: Frontend Implementation | 4-6 hours | Phase 1, 2 |
| Phase 4: Backend (Optional) | 6-8 hours | Python knowledge |
| Phase 5: Testing | 2-3 hours | Phase 3 or 4 |
| Phase 6: UI/UX Polish | 2 hours | Phase 3 |
| Phase 7: Error Handling | 1-2 hours | All phases |

**Total: 10-22 hours** (depending on approach)

---

## Deployment Considerations

### Frontend-Only:
- No additional deployment needed
- Works immediately after build

### With Backend:
- Deploy backend to:
  - **Heroku** (Free tier available)
  - **AWS Lambda** (Serverless)
  - **DigitalOcean** (VPS)
  - **Render** (Free tier available)

- Update CORS settings for production domain
- Set up environment variables for API URL

---

## Future Enhancements

1. **OCR Support**: Extract text from image-based PDFs using Tesseract.js
2. **Multi-language Support**: Support CVs in different languages
3. **AI Improvements**: Use OpenAI API for better extraction
4. **Template Matching**: Recognize common CV templates
5. **Batch Processing**: Upload multiple CVs at once
6. **Export Feature**: Export parsed data to JSON/CSV
7. **Analytics**: Track parsing accuracy over time

---

## Resources

### Libraries:
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF parsing
- [Mammoth.js](https://www.npmjs.com/package/mammoth) - DOCX parsing
- [spaCy](https://spacy.io/) - NLP for backend
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework

### Tutorials:
- [PDF parsing in JavaScript](https://medium.com/@danieljameskay/how-to-extract-text-from-pdfs-with-react-and-pdf-js-7e3d0e6e3b5a)
- [Building REST APIs with FastAPI](https://fastapi.tiangolo.com/tutorial/)

---

## Conclusion

This implementation provides a solid foundation for CV parsing. Start with the frontend-only approach for quick implementation, then migrate to backend solution for better accuracy if needed.

**Recommended Starting Point:** Implement Phase 1-3 first, test with sample CVs, then decide if backend is necessary based on accuracy requirements.
