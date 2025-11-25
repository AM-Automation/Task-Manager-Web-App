# Task Manager Web App

> **Live Demo:** [https://task-manager-web-app-delta.vercel.app](https://task-manager-web-app-delta.vercel.app)

A modern, full-stack task management application with Kanban board functionality, built with Next.js 15 and Supabase.

---

## 📋 Project Overview

This project is a fully functional task management web application that enables users to efficiently organize and manage their tasks. The app provides an intuitive Kanban board interface with drag-and-drop functionality and secure user authentication.

**Key Features:**
- ✅ User registration and login (Supabase Auth)
- 📋 Kanban board with three columns (To Do, In Progress, Done)
- 🔄 Drag & drop to move tasks between columns
- ➕ Create new tasks with title, description, and due date
- ✏️ Edit and delete existing tasks
- 📊 Detailed view for each task
- 🔒 Row Level Security (RLS) - users only see their own tasks
- 📱 Fully responsive for desktop and mobile

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and Server Actions
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library (Radix UI + Tailwind)
- **[DND Kit](https://dndkit.com/)** - Modern drag-and-drop library

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** - Server-side data mutations
- **[Zod](https://zod.dev/)** - Schema validation

### Deployment & DevOps
- **[Vercel](https://vercel.com/)** - Hosting platform with CI/CD
- **[GitHub](https://github.com/)** - Version control & repository

---

## 🎨 Features in Detail

### 1. Authentication System
- Email/Password authentication via Supabase
- Email verification during registration
- Secure session management
- Automatic redirection for protected routes

### 2. Kanban Board
- **Compact card view:** Only title, status badge, and date visible
- **Fast drag & drop:** 3px activation distance for responsive feedback
- **Three columns:** To Do, In Progress, Done
- **Automatic status update:** Status changes when card is moved

### 3. Task Management
- **Create:** Dialog-based task creation with validation
- **Read:** Clear overview in Kanban board
- **Update:** Edit via dialog with pre-filled fields
- **Delete:** One-click deletion with confirmation

### 4. Task Detail View
- Click-to-view: Click on a card to open detail dialog
- Complete display: Title, description, status, due date
- Quick access to edit/delete functions

---

## 📁 Project Structure

```
Task-Manager-Web-App/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication routes
│   │   ├── page.tsx           # Landing page / Dashboard
│   │   ├── layout.tsx         # Root layout
│   │   └── actions.ts         # Server Actions (CRUD)
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── kanban-board.tsx  # Kanban board with DND
│   │   ├── task-card.tsx     # Task card (compact)
│   │   └── *-dialog.tsx      # Dialog components
│   ├── lib/                   # Utilities & config
│   │   ├── supabase/         # Supabase client/server setup
│   │   └── schemas.ts        # Zod validation schemas
│   ├── types/                 # TypeScript types
│   └── middleware.ts          # Next.js middleware (Auth)
├── public/                    # Static assets
├── .env.local                 # Environment variables (local)
└── package.json              # Dependencies
```

---

## 🔐 Security

- **Row Level Security (RLS):** Supabase policies ensure users only see their own tasks
- **Server-side validation:** All data mutations validated via Server Actions (Zod)
- **Environment variables:** Sensitive data (API keys) securely managed
- **HTTPS:** All connections encrypted (Vercel + Supabase)

---

## 🌐 Deployment

The app is fully deployed and production-ready:

- **Platform:** Vercel (Serverless)
- **Domain:** [https://task-manager-web-app-delta.vercel.app](https://task-manager-web-app-delta.vercel.app)
- **CI/CD:** Automatic deployment on every Git push
- **Database:** Supabase PostgreSQL (Cloud-hosted)
- **CDN:** Global via Vercel Edge Network

### Deployment Workflow
1. Code push to GitHub
2. Vercel auto-deploy triggers
3. Build runs (~30s)
4. Automatic rollout to production URL

---

## 📊 Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'TODO',
  due_date DATE,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy
CREATE POLICY "Users manage own tasks"
  ON tasks FOR ALL
  USING (auth.uid() = user_id);
```

---

## 🚦 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Setup
```bash
# Clone repository
git clone https://github.com/AM-Automation/Task-Manager-Web-App.git
cd Task-Manager-Web-App

# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local
# Add Supabase keys to .env.local

# Start development server
npm run dev
```

App runs on: [http://localhost:3000](http://localhost:3000)

### Build & Production
```bash
# Production build
npm run build

# Test production server locally
npm run start
```

---

## 🧪 Test Data

After registration, you can create test tasks:

1. **Sign up** with any email (e.g., `test@example.com`)
2. Verify email (check inbox)
3. **Login** with same credentials
4. Click **"Create Task"** button
5. Create task and move via drag & drop

---

## 📈 Performance

- **Build time:** ~30s (Vercel)
- **Initial load:** < 2s (First Contentful Paint)
- **Drag & drop:** 3px activation for instant feedback
- **Global CDN:** Fast load times worldwide

---

## 🔮 Future Enhancements

Possible features for future versions:
- 🔍 Search and filter functionality
- 🏷️ Tags/labels for tasks
- 📅 Calendar view
- 🤝 Team collaboration (shared tasks)
- 📊 Analytics dashboard
- 🌙 Dark mode toggle
- 📱 Progressive Web App (PWA)

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file

---

## 👤 Developer

**Andre M.**  
GitHub: [@AM-Automation](https://github.com/AM-Automation)

---

## 📞 Support

For questions or issues:
- GitHub Issues: [Task-Manager-Web-App/issues](https://github.com/AM-Automation/Task-Manager-Web-App/issues)
- Email: [Contact via GitHub](https://github.com/AM-Automation)

---

**Status:** ✅ Production Ready | 🚀 Live Deployment | 📱 Mobile Responsive
