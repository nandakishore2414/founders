import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const DataContext = createContext();

// Initial mock founders data
const INITIAL_FOUNDERS = [
    {
        id: 'founder-1',
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        startupName: "DevFlow",
        positioning: "Automating code reviews for enterprise teams. Reducing cycle time by 40%.",
        industry: ["SaaS", "DevTools"],
        stage: "Revenue",
        location: "San Francisco",
        metric: "$12k MRR",
        openTo: ["Partnerships", "Integration"],
        streak: 12,
        reputation: 742,
        teamSize: 6,
        featured: true,
        bio: "Building developer tools that matter. Prev: Engineering at Stripe.",
        tagline: "Making code reviews effortless",
        website: "devflow.io",
        badges: ["Verified Founder", "Top Builder"],
        mrr: "$12k",
        users: "2.1K",
        joinedDate: "Jan 2024"
    },
    {
        id: 'founder-2',
        name: "Sarah Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        startupName: "HealthBridge",
        positioning: "Connecting patients with specialized remote care. Telehealth 2.0.",
        industry: ["HealthTech", "B2C"],
        stage: "MVP",
        location: "London",
        metric: "500 Users",
        openTo: ["Co-marketing", "Feedback"],
        streak: 5,
        reputation: 436,
        teamSize: 3,
        featured: false,
        bio: "Healthcare entrepreneur focused on accessibility.",
        tagline: "Telehealth reimagined",
        website: "healthbridge.com",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "500",
        joinedDate: "Mar 2024"
    },
    {
        id: 'founder-3',
        name: "James Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        startupName: "EcoLogistics",
        positioning: "Sustainable supply chain management for e-commerce brands.",
        industry: ["Logistics", "B2B"],
        stage: "Idea",
        location: "Berlin",
        metric: "Pre-Revenue",
        openTo: ["Hiring", "Co-founder"],
        streak: 0,
        reputation: 215,
        teamSize: 2,
        featured: false,
        bio: "Sustainability advocate building the future of logistics.",
        tagline: "Green logistics for modern brands",
        website: "ecologistics.io",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "0",
        joinedDate: "May 2024"
    },
    {
        id: 'founder-4',
        name: "Elena Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        startupName: "FinPulse",
        positioning: "Real-time financial forecasting for startups using AI.",
        industry: ["FinTech", "AI"],
        stage: "Scaling",
        location: "New York",
        metric: "$85k MRR",
        openTo: ["Partnerships", "Invest"],
        streak: 45,
        reputation: 912,
        teamSize: 14,
        featured: true,
        bio: "FinTech veteran. Building AI-powered financial tools.",
        tagline: "AI-driven financial intelligence",
        website: "finpulse.ai",
        badges: ["Verified Founder", "Top Creator", "YC W24"],
        mrr: "$85k",
        users: "8.5K",
        joinedDate: "Dec 2023"
    },
    {
        id: 'founder-5',
        name: "Raj Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
        startupName: "EduVerse",
        positioning: "Gamified upskilling platform for Gen-Z professionals entering the workforce.",
        industry: ["EdTech", "B2C"],
        stage: "Revenue",
        location: "Bangalore",
        metric: "$8k MRR",
        openTo: ["Integration", "Content Partners"],
        streak: 22,
        reputation: 651,
        teamSize: 5,
        featured: false,
        bio: "EdTech entrepreneur passionate about accessible education.",
        tagline: "Learning made engaging",
        website: "eduverse.com",
        badges: ["Verified Founder"],
        mrr: "$8k",
        users: "1.2K",
        joinedDate: "Feb 2024"
    },
    {
        id: 'founder-6',
        name: "Maya Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        startupName: "Stackly",
        positioning: "No-code internal tool builder for ops-heavy startups. Ship in hours, not weeks.",
        industry: ["SaaS", "No-Code"],
        stage: "MVP",
        location: "Austin",
        metric: "120 Beta Users",
        openTo: ["Beta Testers", "Feedback"],
        streak: 8,
        reputation: 389,
        teamSize: 2,
        featured: false,
        bio: "No-code enthusiast building tools for builders.",
        tagline: "Build faster, ship smarter",
        website: "stackly.io",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "120",
        joinedDate: "Apr 2024"
    },
];

