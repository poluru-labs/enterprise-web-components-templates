# CampusOne

Campus administration workspace for **Westbridge University**, main campus. Light theme, brand `#EBCB90`, hash routing.

Signed in as **Mira Poluru**, Campus administrator. Demo people use the surname **Poluru**. Term: **Fall semester 2026** (Sep 01 – Dec 18), week 3 of 16. Snapshot date: **Wednesday, September 16, 2026**.

## Screenshot

<img width="3360" height="3598" alt="enterprise-education-admin" src="https://github.com/user-attachments/assets/a7d7c48b-1a1d-4cf9-88e5-f3047d994cdb" />


## Run

Requires Node.js 20+.

```bash
cd enterprise-education-admin
npm install
npm run dev
```

Dev server: http://localhost:5178

Preview build: `npm run build && npm run preview` → http://localhost:4178

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (port 5178) |
| `npm run build` | Production build (`base: './'`) |
| `npm run preview` | Preview build (port 4178) |
| `npm test` | Vitest unit tests |

## Workspace

`src/main.js` loads design-system tokens and mounts `<campus-app>`. The sidebar lists Overview through Academic outcomes, plus the fall-semester progress card and Mira Poluru. The top bar shows Main campus, an **Explore campus** menu, search (`⌘K`), and notifications. **Enroll student** and **Export report** sit on every page heading.

## Routes

| Hash | View |
| --- | --- |
| `#/overview` | Enrollment, attendance, recent students, programs, and upcoming events |
| `#/students` | Student directory with search and status filters |
| `#/courses` | Computer Science, Business Administration, Mechanical Engineering, Visual Communication |
| `#/enrollment` | Intake register |
| `#/attendance` | Attendance by student |
| `#/faculty` | Department chairs and office hours |
| `#/outcomes` | Graduation progress by program |
| `#/calendar` | September 2026 academic calendar |
| `#/reports` | CSV downloads for enrollment, attendance, outcomes, and programs |
| `#/settings` | Campus name, term, and notification preferences |
| `#/help` | How enrollment and export work in this sample |

## Demo behavior

Enrolling a student needs a full name and a valid email. The new record appears in the directory for this browser session and is not written to `localStorage`. Search and status filters combine. Opening a student shows program, year, attendance, and faculty advisor.

Campus name, term, and notification switches persist in this browser under `campusone-preferences`. Overview figures — **8,542** students, **148** active courses, **94.6%** attendance, **92.8%** graduation rate — are a fixed Fall 2026 snapshot and are not recalculated from the eight sample enrollments. No student-information system is connected.

## Tests

Vitest + jsdom covers the campus menu, enrollment validation, combined search and status filters, every navigation destination, a student profile, and the author footer:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
