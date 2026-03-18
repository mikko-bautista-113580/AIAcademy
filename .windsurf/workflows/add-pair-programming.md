---
description: How to add a new pair programming session to the AI Academy application
---

# Add New Pair Programming Session

When the user asks to add a new pair programming recording/session, follow these steps exactly.

**Project**: `c:\neldevsrc\Github\AIAcademy`

---

## Required Information from the User

Before starting, gather the following (or infer from the message):
- **Presenter name** — who led the session
- **Video URL** — SharePoint embed URL
- **Date** — when the session was recorded
- **Transcript** — the user will provide a transcript; generate the description from it
- **Roles** — which roles should see it: `QA`, `BA`, `Developer`, `Technical Lead`, `Management`
- **Icon** — emoji representing the session (default: `👨‍💻`)

---

## Step 1: Create the SVG Thumbnail

Create a new SVG file at `public/demos/pp-<presenter-kebab>.svg`.

### SVG Template Rules
- ViewBox: `0 0 800 450`
- Dark background gradient: `#0f172a` → `#1e293b`
- Subtle glow circles at low opacity
- **Layout**: show panels representing the tools/IDEs used in the session (e.g. Visual Studio, Windsurf, Azure DevOps)
- Each panel: dark card with title bar (traffic light dots), content showing workflow steps, code snippets, or work items relevant to what the presenter did
- Bottom banner: context bar describing the project type or key technique
- Connecting dashed arrows between panels to show flow
- **Title**: `Pair Programming — <Presenter Name>` (white, 22px bold)
- **Subtitle**: key tools/concepts separated by bullets (slate, 13px)
- **Date badge**: bottom-center colored pill with `📅 <Date>`
- Use the same style as `pp-mark-echon.svg` — reference it for exact sizing, colors, and layout

### Gradient colors per session (rotate through these):
- Session 1 (mark-echon): `#3b82f6` / `#8b5cf6` (blue/violet)
- Session 2 (armando-lopez): `#8b5cf6` / `#a855f7` (violet/purple)
- Session 3 (alberto-terol): `#10b981` / `#14b8a6` (emerald/teal)
- New sessions: pick a distinct Tailwind color pair not yet used

### Customizing per presenter
Study the transcript to determine:
- Which IDEs/tools were used → show as panels
- Key workflow steps → list inside the tool panel
- What was produced (work items, code, docs) → show in output panel
- Project context → bottom banner text

---

## Step 2: Generate the Description from Transcript

The user will provide a transcript of the session. Analyze it and write a concise, professional description (2-4 sentences) covering:
- What the session demonstrates
- Which tools/techniques are used
- Key takeaways or workflows shown
- Project context if relevant

Follow the style of existing descriptions (see Quick Reference below).

---

## Step 3: Add the Recording to `pairprogramming.ts`

File: `src/app/pages/pairprogramming/pairprogramming.ts`

Add a new `Recording` object to the `recordings` array:

```typescript
{
  id: '<presenter-kebab>',
  title: 'AI SDLC - Pair Programming',
  presenter: '<Presenter Name>',
  thumbnail: 'demos/pp-<presenter-kebab>.svg',
  date: '<Month Day, Year>',
  filename: '',
  embedUrl: '<SharePoint URL>',
  description: '<Generated from transcript>',
  gradient: 'from-<color>-500 to-<color>-700',
  icon: '<emoji>',
  roles: ['<Role1>', '<Role2>', ...],
}
```

**Note**: Do NOT add `hidden: true` unless the user explicitly asks to hide the session.

---

## Step 4: Update Pair Programming Count on Landing Page (CRITICAL)

File: `src/app/pages/landing/landing.ts`

### 4a. Update `pairProgrammingCount` (~line 402)

```typescript
this.pairProgrammingCount = <new count>;
```

This is a hardcoded value. Set it to the number of **visible** (non-hidden) recordings in `pairprogramming.ts`.

