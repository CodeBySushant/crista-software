/**
 * Runs after `vite build` + the SSR build.
 * Writes a real HTML file for every route (so search engines and link
 * previews see full content), plus 404.html, sitemap.xml and robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const HEAD_RE = /<!--head:start-->[\s\S]*?<!--head:end-->/;
if (!HEAD_RE.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--head:start-->/<!--head:end--> markers or the empty #root.');
}

const page = (head, html) =>
  template.replace(HEAD_RE, head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
};

const indexable = [];
for (const url of routes) {
  const { html, head, meta } = await render(url);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  write(file, page(head, html));
  if (!meta.noindex) indexable.push(url);
  console.log(`  prerendered ${url}${meta.noindex ? '  (noindex)' : ''}`);
}

// Real 404 page, served by .htaccess for unknown URLs.
{
  const { html, head } = await render('/404');
  write(path.join(dist, '404.html'), page(head, html));
  console.log('  prerendered /404.html');
}

const today = new Date().toISOString().slice(0, 10);
const priority = (u) => (u === '/' ? '1.0' : u.split('/').length === 2 ? '0.8' : '0.6');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u === '/' ? '/' : u}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(u)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write(path.join(dist, 'sitemap.xml'), sitemap);
write(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`  sitemap.xml (${indexable.length} pages), robots.txt written`);
