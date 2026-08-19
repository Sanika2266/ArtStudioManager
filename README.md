# ArtStudioManager

A full-stack Artist Portfolio & Studio Management app.
**Backend:** .NET 9 Web API + EF Core (Code-First) + SQL Server
**Frontend:** Angular + Tailwind CSS + TypeScript (optionally wrapped with Ionic for mobile)

This repo is set up as a **learning project** — every file has comments explaining *why*, not just *what*.

---

## 1. The Big Picture (Architecture)

```
[ Angular + Tailwind Frontend ]  <-- HTTP/JSON -->  [ .NET 9 Web API ]  <-- EF Core -->  [ SQL Server DB ]
   (runs on localhost:4200)                          (runs on localhost:7080)
```

- The **frontend** never talks to the database directly. It only calls the API over HTTP.
- The **API** is the only thing that talks to SQL Server.
- This separation (decoupled architecture) means you could later swap the frontend for a mobile app (Ionic) or a different UI, without touching the backend at all.

---

## 2. Database-First vs Code-First — which are we using, and why it matters

Your project docs mentioned "Code-First", but you asked for **Database-First**, so here's both, clearly:

| | Code-First | Database-First |
|---|---|---|
| You start by writing... | C# model classes | SQL `CREATE TABLE` scripts |
| EF Core generates... | The database, from your C# classes (via Migrations) | The C# classes + DbContext, from your database (via Scaffolding) |
| Good for | New projects, evolving schema in code | Projects where the DB schema is the source of truth (common in real companies with DBAs) |

**This repo uses Database-First**, meaning the real workflow is:

1. Write/run `Database/01_CreateDatabase.sql` against SQL Server — this is the actual source of truth.
2. Run this command to auto-generate `Models/` and the `DbContext` from that database:
   ```bash
   dotnet ef dbcontext scaffold "Server=localhost;Database=ArtStudioManagerDb;Trusted_Connection=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models -c ArtStudioManagerDbContext -f
   ```
3. In this starter repo, I've already written out what that command *would* generate (`Models/*.cs`, `Data/ArtStudioManagerDbContext.cs`) by hand, so you can read and learn from it directly. When you set this up for real, delete those files and run the scaffold command instead — compare the output, that's the best way to learn it.

---

## 3. Backend concepts, in the order they matter

1. **Models** (`Models/*.cs`) — plain C# classes, one per database table. EF Core uses these to know what your data looks like.
2. **DbContext** (`Data/ArtStudioManagerDbContext.cs`) — the object that represents "a connection + a set of tables" you can query with LINQ instead of raw SQL.
3. **DTOs** (`DTOs/Dtos.cs`) — separate, smaller classes used only for API input/output. **Never return your EF Models directly from a controller** — it causes circular JSON errors and leaks fields you don't want public.
4. **Controllers** (`Controllers/*.cs`) — the actual HTTP endpoints (`GET /api/artworks`, `POST /api/inquiries`, etc). Each action: reads request → talks to DbContext → maps to a DTO → returns it.
5. **Program.cs** — wires everything together: registers the DbContext, enables CORS (so Angular on a different port is allowed to call the API), enables Swagger (a built-in test UI at `/swagger`).

### API endpoints included
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/categories` | List categories with their price lists |
| POST/PUT/DELETE | `/api/categories/{id}` | Manage categories |
| GET/POST/PUT/DELETE | `/api/pricelists` | Manage A4/A3 pricing per category |
| GET | `/api/artworks?categoryId=&availableOnly=` | Public gallery + filtered admin view |
| POST/PUT/DELETE | `/api/artworks/{id}` | Manage artwork |
| GET/POST | `/api/inquiries` | Customer contact form → admin inbox |
| PATCH | `/api/inquiries/{id}/status` | Move inquiry New → InProgress → Completed |

### Running the backend
```bash
cd backend/ArtStudioManager.API
dotnet restore
dotnet run
# Swagger UI at https://localhost:7080/swagger
```

---

## 4. Frontend concepts, in the order they matter

1. **models.ts** — TypeScript interfaces mirroring the backend DTOs. Keep these two in sync manually as you build.
2. **services/*.service.ts** — one Angular service per resource, each just wraps `HttpClient` calls to the matching controller. Components never call `HttpClient` directly — always go through a service.
3. **components/** — standalone Angular components (Angular 17/18 style, no NgModules needed). `ArtworkCard` renders one artwork; `ArtworkGallery` fetches the list and renders many cards.
4. **Tailwind** — utility classes for styling, configured in `tailwind.config.js` with your exact pastel palette (blush, lavender, peach, cream, sage, mauve, etc.) so you just write `bg-blush text-mauve rounded-card shadow-card` instead of custom CSS.

### Running the frontend
```bash
cd frontend
npm install
npx ng add @angular/cli   # if starting from scratch — see roadmap Day 4
npm start
# App at http://localhost:4200
```

### Adding Ionic later (for a mobile app version)
Once the Angular app works, you can wrap it for mobile without rewriting anything:
```bash
npm install -g @ionic/cli
ionic init
ionic capacitor add android
ionic capacitor add ios
```
Ionic reuses your existing Angular components — you mostly just add Ionic's UI shell (tab bars, mobile navigation) around them.

---

## 5. Folder structure

```
ArtStudioManager/
├── backend/
│   └── ArtStudioManager.API/
│       ├── Database/01_CreateDatabase.sql   <- DB-First source of truth
│       ├── Models/                          <- EF entity classes
│       ├── Data/                            <- DbContext
│       ├── DTOs/                            <- API request/response shapes
│       ├── Controllers/                     <- REST endpoints
│       ├── Program.cs
│       └── appsettings.json
└── frontend/
    └── src/app/
        ├── models/       <- TypeScript interfaces
        ├── services/     <- HttpClient wrappers
        └── components/   <- UI (artwork-card, artwork-gallery, ...)
```

---


