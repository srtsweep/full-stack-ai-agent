# AI Ticket Assistant - Full Stack Application

A full-stack application for managing support tickets with AI-powered assistance. Features real-time ticket creation, user authentication, and automated email notifications using Inngest.

## 📁 Project Structure

```
full-stack-ai-agent/
├── ai-ticket-assistant/     # Backend (Express + Node.js)
└── ai-ticket-frontend/      # Frontend (React + Vite)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd ai-ticket-assistant

# Install dependencies
npm install

# Create .env file
cp .env.sample .env

# Add your environment variables to .env
# - MONGODB_URI
# - JWT_SECRET
# - OPENAI_API_KEY
# - INNGEST_API_KEY
# - INNGEST_EVENT_KEY
# - EMAIL_USER
# - EMAIL_PASSWORD

# Start development server
npm run dev

# In another terminal, start Inngest local dev
npm run inngest-dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

```bash
cd ai-ticket-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📦 Technology Stack

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Inngest** - Workflow engine
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library

## 🔐 Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/ai-ticket-db
JWT_SECRET=your_secret_key_here
PORT=3000
OPENAI_API_KEY=sk-...
INNGEST_API_KEY=...
INNGEST_EVENT_KEY=...
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000/api
```

## 📝 Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run inngest-dev` - Start Inngest local development

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Routes

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Tickets

- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

## 🚀 Deployment

### GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: AI Ticket Assistant"
git remote add origin https://github.com/YOUR_USERNAME/full-stack-ai-agent.git
git push -u origin main
```

### Backend Deployment (Render/Railway)

1. Connect GitHub repository
2. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - OPENAI_API_KEY
   - INNGEST_API_KEY
   - INNGEST_EVENT_KEY
   - EMAIL_USER
   - EMAIL_PASSWORD
3. Set start command: `node index.js`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=your_backend_url/api`
5. Deploy

## 📚 Features

- ✅ User authentication with JWT
- ✅ Ticket management system
- ✅ AI-powered ticket assistance
- ✅ Automated email notifications
- ✅ Role-based access (user/admin)
- ✅ Responsive UI with Tailwind CSS

## 🔧 Troubleshooting

### Connection Issues

- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### Authentication Errors

- Verify JWT_SECRET is set
- Check token expiration

### Email Not Sending

- Enable "Less secure app access" (Gmail)
- Use app-specific password
- Verify EMAIL_USER and EMAIL_PASSWORD

## 📄 License

ISC

## 👨‍💻 Author

[Your Name]

## 📞 Support

For issues or questions, please open a GitHub issue.