// ─── Initial Feed Posts ─────────────────────────────────────
const INITIAL_POSTS = [
    {
        id: 'post-1',
        founderId: 'founder-4',
        type: 'Case Study',
        content: {
            title: 'How we 10x-ed our conversion rate with one pricing change',
            problem: 'Our free-trial conversion was stuck at 2.1% for 3 months. Users loved the product but dropped off at checkout.',
            action: 'Switched from a 14-day free trial to a reverse trial — full access for 7 days, then a graceful downgrade with usage reminders.',
            result: '22% trial-to-paid conversion — 10× improvement in 6 weeks'
        },
        engagement: { insightful: 184, saves: 67, comments: 43 },
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2h ago
        time: '2h ago'
    },
    {
        id: 'post-2',
        founderId: 'founder-1',
        type: 'Thread',
        content: {
            title: '5 things I wish I knew before raising my pre-seed',
            points: [
                '1. Your deck matters less than your demo. Investors want to see the product live.',
                '2. Warm intros are 10× more effective than cold emails. Invest in relationship-building first.',
                '3. Don\'t over-optimize your cap table. Speed matters more than saving 1% dilution.',
                '4. Have your metrics ready before the first call — DAU, retention, MRR growth.',
                '5. The best investors add value beyond money. Choose partners, not just checks.'
            ],
            conclusion: 'Fundraising is selling. Treat it like a sales process with a pipeline, follow-ups, and deadlines.'
        },
        engagement: { insightful: 312, saves: 145, comments: 89 },
        timestamp: Date.now() - 5 * 60 * 60 * 1000,
        time: '5h ago'
    },
    {
        id: 'post-3',
        founderId: 'founder-5',
        type: 'Video',
        content: {
            title: 'Building a gamified onboarding in 48 hours — full walkthrough',
            thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600',
            duration: '12:34',
            summary: 'We shipped a complete gamified onboarding flow with XP, levels, and streak rewards. Here\'s the full technical walkthrough from planning to deploy.',
            cta: 'Watch Full Video'
        },
        engagement: { insightful: 98, saves: 34, comments: 22 },
        timestamp: Date.now() - 8 * 60 * 60 * 1000,
        time: '8h ago'
    },
    {
        id: 'post-4',
        founderId: 'founder-2',
        type: 'Hiring',
        content: {
            role: 'Senior Frontend Engineer',
            location: 'London (Hybrid)',
            salary: '£80K – £110K + equity',
            skills: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Testing']
        },
        engagement: { insightful: 45, saves: 23, comments: 11 },
        timestamp: Date.now() - 12 * 60 * 60 * 1000,
        time: '12h ago'
    },
    {
        id: 'post-5',
        founderId: 'founder-6',
        type: 'Poll',
        content: {
            question: 'What\'s the biggest bottleneck in your startup right now?',
            options: [
                { text: 'Hiring / talent', votes: 142 },
                { text: 'Fundraising', votes: 98 },
                { text: 'Product-market fit', votes: 201 },
                { text: 'Distribution / growth', votes: 167 }
            ],
            totalVotes: 608,
            endsAt: 'Ends in 2 days'
        },
        engagement: { insightful: 76, saves: 12, comments: 54 },
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        time: '1d ago'
    },
    {
        id: 'post-6',
        founderId: 'founder-3',
        type: 'Thread',
        content: {
            title: 'How I validated my SaaS idea in 72 hours with $0 budget',
            points: [
                '1. Posted a problem statement on 3 communities (Reddit, Indie Hackers, Twitter) — got 150+ replies.',
                '2. Built a no-code landing page with Carrd ($0) and put up a waitlist.',
                '3. Ran DM conversations with 20 potential users to map pain points.',
                '4. Sketched a Figma prototype in 4 hours based on top feature requests.',
                '5. Shared the prototype link — 40% of waitlist users signed up for early access.'
            ],
            conclusion: 'Validation doesn\'t need money. It needs clarity about the problem and fast experimentation.'
        },
        engagement: { insightful: 267, saves: 189, comments: 71 },
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        time: '2d ago'
    },
];