### Where the count is displayed (all in `landing.html`):
1. **Hero stats bar** (~line 74): `{{ pairProgrammingCount }}` — Pair Programming
2. **Developer floating card** (~line 381): `{{ pairProgrammingCount }} Session(s)`
3. **Explore Our Content card** (~line 578): `{{ pairProgrammingCount }} Session(s)`

All three read from the same `pairProgrammingCount` property.

---

## Step 5: (Optional) Add as Topic Highlight on Landing Page

If the session should appear in the **Topics Carousel**, add it to `topicHighlights` array in `landing.ts` (~line 185):

```typescript
{
  id: '<presenter-kebab>',
  title: 'AI SDLC Pair Programming',
  subtitle: '<Presenter Name> - Live Session',
  description: '<Short description>',
  icon: '<emoji>',
  category: 'Pair Programming',
  categoryIcon: '🤝',
  gradient: 'from-<color>-500 to-<color>-700',
  tags: ['SDLC', 'AI', 'Live Coding'],
  slidesPath: '',
  slideCount: 0,
  route: '/pair-programming',
  roles: ['<Role1>', '<Role2>', ...],
}
```

Then add the `id` to `topicOrder` for each applicable role in `roleContentMap`:
- `QA.topicOrder` → line ~92
- `BA.topicOrder` → line ~112
- `Developer.topicOrder` → line ~132
- `Technical Lead.topicOrder` → line ~152
- `Management.topicOrder` → line ~172

---

## Quick Reference: Existing Recordings

| ID | Presenter | Gradient | Hidden | Roles |
|---|---|---|---|---|
| `mark-echon` | Mark Echon | `from-primary to-primary-dark` | No | All |
| `armando-lopez` | Armando Lopez Jr. | `from-violet-500 to-violet-700` | Yes | All |
| `alberto-terol` | Alberto Terol | `from-emerald-500 to-emerald-700` | Yes | All |

## Quick Reference: Existing Descriptions (style guide)

- **Mark Echon**: "Explores using Windsurf workflows to automate API and user story creation from standardized templates. Covers setting up MCP for Azure DevOps integration, creating service architecture documentation, generating research and implementation plans step-by-step, and using dual IDEs (Visual Studio for building, Windsurf for AI workflows) on legacy .NET Framework enterprise projects."
- **Armando Lopez**: "Demonstrates using Windsurf AI workflows for bug investigation on a .NET API project. Walks through creating service overview documentation, research documents, and implementation plans — reviewing each step before proceeding. Discusses separating workflows from rules for better AI comprehension, using different models (Gemini 2.5 Pro for documentation, SWE-4.5 for coding, thinking model for workflow creation), and troubleshooting MCP connection issues."

## Quick Reference: Recording Interface

```typescript
interface Recording {
  id: string;
  title: string;
  presenter: string;
  date: string;
  filename: string;
  embedUrl?: string;
  thumbnail?: string;
  description: string;
  gradient: string;
  icon: string;
  roles: Role[];
  hidden?: boolean;
}
```

## Quick Reference: Pair Programming Page Filtering

```typescript
filteredRecordings = computed(() => {
  const role = this.roleService.selectedRole();
  if (!role) return this.recordings.filter(r => !r.hidden);
  return this.recordings.filter(r => !r.hidden && r.roles.includes(role));
});
```

Sessions with `hidden: true` are excluded from display. Role filtering applies on top of that.

---

## Checklist

- [ ] SVG thumbnail created at `public/demos/pp-<presenter-kebab>.svg`
- [ ] Description generated from the provided transcript
- [ ] Recording object added to `recordings` array in `pairprogramming.ts`
- [ ] `pairProgrammingCount` updated in `landing.ts` (count of visible sessions)
- [ ] (Optional) Added to `topicHighlights` array in `landing.ts`
- [ ] (Optional) Added to `topicOrder` per role in `landing.ts`
