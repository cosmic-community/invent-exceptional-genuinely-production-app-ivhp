# Invent Studio

![App Preview](https://imgix.cosmicjs.com/bf96f430-be23-11f1-924b-b139f42c65c9-autopilot-photo-1519681393784-d120267933ba-1790919617259.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A cinematic, premium launch-film showcase site for an invented-product studio, built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🎬 Full-bleed homepage hero featuring the latest product and launch film
- 💡 Products index and detail pages with identity, features, and linked films
- 🎞️ Film detail pages presented as a shot-by-shot storyboard timeline
- 🕰️ Nested shots view with timecodes, camera notes, voiceover, and sound design
- 🌑 Dark, atmospheric, editorial visual language with amber & teal accents
- ✨ Subtle film-grain texture and slow scroll-triggered fade/slide-in motion
- 📱 Fully responsive across mobile, tablet, and desktop

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6abf437059463ea225ace8a7&clone_repository=6abf46db59463ea225ace924)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for: Invent an exceptional, genuinely original, highly desirable digital product entirely from scratch and then create an extraordinarily polished, cinematic, premium-quality 16:9 advertisement for it. Do not wait for a predefined concept, product category, visual style, application, framework, or production method — you have complete creative freedom. First think deeply about what kind of product would feel genuinely relevant, useful, exciting, technologically advanced, commercially attractive, memorable, and believable today; research current technology, product, design, startup, AI, software, marketplace, consumer, interface, advertising, motion-design, VFX, 3D, typography, cinematography, and creative trends, identify what already feels overused or generic, explore several radically different directions, challenge them critically, combine the strongest ideas, and select the concept with the greatest creative and visual potential. If useful, spawn multiple sub-agents to independently invent concepts, research references, critique ideas, propose visual systems, develop motion language, and improve the final direction before anything is implemented. Then fully define the product yourself — its name, purpose, core experience, interface, identity, positioning, key features, emotional appeal, visual language, and the specific reason someone should immediately care about it — and build a spectacular approximately 22–25 second product reveal around that idea. The result should feel like a world-class launch film produced by an elite motion-design, VFX, CGI, product-design, and creative-direction studio: sophisticated, elegant, cinematic, intelligent, futuristic without being cliché, visually rich without becoming chaotic, technically impressive without becoming meaningless, beautifully art-directed, extremely detailed, cohesive, atmospheric, confident, and exceptionally refined. Use whatever techniques genuinely improve the concept: premium 3D objects, dimensional interfaces, procedural animation, cinematic camera movement, depth, perspective, realistic materials, glass, reflections, shadows, volumetrics, particles, typography, cursor interactions, spatial UI, transformations, simulations, abstract geometry, macro shots, product cinematics, fluid transitions, motion blur, dynamic lighting, micro-interactions, compositing, environmental effects, or completely new visual ideas of your own. There is no required software or implementation approach — choose whatever pipeline, technology, code, rendering technique, framework, or combination of methods produces the strongest possible result. Every visual decision should serve the concept rather than exist only to demonstrate an effect. Do not copy an existing advertisement, template, company, or visual identity; study excellent references only to understand why they work, then reinterpret, remix, evolve, and invent something distinct. Pay particular attention to pacing: do not make the common mistake of switching shots excessively fast. Important typography, interface moments, product ideas, and hero visuals must remain visible long enough for a normal viewer to clearly read, understand, appreciate, and emotionally register them. Build deliberate rhythm, progression, anticipation, contrast, escalation, memorable reveals, a strong climax, and a satisfying final product moment. Create equally sophisticated sound design and a distinctive, natural, premium voiceover with thoughtful pauses, emphasis, timing, personality, and synchronization rather than generic advertising narration. Treat every frame, movement, transition, word, camera angle, object, material, lighting choice, interaction, sound, and micro-detail as intentional. Research extensively, experiment aggressively, reject mediocre ideas, iterate repeatedly, critique your own work, improve weak sections, and fully implement the strongest concept you can produce. The goal is not simply to demonstrate a fictional product or create a visually attractive animation; the goal is to invent something that feels surprisingly real, valuable, contemporary, original, technologically ambitious, culturally relevant, commercially compelling, and visually unforgettable, then introduce it through an advertisement so sophisticated and beautifully executed that it could plausibly be mistaken for the flagship launch film of a major next-generation technology company.

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "invent-exceptional-genuinely-production-app-ivhp". The content is managed in Cosmic CMS with the following object types: products, films, shots. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A cinematic, premium launch-film showcase site for an invented-product studio. Content types already exist: Products (invented digital products with tagline, description, brand color), Films (launch films/teasers linked to products, with runtime, aspect ratio, end card, sound and visual direction), and Shots (individual shots in a film with timing, camera movement, voiceover line, sound design). Pages: a home page with a full-bleed hero featuring the latest product and film; a Products index and product detail pages showing the product's identity, features, and its films; Film detail pages presenting the film as a shot-by-shot storyboard timeline (timecodes, camera notes, voiceover lines, sound design); and a Shots view nested within each film. Visual style: dark, atmospheric, editorial and cinematic: deep near-black backgrounds, warm amber and deep teal accents, generous whitespace, elegant large typography, subtle film-grain texture, smooth slow fade/slide-in motion, fully responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, React Server Components
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) — strict typing throughout
- [Tailwind CSS](https://tailwindcss.com/) — custom cinematic design system
- [Cosmic](https://www.cosmicjs.com) — headless CMS powering all content

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `products`, `films`, and `shots` object types

### Installation

```bash
bun install
```

Create the required environment variables (see the Environment Variables panel) with your Cosmic bucket credentials, then run:

```bash
bun run dev
```

Visit `http://localhost:3000` to view the app.

## Cosmic SDK Examples

```typescript
// Fetch all films with their linked product resolved
const response = await cosmic.objects
  .find({ type: 'films' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch shots belonging to a specific film
const shots = await cosmic.objects
  .find({ type: 'shots', 'metadata.film': filmId })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three connected object types in your bucket:

- **Products** — `name`, `tagline`, `description`, `concept_status`, `key_features`, `brand_color`, `hero_image`
- **Films** — `product` (object relation), `runtime`, `aspect_ratio`, `end_tagline`, `sound_direction`, `visual_system`
- **Shots** — `film` (object relation), `shot_number`, `start_time`, `duration`, `camera`, `visual_description`, `onscreen_text`, `voiceover`, `sound_design`, `frame_reference`

Learn more about querying connected objects in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy

<!-- README_END -->