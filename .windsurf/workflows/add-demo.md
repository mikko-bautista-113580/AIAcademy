---
description: How to add a new demo video to the AI Academy application
---

# Add New Demo Video

When the user asks to add a new demo recording/video, follow these steps exactly.

**Project**: `c:\neldevsrc\Github\AIAcademy`

---

## Required Information from the User

Before starting, gather the following from the user (or infer from their message):
- **Title** — short display name for the demo
- **Video URL** — SharePoint embed URL
- **Description** — what the demo covers (can be generated from a transcript if provided)
- **Roles** — which roles should see this demo: `QA`, `BA`, `Developer`, `Technical Lead`, `Management`
- **Tag** — tool label (e.g. `Windsurf`, `CoPilot`, `Diagrams`)
- **Icon** — emoji representing the demo

---

## Step 1: Create the SVG Thumbnail

Create a new SVG file at `public/demos/<demo-id>.svg` in **both projects**.

### SVG Template Rules
- ViewBox: `0 0 800 450`
- Dark background gradient: `#0f172a` → `#1e293b`
- Subtle glow circles using the tag's accent color at low opacity
- Left panel: simulated editor/tool UI with dark cards, code snippets, or process steps
- Right panel: visualization or output relevant to the demo
- Bottom: title text (white, 22px bold) and subtitle (slate, 13px)
- Bottom-right: colored tag badge (rounded pill, emoji + tool name)
- Use the same style as existing SVGs (e.g. `codemap-workflows.svg`, `api-endpoint.svg`)
- Color palette per tag:
  - **Windsurf**: cyan `#06b6d4` / `#67e8f9`
  - **CoPilot**: green `#22c55e` / `#86efac`
  - **Diagrams**: violet `#8b5cf6` / `#c4b5fd`
  - New tags: pick a distinct Tailwind color

---

## Step 2: Add the Demo to `landing.ts`

File: `src/app/pages/landing/landing.ts`

### 2a. Add to `demoVideos` array

Add a new `DemoVideo` object to the `demoVideos` array. Follow this structure:

```typescript
{
  id: '<demo-id>',
  title: '<Title>',
  thumbnail: 'demos/<demo-id>.svg',
  description: '<Description>',
  src: '',
  embedUrl: '<SharePoint URL>',
  icon: '<emoji>',
  tag: '<Tag>',
  tagClass: 'bg-<color>-500/15 text-<color>-500',
  roles: ['<Role1>', '<Role2>', ...],
}
```

### 2b. Add to `videoOrder` per role

For each role listed in the demo's `roles` array, add the demo `id` to that role's `videoOrder` array inside `roleContentMap`. Place it in the appropriate position based on relevance:
- For the **most relevant** role, place it near the beginning
- For **less relevant** roles, place it toward the end

The 5 roles and their `videoOrder` arrays are in `roleContentMap`:
- `QA` → line ~93
- `BA` → line ~113
- `Developer` → line ~133
- `Technical Lead` → line ~153
- `Management` → line ~173

**Only add to roles that are in the demo's `roles` array.**

---

## Step 3: Verify Demo Counts on Landing Page

The demo count is displayed in **three places** on the landing page (`landing.html`). All three use `filteredDemos.length` which updates automatically since `filteredDemos` is computed from the `demoVideos` array filtered by role. **No manual count update is needed for demos.**

However, verify these elements still render correctly:
1. **Hero stats bar** (~line 70): `{{ filteredDemos.length }}` — Demos count
2. **Developer floating card** (~line 368): `{{ filteredDemos.length }} Videos` — floating badge
3. **Explore Our Content section** (~line 564): `{{ filteredDemos.length }} Videos` — card badge

These are all dynamic and will auto-update. No code change needed here — just confirm visually after adding the demo.

---

## Quick Reference: Existing Demos

| ID | Tag | Roles |
|---|---|---|
| `api-endpoint` | Windsurf | Developer, Technical Lead |
| `api-user-stories` | Windsurf | BA, QA, Developer, Technical Lead |
| `user-story-copilot` | CoPilot | BA, QA, Management |
| `mermaid-ai` | Diagrams | Developer, BA, Technical Lead |
| `codemap-workflows` | Windsurf | Developer, Technical Lead, BA |

## Quick Reference: Tag Classes

| Tag | tagClass |
|---|---|
| Windsurf | `bg-primary/15 text-primary` or `bg-cyan-500/15 text-cyan-500` |
| CoPilot | `bg-green-500/15 text-green-500` |
| Diagrams | `bg-violet-500/15 text-violet-500` |

---

## Checklist

- [ ] SVG thumbnail created in `public/demos/`
- [ ] Demo object added to `demoVideos` array in `landing.ts`
- [ ] Demo ID added to `videoOrder` for each applicable role in `landing.ts`
