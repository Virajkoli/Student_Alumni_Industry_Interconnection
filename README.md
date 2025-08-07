# Student Alumni Industry Interconnection (SCAIPS)
Link : https://scaipsfrontend.vercel.app/
<div align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Status-Active-green.svg" alt="Status">
  <img src="https://img.shields.io/badge/License-ISC-yellow.svg" alt="License">
</div>

## 🌟 Overview

**SCAIPS** (Student College Alumni Industry Professional Startup) is a comprehensive platform designed to bridge the gap between students, alumni, educational institutions, industry professionals, and startups. The platform facilitates meaningful connections, knowledge sharing, and professional networking across the entire educational and professional ecosystem.

## 🎯 Key Features

### 👨‍🎓 Student Profiles

- **Personal Information**: Comprehensive profile management with academic details
- **Education Tracking**: Course history, certifications, and academic achievements
- **Project Showcase**: Display personal and academic projects with tech stacks
- **Skill Management**: Tag and categorize technical and soft skills
- **Experience Timeline**: Internships, part-time jobs, and work experience
- **Social Feed**: Share updates, achievements, and connect with peers

### 🏫 College Profiles

- **Institution Overview**: Detailed college information and statistics
- **Campus Management**: Multiple campus locations with detailed information
- **Academic Programs**: Course offerings, departments, and specializations
- **Admissions Information**: Requirements, fees, and application processes
- **Faculty & Infrastructure**: Staff details and facility information
- **Student Analytics**: Enrollment statistics and demographics

### 🏭 Industry Profiles

- **Company Overview**: Mission, vision, and company culture
- **Multiple Locations**: Global office presence with interactive maps
- **Market Presence**: Regional market share and growth analytics
- **Employee Information**: Team size and organizational structure
- **Verification System**: Authenticated industry data and credentials

### 🚀 Startup Ecosystem

- **Startup Profiles**: Company stage, funding status, and team information
- **Innovation Tracking**: Product development and market presence
- **Investor Connections**: Funding history and growth metrics

### 🌐 Social Features

- **Interactive Feed**: Post updates, share achievements, and engage with content
- **Media Support**: Image and video content sharing with optimized rendering
- **Networking Tools**: Connect across different user types
- **Real-time Interactions**: Comments, reactions, and content sharing

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS with custom component library
- **Icons**: Lucide React, React Icons
- **Maps**: Leaflet with React-Leaflet integration
- **State Management**: React Hooks and Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Authentication**: JWT with Google OAuth integration

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt encryption
- **File Upload**: Cloudinary integration for media management
- **API Architecture**: RESTful APIs with middleware validation
- **Security**: CORS, rate limiting, and input sanitization

### DevOps & Tools

- **Package Manager**: npm
- **Development**: Nodemon for hot reload
- **Database Migration**: Prisma migrations
- **Version Control**: Git with GitHub integration
- **Environment**: Docker-ready configuration

## 📦 Project Structure

```
Student_Alumni_Industry_Interconnection/
├── Backend/                      # Express.js API Server
│   ├── config/                  # Database and service configurations
│   ├── controllers/             # Request handlers and business logic
│   ├── middleware/              # Authentication and validation
│   ├── prisma/                  # Database schema and migrations
│   ├── routes/                  # API route definitions
│   ├── services/                # Business logic services
│   ├── scripts/                 # Utility and setup scripts
│   └── uploads/                 # File upload directory
├── ElectrosoftAlumni/           # React Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── services/            # API service layer
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Helper functions
│   │   └── assets/              # Static resources
│   ├── public/                  # Public assets and images
│   └── docs/                    # Documentation files
├── docs/                        # Project documentation
├── scripts/                     # Database and deployment scripts
└── tests/                       # Testing files
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Virajkoli/Student_Alumni_Industry_Interconnection.git
cd Student_Alumni_Industry_Interconnection
```

2. **Setup Backend**

```bash
cd Backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys
```

3. **Database Setup**

```bash
# Create database tables
npx prisma db execute --file=create_industry_tables.sql

# Generate Prisma client
npx prisma generate

# Run migrations (optional)
npx prisma migrate deploy
```

