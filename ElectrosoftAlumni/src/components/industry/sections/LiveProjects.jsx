import React, { useState } from "react";
import {
  Edit3,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Upload,
  FileText,
  Mail,
  Phone,
  User,
  Download,
  Eye,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LiveProjects = () => {
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: "AI-Powered Customer Service Chatbot",
      company: "RetailTech Solutions",
      description:
        "Develop an intelligent chatbot that can handle customer inquiries, process orders, and provide personalized recommendations using natural language processing.",
      budget: "₹3-5 Lakhs",
      duration: "3 months",
      deadline: "2024-04-15",
      skillsRequired: ["Python", "NLP", "Machine Learning", "API Integration"],
      status: "Open",
      applicants: 24,
      requiredCandidates: 30,
      type: "Development",
      priority: "High",
      postedDate: "2024-01-10",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Minimum 2 years of experience in Python development",
        "Experience with NLP libraries (NLTK, spaCy, or similar)",
        "Knowledge of machine learning frameworks (TensorFlow, PyTorch)",
        "Experience with REST API development and integration",
        "Understanding of cloud platforms (AWS, Azure, or GCP)",
      ],
      deliverables: [
        "Fully functional chatbot with NLP capabilities",
        "Integration with existing customer service systems",
        "Comprehensive documentation and user manual",
        "Training data and model optimization",
        "Testing and quality assurance reports",
        "Deployment guide and maintenance documentation",
      ],
      additionalInfo:
        "This project is part of our digital transformation initiative. The successful candidate will work closely with our customer service team and will have opportunities for skill development in advanced AI technologies. Remote work is acceptable with weekly check-ins.",
    },
    {
      id: 2,
      title: "Supply Chain Optimization System",
      company: "LogisticsPro India",
      description:
        "Create a comprehensive system to optimize supply chain operations, reduce costs, and improve delivery efficiency using data analytics and predictive modeling.",
      budget: "₹8-12 Lakhs",
      duration: "6 months",
      deadline: "2024-06-30",
      skillsRequired: [
        "Data Analytics",
        "Python",
        "SQL",
        "Business Intelligence",
      ],
      status: "In Progress",
      applicants: 18,
      requiredCandidates: 25,
      type: "Analytics",
      priority: "Medium",
      postedDate: "2024-01-05",
    },
    {
      id: 3,
      title: "IoT-Based Smart Factory Solution",
      company: "Manufacturing Plus",
      description:
        "Design and implement an IoT-based monitoring system for factory equipment to predict maintenance needs and optimize production efficiency.",
      budget: "₹15-20 Lakhs",
      duration: "8 months",
      deadline: "2024-08-31",
      skillsRequired: [
        "IoT",
        "Embedded Systems",
        "Cloud Computing",
        "Data Analytics",
      ],
      status: "Open",
      applicants: 31,
      requiredCandidates: 40,
      type: "Hardware",
      priority: "High",
      postedDate: "2024-01-12",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    duration: "",
    deadline: "",
    skillsRequired: "",
    type: "",
    priority: "",
    requiredCandidates: "",
  });

  const [newProjectData, setNewProjectData] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    duration: "",
    deadline: "",
    skillsRequired: "",
    type: "",
    priority: "",
    requiredCandidates: "",
  });

  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
    availability: "",
  });

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditData({
      title: project.title,
      company: project.company,
      description: project.description,
      budget: project.budget,
      duration: project.duration,
      deadline: project.deadline,
      skillsRequired: project.skillsRequired.join(", "),
      type: project.type,
      priority: project.priority,
      requiredCandidates: project.requiredCandidates.toString(),
    });
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
      requiredCandidates: "",
    });
  };

  const handleSave = () => {
    setProjectsData(
      projectsData.map((project) =>
        project.id === editingId
          ? {
              ...project,
              title: editData.title,
              company: editData.company,
              description: editData.description,
              budget: editData.budget,
              duration: editData.duration,
              deadline: editData.deadline,
              skillsRequired: editData.skillsRequired
                .split(",")
                .map((skill) => skill.trim()),
              type: editData.type,
              priority: editData.priority,
              requiredCandidates: parseInt(editData.requiredCandidates) || 0,
            }
          : project
      )
    );
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
      requiredCandidates: "",
    });
  };

  // New project handlers
  const handleNewProject = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleNewProjectCancel = () => {
    setIsNewProjectModalOpen(false);
    setNewProjectData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
      requiredCandidates: "",
    });
  };

  const handleNewProjectSubmit = () => {
    // Generate new project ID
    const newId = Math.max(...projectsData.map((p) => p.id)) + 1;

    // Create new project object
    const newProject = {
      id: newId,
      title: newProjectData.title,
      company: newProjectData.company,
      description: newProjectData.description,
      budget: newProjectData.budget,
      duration: newProjectData.duration,
      deadline: newProjectData.deadline,
      skillsRequired: newProjectData.skillsRequired
        .split(",")
        .map((skill) => skill.trim()),
      status: "Open",
      applicants: 0,
      requiredCandidates: parseInt(newProjectData.requiredCandidates) || 0,
      type: newProjectData.type,
      priority: newProjectData.priority,
      postedDate: new Date().toISOString().split("T")[0],
    };

    // Add to projects list
    setProjectsData([...projectsData, newProject]);

    // Close modal and reset form
    handleNewProjectCancel();

    // Show success message
    alert("Project posted successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Application handlers
  const handleApplyNow = (project) => {
    setSelectedProject(project);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationCancel = () => {
    setIsApplicationModalOpen(false);
    setSelectedProject(null);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      skills: "",
      portfolio: "",
      coverLetter: "",
      resume: null,
      availability: "",
    });
  };

  const handleApplicationSubmit = () => {
    // Update the project's applicants count
    setProjectsData(
      projectsData.map((project) =>
        project.id === selectedProject.id
          ? { ...project, applicants: project.applicants + 1 }
          : project
      )
    );

    // Here you would typically send the application data to your backend
    console.log("Application submitted:", {
      projectId: selectedProject.id,
      applicationData,
    });

    // Close modal and reset form
    handleApplicationCancel();

    // Show success message (you could add a toast notification here)
    alert("Application submitted successfully!");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();

      if (!allowedTypes.includes(fileExtension)) {
        alert("Please upload a PDF, DOC, or DOCX file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
        return;
      }

      setApplicationData({ ...applicationData, resume: file });
    }
  };

  // View Details handlers
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const generatePDF = async () => {
    if (!selectedProject) return;

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      // Helper function to add text with word wrapping
      const addWrappedText = (text, x, y, maxWidth, fontSize = 12) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
          if (y + index * lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, x, y + index * lineHeight);
        });
        return y + lines.length * lineHeight + 5;
      };

      // Helper function to add section header
      const addSectionHeader = (title, y) => {
        if (y > pageHeight - margin - 20) {
          pdf.addPage();
          y = margin;
        }
        pdf.setFontSize(16);
        pdf.setFont(undefined, "bold");
        pdf.text(title, margin, y);
        pdf.setFont(undefined, "normal");
        return y + lineHeight + 3;
      };

      // Option to capture the modal content as an image using html2canvas
      const modalElement = document.querySelector(
        '[data-modal="project-details"]'
      );
      if (modalElement) {
        try {
          const canvas = await html2canvas(modalElement, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            width: modalElement.scrollWidth,
            height: modalElement.scrollHeight,
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Add the captured image to PDF
          if (imgHeight <= pageHeight - 2 * margin) {
            pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
            pdf.addPage();
            currentY = margin;
          } else {
            // If image is too tall, add it in parts or add a note
            pdf.addImage(
              imgData,
              "PNG",
              margin,
              margin,
              imgWidth,
              pageHeight - 2 * margin
            );
            pdf.addPage();
            currentY = margin;
          }
        } catch (error) {
          console.warn(
            "Could not capture modal image, using text-based PDF:",
            error
          );
          // Continue with text-based PDF if image capture fails
        }
      }

      // Title and company
      pdf.setFontSize(20);
      pdf.setFont(undefined, "bold");
      currentY = addWrappedText(
        selectedProject.title,
        margin,
        currentY,
        pageWidth - 2 * margin,
        20
      );

      pdf.setFontSize(14);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(100, 100, 100);
      currentY = addWrappedText(
        `by ${selectedProject.company}`,
        margin,
        currentY,
        pageWidth - 2 * margin,
        14
      );

      pdf.setTextColor(0, 0, 0);
      currentY += 10;

      // Project Overview
      currentY = addSectionHeader("Project Overview", currentY);
      currentY = addWrappedText(
        selectedProject.description,
        margin,
        currentY,
        pageWidth - 2 * margin
      );

      // Project Details
      currentY = addSectionHeader("Project Details", currentY);

      const details = [
        `Type: ${selectedProject.type}`,
        `Budget: ${selectedProject.budget}`,
        `Duration: ${selectedProject.duration}`,
        `Deadline: ${new Date(selectedProject.deadline).toLocaleDateString()}`,
        `Status: ${selectedProject.status}`,
        `Priority: ${selectedProject.priority}`,
        `Posted Date: ${new Date(
          selectedProject.postedDate
        ).toLocaleDateString()}`,
        `Required Candidates: ${selectedProject.requiredCandidates}`,
        `Current Applicants: ${selectedProject.applicants}`,
        `Remaining Positions: ${
          selectedProject.requiredCandidates - selectedProject.applicants
        }`,
      ];

      details.forEach((detail) => {
        currentY = addWrappedText(
          detail,
          margin,
          currentY,
          pageWidth - 2 * margin
        );
      });

      // Skills Required
      currentY = addSectionHeader("Skills Required", currentY);
      const skillsText = selectedProject.skillsRequired.join(", ");
      currentY = addWrappedText(
        skillsText,
        margin,
        currentY,
        pageWidth - 2 * margin
      );

      // Requirements (if available)
      if (
        selectedProject.requirements &&
        selectedProject.requirements.length > 0
      ) {
        currentY = addSectionHeader("Requirements", currentY);
        selectedProject.requirements.forEach((requirement, index) => {
          currentY = addWrappedText(
            `${index + 1}. ${requirement}`,
            margin,
            currentY,
            pageWidth - 2 * margin
          );
        });
      }

      // Deliverables (if available)
      if (
        selectedProject.deliverables &&
        selectedProject.deliverables.length > 0
      ) {
        currentY = addSectionHeader("Deliverables", currentY);
        selectedProject.deliverables.forEach((deliverable, index) => {
          currentY = addWrappedText(
            `${index + 1}. ${deliverable}`,
            margin,
            currentY,
            pageWidth - 2 * margin
          );
        });
      }

      // Additional Information (if available)
      if (selectedProject.additionalInfo) {
        currentY = addSectionHeader("Additional Information", currentY);
        currentY = addWrappedText(
          selectedProject.additionalInfo,
          margin,
          currentY,
          pageWidth - 2 * margin
        );
      }

      // Footer
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }

      currentY = pageHeight - margin - 15;
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        margin,
        currentY
      );
      pdf.text(
        `ElectroSoft Alumni Platform - Live Projects`,
        margin,
        currentY + 5
      );

      // Download the PDF
      pdf.save(
        `${selectedProject.title
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}_details.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Live Projects & Industrial Problems
          </h2>
          <p className="text-gray-600 mt-1">
            Collaborate on real-world projects and solve industry challenges
          </p>
        </div>
        <button
          onClick={handleNewProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post New Project
        </button>
      </div>

      <div className="space-y-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === project.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="text"
                        value={editData.budget}
                        onChange={(e) =>
                          setEditData({ ...editData, budget: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={editData.duration}
                        onChange={(e) =>
                          setEditData({ ...editData, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={editData.deadline}
                        onChange={(e) =>
                          setEditData({ ...editData, deadline: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Type
                      </label>
                      <select
                        value={editData.type}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Development">Development</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Research">Research</option>
                        <option value="Consulting">Consulting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={editData.priority}
                        onChange={(e) =>
                          setEditData({ ...editData, priority: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills Required (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.skillsRequired}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          skillsRequired: e.target.value,
                        })
                      }
                      placeholder="Python, Machine Learning, API Integration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Candidates
                    </label>
                    <input
                      type="number"
                      value={editData.requiredCandidates}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          requiredCandidates: e.target.value,
                        })
                      }
                      placeholder="30"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg text-blue-600 font-medium mb-3">
                      {project.company}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                          project.priority
                        )}`}
                      >
                        {project.priority} Priority
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {project.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{project.applicants} applicants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          {project.requiredCandidates - project.applicants}{" "}
                          positions left
                        </span>
                      </div>
                    </div>

                    {/* Positions Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Positions Filled</span>
                        <span>
                          {project.applicants}/{project.requiredCandidates}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (project.applicants /
                                project.requiredCandidates) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Required Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Posted on{" "}
                    {new Date(project.postedDate).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleApplyNow(project)}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        project.applicants >= project.requiredCandidates
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={
                        project.applicants >= project.requiredCandidates
                      }
                    >
                      {project.applicants >= project.requiredCandidates
                        ? "Positions Filled"
                        : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Project Details
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) =>
                    setEditData({ ...editData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={editData.budget}
                    onChange={(e) =>
                      setEditData({ ...editData, budget: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({ ...editData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) =>
                      setEditData({ ...editData, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select
                    value={editData.type}
                    onChange={(e) =>
                      setEditData({ ...editData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Research">Research</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={editData.priority}
                    onChange={(e) =>
                      setEditData({ ...editData, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Required (comma separated)
                </label>
                <input
                  type="text"
                  value={editData.skillsRequired}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      skillsRequired: e.target.value,
                    })
                  }
                  placeholder="Python, Machine Learning, API Integration"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Candidates
                </label>
                <input
                  type="number"
                  value={editData.requiredCandidates}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      requiredCandidates: e.target.value,
                    })
                  }
                  placeholder="30"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Apply for {selectedProject?.title}
                </h2>
                <button
                  onClick={handleApplicationCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Info Summary */}
              {selectedProject && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Project Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Company:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.company}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.budget}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Registered:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.applicants}/
                        {selectedProject.requiredCandidates} candidates
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">
                        Remaining Positions:
                      </span>
                      <span className="ml-2 font-medium text-green-600">
                        {selectedProject.requiredCandidates -
                          selectedProject.applicants}{" "}
                        positions available
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Application form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={applicationData.fullName}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (in years)
                </label>
                <input
                  type="number"
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  value={applicationData.skills}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      skills: e.target.value,
                    })
                  }
                  placeholder="e.g. Python, Data Analysis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={applicationData.portfolio}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      portfolio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {applicationData.resume ? (
                        <div className="text-center">
                          <div className="text-green-600 font-medium">
                            {applicationData.resume.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {(
                              applicationData.resume.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div>Click to upload your resume</div>
                          <div className="text-xs text-gray-400 mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </div>
                        </div>
                      )}
                    </span>
                  </label>
                  {applicationData.resume && (
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setApplicationData({
                            ...applicationData,
                            resume: null,
                          })
                        }
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <input
                  type="text"
                  value={applicationData.availability}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      availability: e.target.value,
                    })
                  }
                  placeholder="e.g. Immediately, 2 weeks notice"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleApplicationCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApplicationSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Post New Project
              </h3>
              <button
                onClick={handleNewProjectCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.title}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter project title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.company}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        company: e.target.value,
                      })
                    }
                    placeholder="Company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  value={newProjectData.description}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe the project requirements and objectives"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.budget}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        budget: e.target.value,
                      })
                    }
                    placeholder="e.g. ₹5-10 Lakhs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.duration}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g. 3 months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newProjectData.deadline}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        deadline: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills *
                </label>
                <input
                  type="text"
                  value={newProjectData.skillsRequired}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      skillsRequired: e.target.value,
                    })
                  }
                  placeholder="e.g. Python, Machine Learning, API Integration (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    value={newProjectData.type}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Research">Research</option>
                    <option value="Design">Design</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority *
                  </label>
                  <select
                    value={newProjectData.priority}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Candidates *
                  </label>
                  <input
                    type="number"
                    value={newProjectData.requiredCandidates}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        requiredCandidates: e.target.value,
                      })
                    }
                    placeholder="Number of candidates needed"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleNewProjectCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNewProjectSubmit}
                disabled={
                  !newProjectData.title ||
                  !newProjectData.company ||
                  !newProjectData.description ||
                  !newProjectData.budget ||
                  !newProjectData.duration ||
                  !newProjectData.deadline ||
                  !newProjectData.skillsRequired ||
                  !newProjectData.type ||
                  !newProjectData.priority ||
                  !newProjectData.requiredCandidates
                }
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Post Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isDetailsModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Details
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={generatePDF}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handleDetailsModalClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div id="project-details-content" className="p-6">
              {/* Project Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                      {selectedProject.company}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedProject.status
                        )}`}
                      >
                        {selectedProject.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                          selectedProject.priority
                        )}`}
                      >
                        {selectedProject.priority} Priority
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {selectedProject.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Budget
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Duration
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Deadline
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedProject.deadline).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Required Candidates
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.requiredCandidates}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Current Applicants
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.applicants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Posted Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(
                          selectedProject.postedDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Required */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Progress */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Application Progress
                </h3>
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (selectedProject.applicants /
                          selectedProject.requiredCandidates) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{selectedProject.applicants} applied</span>
                  <span>{selectedProject.requiredCandidates} needed</span>
                </div>
                {selectedProject.applicants >=
                  selectedProject.requiredCandidates && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      🎉 All positions have been filled for this project!
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Project ID:</p>
                    <p className="font-medium text-gray-900">
                      PRJ-{selectedProject.id.toString().padStart(4, "0")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Priority Level:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex space-x-3">
                {selectedProject.applicants <
                  selectedProject.requiredCandidates && (
                  <button
                    onClick={() => {
                      handleDetailsModalClose();
                      handleApplyNow(selectedProject);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                <button
                  onClick={handleDetailsModalClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Projects</p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Budget</p>
              <p className="text-2xl font-bold">₹2.5Cr</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Applications</p>
              <p className="text-2xl font-bold">234</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Urgent</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProjects;
