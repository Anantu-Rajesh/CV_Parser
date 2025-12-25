/**
 * WORK INFO COMPONENT
 * ====================
 * Work information section with enhanced styling
 */

import React from 'react'

const WorkInfo = ({ form, onChange }) => {
  return (
    <section className='w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 card-hover animate-fadeInUp' style={{ animationDelay: '0.1s' }}>
      <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2'>
        <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full shadow-md"></div>
        <span className="text-gray-900 dark:text-white">
          Work Information
        </span>
      </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-4'>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                    </div>
                    <input 
                        name="employeeId"
                        value={form.employeeId}
                        onChange={onChange}
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="text" 
                        placeholder='Enter Employee ID' />
                </div>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <input 
                        name="departmentName"
                        value={form.departmentName}
                        onChange={onChange}
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="text" 
                        placeholder='Enter Department name' />
                </div>
            </div>
            <div className='space-y-4'>
              <div className='relative group'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                  </div>
                  <input 
                      name="designation"
                      value={form.designation}
                      onChange={onChange}
                      className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                      type="text" 
                      placeholder='Enter Designation' />
              </div>
              <div className='relative group'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                  </div>
                  <input 
                      name="officeLocation"
                      value={form.officeLocation}
                      onChange={onChange}
                      className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                      type="text" 
                      placeholder='Enter Office Location' />
              </div>
            </div>
        </div>
    </section>
  )
}

export default WorkInfo
