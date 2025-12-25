from __future__ import annotations  # FIXED: Enable forward references
from pydantic import BaseModel, Field
from typing import List, Optional

class Skill(BaseModel):
    name: str = Field(description="Skill name (e.g., Python)")
    mentions: int = Field(default=1, description="Number of times mentioned in CV")
    category: Optional[str] = Field(default="technical", description="Skill category: technical, soft, finance, design, domain, or other")
    proficiency: Optional[str] = Field(default=None, description="Proficiency level: Beginner, Intermediate, Advanced, Expert")

class WorkExperience(BaseModel):  # FIXED: Changed from workExperience to WorkExperience (PascalCase)
    company: str = Field(description="Company/Organization name")
    position: str = Field(description="Job title/position")
    startDate: str = Field(description="Start date in YYYY-MM-DD format")
    endDate: str = Field(description="End date in YYYY-MM-DD format or 'Present'")
    duration: str = Field(description="Human readable duration (e.g., '2 years 3 months')")
    description: Optional[str] = Field(default="", description="Job responsibilities and achievements")
    
class EmployeeData(BaseModel):
    
        # Personal Information
    fullName: str = Field(description="Full name of the person")
    dob: Optional[str] = Field(default="", description="Date of birth in YYYY-MM-DD format")
    contact: str = Field(default="", description="Primary phone number with country code")
    email: str = Field(default="", description="Primary email address")
    emergencyContact: Optional[str] = Field(default="", description="Emergency contact number")
    
    # Employment Information (some fields won't be in CV)
    employeeId: Optional[str] = Field(default=None, description="Employee ID - not in CV, filled by HR")
    designation: Optional[str] = Field(default="", description="Current job title/designation")
    officeLocation: Optional[str] = Field(default=None, description="Office location - not in CV")
    department: Optional[str] = Field(default="", description="Department name - not in CV")
    
    # Skills Information
    allSkills: List[Skill] = Field(default_factory=list, description="Complete list of all skills found")
    primarySkill: str = Field(default="", description="Top/most mentioned skill")
    secondarySkill: str = Field(default="", description="Second most mentioned skill")
    
    # Experience Information
    experienceYears: float = Field(default=0.0, description="Total years of experience (calculated)")
    workExperience: List[WorkExperience] = Field(default_factory=list, description="Work history with dates")  # FIXED: Changed to WorkExperience
    
    # Education
    education: Optional[str] = Field(default="", description="Educational qualifications")