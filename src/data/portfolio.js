// All site content, taken from the CV in ref/. Components only read from here.

export const profile = {
  name: 'Rehman Ashraf',
  role: 'Software Engineer',
  focus: 'Backend Development & Workflow Automation',
  location: 'Lahore, Pakistan',
  summary:
    'Backend developer working in Python and Django, now also building business workflow ' +
    'automations with n8n, Make.com, monday.com and ClickUp. I use AI-assisted development ' +
    'to deliver faster and pick up new stacks quickly.',
  email: 'rehman786655@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rehman-ashraf20',
  github: 'https://github.com/RehmanAshraf20',
}

// `colors` tint the card poster and, while the project is open, the ambient background.
// `icon` is a 24x24 stroke path.
export const projects = [
  {
    id: 'dashboard-agro',
    title: 'Dashboard Agro',
    kind: 'Agriculture MIS',
    summary: 'Backend for a farm management dashboard, deployed on Render, Vercel and Neon.',
    stack: ['Django', 'GeoDjango', 'PostGIS', 'DRF', 'Docker'],
    points: [
      'Built the backend for a farm management dashboard: 8 core models covering fields, crop cycles, expenditures, tubewells and damage reports.',
      'REST API with JWT auth, GeoJSON serialization, and daily/weekly/monthly/seasonal report endpoints.',
      'Deployed on Render (backend) and Vercel (frontend) with a Neon PostgreSQL database.',
    ],
    colors: ['rgb(16, 185, 129)', 'rgb(8, 145, 178)'],
    icon: 'M12 21V11M12 11c0-3 2-5 6-5 0 3-2 5-6 5zM12 14c0-2.5-2-4.5-6-4.5 0 3 2 4.5 6 4.5z',
  },
  {
    id: 'savenest',
    title: 'SAVENEST',
    kind: 'Final Year Project',
    summary: 'Mobile app that scrapes local grocery stores in real time to compare prices.',
    stack: ['Flutter', 'FastAPI', 'Hugging Face'],
    points: [
      'Mobile app that scrapes local grocery stores in real time and returns accurate price results for shopping, with a FastAPI backend and Hugging Face AI models.',
    ],
    colors: ['rgb(245, 158, 11)', 'rgb(225, 29, 72)'],
    icon: 'M3 4h2.5l2.2 10.5h9.6L19.5 7H7M9.5 19h.01M16.5 19h.01',
  },
  {
    id: 'waveform',
    title: 'Waveform',
    kind: 'Streaming Music Player',
    summary: 'Streaming-style music web app with a liquid-glass UI.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    points: [
      'Streaming-style music web app with a liquid-glass UI, album-art ambient backgrounds and spring-based animations.',
      'Streams real tracks from the Jamendo API, with hero, top-10 and mood-based sections.',
    ],
    colors: ['rgb(147, 51, 234)', 'rgb(29, 78, 216)'],
    icon: 'M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4',
  },
  {
    id: 'issue-triage-bot',
    title: 'GitHub Issue Triage Bot',
    kind: 'n8n Automation',
    summary: 'Webhook workflow that flags urgent GitHub issues; running in production.',
    stack: ['n8n (self-hosted, Docker)', 'Slack', 'Google Sheets'],
    points: [
      'Webhook workflow that flags urgent GitHub issues by keyword, alerts Slack, and logs every issue to Google Sheets; running in production.',
    ],
    colors: ['rgb(234, 88, 12)', 'rgb(124, 58, 237)'],
    icon: 'M12 8v5M12 16.5h.01M12 3a9 9 0 100 18 9 9 0 000-18z',
  },
  {
    id: 'lead-digest-bot',
    title: 'Daily Lead Digest Bot',
    kind: 'Make.com Automation',
    summary: 'Scheduled scenario that routes new leads by priority every day.',
    stack: ['Make.com', 'Google Sheets', 'Slack'],
    points: [
      'Scheduled scenario that routes new leads by priority (Hot/Warm/Cold) through a 3-way router, sends Slack alerts and logs to a tracker sheet daily.',
    ],
    colors: ['rgb(79, 70, 229)', 'rgb(219, 39, 119)'],
    icon: 'M4 5h16l-6 7v6l-4 2v-8z',
  },
  {
    id: 'invoice-generator',
    title: 'Invoice Generator',
    kind: 'Python Tool',
    summary: 'Batch-generates branded PDF invoices from CSV/Excel data.',
    stack: ['Python', 'ReportLab'],
    points: [
      'Batch-generates branded PDF invoices from CSV/Excel data for a produce supply business.',
    ],
    colors: ['rgb(14, 165, 233)', 'rgb(20, 184, 166)'],
    icon: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
  },
]

export const experience = [
  {
    role: 'Workflow Automation Developer',
    type: 'Contract',
    org: 'Remote no-code automation agency',
    period: 'Oct 2026 – Present',
    current: true,
    points: [
      'Building a ClickUp + n8n operations system for a design-business client: pipeline statuses, custom fields, dependencies and rollup views, plus a checklist and template system.',
      'Designing n8n automations for stall/idle alerts, a daily check-in bot, end-of-day digests, deadline reminders and AI review of drawings against a standards manual (Claude API).',
      'Authored the naming conventions and build documentation for ClickUp and n8n handover.',
    ],
  },
  {
    role: 'IT Surveyor',
    org: 'Private audit firm (Punjab Government contract)',
    period: 'Present',
    current: true,
    points: [
      'Audit computer lab upgrades in government colleges under a Punjab Government initiative.',
      "Co-drafted a formal recommendation letter for the firm's internal review and government submission.",
    ],
  },
  {
    role: 'Data Science Intern',
    org: 'PLUSW, Tokyo, Japan (Remote)',
    period: 'Jan 2025 – Jan 2026',
    points: ['Scraped and visualized data in Python using NumPy, Pandas and Matplotlib.'],
  },
  {
    role: 'Backend Intern',
    org: 'Programmers Force',
    period: 'Aug 2023 – Oct 2023',
    points: ['Completed a 3-month undergraduate backend trainee program.'],
  },
]

export const skills = [
  { area: 'Languages', items: ['Python', 'JavaScript', 'SQL'] },
  {
    area: 'Backend',
    items: ['Django', 'Django REST Framework', 'FastAPI', 'GeoDjango', 'REST APIs', 'JWT & OAuth', 'Stripe payments'],
  },
  { area: 'Frontend & Mobile', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Flutter'] },
  {
    area: 'Automation',
    items: ['n8n', 'Make.com', 'monday.com', 'ClickUp', 'Webhooks', 'Slack & Google Sheets'],
  },
  { area: 'Data', items: ['NumPy', 'Pandas', 'Matplotlib', 'Web scraping', 'PostgreSQL', 'PostGIS'] },
  {
    area: 'Tools & Deployment',
    items: ['Git', 'GitHub', 'Docker', 'Render', 'Vercel', 'Neon', 'Claude Code'],
  },
]

export const education = {
  degree: 'Bachelor of Computer Science (Post-ADP)',
  school: 'University of Central Punjab, Lahore',
  year: '2026',
  cgpa: 3.55,
  scale: 4,
}

export const certifications = [
  'Meta Back-End Developer',
  'Meta Django Web Framework',
  'Meta Version Control',
  'Programming in Python',
  'Python Developer, 4 Stars — HackerRank',
  'Marimba Vibe Coding AI',
]
