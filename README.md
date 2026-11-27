# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Updating the portfolio content

Everything shown on the site lives in `src/data/portfolio.ts`:

- **Photo, resume link, email, social links**: the `profile` object.
- **Projects**: add an entry to `projects`. Set `repoUrl` to the real GitHub URL once uploaded (until then the card shows "Repository Coming Soon"), `screenshot` to a real image, and `liveUrl` only for a real deployment.
- **Certificates**: set `image` on an entry in `certificates` to show the thumbnail and full-size viewer.
- **Contact form**: it opens the visitor's email app (no server). To send through a form service later, replace the `buildMailto` call in `src/components/portfolio/Contact.tsx` with a request to that service.
