// Post-build step for the SPA: write one HTML entry per public route with its
// own canonical/og:url, so Google does not see every page as a duplicate of
// the homepage (index.html hard-codes the homepage canonical).
// vercel.json rewrites each route to its file; everything else still falls
// back to index.html.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE = "https://www.theridgessummerlinhomes.com";
const ROUTES = ["about", "community", "listings", "resources", "contact", "disclosure"];
const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const index = readFileSync(path.join(outDir, "index.html"), "utf8");

const homeCanonical = `<link rel="canonical" href="${SITE}/" />`;
const homeOgUrl = `<meta property="og:url" content="${SITE}/" />`;
if (!index.includes(homeCanonical) || !index.includes(homeOgUrl)) {
  throw new Error("route-html: index.html canonical/og:url markers not found");
}

for (const route of ROUTES) {
  const url = `${SITE}/${route}`;
  const html = index
    .replace(homeCanonical, `<link rel="canonical" href="${url}" />`)
    .replace(homeOgUrl, `<meta property="og:url" content="${url}" />`);
  writeFileSync(path.join(outDir, `${route}.html`), html);
}
console.log(`route-html: wrote ${ROUTES.length} route entries`);
