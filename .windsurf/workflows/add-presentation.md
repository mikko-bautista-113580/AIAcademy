---
description: How to add a new PowerPoint presentation to the AI Academy application
---

# Add New Presentation

When the user asks to add a new presentation/slide deck, follow these steps exactly.

**Project**: `c:\neldevsrc\Github\AIAcademy`

---

## Required Information from the User

Before starting, gather the following (or infer from the message):
- **Title** — display name
- **Subtitle** — short secondary label
- **Description** — what the presentation covers
- **PPTX filename** — the PowerPoint file name (e.g. `MyPresentation.pptx`)
- **Slide count** — total number of slides
- **Category** — one of: `AI Models & Selection`, `Productivity & Workflows`, `DevOps & CI/CD`, `Code Generation` (or a new one)
- **Roles** — which roles should see it: `QA`, `BA`, `Developer`, `Technical Lead`, `Management`
- **Tags** — keyword labels for the card
- **Icon** — emoji representing the presentation
- **Date** — when it was created

---

## Step 1: Add Slide Images

The user must provide the slide PNGs exported from their PPTX. Place them in:

```
public/slides/<presentation-id>/slide-1.png
public/slides/<presentation-id>/slide-2.png
...
public/slides/<presentation-id>/slide-N.png
```

- The folder name is the `id` (kebab-case of the title)
- Files must be named `slide-1.png` through `slide-N.png` (1-indexed)
- The `slideCount` field in the data must match the number of PNGs
- The first slide (`slide-1.png`) is used as the card thumbnail automatically

Also place the PPTX file in the `public/` directory for download functionality.

---

## Step 2: Add the Presentation to `presentations.ts`

File: `src/app/pages/presentations/presentations.ts`

Add a new `Presentation` object to the `presentations` array:

```typescript
{
  id: '<presentation-id>',
  title: '<Title>',
  subtitle: '<Subtitle>',
  description: '<Description>',
  filename: '<filename>.pptx',
  slidesPath: 'slides/<presentation-id>',
  slideCount: <N>,
  date: '<Date>',
  icon: '<emoji>',
  gradient: 'from-<color>-500 to-<color>-700',
  tags: ['<Tag1>', '<Tag2>', ...],
  workflowCreator: 'Cascade (Windsurf IDE)',
  category: '<Category>',
  roles: ['<Role1>', '<Role2>', ...],
}
```

### If using a NEW category:
Add it to the `categoryMeta` object (~line 231):
```typescript
'<New Category>': { icon: '<emoji>', color: 'bg-<color>-100 text-<color>-700 border-<color>-200', activeGradient: 'from-<color>-500 to-<color>-700' },
```

---

## Step 3: Update Presentation Counts on Landing Page (CRITICAL)

File: `src/app/pages/landing/landing.ts`

**Unlike demos, presentation counts are MANUAL and hardcoded.** You must update them.

### 3a. Update `presentationCountByRole` (~line 377)

```typescript
private presentationCountByRole: Record<Role, number> = {
  'QA': <count>, 'BA': <count>, 'Developer': <count>, 'Technical Lead': <count>, 'Management': <count>,
};
```

To calculate the correct count per role, count all presentations in `presentations.ts` where that role is in the `roles` array.

### 3b. Update the default total (~line 403)

```typescript
this.presentationCount = role ? this.presentationCountByRole[role] : <total>;
```

The default (no role selected) should equal the **total** number of presentations.

### Where counts are displayed (all in `landing.html`):
1. **Hero stats bar** (~line 78): `{{ presentationCount }}` — Presentations
2. **Developer floating card** (~line 393): `{{ presentationCount }} Slides`
3. **Explore Our Content card** (~line 592): `{{ presentationCount }} Slides`

All three read from the same `presentationCount` property, so updating Step 3a and 3b is sufficient.

---

## Step 4: (Optional) Add as Topic Highlight on Landing Page

If the presentation should appear in the **Topics Carousel** on the landing page hero section, add it to the `topicHighlights` array in `landing.ts` (~line 185):

```typescript
{
  id: '<presentation-id>',
  title: '<Title>',
  subtitle: '<Subtitle>',
  description: '<Short description>',
  icon: '<emoji>',
  category: '<Category>',
  categoryIcon: '<category emoji>',
  gradient: 'from-<color>-500 to-<color>-600',
  tags: ['<Tag1>', '<Tag2>'],
  slidesPath: 'slides/<presentation-id>',
  slideCount: <N>,
  route: '/presentations',
  roles: ['<Role1>', '<Role2>', ...],
}
```

Then add the `id` to the `topicOrder` array for each applicable role in `roleContentMap`:
- `QA.topicOrder` → line ~92
- `BA.topicOrder` → line ~112
- `Developer.topicOrder` → line ~132
- `Technical Lead.topicOrder` → line ~152
- `Management.topicOrder` → line ~172

---

## Quick Reference: Existing Presentations

| ID | Category | Roles | Slides |
|---|---|---|---|
| `nov23` | AI Models & Selection | All | 25 |
| `sep16` | AI Models & Selection | All | 26 |
| `workflow-creator` | Productivity & Workflows | Dev, TL | 10 |
| `estimated-time` | Productivity & Workflows | BA, TL, Mgmt | 15 |
| `model-to-use` | AI Models & Selection | All | 14 |
| `pr-roadmap` | DevOps & CI/CD | Dev, TL | 1 |
| `test-case-association` | DevOps & CI/CD | QA, BA, TL | 11 |
| `gw-endpoint-generator` | Code Generation | Dev, TL | 8 |
| `microservice-endpoint-generator` | Code Generation | Dev, TL | 8 |
| `github-pr-reviewer` | DevOps & CI/CD | Dev, TL | 13 |
| `requirements-to-test-case` | DevOps & CI/CD | QA, BA | 13 |
| `test-suite-creator` | DevOps & CI/CD | QA, TL | 11 |

## Quick Reference: Current Counts per Role

| Role | Count |
|---|---|
| QA | 6 |
| BA | 6 |
| Developer | 8 |
| Technical Lead | 11 |
| Management | 4 |
| Default (no role) | 12 |

## Quick Reference: Categories

| Category | Icon | Existing Count |
|---|---|---|
| AI Models & Selection | 🧠 | 3 |
| Productivity & Workflows | ⚡ | 2 |
| DevOps & CI/CD | 🔄 | 5 |
| Code Generation | 💻 | 2 |

---

## Checklist

- [ ] Slide PNGs placed in `public/slides/<id>/` (slide-1.png through slide-N.png)
- [ ] PPTX file placed in `public/` for download
- [ ] Presentation object added to `presentations` array in `presentations.ts`
- [ ] If new category: added to `categoryMeta` in `presentations.ts`
- [ ] `presentationCountByRole` updated in `landing.ts` for each affected role
- [ ] Default total count updated in `landing.ts`
- [ ] (Optional) Added to `topicHighlights` array in `landing.ts`
- [ ] (Optional) Added to `topicOrder` per role in `landing.ts`
