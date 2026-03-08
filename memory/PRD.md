# Onspotly - PRD

## Problem Statement
Build Onspotly landing page - an Uber-style real-time creator booking platform where users book nearby content creators who shoot, edit, and deliver reels within 30 minutes.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Styling**: Dark theme (#050505), glassmorphism, violet-to-pink gradient accents, Manrope + DM Sans fonts

## User Personas
1. **Event Organizers** - Need last-minute content for parties/celebrations
2. **Small Businesses** - Restaurants, cafes, retail shops needing daily reels
3. **Social Media Creators** - Influencers needing frequent content
4. **Corporate** - Product launches, team events
5. **Wedding Planners** - Behind-the-scenes coverage
6. **Content Creators (Shooters)** - Freelancers wanting to earn by shooting

## Core Requirements
- Hero with strong startup messaging and CTAs
- 7-step "How It Works" visual workflow
- Target audience cards (5 categories)
- Before/After feature comparison (4 features)
- 3-tier pricing ($49, $129, $199)
- US Map with 5 launch cities (Charlotte, Raleigh, Austin, Dallas, Houston)
- Shooter application form (saves to MongoDB)
- Early access waitlist form (saves to MongoDB)
- Privacy policy page
- Smooth scroll navigation, animations, mobile responsive

## What's Been Implemented (Dec 2025)
- Full landing page with all 9 sections + Privacy Policy route
- Backend API: POST /api/waitlist, GET /api/waitlist/count, POST /api/shooter-apply
- All forms functional with MongoDB persistence
- Dark glassmorphism design with gradient accents
- Framer Motion scroll animations throughout
- Mobile responsive with hamburger menu
- SVG US Map with animated city markers
- All tests passing (100% backend, 100% frontend)

## Prioritized Backlog
### P0 (Launch Blockers) - DONE
- All sections implemented and tested

### P1 (High Priority)
- Admin dashboard to view waitlist entries and shooter applications
- Email notifications on form submission (to hello@onspotlyapp.com)
- SEO meta tags and Open Graph tags

### P2 (Medium Priority)
- Animated visual explainer (Customer > Booking > Creator > Delivery)
- Interactive before/after slider comparison
- Google Analytics / event tracking
- App store pre-registration links

### P3 (Nice to Have)
- Blog/content section
- Testimonials section
- FAQ section
- Multi-language support