// ─── Initial Build Updates ──────────────────────────────────
const INITIAL_BUILD_UPDATES = [
    {
        id: 'update-1',
        founderId: 'founder-1',
        type: 'Feature Shipped',
        headline: 'AI-powered code review suggestions are live 🎉',
        whatWeDid: 'We integrated GPT-4 into our code review pipeline to auto-suggest improvements. The model reviews diffs, adds inline annotations, and suggests refactors with one-click apply.',
        outcome: 'Review time dropped from 45 min to 12 min per PR. 73% of AI suggestions accepted by users.',
        lesson: 'Start with a small scope — we only do JS/TS files for now and will expand based on usage data.',
        insightCount: 89,
        saveCount: 34,
        commentCount: 28,
        timestamp: Date.now() - 3 * 60 * 60 * 1000,
        time: '3h ago'
    },
    {
        id: 'update-2',
        founderId: 'founder-4',
        type: 'Milestone',
        headline: 'Just crossed $85K MRR — our best month yet',
        whatWeDid: 'Launched a self-serve enterprise tier with SSO + audit logs + dedicated Slack support. No outbound sales — 100% inbound from our content flywheel.',
        outcome: '$85K MRR, up from $62K last month. 37% growth m/m. 4 enterprise contracts signed.',
        lesson: 'Enterprise features sell themselves if your product already solves a painful problem. Don\'t rush into sales hires.',
        insightCount: 256,
        saveCount: 112,
        commentCount: 67,
        timestamp: Date.now() - 6 * 60 * 60 * 1000,
        time: '6h ago'
    },
    {
        id: 'update-3',
        founderId: 'founder-5',
        type: 'Feature Shipped',
        headline: 'Streak system + daily XP rewards now live on EduVerse',
        whatWeDid: 'Built a full gamification layer: daily login streaks, XP for completing lessons, weekly challenges, and a global leaderboard with friend groups.',
        outcome: 'DAU increased 42% in the first week. Average session time went from 8 min to 19 min.',
        lesson: 'Gamification only works when the core content loop is already strong. Don\'t gamify a broken product.',
        insightCount: 145,
        saveCount: 87,
        commentCount: 41,
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        time: '1d ago'
    },
    {
        id: 'update-4',
        founderId: 'founder-2',
        type: 'Lesson',
        headline: 'Why we killed our most popular feature',
        whatWeDid: 'Our chat feature was the most used but had the worst NPS. We learned users wanted structured consultations, not open chat. Removed it and replaced it with a booking system.',
        outcome: 'NPS went from 32 to 71. Support tickets dropped 60%. Patient satisfaction at an all-time high.',
        lesson: 'Usage ≠ satisfaction. Sometimes the most-used feature is used because it\'s the only option, not because users love it.',
        insightCount: 198,
        saveCount: 156,
        commentCount: 83,
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        time: '2d ago'
    },
    {
        id: 'update-5',
        founderId: 'founder-6',
        type: 'Pivot',
        headline: 'Pivoting from B2C to B2B — here\'s why',
        whatWeDid: 'After 6 months of B2C traction (120 users, $0 MRR), we noticed ops teams at startups were our power users. We pivoted to build internal tool templates for startup ops teams.',
        outcome: '3 paid pilots ($500/mo each) within 2 weeks of launching the B2B positioning. Pipeline has 12 more.',
        lesson: 'Listen to who\'s PAYING, not just who\'s USING. B2C users loved us but couldn\'t pay. B2B teams had budget and urgency.',
        insightCount: 231,
        saveCount: 178,
        commentCount: 94,
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        time: '3d ago'
    },
];

