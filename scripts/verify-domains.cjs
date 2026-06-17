#!/usr/bin/env node

/**
 * EcoStack Green Verification Engine
 * ===================================
 * Queries The Green Web Foundation (TGWF) API to verify
 * whether hosting providers use green/renewable energy.
 *
 * Usage:
 *   node scripts/verify-domains.js                    # Check all providers
 *   node scripts/verify-domains.js --domain example.com  # Check single domain
 *   node scripts/verify-domains.js --output /path/to/output.json
 *   node scripts/verify-domains.js --cron              # Quiet mode for automation
 *
 * TGWF API: GET https://api.thegreenwebfoundation.org/greencheck/{domain}
 * Returns: { green: bool, hosted_by: string, hosted_by_website: string, ... }
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ── Configuration ──────────────────────────────────────────────────────────

const TGWF_API_BASE = 'https://api.thegreenwebfoundation.org';
const DEFAULT_PROVIDERS_PATH = path.join(__dirname, 'providers.json');
const DEFAULT_OUTPUT_PATH = path.join(__dirname, '..', 'shared', 'listings_cache.json');
const CONCURRENCY = 3;              // Max parallel API calls
const RETRY_LIMIT = 3;
const RETRY_DELAY_MS = 2000;
const RATE_LIMIT_DELAY_MS = 600;   // Between requests
const REQUEST_TIMEOUT_MS = 15000;

// ── Helpers ────────────────────────────────────────────────────────────────

function fetchJson(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: timeoutMs }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
        } else if (res.statusCode === 429) {
          reject(new Error('Rate limited (429)'));
        } else if (res.statusCode === 404) {
          resolve(null); // Domain not found in TGWF
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Domain Verification ────────────────────────────────────────────────────

async function verifyDomain(domain, retries = RETRY_LIMIT) {
  const url = `${TGWF_API_BASE}/greencheck/${domain}`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sleep(RATE_LIMIT_DELAY_MS); // Polite rate limiting
      const result = await fetchJson(url);
      
      if (result === null) {
        return { domain, verified: false, green: false, error: 'Not found in TGWF database', raw: null };
      }

      return {
        domain,
        verified: result.green === true,
        green: result.green === true,
        hostedBy: result.hosted_by || null,
        hostedByWebsite: result.hosted_by_website || null,
        hostedById: result.hosted_by_id || null,
        checkedAt: new Date().toISOString(),
        raw: {
          green: result.green,
          hostedBy: result.hosted_by,
          hostedByWebsite: result.hosted_by_website,
          hostedById: result.hosted_by_id,
        },
      };
    } catch (err) {
      if (attempt < retries) {
        const delay = RETRY_DELAY_MS * attempt;
        console.error(`  ⚠ Retry ${attempt}/${retries} for ${domain} (${err.message}), waiting ${delay}ms...`);
        await sleep(delay);
      } else {
        console.error(`  ✗ Failed ${domain} after ${retries} attempts: ${err.message}`);
        return { domain, verified: false, green: false, error: err.message, raw: null };
      }
    }
  }
}

// ── Cache File Management ──────────────────────────────────────────────────

function loadCache(cachePath) {
  try {
    if (fs.existsSync(cachePath)) {
      const raw = fs.readFileSync(cachePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(`  ⚠ Could not read cache at ${cachePath}, starting fresh.`);
  }
  return { version: 1, lastUpdated: null, providers: [], verifications: {} };
}

function saveCache(cache, cachePath) {
  const dir = path.dirname(cachePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  cache.lastUpdated = new Date().toISOString();
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
  console.log(`\n  ✓ Cache saved to ${cachePath}`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isCron = args.includes('--cron');
  const singleDomain = args.includes('--domain') ? args[args.indexOf('--domain') + 1] : null;
  const outputArg = args.includes('--output') ? args[args.indexOf('--output') + 1] : null;
  const cachePath = outputArg || DEFAULT_OUTPUT_PATH;

  if (singleDomain) {
    // Single domain check
    console.log(`\n🔍 Checking domain: ${singleDomain}\n`);
    const result = await verifyDomain(singleDomain);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Batch verification
  console.log('\n🌱 EcoStack Green Verification Engine\n');
  console.log(`📋 Loading providers from ${DEFAULT_PROVIDERS_PATH}...`);
  
  let providers;
  try {
    providers = JSON.parse(fs.readFileSync(DEFAULT_PROVIDERS_PATH, 'utf-8'));
  } catch (e) {
    console.error(`✗ Could not load providers: ${e.message}`);
    process.exit(1);
  }

  const providerList = providers.providers || [];
  console.log(`   Found ${providerList.length} providers to verify\n`);

  // Load existing cache to preserve previously verified data
  const cache = loadCache(cachePath);
  if (!cache.verifications) cache.verifications = {};

  const domains = providerList.map(p => p.domain);
  let verified = 0;
  let failed = 0;
  let green = 0;

  // Process with concurrency limit
  const queue = [...domains];
  const running = [];

  async function worker() {
    while (queue.length > 0) {
      const domain = queue.shift();
      if (!isCron) console.log(`  → Checking ${domain}...`);
      const result = await verifyDomain(domain);
      cache.verifications[domain] = result;

      if (result.green) green++;
      if (result.verified) verified++;
      else failed++;

      if (!isCron) {
        const icon = result.green ? '✅' : result.verified ? '🔶' : '❌';
        console.log(`    ${icon} ${domain}: ${result.green ? 'GREEN' : result.verified ? 'Pending' : 'Not verified'}${result.hostedBy ? ` (${result.hostedBy})` : ''}`);
      }
    }
  }

  // Start workers
  for (let i = 0; i < CONCURRENCY; i++) {
    running.push(worker());
  }
  await Promise.all(running);

  // Build enriched provider list with verification data
  const enrichedProviders = providerList.map(p => {
    const v = cache.verifications[p.domain] || {};
    return {
      id: p.id,
      name: p.name,
      domain: p.domain,
      category: p.category,
      tagline: p.tagline,
      description: p.description,
      types: p.types,
      priceRange: p.priceRange,
      audience: p.audience,
      website: p.website,
      logoUrl: p.logoUrl,
      greenVerified: v.green || false,
      hostedBy: v.hostedBy || null,
      lastChecked: v.checkedAt || null,
      tgwfData: v.raw || null,
      badges: buildBadges(v),
    };
  });

  cache.providers = enrichedProviders;
  cache.version = providers.version || 1;
  saveCache(cache, cachePath);

  // Summary
  const total = domains.length;
  console.log('\n─── Verification Summary ───');
  console.log(`   Total domains: ${total}`);
  console.log(`   ✅ Green verified: ${green}`);
  console.log(`   ❌ Not verified: ${failed}`);
  console.log(`   📊 Cache: ${cachePath}`);
  console.log(`   🕐 Last updated: ${cache.lastUpdated}\n`);

  if (!isCron) {
    console.log('   Tip: Run with --cron for silent automation mode.');
    console.log('   Use: node scripts/verify-domains.js --cron\n');
  }
}

function buildBadges(verification) {
  const badges = [];
  if (verification.green) {
    badges.push({ id: 'tgwf', name: 'TGWF Verified Green', type: 'green' });
  }
  if (verification.hostedBy) {
    badges.push({ id: 'hosted-by', name: `Hosted by ${verification.hostedBy}`, type: 'info' });
  }
  return badges;
}

// ── Run ────────────────────────────────────────────────────────────────────

main().catch(err => {
  console.error('\n✗ Fatal error:', err.message);
  process.exit(1);
});