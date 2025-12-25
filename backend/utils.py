from datetime import datetime
import re
from typing import List, Tuple
from schema import WorkExperience, Skill  # FIXED: Changed workExperience to WorkExperience

def calc_years_of_experience(work_experience_list: List[WorkExperience]) -> float:  # FIXED: Changed to WorkExperience
    if not work_experience_list:
        print("No work experience provided")
        return 0.0
    
    total_days = 0
    
    for exp in work_experience_list:
        try:
            print(f"Processing {exp.company}: startDate='{exp.startDate}', endDate='{exp.endDate}'")
            start_date = parse_date(exp.startDate)
            print(f"  Parsed start_date: {start_date}")
            
            if exp.endDate.lower() in ['present', 'ongoing', 'current', 'now']:
                end_date = datetime.now()
                print(f"  Using current date as end_date: {end_date}")
            else:
                end_date = parse_date(exp.endDate)
                print(f"  Parsed end_date: {end_date}")
                
            duration = (end_date - start_date).days
            print(f"  Duration: {duration} days")
            
            if duration > 0:
                total_days += duration
                
        except Exception as e:
            print(f"ERROR parsing dates for {exp.company}: {str(e)}")
            print(f"  startDate: '{exp.startDate}', endDate: '{exp.endDate}'")
            continue
    
    total_years = round(total_days / 365.25, 1)
    print(f"Total days: {total_days}, Total years: {total_years}")
    return total_years

def parse_date(date_str: str) -> datetime:
    date_str = date_str.strip()
    
    # Try YYYY-MM-DD
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        pass
    
    # Try YYYY-MM
    try:
        return datetime.strptime(date_str, "%Y-%m")
    except ValueError:
        pass
    
    # Try YYYY
    try:
        return datetime.strptime(date_str, "%Y")
    except ValueError:
        pass
    
    # Try "Mon YYYY" or "Month YYYY" format (e.g., "Sep 2024", "September 2024")
    month_mapping = {
        'jan': '01', 'january': '01',
        'feb': '02', 'february': '02',
        'mar': '03', 'march': '03',
        'apr': '04', 'april': '04',
        'may': '05',
        'jun': '06', 'june': '06',
        'jul': '07', 'july': '07',
        'aug': '08', 'august': '08',
        'sep': '09', 'september': '09',
        'oct': '10', 'october': '10',
        'nov': '11', 'november': '11',
        'dec': '12', 'december': '12'
    }
    
    # Try to parse "Sep 2024" or "September 2024" format
    parts = date_str.split()
    if len(parts) == 2:
        month_str, year_str = parts
        month_str_lower = month_str.lower().strip(',')
        if month_str_lower in month_mapping:
            try:
                return datetime.strptime(f"{year_str}-{month_mapping[month_str_lower]}-01", "%Y-%m-%d")
            except ValueError:
                pass
    
    raise ValueError(f"Cannot parse date: {date_str}")

def rank_skill(all_skills_list: list[Skill]) -> Tuple[str, str]:
    if not all_skills_list:
        print("No skills to rank")
        return ("", "")

    print(f"Ranking {len(all_skills_list)} skills")
    skill_sorted = sorted(all_skills_list, key=lambda s: (-s.mentions, s.name.lower()))
    print(f"Top 5 skills after sorting: {[(s.name, s.mentions) for s in skill_sorted[:5]]}")
    
    primary_skill = skill_sorted[0].name if skill_sorted else ""
    secondary_skill = skill_sorted[1].name if len(skill_sorted) > 1 else ""
    
    print(f"Primary: '{primary_skill}', Secondary: '{secondary_skill}'")
    return (primary_skill, secondary_skill)

def recount_skill_mentions(cv_text: str, skills: List[Skill]) -> List[Skill]:
    """
    Recount skill mentions with whole-word matching to avoid false positives.
    
    Args:
        cv_text: Full CV text
        skills: List of skills from LLM
        
    Returns:
        Skills with accurate mention counts
    """
    recounted_skills = []
    
    for skill in skills:
        # Create regex pattern for whole-word matching
        # Handle special regex characters
        skill_name = re.escape(skill.name)
        
        # For single letters like "C", be very strict
        if len(skill.name) == 1:
            # Only match if it's standalone with word boundaries and followed by space/punctuation
            # Excludes "C" in words like "Created", "scalable", etc.
            pattern = r'(?:^|\s)' + skill_name + r'(?=\s|\.|,|;|$)(?!\+)'  # "C" but not "C++"
        elif skill.name in ['C++', 'C#']:
            # Special handling for C++, C#
            pattern = r'\b' + skill_name
        else:
            # Normal whole-word matching
            pattern = r'\b' + skill_name + r'\b'
        
        # Count case-insensitive matches
        matches = re.findall(pattern, cv_text, re.IGNORECASE)
        accurate_count = len(matches)
        
        # Update skill with accurate count
        skill.mentions = max(1, accurate_count)  # Minimum 1 if skill exists
        recounted_skills.append(skill)
    
    return recounted_skills

