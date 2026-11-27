<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All portfolio content (profile, skills, projects, certificates, nav) lives in `src/data/portfolio.ts`; sections in `src/components/portfolio/` only render it. Why: one place to add repo links, screenshots and certificates.
- Missing assets are `null` in that file (photo, screenshot, repoUrl, liveUrl, certificate image) and the UI shows an honest "coming soon" state. Why: the owner forbids invented links, screenshots or details.
- Theme: `dark` class on `<html>` is the default; the inline script in `src/routes/__root.tsx` applies the saved `localStorage.theme`, else the system theme. Colors are tokens in `src/styles.css` (`:root` = light, `.dark` = dark). Why: avoids a theme flash on load.
- The contact form has no server: `src/lib/contact.ts` validates and builds a mailto link. Why: the owner asked for no pretend backend; swap `buildMailto` for a real send only when one exists.
- Timed animations (hero typing) need a visible pause button and must not start under prefers-reduced-motion.
