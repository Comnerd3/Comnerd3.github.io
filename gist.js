// ===== CONFIGURATION =====
const GIST_ID   = 'ad9c6c624b9463877fb7915e279c01cf';
const USERNAME  = 'Comnerd3';
const FILENAME  = 'live-content.json';
const POLL_MS    = 5000;
// =========================

// Fetch the raw JSON from your public Gist
async function getContent() {
  const url = `https://gist.githubusercontent.com/${USERNAME}/${GIST_ID}/raw/${FILENAME}`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

// Patch your Gist with new content (requires token with “gist” scope)
async function updateContent(token, content) {
  const url = `https://api.github.com/gists/${GIST_ID}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept':        'application/vnd.github+json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      files: {
        [FILENAME]: { content }
      }
    })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Expose functions globally
window.gsGet    = getContent;
window.gsUpdate = updateContent;
window.POLL_MS  = POLL_MS;