// ─── Initial Projects ───────────────────────────────────────
const INITIAL_PROJECTS = [
    {
        id: 'project-1',
        creatorId: 'founder-1',
        title: 'DevFlow Browser Extension — Real-time code quality scoring',
        description: 'Building a browser extension that scores code quality in real-time as developers write PRs on GitHub. Uses AST parsing + ML to give instant feedback on readability, complexity, and test coverage gaps.',
        industry: ['SaaS', 'DevTools'],
        stage: 'MVP',
        lookingFor: ['Frontend Engineer', 'ML Engineer', 'Beta Testers'],
        tags: ['Chrome Extension', 'Machine Learning', 'GitHub API', 'TypeScript'],
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        likes: 47,
        comments: [{ id: 'c1', text: 'This would be huge for our team!', authorId: 'founder-5' }],
        views: 312,
        status: 'active'
    },
    {
        id: 'project-2',
        creatorId: 'founder-4',
        title: 'FinPulse Open API — Free financial data for startups',
        description: 'We\'re open-sourcing our financial forecasting API. Any startup can plug in their Stripe/QuickBooks data and get AI-powered revenue forecasts, burn rate analysis, and runway predictions.',
        industry: ['FinTech', 'AI'],
        stage: 'Early Revenue',
        lookingFor: ['API Partners', 'Documentation Writers', 'Early Adopters'],
        tags: ['REST API', 'Financial Modeling', 'Open Source', 'Python'],
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        likes: 89,
        comments: [
            { id: 'c2', text: 'Would love to integrate this into our dashboard', authorId: 'founder-1' },
            { id: 'c3', text: 'Any plans for EU data residency?', authorId: 'founder-3' }
        ],
        views: 567,
        status: 'active'
    },
    {
        id: 'project-3',
        creatorId: 'founder-2',
        title: 'HealthBridge Patient Portal v2 — UX overhaul',
        description: 'Redesigning the patient portal from scratch. Focus on accessibility (WCAG 2.1 AA), multi-language support, and a calming visual design that reduces anxiety for first-time telehealth users.',
        industry: ['HealthTech'],
        stage: 'Validation',
        lookingFor: ['UX Designer', 'Accessibility Expert', 'Medical Advisor'],
        tags: ['Healthcare', 'UX/UI', 'Accessibility', 'React Native'],
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        likes: 34,
        comments: [],
        views: 198,
        status: 'active'
    },
    {
        id: 'project-4',
        creatorId: 'founder-3',
        title: 'Carbon footprint calculator for e-commerce shipments',
        description: 'Building an embeddable widget that e-commerce stores can drop into their checkout page. Shows the carbon footprint of each shipping option and lets customers choose carbon-neutral delivery.',
        industry: ['E-commerce', 'SaaS'],
        stage: 'Idea',
        lookingFor: ['Co-founder (Business)', 'Supply Chain Expert', 'Frontend Dev'],
        tags: ['Sustainability', 'Widget', 'E-commerce API', 'Carbon Offsets'],
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        likes: 56,
        comments: [{ id: 'c4', text: 'Shopify plugin for this would be 🔥', authorId: 'founder-6' }],
        views: 423,
        status: 'active'
    },
    {
        id: 'project-5',
        creatorId: 'founder-5',
        title: 'EduVerse Creator SDK — Let educators build interactive content',
        description: 'A React SDK that enables educators to build interactive, gamified learning modules without coding. Drag-and-drop quiz builder, progress tracking, and analytics dashboard included.',
        industry: ['EdTech', 'DevTools'],
        stage: 'MVP',
        lookingFor: ['SDK Testers', 'Content Creator Partners', 'Technical Writer'],
        tags: ['React SDK', 'Gamification', 'No-Code', 'Education'],
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
        likes: 72,
        comments: [{ id: 'c5', text: 'Could this work for corporate training too?', authorId: 'founder-2' }],
        views: 289,
        status: 'active'
    },
    {
        id: 'project-6',
        creatorId: 'founder-6',
        title: 'StartupOps Templates — Free Notion + Coda templates for ops',
        description: 'A curated library of 20+ ops templates (hiring pipelines, OKR tracking, board meeting prep, investor updates) built on Notion and Coda. All free, all battle-tested from real startups.',
        industry: ['SaaS', 'No-Code'],
        stage: 'Early Revenue',
        lookingFor: ['Template Contributors', 'Community Moderators'],
        tags: ['Notion', 'Coda', 'Templates', 'Operations'],
        timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
        likes: 113,
        comments: [
            { id: 'c6', text: 'The investor update template saved me hours', authorId: 'founder-4' },
            { id: 'c7', text: 'Could you add a product roadmap template?', authorId: 'founder-1' }
        ],
        views: 891,
        status: 'active'
    },
];

