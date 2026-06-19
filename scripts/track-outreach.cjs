#!/usr/bin/env node

/**
 * EcoStack Outreach Tracker
 * =========================
 * CLI utility to manage the B2B outreach pipeline.
 *
 * Usage:
 *   node scripts/track-outreach.cjs list              # List all leads
 *   node scripts/track-outreach.cjs status <id|name>   # Show lead details
 *   node scripts/track-outreach.cjs update <id|name>   # Update status interactively
 *   node scripts/track-outreach.cjs note <id|name>     # Add a contact note
 *   node scripts/track-outreach.cjs stats              # Pipeline summary
 */

const fs = require('fs');
const path = require('path');

const TRACKER_PATH = '/home/team/shared/outreach_tracker.json';
const STATUSES = ['Not Contacted', 'Emailed', 'Claimed', 'Subscribed', 'Rejected'];

// ── Load / Save ────────────────────────────────────────────────────────────

function loadTracker() {
  if (!fs.existsSync(TRACKER_PATH)) {
    console.error(`✗ Tracker not found at ${TRACKER_PATH}`);
    console.log('  Run: node scripts/track-outreach.cjs init');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(TRACKER_PATH, 'utf-8'));
}

function saveTracker(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(TRACKER_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function findLead(data, query) {
  const q = query.toLowerCase();
  return data.leads.find(
    l => l.id.toLowerCase() === q || l.name.toLowerCase().includes(q) || l.domain.toLowerCase().includes(q)
  );
}

// ── Commands ───────────────────────────────────────────────────────────────

function cmdList(data) {
  console.log('\n📋 Outreach Lead List\n');
  console.log('  ID'.padEnd(6) + 'Company'.padEnd(24) + 'Status'.padEnd(18) + 'Domain');
  console.log('  ' + '─'.repeat(70));
  data.leads.forEach(l => {
    const icon = l.status === 'Not Contacted' ? '○' : l.status === 'Emailed' ? '📧' : l.status === 'Claimed' ? '✅' : l.status === 'Subscribed' ? '💳' : '✗';
    console.log(`  ${l.id.padEnd(4)} ${l.name.padEnd(22)} ${icon} ${l.status.padEnd(14)} ${l.domain}`);
  });
  cmdStats(data);
}

function cmdStatus(data, query) {
  const lead = findLead(data, query);
  if (!lead) { console.log(`✗ No lead matching "${query}"`); return; }

  console.log(`\n📇 ${lead.name}`);
  console.log(`  ${'─'.repeat(40)}`);
  console.log(`  ID:          ${lead.id}`);
  console.log(`  Domain:      ${lead.domain}`);
  console.log(`  Status:      ${getStatusIcon(lead.status)} ${lead.status}`);
  console.log(`  Verified:    ${lead.verified ? '✅ Yes' : '❌ No'}`);
  console.log(`  Contact URL: ${lead.contactUrl || 'N/A'}`);
  console.log(`  Created:     ${lead.createdAt}`);
  console.log(`  Updated:     ${lead.lastUpdated || lead.createdAt}`);

  if (lead.notes && lead.notes.length > 0) {
    console.log(`\n  📝 Notes (${lead.notes.length}):`);
    lead.notes.slice().reverse().forEach(n => {
      console.log(`    [${n.timestamp}] ${n.text}`);
    });
  }
  console.log();
}

function cmdUpdate(data, query) {
  const lead = findLead(data, query);
  if (!lead) { console.log(`✗ No lead matching "${query}"`); return; }

  console.log(`\n📇 Updating: ${lead.name} (current: ${getStatusIcon(lead.status)} ${lead.status})\n`);
  STATUSES.forEach((s, i) => {
    const mark = s === lead.status ? '→' : ' ';
    console.log(`  ${mark} [${i + 1}] ${s}`);
  });

  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('\nEnter number (or empty to cancel): ', (answer) => {
    const idx = parseInt(answer) - 1;
    if (idx >= 0 && idx < STATUSES.length) {
      const oldStatus = lead.status;
      lead.status = STATUSES[idx];
      lead.lastUpdated = new Date().toISOString();
      lead.notes = lead.notes || [];
      if (oldStatus !== lead.status) {
        lead.notes.push({ timestamp: new Date().toISOString(), text: `Status changed: ${oldStatus} → ${lead.status}` });
      }
      saveTracker(data);
      console.log(`\n  ✓ ${lead.name}: ${getStatusIcon(oldStatus)} ${oldStatus} → ${getStatusIcon(lead.status)} ${lead.status}\n`);
    } else {
      console.log('  Cancelled.');
    }
    rl.close();
  });
}

function cmdNote(data, query) {
  const lead = findLead(data, query);
  if (!lead) { console.log(`✗ No lead matching "${query}"`); return; }

  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question(`\n📝 Add note for ${lead.name}: `, (text) => {
    if (text.trim()) {
      lead.notes = lead.notes || [];
      lead.notes.push({ timestamp: new Date().toISOString(), text: text.trim() });
      lead.lastUpdated = new Date().toISOString();
      saveTracker(data);
      console.log(`  ✓ Note added to ${lead.name}\n`);
    } else {
      console.log('  Cancelled (empty note).\n');
    }
    rl.close();
  });
}

function cmdStats(data) {
  const total = data.leads.length;
  const counts = {};
  STATUSES.forEach(s => counts[s] = 0);
  data.leads.forEach(l => { counts[l.status] = (counts[l.status] || 0) + 1; });

  console.log('\n📊 Pipeline Summary\n');
  console.log(`  Total Leads:  ${total}`);
  console.log(`  ${'─'.repeat(30)}`);
  STATUSES.forEach(s => {
    const pct = total > 0 ? ((counts[s] / total) * 100).toFixed(0) : '0';
    console.log(`  ${getStatusIcon(s)} ${s.padEnd(18)} ${String(counts[s] || 0).padStart(2)}  (${pct}%)`);
  });
  console.log();
}

function getStatusIcon(status) {
  const icons = { 'Not Contacted': '○', 'Emailed': '📧', 'Claimed': '✅', 'Subscribed': '💳', 'Rejected': '✗' };
  return icons[status] || '○';
}

// ── Init ───────────────────────────────────────────────────────────────────

function cmdInit() {
  if (fs.existsSync(TRACKER_PATH)) {
    console.log(`\n  ⚠ Tracker already exists at ${TRACKER_PATH}`);
    console.log('  Use: node scripts/track-outreach.cjs list\n');
    return;
  }

  const leads = [
    { id: 'lg1', name: 'GreenGeeks', domain: 'greengeeks.com', category: 'green-hosting', verified: true, contactUrl: 'https://www.greengeeks.com/contact/' },
    { id: 'lg2', name: 'Kinsta', domain: 'kinsta.com', category: 'green-hosting', verified: true, contactUrl: 'https://kinsta.com/contact-us/' },
    { id: 'lg3', name: 'HostPapa', domain: 'hostpapa.com', category: 'green-hosting', verified: true, contactUrl: 'https://www.hostpapa.com/contact/' },
    { id: 'lg4', name: 'DreamHost', domain: 'dreamhost.com', category: 'green-hosting', verified: false, contactUrl: 'https://www.dreamhost.com/contact/' },
    { id: 'lg5', name: 'A2 Hosting', domain: 'a2hosting.com', category: 'green-hosting', verified: true, contactUrl: 'https://www.a2hosting.com/about/contact' },
    { id: 'lg6', name: 'Greenhost', domain: 'greenhost.net', category: 'green-hosting', verified: true, contactUrl: 'https://greenhost.net/en/contact/' },
    { id: 'lg7', name: 'InMotion Hosting', domain: 'inmotionhosting.com', category: 'green-hosting', verified: false, contactUrl: 'https://www.inmotionhosting.com/contact/' },
    { id: 'lg8', name: 'SiteGround', domain: 'siteground.com', category: 'green-hosting', verified: true, contactUrl: 'https://www.siteground.com/contact.htm' },
    { id: 'lg9', name: 'Hugging Face', domain: 'huggingface.co', category: 'eco-apis', verified: false, contactUrl: 'https://huggingface.co' },
    { id: 'lg10', name: 'Plausible', domain: 'plausible.io', category: 'green-analytics', verified: true, contactUrl: 'https://plausible.io/contact' },
    { id: 'lg11', name: 'Fathom Analytics', domain: 'usefathom.com', category: 'green-analytics', verified: false, contactUrl: 'https://usefathom.com' },
    { id: 'lg12', name: 'Bunny.net', domain: 'bunny.net', category: 'renewable-cdn', verified: true, contactUrl: 'https://bunny.net/support/' },
    { id: 'lg13', name: 'Notion', domain: 'notion.so', category: 'carbon-saas', verified: false, contactUrl: 'https://www.notion.so' },
    { id: 'lg14', name: 'Linear', domain: 'linear.app', category: 'carbon-saas', verified: true, contactUrl: 'https://linear.app/contact' },
  ].map(l => ({
    ...l,
    status: 'Not Contacted',
    notes: [{ timestamp: new Date().toISOString(), text: 'Lead imported from outreach list.' }],
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  }));

  const data = {
    version: 1,
    name: 'EcoStack B2B Outreach Tracker',
    lastUpdated: new Date().toISOString(),
    totalLeads: leads.length,
    leadStatuses: STATUSES,
    leads,
  };

  const dir = path.dirname(TRACKER_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  saveTracker(data);
  console.log(`\n  ✓ Created ${TRACKER_PATH}`);
  console.log(`  📋 ${leads.length} leads initialized as "Not Contacted"\n`);
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'list';

  if (cmd === 'init') { cmdInit(); return; }
  if (cmd === 'stats') { const data = loadTracker(); cmdStats(data); return; }
  if (cmd === 'list') { const data = loadTracker(); cmdList(data); return; }

  const query = args.slice(1).join(' ');

  if (!query && (cmd === 'status' || cmd === 'update' || cmd === 'note')) {
    console.log(`\n  Usage: node scripts/track-outreach.cjs ${cmd} <id|name|domain>\n`);
    process.exit(1);
  }

  const data = loadTracker();

  switch (cmd) {
    case 'status':
      cmdStatus(data, query);
      break;
    case 'update':
      cmdUpdate(data, query);
      break;
    case 'note':
      cmdNote(data, query);
      break;
    default:
      console.log(`\n  Unknown command: ${cmd}`);
      console.log('\n  Commands:');
      console.log('    init                          Create the tracker (first time)');
      console.log('    list                          List all leads with status');
      console.log('    status <id|name>              Show lead details + notes');
      console.log('    update <id|name>              Change pipeline status');
      console.log('    note <id|name>                Add a contact note');
      console.log('    stats                         Pipeline summary\n');
  }
}

main();