/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Site URL: The root URL of your website (non-www, HTTPS only).
  siteUrl: 'https://sivantha.com',

  // Generate a sitemap index if you have multiple sitemaps (optional, defaults to false).
  generateIndexSitemap: false,

  // Generate a robots.txt file (recommended for SEO).
  generateRobotsTxt: true,

  // Exclude specific paths or patterns from the sitemap (e.g., admin pages, API routes).
  exclude: [
    '/api/*', // Exclude all API routes
    '/_next/*', // Exclude Next.js internal files
    '/_error', // Exclude error pages
    '/404', // Exclude 404 page
    '/500', // Exclude 500 page
  ],

  // Additional paths to include in the sitemap (optional, useful for dynamic routes).
  // You can define custom pages or routes here if needed.
  additionalPaths: async () => {
    return [
      // Example: Add a custom page or dynamic route if applicable
      // { loc: 'https://sivantha.com/blog', lastmod: new Date().toISOString() },
    ];
  },

  // Configure how often pages change (used in sitemap for `changefreq`).
  // Options: 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'.
  // You can set this globally or per page in `additionalPaths`.
  changefreq: 'daily',

  // Set the priority of pages in the sitemap (0.0 to 1.0, defaults to 0.7).
  // Higher priority for important pages like homepage.
  priority: 0.7,

  // Transform the URL generation (optional, for custom URL formatting).
  transform: async (config, path) => {
    // Ensure all URLs use HTTPS and non-www format
    return {
      loc:
        path.startsWith('http://') || path.startsWith('https://www.')
          ? path.replace('http://', 'https://').replace('www.', '')
          : `https://sivantha.com${path}`,
      lastmod: new Date().toISOString(),
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },

  // Robots.txt configuration (optional, custom rules).
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/', // Allow all user agents to crawl the site
        disallow: ['/api/', '/_next/', '/_error', '/404', '/500'], // Disallow specific paths
      },
    ],
    additionalSitemaps: [
      'https://sivantha.com/sitemap.xml', // Include your sitemap in robots.txt
    ],
  },

  // Alternate language or regional versions (if applicable, leave empty if not needed).
  alternateRefs: [],

  // Sitemap filename (defaults to 'sitemap.xml', can be customized if needed).
  sitemapFilename: 'sitemap.xml',

  // Path where sitemap files will be generated (relative to the root of your project).
  outDir: './public',

  // Enable pretty printing of XML (optional, makes sitemap human-readable).
  pretty: true,
};
