# Task Manager Web App

> **Live Demo:** [https://task-manager-web-app-delta.vercel.app](https://task-manager-web-app-delta.vercel.app)

Eine moderne, full-stack Task-Management-Anwendung mit Kanban-Board, gebaut mit Next.js 15 und Supabase.

---

## 📋 Projektübersicht

Dieses Projekt ist eine vollständig funktionale Task-Management-Webanwendung, die es Benutzern ermöglicht, ihre Aufgaben effizient zu organisieren und zu verwalten. Die App bietet eine intuitive Kanban-Board-Oberfläche mit Drag-and-Drop-Funktionalität und sichere Benutzer-Authentifizierung.

**Hauptfunktionen:**
- ✅ Benutzer-Registrierung und Login (Supabase Auth)
- 📋 Kanban-Board mit drei Spalten (To Do, In Progress, Done)
- 🔄 Drag & Drop zum Verschieben von Tasks zwischen Spalten
- ➕ Erstellen neuer Tasks mit Titel, Beschreibung und Fälligkeitsdatum
- ✏️ Bearbeiten und Löschen bestehender Tasks
- 📊 Detailansicht für jeden Task
- 🔒 Row Level Security (RLS) - Benutzer sehen nur ihre eigenen Tasks
- 📱 Vollständig responsive für Desktop und Mobile

---

## � Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React Framework mit App Router und Server Actions
- **[React 19](https://react.dev/)** - UI-Bibliothek
- **[TypeScript](https://www.typescriptlang.org/)** - Type-Safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Komponenten-Bibliothek (Radix UI + Tailwind)
- **[DND Kit](https://dndkit.com/)** - Moderne Drag-and-Drop-Bibliothek

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** - Server-seitige Datenmutationen
- **[Zod](https://zod.dev/)** - Schema-Validierung

### Deployment & DevOps
- **[Vercel](https://vercel.com/)** - Hosting-Platform mit CI/CD
- **[GitHub](https://github.com/)** - Version Control & Repository

---

## 🎨 Features im Detail

### 1. Authentication System
- Email/Password-Authentifizierung via Supabase
- Email-Verifizierung bei der Registrierung
- Sichere Session-Verwaltung
- Automatische Weiterleitung für geschützte Routen

### 2. Kanban Board
- **Kompakte Card-Ansicht:** Nur Titel, Status-Badge und Datum sichtbar
- **Schnelles Drag & Drop:** 3px Aktivierungsdistanz für responsives Feedback
- **Drei Spalten:** To Do, In Progress, Done
- **Automatisches Status-Update:** Status ändert sich beim Verschieben der Card

### 3. Task Management
- **Create:** Dialog-basierte Task-Erstellung mit Validierung
- **Read:** Übersichtliche Liste im Kanban-Board
- **Update:** Bearbeiten via Edit-Dialog mit vorausgefüllten Feldern
- **Delete:** One-Click-Löschung mit Bestätigung

### 4. Task Detail View
- Click-to-View: Klick auf eine Card öffnet Detail-Dialog
- Vollständige Anzeige: Titel, Beschreibung, Status, Fälligkeitsdatum
- Schneller Zugriff auf Edit/Delete-Funktionen

---

## 📁 Projektstruktur

```
Task-Manager-Web-App/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentifizierungs-Routen
│   │   ├── page.tsx           # Landing Page / Dashboard
│   │   ├── layout.tsx         # Root Layout
│   │   └── actions.ts         # Server Actions (CRUD)
│   ├── components/            # React Components
│   │   ├── ui/               # shadcn/ui Basis-Komponenten
│   │   ├── kanban-board.tsx  # Kanban Board mit DND
│   │   ├── task-card.tsx     # Task Card (kompakt)
│   │   └── *-dialog.tsx      # Dialog-Komponenten
│   ├── lib/                   # Utilities & Config
│   │   ├── supabase/         # Supabase Client/Server Setup
│   │   └── schemas.ts        # Zod Validierungs-Schemas
│   ├── types/                 # TypeScript Typen
│   └── middleware.ts          # Next.js Middleware (Auth)
├── public/                    # Static Assets
├── .env.local                 # Environment Variables (lokal)
└── package.json              # Dependencies
```

---

## 🔐 Sicherheit

- **Row Level Security (RLS):** Supabase-Policies stellen sicher, dass User nur ihre eigenen Tasks sehen
- **Server-Side Validation:** Alle Datenmutationen werden via Server Actions validiert (Zod)
- **Environment Variables:** Sensible Daten (API Keys) werden sicher verwaltet
- **HTTPS:** Alle Verbindungen sind verschlüsselt (Vercel + Supabase)

---

## 🌐 Deployment

Die App ist vollständig deployed und produktionsbereit:

- **Platform:** Vercel (Serverless)
- **Domain:** [https://task-manager-web-app-delta.vercel.app](https://task-manager-web-app-delta.vercel.app)
- **CI/CD:** Automatisches Deployment bei jedem Git Push
- **Database:** Supabase PostgreSQL (Cloud-hosted)
- **CDN:** Global über Vercel Edge Network

### Deployment-Workflow
1. Code Push zu GitHub
2. Vercel Auto-Deploy triggert
3. Build läuft (~30s)
4. Automatisches Rollout zur Production-URL

---

## 📊 Datenbank Schema

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

## 🚦 Lokale Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder yarn
- Supabase Account

### Setup
```bash
# Repository klonen
git clone https://github.com/AM-Automation/Task-Manager-Web-App.git
cd Task-Manager-Web-App

# Dependencies installieren
npm install

# Environment Variables setzen
cp .env.local.example .env.local
# Füge Supabase Keys in .env.local ein

# Development Server starten
npm run dev
```

App läuft auf: [http://localhost:3000](http://localhost:3000)

### Build & Production
```bash
# Production Build
npm run build

# Production Server lokal testen
npm run start
```

---

## 🧪 Testdaten

Nach der Registrierung kannst du Test-Tasks erstellen:

1. **Sign Up** mit beliebiger Email (z.B. `test@example.com`)
2. Email verifizieren (Check Inbox)
3. **Login** mit denselben Credentials
4. **"Create Task"** Button klicken
5. Task erstellen und per Drag & Drop verschieben

---

## 📈 Performance

- **Build-Zeit:** ~30s (Vercel)
- **Initial Load:** < 2s (First Contentful Paint)
- **Drag & Drop:** 3px Aktivierung für sofortiges Feedback
- **Global CDN:** Schnelle Ladezeiten weltweit

---

## 🔮 Zukünftige Erweiterungen

Mögliche Features für zukünftige Versionen:
- 🔍 Such- und Filter-Funktionalität
- 🏷️ Tags/Labels für Tasks
- 📅 Kalenderansicht
- 🤝 Team-Collaboration (Shared Tasks)
- 📊 Analytics Dashboard
- 🌙 Dark Mode Toggle
- 📱 Progressive Web App (PWA)

---

## 📝 Lizenz

MIT License - Siehe [LICENSE](LICENSE) Datei

---

## 👤 Entwickler

**Andre M.**  
GitHub: [@AM-Automation](https://github.com/AM-Automation)

---

## 📞 Support

Bei Fragen oder Issues:
- GitHub Issues: [Task-Manager-Web-App/issues](https://github.com/AM-Automation/Task-Manager-Web-App/issues)
- Email: [Kontakt über GitHub](https://github.com/AM-Automation)

---

**Status:** ✅ Production Ready | 🚀 Live Deployment | 📱 Mobile Responsive