// ─── Initial Community Posts ────────────────────────────────
const INITIAL_COMMUNITY_POSTS = [
    {
        id: 'community-1',
        authorId: 'founder-3',
        type: 'ask',
        title: 'How do you handle pricing for a B2B SaaS with usage-based billing?',
        description: 'We\'re building usage-based pricing for our logistics platform but struggling with metering, invoice generation, and handling overages. Any founders with experience here? What tools/services did you use?',
        category: 'Business',
        tags: ['Pricing', 'B2B', 'Billing', 'Stripe'],
        timestamp: Date.now() - 4 * 60 * 60 * 1000,
        responses: [
            { id: 'r1', authorId: 'founder-4', text: 'We use Stripe Metered Billing + a custom dashboard. Happy to share our setup!' },
            { id: 'r2', authorId: 'founder-1', text: 'Check out Lago (open-source) — we switched from Chargebee and it\'s been great.' }
        ],
        helpful: 23
    },
    {
        id: 'community-2',
        authorId: 'founder-1',
        type: 'offer',
        title: 'Free code review sessions for early-stage startups',
        description: 'I\'ve been doing code reviews for 8+ years at Stripe and now at DevFlow. Happy to do free 30-min code review sessions for any early-stage startup struggling with code quality, architecture, or testing. DM me to book.',
        category: 'Technical',
        tags: ['Code Review', 'Architecture', 'Mentoring', 'Free'],
        timestamp: Date.now() - 8 * 60 * 60 * 1000,
        responses: [
            { id: 'r3', authorId: 'founder-6', text: 'This is amazing! Just booked a slot. 🙏' },
            { id: 'r4', authorId: 'founder-5', text: 'Incredibly kind. Would love a review of our gamification module.' },
            { id: 'r5', authorId: 'founder-2', text: 'Signed up — our telehealth codebase needs fresh eyes.' }
        ],
        helpful: 67
    },
    {
        id: 'community-3',
        authorId: 'founder-2',
        type: 'ask',
        title: 'Need legal advice: HIPAA compliance for a telehealth MVP',
        description: 'We\'re launching our telehealth MVP in the US and UK. What are the minimum HIPAA compliance requirements for an MVP? Do we need a BAA with our cloud provider from day one? Any lawyers or founders with healthcare experience here?',
        category: 'Legal',
        tags: ['HIPAA', 'Healthcare', 'Compliance', 'Legal'],
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
        responses: [
            { id: 'r6', authorId: 'founder-4', text: 'Yes, you need a BAA. AWS and GCP both offer HIPAA-eligible services. Start there.' }
        ],
        helpful: 34
    },
    {
        id: 'community-4',
        authorId: 'founder-4',
        type: 'offer',
        title: 'Office hours: Financial modeling for startups raising their first round',
        description: 'I\'ve built financial models for 50+ startups at FinPulse. Offering weekly 1-hour office hours where you can bring your model and I\'ll help you clean it up, add investor-ready charts, and stress-test your assumptions.',
        category: 'Funding',
        tags: ['Financial Modeling', 'Fundraising', 'Investor Ready', 'Office Hours'],
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        responses: [
            { id: 'r7', authorId: 'founder-3', text: 'Signed up for next week\'s slot. Our model is a mess 😅' },
            { id: 'r8', authorId: 'founder-6', text: 'This is exactly what I need before our seed pitch.' }
        ],
        helpful: 89
    },
    {
        id: 'community-5',
        authorId: 'founder-5',
        type: 'ask',
        title: 'Best practices for user onboarding in EdTech products?',
        description: 'Our onboarding completion rate is only 34%. Looking for tips on designing onboarding flows for EdTech and gamified products. What worked for you? Progressive disclosure? Guided tours? Quick wins?',
        category: 'Product',
        tags: ['Onboarding', 'EdTech', 'UX', 'Gamification'],
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        responses: [
            { id: 'r9', authorId: 'founder-6', text: 'Progressive disclosure + first-win-in-60-seconds. We improved onboarding by 2x with this.' },
            { id: 'r10', authorId: 'founder-1', text: 'Tooltips are dead. Use interactive checklists that reward completion.' }
        ],
        helpful: 41
    },
    {
        id: 'community-6',
        authorId: 'founder-6',
        type: 'offer',
        title: 'Free Notion templates for startup operations (hiring, OKRs, investor updates)',
        description: 'I\'ve built 20+ battle-tested Notion templates from running ops at Stackly. Sharing them all for free. Includes hiring pipeline, OKR tracker, board meeting prep, weekly standup notes, and investor update emails.',
        category: 'Business',
        tags: ['Notion', 'Templates', 'Ops', 'Free Resources'],
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
        responses: [
            { id: 'r11', authorId: 'founder-3', text: 'The investor update template alone is worth gold. Thanks!' },
            { id: 'r12', authorId: 'founder-2', text: 'Downloaded the hiring pipeline — super well-structured.' },
            { id: 'r13', authorId: 'founder-5', text: 'Any plans to add a product roadmap template?' }
        ],
        helpful: 156
    },
];

