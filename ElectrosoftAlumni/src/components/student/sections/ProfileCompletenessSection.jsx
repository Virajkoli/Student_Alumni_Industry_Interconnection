import React, { useMemo } from "react"
import { Check, ChevronRight, User, MapPin, Briefcase, Phone, FileText, Camera, ChevronLeft } from "lucide-react"

const ProfileCompletenessSection = ({ profileData, editData, isOwner, onEditClick, onImageEditClick }) => {
  // Calculate profile completeness
  const profileCompleteness = useMemo(() => {
    const sections = [
      {
        id: "basic_info",
        name: "Basic Information",
        icon: User,
        description: "Complete your name and headline",
        completed: !!(
          (editData?.firstName ||
            profileData?.firstName ||
            editData?.basicInfo?.first_name ||
            profileData?.basicInfo?.first_name) &&
          (editData?.lastName ||
            profileData?.lastName ||
            editData?.basicInfo?.last_name ||
            profileData?.basicInfo?.last_name) &&
          (editData?.headline || profileData?.headline || editData?.interestedField || profileData?.interestedField)
        ),
      },
      {
        id: "location",
        name: "Location",
        icon: MapPin,
        description: "Add your current location",
        completed: !!(editData?.location || editData?.city || profileData?.location || profileData?.city),
      },
      {
        id: "education",
        name: "Education",
        icon: Briefcase,
        description: "Share your educational background",
        completed: !!(
          editData?.collegeName ||
          profileData?.collegeName ||
          editData?.basicInfo?.collegeName ||
          profileData?.basicInfo?.collegeName
        ),
      },
      {
        id: "contact",
        name: "Contact Info",
        icon: Phone,
        description: "Add your contact information",
        completed: !!(editData?.contact_no || profileData?.contact_no),
      },
      {
        id: "about",
        name: "About Section",
        icon: FileText,
        description: "Tell others about yourself",
        completed: !!(editData?.about || profileData?.about),
      },
      {
        id: "profile_picture",
        name: "Profile Picture",
        icon: Camera,
        description: "Upload your profile photo",
        completed: !!(profileData?.profilePicture || profileData?.profilePicUrl),
      },
    ]

    const completedCount = sections.filter((section) => section.completed).length
    const totalCount = sections.length
    const percentage = Math.round((completedCount / totalCount) * 100)

    return {
      sections,
      completedCount,
      totalCount,
      percentage,
      incompleteSection: sections.filter((section) => !section.completed),
    }
  }, [profileData, editData])

  const [currentIncompleteIndex, setCurrentIncompleteIndex] = React.useState(0)

  if (!isOwner || profileCompleteness.percentage === 100) {
    return null
  }

  const handlePrevious = () => {
    setCurrentIncompleteIndex((prev) => (prev === 0 ? profileCompleteness.incompleteSection.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIncompleteIndex((prev) => (prev === profileCompleteness.incompleteSection.length - 1 ? 0 : prev + 1))
  }

  const handleActionClick = (sectionId) => {
    if (sectionId === "profile_picture") {
      onImageEditClick()
    } else {
      onEditClick()
    }
  }

  const currentSection = profileCompleteness.incompleteSection[currentIncompleteIndex]

  return (
    <div className="mx-8 mb-6 p-4 rounded-xl border" style={{ backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Complete Your Profile</h3>
          <p className="text-sm text-gray-600">
            Completed profiles get 80% more visibility.
            <span className="text-blue-600 font-medium ml-1">Learn more</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center relative"
            style={{ borderColor: "#E2E8F0" }}
          >
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                background: `conic-gradient(#6EA9CB ${profileCompleteness.percentage * 3.6}deg, transparent 0deg)`,
                borderRadius: "50%",
              }}
            ></div>
            <span className="text-sm font-bold text-gray-700 z-10">{profileCompleteness.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {profileCompleteness.totalCount - profileCompleteness.completedCount} remaining to complete
          </span>
          {profileCompleteness.incompleteSection.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                style={{ color: "#6B7280" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500">
                {currentIncompleteIndex + 1} of {profileCompleteness.incompleteSection.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                style={{ color: "#6B7280" }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${profileCompleteness.percentage}%`,
              backgroundColor: "#6EA9CB",
            }}
          ></div>
        </div>
      </div>

      {/* Current Incomplete Section */}
      {currentSection && (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#EBF4F8" }}
          >
            <currentSection.icon className="w-5 h-5" style={{ color: "#6EA9CB" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm">{currentSection.name}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{currentSection.description}</p>
          </div>
          <button
            onClick={() => handleActionClick(currentSection.id)}
            className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90 flex items-center gap-1.5"
            style={{ backgroundColor: "#6EA9CB" }}
          >
            Add
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Completed Sections Indicator */}
      {profileCompleteness.completedCount > 0 && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">
            {profileCompleteness.completedCount} section{profileCompleteness.completedCount !== 1 ? "s" : ""} completed
          </span>
        </div>
      )}
    </div>
  )
}

export default ProfileCompletenessSection
