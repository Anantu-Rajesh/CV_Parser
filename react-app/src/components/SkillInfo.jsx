/**
 * SKILL INFO COMPONENT - SIMPLIFIED
 * ==================================
 * Just skill fields, no CV upload (moved to EditProfile top)
 */

import React from 'react'

const SkillInfo = ({ form, onChange }) => {
  return (
    <section className='w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 card-hover animate-fadeInUp' style={{ animationDelay: '0.2s' }}>
      <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2'>
        <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full shadow-md"></div>
        <span className="text-gray-900 dark:text-white">
          Skill Information
        </span>
      </h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* LEFT COLUMN */}
        <div className='space-y-4'>
          {/* Primary Skill */}
          <div className='relative group'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <input 
              name="primarySkill"
              value={form.primarySkill}
              onChange={onChange} 
              className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
              type="text" 
              placeholder='Enter Primary Skill' />
          </div>

          {/* Experience Years */}
          <div className='relative group'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input 
              name="experienceYears"
              value={form.experienceYears}
              onChange={onChange}   
              className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
              type="number" 
              step="0.1"
              placeholder='Enter Years of Experience' />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className='space-y-4'>
          {/* Secondary Skill */}
          <div className='relative group'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <input 
              name="secondarySkill"
              value={form.secondarySkill}
              onChange={onChange} 
              className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
              type="text" 
              placeholder='Enter Secondary Skill' />
          </div>

          {/* Info message */}
          <div className='flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className='text-xs text-blue-700 dark:text-blue-300'>
              Upload CV at the top to auto-fill these fields, or enter manually
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillInfo