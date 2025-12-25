# 7 Wonders — Explore Ancient Marvels

A clean, responsive static site showcasing the Seven Wonders of the World. This project provides high-quality imagery, short historical summaries, and navigation to dedicated pages for each wonder. It includes a modern UI, accessibility-friendly layout, and a persistent light/dark theme toggle.

## Features

- Responsive layout built with semantic HTML and CSS
- High-quality hero imagery and interactive wonder cards
- Accessible navigation and search linking to specific wonder pages
- Persistent theme toggle (light / dark) stored in `localStorage`
- Progressive enhancement: graceful fallbacks for missing remote images
- Minimal vanilla JavaScript for animations, smooth scrolling, and UI interactions

## Project Structure

- `Index.html` — Home / landing page with hero and wonder grid
- `about.html` — About page with mission, tabs and developer info
- `Wall.html`, `Machu.html`, `Itza.html`, `Colosseum.html`, `Taj.html`, `Petra.html`, `Redeemer.html` — Individual wonder pages
- `Style.css` — Main stylesheet with theme variables and component rules
- `script.js` — Client-side behavior: search, theme toggle, animations
- `signup.html`, `login.html` — Authentication mock pages (static)

## Development

Requirements: a modern browser. To view locally, serve the folder and open `Index.html`:

```powershell
cd "c:\Users\HP\OneDrive\Documents\travel\7-wonders-"
python -m http.server 8000

# Then open http://localhost:8000/Index.html
```

## Theme & Customization

- The site defaults to the dark theme. A theme toggle appears in the navbar and stores the user's choice in `localStorage` under the key `site-theme`.
- Colors and spacing are controlled with CSS variables at the top of `Style.css`. Tweak those variables to adjust colors globally.

## Accessibility & Performance

- Images include `alt` attributes and data-URI fallbacks when remote images fail to load.
- Animations are implemented with performant transforms and a debounced scroll handler for low CPU usage.

## Contributing

If you'd like to contribute improvements (content, styling tweaks, accessibility fixes), please:

1. Fork the repo
2. Create a new branch for your feature or fix
3. Open a pull request describing the change

This is a static project — no build step is required.

## License & Credits

This project contains imagery loaded from external providers (Unsplash, Wikimedia Commons). Verify image licenses if you plan to redistribute.

Made with ❤️ for history enthusiasts.

