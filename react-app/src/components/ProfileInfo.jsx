/**
 * PROFILE INFO COMPONENT
 * ======================
 * Personal information section with enhanced styling
 */

import React from 'react'

const ProfileInfo = ({ form, onChange }) => {
  return (
    <section className='w-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 card-hover animate-fadeInUp'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2'>
            <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-md"></div>
            <span className="text-gray-900 dark:text-white">
              Personal Information
            </span>
        </h2>
        <div className='mb-4'>
            <div className='relative group'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <input 
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange} 
                    className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                    type="text" 
                    placeholder='Enter your Full Name' />
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-4'>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <input 
                        name="contact"
                        value={form.contact}
                        onChange={onChange} 
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="text" 
                        placeholder='Enter Contact Number' />
                </div>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input 
                        name="emergencyContact"
                        value={form.emergencyContact}
                        onChange={onChange} 
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="text" 
                        placeholder='Enter Emergency Contact Number' />
                </div>
            </div>
            <div className='space-y-4'>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input 
                        name="dob"
                        value={form.dob}
                        onChange={onChange} 
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="date" 
                        placeholder='Enter Date of Birth' />
                </div>
                <div className='relative group'>
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-500'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input 
                        name="email"
                        value={form.email}
                        onChange={onChange} 
                        className='border-2 border-gray-300 dark:border-gray-600 w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all duration-300 shadow-sm hover:shadow-md' 
                        type="email" 
                        placeholder='Enter Email Address' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProfileInfo
