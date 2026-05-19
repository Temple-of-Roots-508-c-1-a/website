# GitHub Pages + templeofroots.com

You verified **`templeofroots.com`** (apex) in GitHub — not `www`. The repo `CNAME` file must match exactly.

## 1. Repo (this file)

`CNAME` contains:

```
templeofroots.com
```

Do **not** use `www.templeofroots.com` in `CNAME` unless you verify the `www` subdomain separately in GitHub.

## 2. GitHub Pages settings

Repo **website** → **Settings** → **Pages**

- **Custom domain:** `templeofroots.com` (no `www`)
- Wait for **DNS check** OK and **HTTPS** certificate (can take up to 24 hours)

Org **Temple-of-Roots-508-c-1-a** → **Settings** → **Domains** should show `templeofroots.com` as **Verified**.

## 3. GoDaddy DNS (apex)

Remove GoDaddy “parking” / forwarding on the apex. Add these **A** records for `@`:

| Type | Name | Value |
|------|------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

## 4. Optional: `www`

Pick one:

- **Forward** `www.templeofroots.com` → `https://templeofroots.com` (GoDaddy forwarding), or  
- **CNAME** `www` → `temple-of-roots-508-c-1-a.github.io` (only if you later verify `www` in GitHub)

## 5. Until DNS works

Site is always available at:

https://temple-of-roots-508-c-1-a.github.io/website/

## Why the AI advice failed

- Actions workflow **deploys files** only; it does not verify domains.
- `CNAME` with `www` did not match your **verified** apex domain.
- Apex needs **A records** at GoDaddy, not only a CNAME on `www`.
