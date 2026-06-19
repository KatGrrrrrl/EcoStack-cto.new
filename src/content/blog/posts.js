/**
 * Blog post data source.
 * In production, these could be loaded from Markdown files,
 * a headless CMS, or the listings_cache.
 */

const posts = [
  {
    slug: 'what-is-green-web-hosting',
    title: 'What Is Green Web Hosting? A Complete Guide for 2026',
    excerpt: 'Discover what makes web hosting "green," why it matters for your business, and how to choose a provider that aligns with your sustainability goals.',
    author: 'EcoStack Team',
    date: '2026-06-15',
    category: 'green-hosting',
    readTime: '8 min read',
    image: null,
    tags: ['green hosting', 'sustainability', 'web hosting', 'renewable energy'],
    content: `
## What Is Green Web Hosting?

Green web hosting refers to web hosting services that minimize their environmental impact by using renewable energy, purchasing carbon offsets, or implementing energy-efficient infrastructure.

### Why Does It Matter?

The internet consumes an estimated **416 TWh of electricity per year** — more than the entire United Kingdom. Every website, every email, every streaming video requires energy to power data centers, network infrastructure, and end-user devices.

### How Hosting Providers Go Green

1. **Renewable Energy Certificates (RECs)** — Many providers purchase RECs to match their energy consumption with renewable sources like wind and solar.
2. **Carbon Offsets** — Some providers invest in carbon offset projects (reforestation, methane capture) to neutralize their remaining emissions.
3. **Energy-Efficient Infrastructure** — Modern SSD storage, efficient cooling systems, and optimized server hardware reduce per-request energy usage.
4. **Direct Renewable Energy** — A growing number of providers colocate in data centers powered directly by on-site solar or wind generation.

### How to Verify a Green Host

Always check providers against **The Green Web Foundation (TGWF)** database. EcoStack automatically verifies all listed providers against TGWF so you can shop with confidence.

> "Choosing a green web host can reduce your website's carbon footprint by up to 90% compared to traditional hosting."

### Top Green Hosting Providers for 2026

Based on our TGWF verification data, these providers are confirmed green:

- **GreenGeeks** — Offsets 3x their energy consumption
- **Kinsta** — Powered by Google Cloud's carbon-neutral infrastructure
- **HostPapa** — 100% renewable energy powered
- **SiteGround** — Google Cloud infrastructure with renewable matching

[Browse all verified green hosts →](/category/green-hosting)
    `.trim(),
  },
  {
    slug: 'calculate-digital-carbon-footprint',
    title: 'How to Calculate Your Website\'s Carbon Footprint',
    excerpt: 'Learn how to measure your website\'s environmental impact, identify key contributors, and take actionable steps toward carbon neutrality.',
    author: 'EcoStack Team',
    date: '2026-06-10',
    category: 'green-analytics',
    readTime: '6 min read',
    image: null,
    tags: ['carbon footprint', 'web sustainability', 'green analytics', 'measurement'],
    content: `
## Measuring Your Digital Carbon Footprint

Every website has a carbon footprint. Understanding yours is the first step toward reducing it.

### Key Metrics to Track

**Data Transfer (Bandwidth)**
The amount of data transferred when someone visits your site directly correlates with energy usage. Heavier pages = more energy.

**Page Weight**
The total size of your webpage (HTML, CSS, JavaScript, images, fonts). Average page weight has grown from **1MB in 2015 to over 2.5MB today**.

**Requests per Page**
Each HTTP request consumes energy at the server, network, and client level. Fewer requests = lower footprint.

**Server Energy Mix**
Where your hosting provider gets their electricity makes a huge difference. A site hosted on renewable energy can have 10-20x lower carbon emissions than one on fossil fuels.

### Tools for Measurement

- **Website Carbon Calculator** — Quick estimate based on data transfer
- **The Green Web Foundation API** — Check if your host uses green energy
- **EcoStack Directory** — Compare verified green providers

### Quick Wins to Reduce Your Footprint

1. Optimize images (WebP format, responsive sizes)
2. Use a CDN powered by renewable energy
3. Remove unused JavaScript and CSS
4. Switch to a green web host
5. Adopt dark mode (saves battery on OLED screens)

> "The average website produces 1.76g of CO2 per page view. A well-optimized, green-hosted site can reduce that to under 0.5g."

[Find a green host for your site →](/hosting-wizard)
    `.trim(),
  },
  {
    slug: 'sustainable-saas-tools-2026',
    title: '10 Sustainable SaaS Tools for Eco-Conscious Teams in 2026',
    excerpt: 'From project management to analytics, discover the best sustainable software tools that help your business run efficiently while minimizing environmental impact.',
    author: 'EcoStack Team',
    date: '2026-06-05',
    category: 'carbon-saas',
    readTime: '10 min read',
    image: null,
    tags: ['SaaS', 'sustainability', 'green software', 'B2B tools'],
    content: `
## Sustainable SaaS for Modern Teams

Sustainability isn't just about hosting — it extends to every software tool your business uses. Here are 10 sustainable SaaS tools verified by EcoStack.

### 1. **Linear** — Sustainable Project Management
Linear is a project management tool that runs on cloud infrastructure powered increasingly by renewable energy. They offset their remaining emissions through verified carbon credits.

### 2. **Notion** — Carbon-Neutral Workspace
Notion has committed to carbon neutrality, offsetting emissions from their cloud infrastructure and operations. Their all-in-one workspace reduces the need for multiple tools.

### 3. **Plausible Analytics** — Lightweight Green Analytics
Plausible is a privacy-first analytics tool with a page weight of under 1KB. Their servers run on **Hetzner** infrastructure powered by renewable energy.

### 4. **Fathom Analytics** — Simple, Efficient Analytics
Fathom provides privacy-focused analytics with minimal server resource usage, running on renewable-energy-powered servers.

### Why Software Sustainability Matters

Every SaaS tool you use has a carbon cost:
- Cloud infrastructure accounts for ~2.5-3.7% of global greenhouse gas emissions
- A single cloud data center can consume as much electricity as 50,000 homes
- Choosing efficient, green-hosted SaaS can reduce your Scope 3 emissions

### How to Evaluate SaaS Sustainability

1. Check if they publish a sustainability report
2. Look for carbon-neutral certification
3. Verify their cloud provider's energy mix
4. Assess the tool's efficiency (page weight, API calls)

> "The most sustainable software is the software you don't need. The second most sustainable is the one that uses the least resources."

[Browse our sustainable SaaS directory →](/category/carbon-saas)
    `.trim(),
  },
];

export default posts;

export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null;
}

export function getPostsByCategory(category) {
  return posts.filter(p => p.category === category);
}

export function getRecentPosts(count = 5) {
  return posts.slice(0, count);
}