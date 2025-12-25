import os
from dotenv import load_dotenv
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_MODEL="gemini-2.5-flash"
GENAI_TEMPERATURE = 0
GENAI_MAX_OUTPUT_TOKENS = 8000
CV_PROCESSING_PROMPT = """You are an expert at extracting structured data from CVs/Resumes.

**CRITICAL RULE:** Only extract information that is EXPLICITLY mentioned in the CV.
Do NOT infer, guess, or make up any information.

**STEP 1: Read the entire CV carefully**
**STEP 2: Locate the "TECHNICAL SKILLS" or "Skills" section**
**STEP 3: Extract EVERY technology/tool/language mentioned as a SEPARATE skill**
**STEP 4: Locate work experience/internships section and extract ALL jobs with exact dates**

**CV TEXT:**
{cv_text}

**EXTRACTION INSTRUCTIONS:**

1. **Personal Information:**
   - fullName: Extract as written
   - dob: Date of birth in YYYY-MM-DD format (if mentioned)
   - contact: Phone number with country code (if visible)
   - email: Email address
   - emergencyContact: Only if explicitly mentioned (family member contact)

2. **Skills - EXTRACT INDIVIDUAL TECHNOLOGIES (CRITICAL):**
   - READ THE CV CAREFULLY - Look for sections titled "TECHNICAL SKILLS", "Skills:", "Languages:", "Technologies:"
   - When you see comma-separated lists like "C++, Java, JavaScript, Python" - YOU MUST extract EACH ONE as a separate skill
   - When you see "Node.js, Express.js, MongoDB" - Extract 3 skills: "Node.js", "Express.js", "MongoDB"
   
   CORRECT EXTRACTION:
   * Input: "Languages: C++, Java, JavaScript, Python, HTML"
   * Output: [{{"name": "C++", "mentions": 1, "category": "technical"}}, {{"name": "Java", "mentions": 1, "category": "technical"}}, {{"name": "JavaScript", "mentions": 1, "category": "technical"}}, {{"name": "Python", "mentions": 1, "category": "technical"}}, {{"name": "HTML", "mentions": 1, "category": "technical"}}]
   
   WRONG EXTRACTION (DO NOT DO THIS):
   * Input: "Languages: C++, Java, JavaScript, Python, HTML"
   * Output: [{{"name": "Languages", "mentions": 1, "category": "technical"}}] ❌ WRONG
   
   WRONG EXTRACTION (DO NOT DO THIS):
   * Input: "data structures and algorithms"
   * Output: [{{"name": "Data", "mentions": 1, "category": "technical"}}] ❌ WRONG - This is too generic
   
   - For EACH skill:
     * name: Exact technology name (C++, Node.js, MongoDB, Docker, React.js, Python, Java, etc.)
     * mentions: Set to 1
     * category: "technical", "soft", "finance", "design", "domain", or "other"
   - If NO skills found: []

3. **Work Experience - LOOK FOR EXPERIENCE/INTERNSHIPS SECTION:**
   - Search for sections: "EXPERIENCE", "WORK EXPERIENCE", "Professional Experience", "INTERNSHIPS", "Employment History"
   - Extract EVERY job/internship/freelance role mentioned BELOW the projects section
   - IMPORTANT: If NO work experience/internships found, return empty array []
   - For EACH job:
     * company: Company/Organization name
     * position: Job title/role (e.g., "Software Engineer Intern", "Backend Developer")
     * startDate: MUST be in YYYY-MM-DD format
       - "Sep 2024" → "2024-09-01"
       - "September 2024" → "2024-09-01"  
       - "Jul 2023" → "2023-07-01"
       - Month conversion: Jan→01, Feb→02, Mar→03, Apr→04, May→05, Jun→06, Jul→07, Aug→08, Sep→09, Oct→10, Nov→11, Dec→12
     * endDate: YYYY-MM-DD or "Present"
       - "Present", "Current", "Ongoing" → "Present"
       - Otherwise convert like startDate
     * duration: Human readable duration
     * description: Brief responsibilities
   - EXAMPLE:
     * "Backend Developer Intern at Tech Corp | Jul 2024 - Sep 2024" → company: "Tech Corp", position: "Backend Developer Intern", startDate: "2024-07-01", endDate: "2024-09-01"

4. **Employment Fields:**
   - designation: Current/most recent job title from work experience
   - department: Only if explicitly mentioned in CV, otherwise empty string ""

5. **Calculated Fields (leave as default, will be computed later):**
   - experienceYears: 0.0 
   - primarySkill: ""
   - secondarySkill: ""

6. **Fields NOT in CV (leave as null/empty):**
   - employeeId: null
   - officeLocation: null
   - emergencyContact: "" (unless explicitly mentioned)

7. **Education:**
   - Extract degrees, institutions, years
   - Format: "B.Tech Computer Science, XYZ University (2018)"

**OUTPUT FORMAT:**
{format_instructions}

**IMPORTANT:**
- Return ONLY valid JSON
- Do NOT infer or guess missing information
- Empty string "" for missing text fields
- Empty array [] for missing lists
- null for employeeId and officeLocation
- Set all skill mentions to 1 (accurate counting done separately)
- Convert ALL date formats to YYYY-MM-DD format

**BEGIN EXTRACTION:**
"""
