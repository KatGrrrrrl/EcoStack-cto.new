#!/usr/bin/env node

/**
 * EcoStack B2B Pitch Generator
 * =============================
 * Reads the verified listings cache and generates personalized
 * B2B outreach emails for each provider.
 *
 * Output: /home/team/shared/outreach_leads.md
 *
 * Usage:
 *   node scripts/generate-pitches.cjs
 */

const fs = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────────

const CACHE_PATHS = [
  '/home/team/shared/listings_cache.json',
  '/home/team/shared/ecostack-app/shared/listings_cache.json',
  path.join(__dirname, '..', 'shared', 'listings_cache.json'),
];

const OUTPUT_PATH = '/home/team/shared/outreach_leads.md';
const STRIPE_PREMIUM = 'https://buy.stripe.com/4gMfZh8A1cxidoNaIkfMA00';
const STRIPE_SPOTLIGHT = 'https://buy.stripe.com/6oU5kD2bD8h2esR03GfMA01';
const SELLER_PORTAL = 'https://ecostack.app/sell';

// ── Helpers ────────────────────────────────────────────────────────────────

function findCache() {
  for (const p of CACHE_PATHS) {
    if (fs.existsSync(p)) {
      console.log(`  ✓ Found cache at ${p}`);
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }
  throw new Error('Could not find listings_cache.json in any expected path');
}

function findContactUrl(provider) {
  // Best-effort contact URLs
  const contacts = {
    // Known contact/support pages
    greengeeks: 'https://www.greengeeks.com/contact/',
    kinsta: 'https://kinsta.com/contact-us/',
    hostpapa: 'https://www.hostpapa.com/contact/',
    dreamhost: 'https://www.dreamhost.com/contact/',
    'a2-hosting': 'https://www.a2hosting.com/about/contact',
    greenhost: 'https://greenhost.net/en/contact/',
    'inmotion-hosting': 'https://www.inmotionhosting.com/contact/',
    siteground: 'https://www.siteground.com/contact.htm',
    plausible: 'https://plausible.io/contact',
    'bunny-net': 'https://bunny.net/support/',
    linear: 'https://linear.app/contact',
  };
  return contacts[provider.id] || provider.website || null;
}

// ── Email Generators ───────────────────────────────────────────────────────

function generateGreenVerifiedEmail(provider) {
  const hostedBy = provider.hostedBy || 'their green infrastructure provider';
  const lastChecked = provider.lastChecked
    ? new Date(provider.lastChecked).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'recently';

  return [
    `**Subject:** 🌱 Claim Your Free Verified Green Profile on EcoStack`,
    ``,
    `Hi ${provider.name} Team,`,
    ``,
    `Congratulations! Our systems at **EcoStack** have verified that **${provider.name}** ` +
    `(${provider.domain}) is powered by green energy through **${hostedBy}** as of ${lastChecked}. ` +
    `This has been confirmed by The Green Web Foundation (TGWF) — you're officially part of ` +
    `the sustainable digital infrastructure movement!`,
    ``,
    `You're already listed in our directory, but did you know you can claim and upgrade your ` +
    `profile to reach thousands of sustainability-minded buyers actively searching for ` +
    `solutions like yours?`,
    ``,
    `**Your Current Directory Profile:**`,
    `- **Category:** ${provider.category} ` +
    `${provider.category === 'green-hosting' ? '🌿' : provider.category === 'green-analytics' ? '📊' : provider.category === 'renewable-cdn' ? '⚡' : provider.category === 'eco-apis' ? '🔌' : '💼'}` +
    `\n- **Audience:** ${(provider.audience || []).join(', ') || 'General'}` +
    `\n- **Pricing:** ${provider.priceRange || 'Various'}` +
    `\n- **Verification Status:** ✅ TGWF Verified Green`,
    ``,
    `**Upgrade Options:**`,
    ``,
    `1️⃣ **Premium Listing — $29/month**`,
    `   ⭐ Featured placement in your category`,
    `   🏷️ Priority in search results`,
    `   📞 Direct lead contact form`,
    `   📊 Monthly performance reports`,
    `   👉 ${STRIPE_PREMIUM}`,
    ``,
    `2️⃣ **Sponsored Spotlight — $49/month**`,
    `   🏆 Top of category (first spot)`,
    `   🏠 Homepage featured slot`,
    `   📧 Weekly digest placement`,
    `   🎯 Custom CTA and priority support`,
    `   👉 ${STRIPE_SPOTLIGHT}`,
    ``,
    `Both plans are month-to-month with no long-term contracts. ` +
    `Cancel anytime — your free listing stays live regardless.`,
    ``,
    `We'd love to feature your company as a verified green leader in the space. ` +
    `If you have any questions, just reply to this email.`,
    ``,
    `Stay green,`,
    `The EcoStack Team`,
    `🌱 https://ecostack.app`,
    ``,
  ].join('\n');
}

function generateUnverifiedEmail(provider) {
  return [
    `**Subject:** 🌿 Boost Your Sales with Digital Sustainability — Join EcoStack`,
    ``,
    `Hi ${provider.name} Team,`,
    ``,
    `I recently came across **${provider.name}** (${provider.domain}) and was impressed by ` +
    `your ${provider.category === 'green-hosting' ? 'hosting' : provider.category === 'green-analytics' ? 'analytics' : provider.category === 'renewable-cdn' ? 'CDN' : provider.category === 'eco-apis' ? 'API' : 'software'} ` +
    `offerings in the ${provider.category} space.`,
    ``,
    `At **EcoStack**, we run the largest curated directory of eco-friendly digital ` +
    `infrastructure. We connect sustainability-minded businesses with verified green ` +
    `tech providers — and we think your company would be a fantastic addition.`,
    ``,
    `**Why List on EcoStack?**`,
    `- 🎯 **High-intent traffic**: Our visitors are actively searching for sustainable solutions`,
    `- ✅ **Auto-verification**: We check your infrastructure against The Green Web Foundation database`,
    `- 📊 **Performance dashboard**: Track impressions, clicks, and leads in real-time`,
    `- 📢 **Monthly digest**: Featured in our curated newsletter to 1,200+ subscribers`,
    ``,
    `**Get Started (Free):**`,
    `→ Claim your free listing: ${SELLER_PORTAL}`,
    ``,
    `**Fast-Track Verification Available**`,
    `If your infrastructure uses renewable energy or you purchase carbon offsets, ` +
    `we can fast-track your TGWF verification. Our team will help you through the ` +
    `process so you can display the "🌱 Verified Green" badge on your profile.`,
    ``,
    `**Premium Plans (Optional):**`,
    `- Premium Listing: $29/mo — Featured placement + lead contact form`,
    `- Sponsored Spotlight: $49/mo — Top of category + homepage + weekly digest`,
    ``,
    `All plans are month-to-month. No contracts, no commitment.`,
    ``,
    `I'd love to help you get set up. Let me know if you have any questions!`,
    ``,
    `Warmly,`,
    `The EcoStack Team`,
    `🌱 https://ecostack.app`,
    ``,
  ].join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 EcoStack B2B Pitch Generator\n');

  // Load cache
  let cache;
  try {
    cache = findCache();
  } catch (err) {
    console.error('  ✗', err.message);
    process.exit(1);
  }

  const providers = cache.providers || [];
  console.log(`  📋 Loaded ${providers.length} providers from cache\n`);

  // Generate lead list
  const verifiedCount = providers.filter(p => p.greenVerified).length;
  const unverifiedCount = providers.filter(p => !p.greenVerified).length;

  const lines = [];
  lines.push(`# EcoStack — Outreach Lead List`);
  lines.push(``);
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push(`**Total Leads:** ${providers.length}`);
  lines.push(`**✅ Verified (Green):** ${verifiedCount}`);
  lines.push(`**❌ Unverified (Pending):** ${unverifiedCount}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // Process each provider
  for (let i = 0; i < providers.length; i++) {
    const p = providers[i];
    const contactUrl = findContactUrl(p);

    lines.push(`## ${i + 1}. ${p.name}`);
    lines.push(``);
    lines.push(`| Field | Value |`);
    lines.push(`|-------|-------|`);
    lines.push(`| **Company** | ${p.name} |`);
    lines.push(`| **Domain** | ${p.domain} |`);
    lines.push(`| **Website** | ${p.website || 'N/A'} |`);
    lines.push(`| **Category** | ${p.category || 'N/A'} |`);
    lines.push(`| **Verification Status** | ${p.greenVerified ? '✅ Verified Green' : '❌ Unverified / Pending'} |`);
    lines.push(`| **Hosted By** | ${p.hostedBy || 'N/A'} |`);
    lines.push(`| **Last Checked** | ${p.lastChecked ? new Date(p.lastChecked).toLocaleString() : 'N/A'} |`);
    lines.push(`| **Contact URL** | ${contactUrl || 'N/A'} |`);
    lines.push(`| **Price Range** | ${p.priceRange || 'N/A'} |`);
    lines.push(`| **Audience** | ${(p.audience || []).join(', ') || 'N/A'} |`);
    lines.push(`| **Types** | ${(p.types || []).join(', ') || 'N/A'} |`);
    lines.push(``);

    // Email draft
    if (p.greenVerified) {
      lines.push(`### 📧 Email Draft: "Claim Your Free Verified Profile"`);
      lines.push(``);
      lines.push(generateGreenVerifiedEmail(p));
    } else {
      lines.push(`### 📧 Email Draft: "Boost Your Sales with Digital Sustainability"`);
      lines.push(``);
      lines.push(generateUnverifiedEmail(p));
    }

    lines.push(``);
    lines.push(`---`);
    lines.push(``);
  }

  // Summary
  lines.push(`## Summary`);
  lines.push(``);
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total Providers | ${providers.length} |`);
  lines.push(`| ✅ Verified (Green) — Warm Email | ${verifiedCount} |`);
  lines.push(`| ❌ Unverified — Educational Email | ${unverifiedCount} |`);
  lines.push(`| Premium Upsell ($29/mo) | ${STRIPE_PREMIUM} |`);
  lines.push(`| Spotlight Upsell ($49/mo) | ${STRIPE_SPOTLIGHT} |`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`*Generated by EcoStack Pitch Generator*`);

  // Write output
  const output = lines.join('\n');
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');

  const fileSize = Buffer.byteLength(output, 'utf-8');
  console.log(`  ✓ Output written to ${OUTPUT_PATH}`);
  console.log(`  📄 File size: ${(fileSize / 1024).toFixed(1)} KB\n`);

  console.log(`─── Lead Summary ───`);
  console.log(`   Total: ${providers.length}`);
  console.log(`   ✅ Verified (Green) — Warm email: ${verifiedCount}`);
  console.log(`   ❌ Unverified — Educational email: ${unverifiedCount}\n`);

  // Print first provider as preview
  if (providers.length > 0) {
    const first = providers[0];
    const emailType = first.greenVerified ? 'Claim Your Free Verified Profile' : 'Boost Your Sales with Digital Sustainability';
    console.log(`📧 Preview: ${first.name} → "${emailType}"`);
    console.log(`   Full document at ${OUTPUT_PATH}\n`);
  }
}

main().catch(err => {
  console.error('\n  ✗ Fatal error:', err.message);
  process.exit(1);
});