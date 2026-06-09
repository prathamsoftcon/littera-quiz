import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/quiz/';

  return {
    base,
    plugins: [
      react(),
      // Inject a small script into index.html that strips the base prefix
      // from `location.pathname` before the React app initializes. This
      // allows existing route definitions (e.g. `/admin`) to match when the
      // app is served under a sub-path like `/quiz/` without changing source files.
      {
        name: 'vite-strip-base-onload',
        transformIndexHtml(html) {
          if (base === '/') return html;
          const escBase = base.replace(/'/g, "\\'");
          const script = `<script>!function(){try{var b='${escBase}';if(location.pathname.indexOf(b)===0){history.replaceState({},document.title, location.pathname.slice(b.length)+location.search+location.hash);}}catch(e){console.error(e)}}();</script>`;
          return html.replace(/<head>/, `<head>${script}`);
        }
      }
    ]
  };
})


