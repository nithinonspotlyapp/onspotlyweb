# Onspotly - PRD

## Problem Statement
Build Onspotly landing page - an Uber-style real-time creator booking platform where users book nearby content creators who shoot, edit, and deliver reels within 30 minutes.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Styling**: Dark theme (#050505), glassmorphism, violet-to-pink gradient accents, Manrope + DM Sans fonts

## Core Requirements
- Hero with strong startup messaging and CTAs
- 7-step "How It Works" visual workflow
- Target audience cards (5 categories)
- Before/After feature comparison (4 features) - centered, animated headers
- 3-tier pricing ($49, $129, $199)
- US Map with 5 launch cities (Charlotte, Raleigh, Austin, Dallas, Houston)
- Shooter application form (saves to MongoDB + Airtable)
- Early access waitlist form (saves to MongoDB + Airtable)
- Privacy Policy page (full 10-section legal content)
- Terms of Service page (full 11-section legal content)
- 404 Not Found page with animation
- Terms & Privacy checkbox on both forms
- Mobile-first responsive design

## What's Been Implemented (Dec 2025 - Mar 2026)
- Multi-page architecture: /, /how-it-works, /features, /pricing, /cities, /become-shooter, /join, /privacy, /terms
- Custom reel-scrolling page transition
- Backend API: POST /api/waitlist, GET /api/waitlist/count, POST /api/shooter-apply
- All forms with MongoDB + Airtable sync
- Airtable: Waitlist (Name, Email, City) / Shooter (Name, Email, Phone Number, Portfolio Link, Experience, City, Device Type)
- Dark glassmorphism design, Framer Motion animations
- Mobile responsive (verified at 390x844)
- Terms of Service + Privacy Policy pages (full legal content)
- 404 page with animated gradient + floating particles
- Terms & Privacy checkbox on both forms
- Animated "Thank You for Joining Onspotly!" message
- City field + Device Type dropdown (iPhone 13–17 Pro Max) on shooter form
- Centered Before/After headers with animated fonts on Features page
- Footer Legal section with Terms + Privacy links
- Contact email: support@onspotlyapp.com across all pages
- EST timezone for all timestamps
- Waitlist counter removed
- All tests passing (100% backend 9/9, 100% frontend) - verified Mar 2026

## Key API Endpoints
- POST /api/waitlist - Join waitlist (name, email, city)
- GET /api/waitlist/count - Get waitlist count
- POST /api/shooter-apply - Apply as shooter (name, email, phone, portfolio_link, experience_years, city, device_type)

## Airtable Schema
- **Waitlist Base** (applhmWVQ5dU6HADJ): Name, Email, City
- **Shooter Base** (appXMxTv80BoZiQKL): Name, Email, Phone Number, Portfolio Link, Experience, City, Device Type

## Prioritized Backlog
### P1 (High Priority)
- Admin dashboard for waitlist entries and shooter applications
- Email notifications on form submission
- SEO meta tags and Open Graph tags

### P2 (Medium Priority)
- Animated visual explainer
- Interactive before/after slider
- Google Analytics / event tracking
- App store pre-registration links

### P3 (Nice to Have)
- Blog/content section
- Testimonials section
- FAQ section
- Multi-language support
