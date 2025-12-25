import PyPDF2
import logging  # FIXED: Changed from 'import logger' to 'import logging'
from io import BytesIO #this helps prevent saving to disk thus immune to local storage changes

# Create logger instance
logger = logging.getLogger(__name__)

def extract_from_pdf(file_content:bytes)->str:
    try:
        #creating a file-object from bytes
        pdf=BytesIO(file_content)
        
        #initialise reader
        reader=PyPDF2.PdfReader(pdf)
        
        #Text extraction
        text=[]
        for page_num,page in enumerate(reader.pages):
            page_text=page.extract_text()
            if not page_text:
                logger.warning(f"No text on page {page_num}")
            text.append(page_text)
        
        #combining all text
        full_text="\n\n".join(text) #double line break so the LLM can distinguish between sections better
        return full_text.strip() #removing leading/trailing whitespace
    
    except Exception as e:
        raise ValueError(f"Error parsing PDF: {str(e)}")  # FIXED: Changed str{e} to {str(e)}