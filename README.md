<p align="center">
  <img src="assets/logo.png" alt="dogecoin but on robinhood" width="120" />
</p>

# dogecoin but on robinhood

Static site that documents a community build: running a Robinhood Chain full node and putting Dogecoin on it. Inspired by Vlad Tenev’s April 2022 DOGE thread. Unofficial — not affiliated with Robinhood.

**Live:** https://dogecoinhood.com · https://robodoge-chain.vercel.app  
**Repo:** https://github.com/0xiglo/dogecoin-on-robinhood  
**X:** https://x.com/DogeCoinHood_

## Stack

- Plain HTML, CSS, and vanilla JS
- No bundler / no build step
- Deployed on Vercel (`vercel.json`)

## Pages

| Route | File |
|-------|------|
| Overview | `index.html` |
| Docs | `docs.html` |
| Fees | `fees.html` |
| Vision | `vision.html` |
| Token | `token.html` |
| FAQ | `faq.html` |

Shared assets: `styles.css`, `app.js`, `dogecoin.png`, favicons, `assets/`.

## Run locally

```bash
python -m http.server 8000
```

Open http://127.0.0.1:8000/

## Deploy

```bash
npx vercel deploy --prod
```

## References

- Robinhood Chain node docs: https://docs.robinhood.com/chain/run-a-full-node
- Vlad Tenev thread: https://x.com/vladtenev/status/1514684182718398487
