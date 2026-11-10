# The Himalayan Chapter

React and Vite hospitality site for The Himalayan Chapter and Nostalgia Co. Collective.

## Local development

```sh
pnpm install
pnpm dev
```

Create a production build with `pnpm build`. Vercel can deploy this Vite project from the repository root; `vercel.json` keeps the page routes working on refresh.

## Content updates

- WhatsApp contact, Instagram, Google Maps search, menu chapter labels and event listings live in `src/content.js`.
- Event listings are currently edited in `src/content.js` and deployed with the next Vercel build. WhatsApp is used for reservations and enquiries; it does not publish event updates automatically. Automatic WhatsApp publishing would need a WhatsApp Business Platform integration and an owner/admin destination.
- The four stay photographs, café photograph, event photographs and the menu PDF are in `public/assets/`. Original source images and the PDF were copied without editing.
- Opening hours and the exact street address are intentionally not stated until a reliable official listing or owner confirmation is available. The Visit page currently links to a Google Maps search for the café name and area.