def derive_domain_from_skills(skills: List[Skill]) -> Tuple[str, str]:
    """
    Group skills by domain and derive meaningful primary/secondary domains.
    Maps individual technologies to broader domains for better skill representation.
    """
    # Domain mappings - lowercase for matching
    SKILL_DOMAINS = {
        # Backend Development
        "node.js": "Backend Development", "express.js": "Backend Development", "django": "Backend Development",
        "flask": "Backend Development", "spring": "Backend Development", "fastapi": "Backend Development",
        "nest.js": "Backend Development", "restful apis": "Backend Development", "graphql": "Backend Development",
        
        # Frontend Development
        "react.js": "Frontend Development", "react": "Frontend Development", "vue.js": "Frontend Development",
        "angular": "Frontend Development", "html": "Frontend Development", "css": "Frontend Development",
        "javascript": "Frontend Development", "typescript": "Frontend Development", "next.js": "Frontend Development",
        "socket.io": "Frontend Development", "html 5": "Frontend Development", "html5": "Frontend Development",
        "tailwind css": "Frontend Development", "bootstrap": "Frontend Development", "sass": "Frontend Development",
        "scss": "Frontend Development", "webpack": "Frontend Development",
        
        # Mobile Development
        "react native": "Mobile Development", "flutter": "Mobile Development", "kotlin": "Mobile Development",
        "swift": "Mobile Development", "android": "Mobile Development", "ios": "Mobile Development",
        
        # Database Management
        "mongodb": "Database Management", "mysql": "Database Management", "postgresql": "Database Management",
        "sql": "Database Management", "redis": "Database Management", "dynamodb": "Database Management",
        "vector databases": "Database Management", "sqlite": "Database Management", "oracle": "Database Management",
        
        # DevOps & Cloud
        "docker": "DevOps & Cloud", "kubernetes": "DevOps & Cloud", "aws": "DevOps & Cloud",
        "azure": "DevOps & Cloud", "gcp": "DevOps & Cloud", "ci/cd": "DevOps & Cloud",
        "jenkins": "DevOps & Cloud", "terraform": "DevOps & Cloud",
        
        # Programming Languages
        "python": "Programming Languages", "java": "Programming Languages", "c++": "Programming Languages",
        "c#": "Programming Languages", "go": "Programming Languages", "rust": "Programming Languages",
        "c": "Programming Languages", "javascript": "Frontend Development", "typescript": "Frontend Development",
        
        # AI & Machine Learning
        "tensorflow": "AI & Machine Learning", "pytorch": "AI & Machine Learning", "keras": "AI & Machine Learning",
        "scikit-learn": "AI & Machine Learning", "langchain": "AI & Machine Learning",
        "generative ai": "AI & Machine Learning", "gemini api": "AI & Machine Learning",
        "supervised learning": "AI & Machine Learning", "unsupervised learning": "AI & Machine Learning",
        "artificial neural networks (ann)": "AI & Machine Learning", "convolutional neural networks (cnn)": "AI & Machine Learning",
        "model training": "AI & Machine Learning", "evaluation & optimization": "AI & Machine Learning",
        "nlp techniques": "AI & Machine Learning", "speech recognition apis": "AI & Machine Learning",
        "mediapipe": "AI & Machine Learning", "opencv": "AI & Machine Learning",
        "neural networks": "AI & Machine Learning", "deep learning": "AI & Machine Learning",
        "machine learning": "AI & Machine Learning", "computer vision": "AI & Machine Learning",
        "xgboost": "AI & Machine Learning", "lightgbm": "AI & Machine Learning", "catboost": "AI & Machine Learning",
        
        # Data Science & Analytics
        "pandas": "Data Science", "numpy": "Data Science", "matplotlib": "Data Science",
        "beautiful soup": "Data Science", "youtube data api": "Data Science",
        "streamlit": "Data Science", "seaborn": "Data Science", "plotly": "Data Science",
        "data analysis": "Data Science", "data visualization": "Data Science",
        
        # Tools & Version Control
        "git": "Development Tools", "postman": "Development Tools", "multer": "Development Tools",
        "jupyter notebook": "Development Tools", "google colab": "Development Tools", 
        "github": "Development Tools", "gitlab": "Development Tools", "vscode": "Development Tools",
        "visual studio code": "Development Tools", "pycharm": "Development Tools",
        
        # Security & Authentication
        "jwt-based authentication": "Security & Authentication", "oauth": "Security & Authentication",
        
        # Blockchain
        "web3": "Blockchain", "blockchain technology": "Blockchain",
    }
    
    if not skills:
        return ("", "")
    
    # Count mentions by domain
    domain_counts = {}
    for skill in skills:
        skill_lower = skill.name.lower()
        domain = SKILL_DOMAINS.get(skill_lower, "Other Technologies")
        
        if domain not in domain_counts:
            domain_counts[domain] = 0
        domain_counts[domain] += skill.mentions
    
    # Sort domains by total mentions
    sorted_domains = sorted(domain_counts.items(), key=lambda x: -x[1])
    
    print(f"\nDomain aggregation:")
    for domain, count in sorted_domains[:5]:
        print(f"  {domain}: {count} mentions")
    
    primary_domain = sorted_domains[0][0] if sorted_domains else ""
    secondary_domain = sorted_domains[1][0] if len(sorted_domains) > 1 else ""
    
    return (primary_domain, secondary_domain)
