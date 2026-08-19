# GitHub Roadmap — building & committing ArtStudioManager day by day

Important honesty note: Git records the **real date/time you commit**. You can't
genuinely "backdate" a public GitHub history without it looking fabricated (and
GitHub does flag suspiciously uniform backdated commits). The right way to get
a nice daily-progress history is simply: **actually commit at the end of each
day you work on it.** Below is a realistic day-by-day plan that produces a
natural, honest commit history — do one "day" per day and you'll have a great
looking repo in ~2 weeks.

---

## Day 0 — One-time setup

```bash
# from inside the ArtStudioManager folder
git init
git branch -M main

# create the repo on GitHub first (via github.com "New repository"),
# do NOT initialize it with a README there — then:
git remote add origin https://github.com/<your-username>/ArtStudioManager.git
```

---

## Day 1 — Project skeleton + docs
```bash
git add README.md GIT_ROADMAP.md .gitignore
git commit -m "Day 1: project overview, architecture docs, and roadmap"
git push -u origin main
```

## Day 2 — Database design (DB-First source of truth)
```bash
git add backend/ArtStudioManager.API/Database/01_CreateDatabase.sql
git commit -m "Day 2: database-first SQL schema (Categories, PriceLists, Artworks, Inquiries) + seed data"
git push
```

## Day 3 — EF Core models & DbContext
```bash
git add backend/ArtStudioManager.API/Models backend/ArtStudioManager.API/Data
git commit -m "Day 3: EF Core entity models and DbContext (scaffolded from DB-first schema)"
git push
```

## Day 4 — API project setup + DTOs
```bash
git add backend/ArtStudioManager.API/ArtStudioManager.API.csproj \
        backend/ArtStudioManager.API/Program.cs \
        backend/ArtStudioManager.API/appsettings.json \
        backend/ArtStudioManager.API/DTOs \
        backend/.gitignore
git commit -m "Day 4: Web API project setup, CORS, Swagger, and DTOs"
git push
```

## Day 5 — Categories & PriceLists controllers
```bash
git add backend/ArtStudioManager.API/Controllers/CategoriesController.cs \
        backend/ArtStudioManager.API/Controllers/PriceListsController.cs
git commit -m "Day 5: Categories and PriceLists REST endpoints (full CRUD)"
git push
```

## Day 6 — Artworks controller
```bash
git add backend/ArtStudioManager.API/Controllers/ArtworksController.cs
git commit -m "Day 6: Artworks endpoint with category filtering and availability filter"
git push
```

## Day 7 — Inquiries controller (backend done)
```bash
git add backend/ArtStudioManager.API/Controllers/InquiriesController.cs
git commit -m "Day 7: Inquiries endpoint with status workflow (New -> InProgress -> Completed)"
git push
```
👉 At this point, test everything in Swagger (`/swagger`) before moving to frontend.

## Day 8 — Angular project scaffolding
```bash
# ng new was already represented by the frontend/ folder here;
# if starting truly from scratch instead:
#   npx -p @angular/cli ng new artstudio-frontend --standalone --style=css
git add frontend/package.json frontend/tailwind.config.js frontend/.gitignore frontend/src/styles.css
git commit -m "Day 8: Angular project setup with Tailwind CSS configured to the pastel palette"
git push
```

## Day 9 — Models & services (frontend <-> API glue)
```bash
git add frontend/src/environments frontend/src/app/models frontend/src/app/services
git commit -m "Day 9: TypeScript models and API services for categories, artworks, price lists, inquiries"
git push
```

## Day 10 — ArtworkCard + ArtworkGallery components
```bash
git add frontend/src/app/components/artwork-card frontend/src/app/components/artwork-gallery
git commit -m "Day 10: ArtworkCard and ArtworkGallery components with hover states and empty/loading states"
git push
```

## Day 11 — CategoryCard + PriceCard components (build these next, following the same pattern)
```bash
git add frontend/src/app/components/category-card frontend/src/app/components/price-card
git commit -m "Day 11: CategoryCard and PriceCard components"
git push
```

## Day 12 — Hero section + Home page assembly
```bash
git add frontend/src/app/components  # after adding hero-section
git commit -m "Day 12: Hero section and public homepage layout"
git push
```

## Day 13 — Inquiry form (public contact form)
```bash
git commit -am "Day 13: Contact/inquiry form wired to POST /api/inquiries"
git push
```

## Day 14 — Admin dashboard shell (sidebar + stats)
```bash
git commit -am "Day 14: Admin dashboard sidebar navigation and stats cards"
git push
```

Keep going the same way for: ArtworkForm, ArtworkTable, InquiryCard, routing,
image upload, and (eventually) authentication for the admin area.

---

## Everyday habit (once past Day 14)
```bash
git status                     # see what changed
git add <files-you-touched>    # stage only what you actually finished
git commit -m "Clear description of what this commit adds"
git push
```

Tips:
- Commit **working, buildable code** — never commit something that doesn't compile.
- Small, frequent commits > one giant commit. It makes your GitHub activity graph honest and useful for future-you (and for anyone reviewing your work, e.g. recruiters).
- Use branches for bigger features once the basics are solid: `git checkout -b feature/admin-auth`.
