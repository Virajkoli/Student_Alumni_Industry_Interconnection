import React from 'react'
import CollegeProfileHeader from '../../components/college/CollegeProfileHeader'

const CollegProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <CollegeProfileHeader 
          name="IIT Kanpur" 
          location="Kanpur, Uttar Pradesh" 
          logo="/college-logo.png" 
          background="/college-bg.jpg" 
        />
      </div>
    </div>
  )
}

export default CollegProfilePage