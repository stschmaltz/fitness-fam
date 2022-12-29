import globby from 'globby';
import fs from 'fs';

function addPage(page: string) {
  const path = page
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('.mdx', '');
  const route = path === '/index' ? '' : path;

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

async function generateSitemap() {
  // Ignore Next.tsx specific files (e.g., _app.tsx) and API routes.
  const pages = await globby([
    'pages/**/*{.tsx,.mdx}',
    '!pages/_*.tsx',
    '!pages/api',
  ]);
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
