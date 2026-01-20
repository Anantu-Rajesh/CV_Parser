# CV Parser

An AI-powered CV/Resume parsing system that extracts structured information from PDF and DOCX documents. Built with FastAPI backend and React frontend, leveraging Google's Gemini AI for intelligent data extraction.

## Overview

CV Parser automatically extracts and categorizes information from resumes including personal details, work experience, education, and skills. The system intelligently maps skills to technical domains and provides a clean, interactive interface for viewing parsed results.

## Features

### Backend
- **AI-Powered Extraction**: Uses Google Gemini 1.5 Flash model for intelligent CV parsing
- **Multi-Format Support**: Processes PDF, DOC, and DOCX files
- **Smart Skill Categorization**: Automatically categorizes skills into domains (Frontend, Backend, Mobile, Database, DevOps, AI/ML, etc.)
- **Experience Calculation**: Automatically calculates total years of experience from work history
- **RESTful API**: Clean API endpoints for CV processing
- **Validation**: File type and size validation (max 10MB)

### Frontend
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Interactive Skill Display**: Expandable category boxes showing grouped skills
- **Real-time Processing**: Live feedback during CV upload and processing
- **Dark Mode Support**: Full theme support for comfortable viewing
- **Error Handling**: Clear error messages and validation feedback

## Technology Stack

### Backend
- **Framework**: FastAPI
- **AI/LLM**: Google Gemini 1.5 Flash (via LangChain)
- **Document Processing**: 
  - PyPDF2 (PDF extraction)
  - python-docx (DOCX extraction)
- **Schema Validation**: Pydantic
- **Environment**: Python 3.8+

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Theme**: Context API for dark mode

## Project Structure

```
cv-parser/
├── backend/
│   ├── app.py                 # FastAPI application entry point
│   ├── cv_process.py          # Core CV processing logic
│   ├── config.py              # Configuration and prompts
│   ├── schema.py              # Pydantic data models
│   ├── utils.py               # Utility functions (domain mapping, date parsing)
│   ├── requirements.txt       # Python dependencies
│   └── file_parsing/
│       ├── pdf_parse.py       # PDF extraction logic
│       └── doc_parse.py       # DOCX extraction logic
│
└── react-app/
    ├── src/
    │   ├── components/
    │   │   ├── CVParser.jsx       # Main application component
    │   │   └── SkillCategory.jsx  # Expandable skill category boxes
    │   ├── context/
    │   │   └── ThemeContext.jsx   # Dark mode context
    │   ├── App.jsx                # Root component
    │   ├── main.jsx               # Application entry point
    │   └── index.css              # Global styles and animations
    ├── package.json
    └── vite.config.js
```

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- Google API Key (for Gemini AI)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```env
GOOGLE_API_KEY=your_google_api_key_here
```

6. Run the backend server:
```bash
python app.py
```

The backend will start on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. Ensure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:5173`
3. Upload a CV/Resume (PDF or DOCX format, max 10MB)
4. Wait for AI processing (typically 5-10 seconds)
5. View extracted information organized by sections:
   - Personal Information (name, email, contact, etc.)
   - Skills categorized by domain (click to expand)
   - Work Experience in timeline format
   - Education details
6. Click "New Upload" to process another CV

## API Documentation

### Endpoints

#### GET /
Health check endpoint
```json
{
  "message": "CV Parser API is running",
  "version": "1.0.0"
}
```

#### POST /api/process-cv
Process a CV file and extract structured data

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (PDF/DOC/DOCX)

**Response:**
```json
{
  "fullName": "string",
  "email": "string",
  "contact": "string",
  "designation": "string",
  "experienceYears": "number",
  "allSkills": [
    {
      "name": "string",
      "mentions": "number",
      "category": "string",
      "proficiency": "string"
    }
  ],
  "workExperience": [
    {
      "company": "string",
      "position": "string",
      "startDate": "string",
      "endDate": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": "string",
  "primarySkill": "string",
  "secondarySkill": "string"
}
```

## Skill Domain Mapping

The system automatically categorizes skills into the following domains:

- **Frontend Development**: React, Vue, Angular, HTML, CSS, JavaScript, TypeScript
- **Backend Development**: Node.js, Django, Flask, FastAPI, Express.js, Spring
- **Mobile Development**: React Native, Flutter, Kotlin, Swift, Android, iOS
- **Database Management**: MongoDB, MySQL, PostgreSQL, Redis, SQL
- **DevOps & Cloud**: Docker, Kubernetes, AWS, Azure, GCP, CI/CD
- **Programming Languages**: Python, Java, C++, C#, Go, Rust
- **AI & Machine Learning**: TensorFlow, PyTorch, Keras, Scikit-learn
- **Data Science**: Pandas, NumPy, Matplotlib, Seaborn
- **Development Tools**: Git, Postman, VS Code, Jupyter Notebook
- **Security & Authentication**: JWT, OAuth
- **Blockchain**: Web3, Blockchain Technology
- **Other Technologies**: Any skill not matching above categories

## Configuration

### Backend Configuration (config.py)

Key configuration options:
- `GOOGLE_MODEL`: AI model selection (default: gemini-1.5-flash)
- `GENAI_TEMPERATURE`: Response randomness (0.0 - 1.0)
- `GENAI_MAX_OUTPUT_TOKENS`: Maximum response length
- `CV_PROCESSING_PROMPT`: Custom prompt for AI extraction

### Frontend Configuration

- API endpoint: `http://localhost:8000/api/process-cv`
- Max file size: 10MB
- Supported formats: PDF, DOC, DOCX

## Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd react-app
npm test
```

### Building for Production

**Backend:**
```bash
# Use production ASGI server
pip install gunicorn
gunicorn app:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Frontend:**
```bash
cd react-app
npm run build
# Output will be in the dist/ directory
```

## Troubleshooting

### Common Issues

**Backend Issues:**

1. **ImportError: No module named 'langchain'**
   - Solution: Ensure all dependencies are installed: `pip install -r requirements.txt`

2. **Google API Key Error**
   - Solution: Verify your `.env` file contains a valid `GOOGLE_API_KEY`

3. **File parsing errors**
   - Solution: Ensure CV is a valid PDF or DOCX file, not corrupted or password-protected

**Frontend Issues:**

1. **API Connection Failed**
   - Solution: Verify backend is running on port 8000
   - Check CORS settings in `app.py`

2. **Build errors**
   - Solution: Delete `node_modules` and `package-lock.json`, then run `npm install`

3. **Styling issues**
   - Solution: Ensure Tailwind CSS is properly configured in `tailwind.config.js`

## Performance Considerations

- **Processing Time**: Typically 5-10 seconds per CV depending on content length
- **File Size Limit**: 10MB maximum to ensure reasonable processing times
- **Concurrent Requests**: FastAPI handles multiple requests asynchronously
- **Rate Limiting**: Consider implementing rate limiting for production use

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive configuration
- Implement file upload validation
- Consider implementing user authentication for production
- Sanitize file inputs to prevent malicious uploads

## Future Enhancements

- Batch CV processing
- Export parsed data (JSON, CSV)
- Comparison between multiple CVs
- Advanced analytics and insights
- Resume scoring and recommendations
- Support for additional file formats
- Multi-language support

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for intelligent text extraction
- LangChain for LLM integration framework
- FastAPI for high-performance backend framework
- React and Tailwind CSS for modern frontend development

## Contact

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Note**: This is a personal project designed for educational and portfolio purposes. Ensure compliance with data privacy regulations when processing personal information from CVs.
