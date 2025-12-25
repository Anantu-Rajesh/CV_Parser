from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from schema import EmployeeData
from utils import calc_years_of_experience, rank_skill, recount_skill_mentions, derive_domain_from_skills
from file_parsing.pdf_parse import extract_from_pdf
from file_parsing.doc_parse import extract_from_doc
import asyncio
import config

async def cv_processing(file_content:bytes,file_ext:str)->dict:
    
    print(f"Extracting data from {file_ext} file")
    loop =asyncio.get_event_loop()
    if file_ext=='.pdf':
        cv_text=await loop.run_in_executor(None,extract_from_pdf,file_content)
    elif file_ext in ['.docx','.doc']:
        cv_text=await loop.run_in_executor(None,extract_from_doc,file_content)
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX are supported.")
    
    print(f"Extracted {len(cv_text)} characters from CV")
    print(f"\n=== FULL CV TEXT ===")
    print(cv_text)
    print("=" * 50)
    
    print("Initializing model")   
    # FIXED: Changed model_name to model (new langchain-google-genai version)
    llm=ChatGoogleGenerativeAI(
        model=config.GOOGLE_MODEL,  # Changed from model_name to model
        google_api_key=config.GOOGLE_API_KEY,
        temperature=config.GENAI_TEMPERATURE,
        max_output_tokens=config.GENAI_MAX_OUTPUT_TOKENS
    )
    
    print(f"Setting up parser for EmployeeData schema")
    parser=PydanticOutputParser(pydantic_object=EmployeeData)
    
    print(f"Creating prompt template")
    prompt=PromptTemplate(
        template=config.CV_PROCESSING_PROMPT,
        input_variables=["cv_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )
    
    print(f"API call to process CV")
    chain =prompt | llm | parser
    raw_data=await chain.ainvoke({"cv_text":cv_text})
    
    print(f"API extraction completed")
    print(f"\n=== RAW EXTRACTED DATA ===")
    print(f"Skills extracted: {len(raw_data.allSkills)}")
    if raw_data.allSkills:
        print("All skills:")
        for skill in raw_data.allSkills:
            print(f"  - {skill.name} (mentions: {skill.mentions}, category: {skill.category})")
    else:
        print("  NO SKILLS EXTRACTED")
    
    print(f"\nWork Experience extracted: {len(raw_data.workExperience)}")
    if raw_data.workExperience:
        print("All work experience:")
        for exp in raw_data.workExperience:
            print(f"  - {exp.company} | {exp.position}")
            print(f"    Start: '{exp.startDate}' | End: '{exp.endDate}'")
    else:
        print("  NO WORK EXPERIENCE EXTRACTED")
    print("=" * 50)
    
    print(f"\nNow recounting skill mentions with accurate matching")
    
    # Recount skill mentions with accurate whole-word matching
    if raw_data.allSkills:
        print(f"Before recount: {[(s.name, s.mentions) for s in raw_data.allSkills[:5]]}")
        raw_data.allSkills = recount_skill_mentions(cv_text, raw_data.allSkills)
        print(f"After recount: {[(s.name, s.mentions) for s in raw_data.allSkills[:5]]}")
    
    print(f"Now deriving the experience and primary/secondary skills")
    
    experience_years=calc_years_of_experience(raw_data.workExperience)
    print(f"calculated experience is {experience_years}")
    
    if raw_data.workExperience:
        print(f"Work experience dates: {[(exp.company, exp.startDate, exp.endDate) for exp in raw_data.workExperience]}")
    
    # Use domain-based aggregation for primary/secondary skills
    print(f"\nCalculating domain-based primary/secondary skills...")
    primary_skill, secondary_skill = derive_domain_from_skills(raw_data.allSkills)
    print(f"Primary domain: {primary_skill}, Secondary domain: {secondary_skill}")    
    
    print("final Data Preparation")
    final_data=EmployeeData(
        # Personal info - from CV
        fullName=raw_data.fullName,
        dob=raw_data.dob,
        contact=raw_data.contact,
        email=raw_data.email,
        emergencyContact=raw_data.emergencyContact,
        
        # Employment info - from CV or null for user input
        employeeId=None,  # Not in CV - user fills
        designation=raw_data.designation,  # From CV
        officeLocation=None,  # Not in CV - user fills
        department=raw_data.department,  # From CV if mentioned, else empty
        
        # Skills - from CV + calculations
        allSkills=raw_data.allSkills,  # From CV with frequencies
        primarySkill=primary_skill,  # CALCULATED from ranking
        secondarySkill=secondary_skill,  # CALCULATED from ranking
        
        # Experience - from CV + calculations
        experienceYears=experience_years,  # CALCULATED from dates
        workExperience=raw_data.workExperience,  # From CV
        
        # Education - from CV
        education=raw_data.education
    )
    print("Processing complete!")
    print(f"Extracted: {len(final_data.allSkills)} skills, {len(final_data.workExperience)} jobs")
    
    return final_data.dict()