// ─── Initial Freelancing Listings ───────────────────────────
const INITIAL_FREELANCE_LISTINGS = [
    {
        id: 'freelance-1',
        creatorId: 'founder-1',
        type: 'job',
        title: 'React/TypeScript Developer for Chrome Extension',
        description: 'We\'re building a Chrome extension for DevFlow and need an experienced React/TS developer. Must have experience with Chrome Extension APIs (Manifest V3), content scripts, and working with GitHub\'s DOM. 3-month contract, potential full-time.',
        category: 'Development',
        budget: '$8,000 – $12,000',
        skills: ['React', 'TypeScript', 'Chrome Extensions', 'GitHub API', 'Webpack'],
        location: 'Remote',
        duration: '3 months',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
    {
        id: 'freelance-2',
        creatorId: 'founder-2',
        type: 'job',
        title: 'UX Designer for Healthcare App — WCAG Compliance',
        description: 'Looking for a UX designer with healthcare and accessibility experience to redesign our patient portal. Must understand WCAG 2.1 AA standards, calming UI patterns for medical apps, and responsive design.',
        category: 'Design',
        budget: '$5,000 – $8,000',
        skills: ['UX Design', 'Figma', 'Accessibility', 'Healthcare UX', 'User Research'],
        location: 'London or Remote (GMT ±2)',
        duration: '6 weeks',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
    {
        id: 'freelance-3',
        creatorId: 'founder-4',
        type: 'service',
        title: 'Financial Modeling & Investor-Ready Pitch Deck Consulting',
        description: 'I help early-stage startups build investor-grade financial models (3-statement model, unit economics, cohort analysis) and polish pitch decks. Having raised $4M+, I know what investors look for.',
        category: 'Business',
        budget: '$2,000 – $5,000 per engagement',
        skills: ['Financial Modeling', 'Pitch Decks', 'Fundraising', 'Excel/Sheets', 'Investor Relations'],
        location: 'Remote (Global)',
        duration: '1–2 weeks',
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
    {
        id: 'freelance-4',
        creatorId: 'founder-5',
        type: 'job',
        title: 'Technical Content Writer — EdTech & Gamification',
        description: 'Need a technical writer to create SDK documentation, integration guides, and blog posts about gamification in education. Should be comfortable writing code samples in React/JS.',
        category: 'Writing',
        budget: '$3,000 – $4,500',
        skills: ['Technical Writing', 'React', 'Documentation', 'Markdown/MDX', 'EdTech'],
        location: 'Remote',
        duration: '4 weeks',
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
    {
        id: 'freelance-5',
        creatorId: 'founder-6',
        type: 'service',
        title: 'No-Code Internal Tools & Automation Consulting',
        description: 'I build custom internal tools using Retool, Notion, Zapier, and n8n. Specializing in startup ops automation — CRM workflows, support ticket routing, onboarding sequences, and reporting dashboards.',
        category: 'Development',
        budget: '$1,500 – $4,000 per project',
        skills: ['Retool', 'Zapier', 'n8n', 'Notion API', 'No-Code', 'Automation'],
        location: 'Remote (US timezone preferred)',
        duration: '1–3 weeks',
        timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
    {
        id: 'freelance-6',
        creatorId: 'founder-3',
        type: 'job',
        title: 'Growth Marketer — SEO + Content for B2B Logistics SaaS',
        description: 'Looking for a growth marketer to build our organic acquisition channel. Need someone experienced in B2B SaaS SEO, content strategy, and link building for niche markets (supply chain, logistics, sustainability).',
        category: 'Marketing',
        budget: '$4,000 – $6,000/month',
        skills: ['SEO', 'Content Marketing', 'B2B SaaS', 'Link Building', 'Analytics'],
        location: 'Berlin or Remote (CET ±2)',
        duration: 'Ongoing (3-month initial)',
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        applications: [],
        status: 'open'
    },
];

export const DataProvider = ({ children, currentUserId }) => {
    const [founders, setFounders] = useState(INITIAL_FOUNDERS);
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [buildUpdates, setBuildUpdates] = useState(INITIAL_BUILD_UPDATES);
    const [connections, setConnections] = useState([]); // { fromId, toId, type, message, status, timestamp }
    const [projects, setProjects] = useState(INITIAL_PROJECTS); // { id, creatorId, title, description, industry, stage, lookingFor, tags, timestamp, likes, comments, views }
    const [communityPosts, setCommunityPosts] = useState(INITIAL_COMMUNITY_POSTS); // { id, authorId, type: 'ask' | 'offer', title, description, category, tags, timestamp, responses, helpful }
    const [freelancingListings, setFreelancingListings] = useState(INITIAL_FREELANCE_LISTINGS); // { id, creatorId, type: 'job' | 'service', title, description, category, budget, skills, timestamp, applications, status }
    const [collaborationRequests, setCollaborationRequests] = useState([]); // { id, sourceType, sourceId, sourceTitle, fromId, toId, intent, compensationType, amount, message, status, timestamp }

    // Get current user's founder profile
    const currentFounder = useMemo(() => {
        return founders.find(f => f.id === currentUserId) || null;
    }, [founders, currentUserId]);

    // Update founder profile
    const updateFounderProfile = useCallback((founderId, updates) => {
        setFounders(prev => prev.map(f =>
            f.id === founderId ? { ...f, ...updates } : f
        ));
    }, []);

    // Add a new founder (for registration)
    const addFounder = useCallback((founderData) => {
        const newFounder = {
            id: `founder-${Date.now()}`,
            ...founderData,
            streak: 0,
            reputation: 0,
            featured: false,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };
        setFounders(prev => [...prev, newFounder]);
        return newFounder.id;
    }, []);

    // Add a post
    const addPost = useCallback((postData) => {
        const newPost = {
            id: `post-${Date.now()}`,
            ...postData,
            timestamp: Date.now(),
            engagement: { insightful: 0, saves: 0, comments: 0 }
        };
        setPosts(prev => [newPost, ...prev]);
        return newPost.id;
    }, []);

    // Add a build update
    const addBuildUpdate = useCallback((updateData) => {
        const newUpdate = {
            id: `update-${Date.now()}`,
            ...updateData,
            timestamp: Date.now(),
            insightCount: 0,
            saveCount: 0,
            commentCount: 0,
            time: "just now"
        };
        setBuildUpdates(prev => [newUpdate, ...prev]);

        // Update founder's build streak if it's their own update
        if (updateData.founderId === currentUserId) {
            setFounders(prev => prev.map(f => {
                if (f.id === currentUserId) {
                    const newStreak = (f.streak || 0) + 1;
                    return { ...f, streak: newStreak };
                }
                return f;
            }));
        }

        return newUpdate.id;
    }, [currentUserId]);

    // Send connection request
    const sendConnectionRequest = useCallback((fromId, toId, type, message) => {
        const newConnection = {
            id: `conn-${Date.now()}`,
            fromId,
            toId,
            type,
            message,
            status: 'pending',
            timestamp: Date.now()
        };
        setConnections(prev => [...prev, newConnection]);
        return newConnection.id;
    }, []);

    // Get posts by founder
    const getPostsByFounder = useCallback((founderId) => {
        return posts.filter(p => p.founderId === founderId);
    }, [posts]);

    // Get build updates by founder
    const getBuildUpdatesByFounder = useCallback((founderId) => {
        return buildUpdates.filter(u => u.founderId === founderId);
    }, [buildUpdates]);

    // Get all posts and build updates combined (for feed)
    const getFeedItems = useCallback(() => {
        const allPosts = posts.map(p => ({ ...p, itemType: 'post' }));
        const allUpdates = buildUpdates.map(u => ({ ...u, itemType: 'buildUpdate' }));
        return [...allPosts, ...allUpdates].sort((a, b) => b.timestamp - a.timestamp);
    }, [posts, buildUpdates]);

    // Search founders
    const searchFounders = useCallback((query, filters = {}) => {
        let results = founders;

        // Text search
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(f =>
                f.name.toLowerCase().includes(lowerQuery) ||
                f.startupName.toLowerCase().includes(lowerQuery) ||
                f.positioning.toLowerCase().includes(lowerQuery) ||
                f.industry.some(i => i.toLowerCase().includes(lowerQuery))
            );
        }

        // Industry filter
        if (filters.industries && filters.industries.length > 0) {
            results = results.filter(f =>
                f.industry.some(i => filters.industries.includes(i))
            );
        }

        // Stage filter
        if (filters.stages && filters.stages.length > 0) {
            results = results.filter(f => filters.stages.includes(f.stage));
        }

        // Quick filter (All, SaaS, AI/ML, etc.)
        if (filters.quickFilter && filters.quickFilter !== 'All') {
            if (filters.quickFilter === 'SaaS') {
                results = results.filter(f => f.industry.includes('SaaS'));
            } else if (filters.quickFilter === 'AI/ML') {
                results = results.filter(f => f.industry.some(i => i.includes('AI') || i.includes('ML')));
            } else if (filters.quickFilter === 'FinTech') {
                results = results.filter(f => f.industry.includes('FinTech'));
            } else if (filters.quickFilter === 'HealthTech') {
                results = results.filter(f => f.industry.includes('HealthTech'));
            } else if (filters.quickFilter === 'Scaling') {
                results = results.filter(f => f.stage === 'Scaling');
            } else if (filters.quickFilter === 'Hiring') {
                results = results.filter(f => f.openTo && f.openTo.includes('Hiring'));
            } else if (filters.quickFilter === 'Open to Invest') {
                results = results.filter(f => f.openTo && f.openTo.includes('Invest'));
            }
        }

        return results;
    }, [founders]);

    // Add a project/idea
    const addProject = useCallback((projectData) => {
        const newProject = {
            id: `project-${Date.now()}`,
            ...projectData,
            timestamp: Date.now(),
            likes: 0,
            comments: [],
            views: 0,
            status: 'active'
        };
        setProjects(prev => [newProject, ...prev]);
        return newProject.id;
    }, []);

    // Add a community help post
    const addCommunityPost = useCallback((postData) => {
        const newPost = {
            id: `community-${Date.now()}`,
            ...postData,
            timestamp: Date.now(),
            responses: [],
            helpful: 0
        };
        setCommunityPosts(prev => [newPost, ...prev]);
        return newPost.id;
    }, []);

    // Add a freelancing listing (job or service)
    const addFreelancingListing = useCallback((listingData) => {
        const newListing = {
            id: `freelance-${Date.now()}`,
            ...listingData,
            timestamp: Date.now(),
            applications: [],
            status: 'open'
        };
        setFreelancingListings(prev => [newListing, ...prev]);
        return newListing.id;
    }, []);

    // Create a collaboration/help request for a project, community post, or freelance listing
    const addCollaborationRequest = useCallback((requestData) => {
        if (!requestData?.sourceType || !requestData?.sourceId || !requestData?.fromId || !requestData?.toId) {
            return null;
        }

        const newRequest = {
            id: `request-${Date.now()}`,
            ...requestData,
            compensationType: requestData.compensationType || 'unpaid',
            status: 'pending',
            timestamp: Date.now()
        };

        setCollaborationRequests(prev => [newRequest, ...prev]);
        return newRequest.id;
    }, []);

    const getCollaborationRequestsForSource = useCallback((sourceType, sourceId) => {
        return collaborationRequests.filter(
            request => request.sourceType === sourceType && request.sourceId === sourceId
        );
    }, [collaborationRequests]);

    const getCollaborationRequestsForUser = useCallback((userId) => {
        return collaborationRequests.filter(
            request => request.toId === userId || request.fromId === userId
        );
    }, [collaborationRequests]);

    // Get projects by creator
    const getProjectsByCreator = useCallback((creatorId) => {
        return projects.filter(p => p.creatorId === creatorId);
    }, [projects]);

    // Get community posts by author
    const getCommunityPostsByAuthor = useCallback((authorId) => {
        return communityPosts.filter(p => p.authorId === authorId);
    }, [communityPosts]);

    // Get freelancing listings by creator
    const getFreelancingListingsByCreator = useCallback((creatorId) => {
        return freelancingListings.filter(l => l.creatorId === creatorId);
    }, [freelancingListings]);

    const value = {
        founders,
        posts,
        buildUpdates,
        connections,
        projects,
        communityPosts,
        freelancingListings,
        collaborationRequests,
        currentFounder,
        updateFounderProfile,
        addFounder,
        addPost,
        addBuildUpdate,
        sendConnectionRequest,
        getPostsByFounder,
        getBuildUpdatesByFounder,
        getFeedItems,
        searchFounders,
        addProject,
        addCommunityPost,
        addFreelancingListing,
        addCollaborationRequest,
        getProjectsByCreator,
        getCommunityPostsByAuthor,
        getFreelancingListingsByCreator,
        getCollaborationRequestsForSource,
        getCollaborationRequestsForUser
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};
