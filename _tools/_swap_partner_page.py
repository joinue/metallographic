"""One-shot: swap the legal block in partner-downloads.html for the gate."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "partner-downloads.html"

NEW_BLOCK = '''    <main class="partner-page" id="main-content">
        <header class="partner-page-header">
            <p class="partner-page-eyebrow">Authorized partners only</p>
            <h2 class="partner-page-title">Partner Resources</h2>
            <p class="partner-page-intro">
                PACE channel agreements and related materials. Access is restricted to authorized PACE distributors and resellers.
            </p>
        </header>

        <!-- Sign-in view -->
        <section id="partner-gate" class="partner-gate">
            <div class="partner-gate-card">
                <h2>Access required</h2>
                <p>Enter the access password provided by your PACE contact.</p>
                <form id="partner-gate-form" class="partner-gate-form" autocomplete="on">
                    <label for="partner-password">Access password</label>
                    <input type="password" id="partner-password" name="partner-password" required autocomplete="current-password" autofocus>
                    <button type="submit">Continue</button>
                </form>
                <div id="partner-gate-error" class="partner-gate-error" hidden>
                    Incorrect password. Try again or contact <a href="mailto:pace@metallographic.com">pace@metallographic.com</a> for access.
                </div>
                <p class="partner-gate-help">
                    Don't have a password? Email <a href="mailto:pace@metallographic.com?subject=Partner%20Access%20Request">pace@metallographic.com</a> with your company name and territory.
                </p>
            </div>
        </section>

        <!-- Authenticated view -->
        <section id="partner-downloads" hidden>
            <div class="partner-downloads-grid">
                <article class="partner-download-card">
                    <p class="partner-download-card-eyebrow">Distribution</p>
                    <h3 class="partner-download-card-title">Distributor Agreement</h3>
                    <p class="partner-download-card-desc">
                        Template Distributor Agreement for authorized stocking distributors. 28 sections covering territory, pricing, warranty service obligations, export controls, mutual indemnification, and dispute resolution.
                    </p>
                    <p class="partner-download-card-meta">Version 2.0 &middot; Effective May 13, 2026 &middot; PDF 403 KB &middot; DOCX 55 KB</p>
                    <div class="partner-download-buttons">
                        <a class="partner-download-btn partner-download-btn--primary" href="/downloads/partner-b527ecc1/pace-distributor-agreement.pdf" download>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            PDF
                        </a>
                        <a class="partner-download-btn" href="/downloads/partner-b527ecc1/pace-distributor-agreement.docx" download>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Word
                        </a>
                    </div>
                </article>

                <article class="partner-download-card">
                    <p class="partner-download-card-eyebrow">Reseller</p>
                    <h3 class="partner-download-card-title">Reseller Agreement</h3>
                    <p class="partner-download-card-desc">
                        Template Reseller Agreement for authorized resellers. Lower commitment than the distributor program &mdash; no inventory or warranty-service obligations. 23 sections.
                    </p>
                    <p class="partner-download-card-meta">Version 2.0 &middot; Effective May 13, 2026 &middot; PDF 362 KB &middot; DOCX 48 KB</p>
                    <div class="partner-download-buttons">
                        <a class="partner-download-btn partner-download-btn--primary" href="/downloads/partner-b527ecc1/pace-reseller-agreement.pdf" download>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            PDF
                        </a>
                        <a class="partner-download-btn" href="/downloads/partner-b527ecc1/pace-reseller-agreement.docx" download>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Word
                        </a>
                    </div>
                </article>
            </div>

            <div class="partner-session-bar">
                <span>Signed in. Session remembered on this device for 30 days.</span>
                <button id="partner-signout" type="button">Sign out</button>
            </div>
        </section>
    </main>

    <script>
        (function () {
            // SHA-256 of the access password.
            // To rotate the password:
            //   1. Run:  python -c "import hashlib; print(hashlib.sha256(b'NEW-PASSWORD').hexdigest())"
            //   2. Replace the hash on the line below.
            //   3. (Optional) Rename downloads/partner-b527ecc1/ to a new token
            //      and update the four href paths in the cards above.
            const PASSWORD_HASH = '678c1c139b0c679c8ee2c9248d25d0b398fdea30fdcf07cbbdc2e76ee181e3d1';
            const STORAGE_KEY = 'pace_partner_auth';
            const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

            const gateEl = document.getElementById('partner-gate');
            const downloadsEl = document.getElementById('partner-downloads');
            const formEl = document.getElementById('partner-gate-form');
            const inputEl = document.getElementById('partner-password');
            const errorEl = document.getElementById('partner-gate-error');
            const signoutEl = document.getElementById('partner-signout');

            async function sha256(text) {
                const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
                return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
            }

            function showAuthed() {
                gateEl.hidden = true;
                downloadsEl.hidden = false;
            }

            function showGate() {
                gateEl.hidden = false;
                downloadsEl.hidden = true;
                inputEl.value = '';
                errorEl.hidden = true;
                inputEl.focus();
            }

            // Restore session
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const { expires, hash } = JSON.parse(raw);
                    if (expires > Date.now() && hash === PASSWORD_HASH) {
                        showAuthed();
                    } else {
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            } catch (e) {
                try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
            }

            formEl.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = inputEl.value;
                const hash = await sha256(password);
                if (hash === PASSWORD_HASH) {
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                            hash: PASSWORD_HASH,
                            expires: Date.now() + SESSION_MS
                        }));
                    } catch (_) {
                        // localStorage disabled — auth still works for this session
                    }
                    errorEl.hidden = true;
                    showAuthed();
                } else {
                    errorEl.hidden = false;
                    inputEl.value = '';
                    inputEl.focus();
                }
            });

            signoutEl.addEventListener('click', () => {
                try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
                showGate();
            });
        })();
    </script>
'''


def main():
    html = TARGET.read_text(encoding="utf-8")

    start = html.find('    <div class="legal">')
    if start == -1:
        raise SystemExit("could not find <div class=\"legal\"> in partner-downloads.html")

    end_marker = "</script>\n    </div>"
    end = html.find(end_marker, start)
    if end == -1:
        raise SystemExit("could not find </script>/</div> close in partner-downloads.html")
    end += len(end_marker)

    new_html = html[:start] + NEW_BLOCK.rstrip() + html[end:]
    TARGET.write_text(new_html, encoding="utf-8")
    print(f"wrote {TARGET.name} ({len(new_html):,} bytes)")


if __name__ == "__main__":
    main()
