# dogecoin but on robinhood

Static multi-page site for **dogecoin but on robinhood** — a community story site about bringing Dogecoin to [Robinhood Chain](https://docs.robinhood.com/chain/run-a-full-node) by spinning up our own full node (LARP / builder energy, not an official Robinhood product).

Inspired by [Vlad Tenev’s April 2022 Dogecoin thread](https://x.com/vladtenev/status/1514684182718398487): vanishing fees, faster blocks, internet-currency vibes — then we put DOGE on the rails Robinhood ships today.

## Live

- **https://dogecoinhood.com**
- https://robodoge-chain.vercel.app

## Pages

| Page | File | What it covers |
|------|------|----------------|
| Overview | `index.html` | “Make your own node” story + Vlad tweet screenshot |
| Docs | `docs.html` | Pointers to official Robinhood Chain node docs |
| Fees | `fees.html` | Near-zero fee / throughput vibes |
| Vision | `vision.html` | Vlad’s 2022 DOGE vision |
| Token | `token.html` | rhDOGE / DOGE card |
| FAQ | `faq.html` | Common questions |

## Features

- Docs-style layout: left nav, main content in the center
- Dogecoin logo + favicon
- X link in the sidebar → [@DogeCoinHood_](https://x.com/DogeCoinHood_)
- GitHub: [https://github.com/0xiglo/dogecoin-on-robinhood](https://github.com/0xiglo/dogecoin-on-robinhood)
- Plain HTML / CSS / JS — no build step

## Run locally

From the project root:

```bash
python -m http.server 8000
```

Then open http://127.0.0.1:8000/

Or open `index.html` directly in a browser (some features work better over HTTP).

## Deploy

Hosted on [Vercel](https://vercel.com) as a static site (`vercel.json` with `cleanUrls`).

```bash
npx vercel deploy --prod
```

## Links

- Site: https://dogecoinhood.com
- X: https://x.com/DogeCoinHood_
- Robinhood Chain node docs: https://docs.robinhood.com/chain/run-a-full-node
- Vlad’s thread: https://x.com/vladtenev/status/1514684182718398487
- GitHub: https://github.com/0xiglo/dogecoin-on-robinhood

## Project layout

```
.
├── index.html              # Overview
├── docs.html
├── fees.html
├── vision.html
├── token.html
├── faq.html
├── styles.css
├── app.js
├── dogecoin.png
├── favicon.ico
├── favicon-32.png
├── apple-touch-icon.png
├── assets/
│   └── vlad-doge-tweet.png
├── vercel.json
└── README.md
```

## Note

This is an unofficial community / educational project. It is **not** affiliated with or endorsed by Robinhood. Overview content is a story/LARP — for a real node, follow Robinhood’s official docs.
