from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from cv_process import cv_processing
import os

app=FastAPI(
    title="CV Parser API",
    description="API to process CVs/Resumes and extract structured data using Google Gemini model",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#API endpoint(s)
@app.get("/")
async def root():
    """Root endpoint to check API status"""
    return {"message":"CV Parser API is running",
              "version":"1.0.0",
              "health": "/health"
            }
    
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status":"healthy"}

@app.post("/api/process-cv")
async def process_cv(file:UploadFile=File(...)):
    """
    Main endpoint to upload and parse CV files.
    
    Returns:
        JSON with complete employee data including allSkills array
    """
    if not file.filename:
        raise HTTPException(status_code=400,detail="No file uploaded")
    file_ext=os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in ['.pdf','.docx','.doc']:
        raise HTTPException(status_code=400,detail="Unsupported file format. Only PDF and DOCX are supported.")
    
    file_content=await file.read()
    file_size=len(file_content)/(1024*1024) #size in MB
    
    if file_size>10:
        raise HTTPException(status_code=400,detail="File size exceeds 10MB limit.")
    
    # Process CV
    try:
        print(f"NEW REQUEST: {file.filename} ({file_size:.2f}MB)")
        result=await cv_processing(file_content,file_ext)
        print(f"SUCCESS: Processed {file.filename}")
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"ERROR: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process CV: {str(e)}"
        )
        
# Running the app: uvicorn app:app --host 0.0.0.0 --port 8000 --reload
if __name__=="__main__":
    import uvicorn
    # FIXED: Use string import for reload to work properly
    uvicorn.run(
        "app:app",  # Changed from app to "app:app" string
        host="0.0.0.0",
        port=8000,
        reload=True
    )