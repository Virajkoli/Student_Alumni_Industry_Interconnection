import React, { useState } from "react";
import { Edit, Plus, X, Award } from "lucide-react";

const CertificationsSection = ({ certifications = [], onCertificationsUpdate }) => {
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const certification = {
      id: Date.now(),
      ...newCertification
    };
    onCertificationsUpdate(prev => [...prev, certification]);
    setShowCertificationModal(false);
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
          <button
            onClick={() => setShowCertificationModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Add certification"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {certifications.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No certifications added yet</p>
              <button
                onClick={() => setShowCertificationModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first certification
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((certification, index) => (
                <div key={certification.id || index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{certification.name}</h3>
                    <p className="text-gray-600">{certification.issuer}</p>
                    <p className="text-sm text-gray-500">Issued: {certification.date}</p>
                    {certification.credentialId && (
                      <p className="text-sm text-gray-500">
                        Credential ID: {certification.credentialId}
                      </p>
                    )}
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Certification Modal */}
      {showCertificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Certification
                </h2>
                <button
                  onClick={() => setShowCertificationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCertification.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. AWS Certified Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={newCertification.issuer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={newCertification.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. March 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  name="credentialId"
                  value={newCertification.credentialId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. AWS123456"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCertificationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificationsSection;
