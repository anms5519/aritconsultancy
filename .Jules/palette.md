## 2026-02-24 - [Tailwind Play CDN and Dynamic Classes]
**Learning:** This project uses the Tailwind Play CDN script which uses MutationObserver to detect new classes. However, relying on this for production builds (if they ever switch) would be risky without safelisting. Currently, classes like `text-brand-500` work because they are either observed or already used in the HTML (e.g., in the Stats section).
**Action:** When adding dynamic classes, verify they are either used elsewhere or would be picked up by the environment's build tool/script.