4. **Setup Frontend**

```bash
cd ../ElectrosoftAlumni
npm install

# Create environment file
cp .env.example .env
# Configure API endpoints and keys
```

### Running the Application

1. **Start Backend Server**

```bash
cd Backend
npm run dev
# Server runs on http://localhost:5000
```

2. **Start Frontend Development Server**

```bash
cd ElectrosoftAlumni
npm run dev
# Application runs on http://localhost:5173
```

3. **Access the Application**

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- API Health Check: `http://localhost:5000/health`

## 🗄️ Database Schema

### Core Tables

- **students**: Student profile information and academic details
- **colleges**: Educational institution profiles and metadata
- **industries**: Company profiles with business information
- **startups**: Startup ecosystem profiles and funding data
- **users**: Unified authentication and user management

### Industry Enhancement Tables

- **industry_overview**: Detailed company information and verification
- **industry_locations**: Multi-location office presence with coordinates
- **industry_market_data**: Regional market analysis and presence

### Social & Interaction Tables

- **posts**: User-generated content and social media posts
- **post_comments**: Comment system with threading support
- **post_reactions**: Like, share, and reaction tracking
- **post_media**: Media attachments with Cloudinary integration

## 🔧 API Documentation

### Authentication Endpoints

```
POST /api/auth/register     # User registration
POST /api/auth/login        # User authentication
POST /api/auth/logout       # Session termination
GET  /api/auth/me          # Current user information
```

### Profile Management

```
GET  /api/students/profile  # Student profile data
PUT  /api/students/profile  # Update student information
GET  /api/colleges/profile  # College institutional data
PUT  /api/industries/overview # Industry profile updates
```

### Social Features

```
GET  /api/posts            # Fetch social media posts
POST /api/posts            # Create new post
POST /api/posts/:id/react  # React to post content
GET  /api/posts/:id/comments # Fetch post comments
```

## 🎨 UI Components

### Reusable Components

- **ProfileCard**: User profile display with customizable fields
- **MediaViewer**: Optimized image and video content rendering
- **InteractiveMap**: Location display with Leaflet integration
- **EditableSection**: In-place editing with form validation
- **SocialFeed**: Infinite scroll social media feed
- **ModalSystem**: Consistent modal dialogs and overlays

### Industry-Specific Features

- **IndustryOverview**: Comprehensive company profile management
- **LocationManager**: Multi-location office management system
- **MarketDataVisualization**: Regional presence and analytics

## 🔐 Security Features

- **JWT Authentication**: Secure token-based user sessions
- **Role-Based Access**: Different permissions for user types
- **Input Validation**: Server-side validation and sanitization
- **CORS Protection**: Cross-origin request security
- **File Upload Security**: Cloudinary integration with validation
- **Password Encryption**: Bcrypt hashing for user passwords

## 🚀 Deployment

### Environment Variables

**Backend (.env)**

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GOOGLE_CLIENT_ID=your-google-client-id
PORT=5000
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Production Deployment

```bash
# Backend
cd Backend
npm start

# Frontend
cd ElectrosoftAlumni
npm run build
npm run preview
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd ElectrosoftAlumni
npm run test
```

### Test Coverage

- Unit tests for API endpoints
- Integration tests for database operations
- Component testing for React components
- End-to-end user flow testing

## 📋 Available Scripts

### Backend Scripts

```bash
npm run dev          # Development server with hot reload
npm run start        # Production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

### Frontend Scripts

```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # ESLint code checking
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes
- Ensure all tests pass before submission

## 🐛 Known Issues & Limitations

- Video rendering optimization in social feed
- Map performance with large datasets
- Mobile responsiveness in complex forms
- Bulk data import functionality pending

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team & Contributors

- **Development Team**: Electrosoft Internship Program
- **Project Lead**: Gajanan Chaudhari Sir
- **Repository**: [Virajkoli](https://github.com/Virajkoli)


## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Industry profile enhancements and API improvements
- **v1.2.0**: Social media features and video support
- **Future**: Mobile app development, advanced analytics

---

<div align="center">
  <p>Made with ❤️ for connecting students, alumni, and industry professionals</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
