---
title: Deploy (GitHub Pages)
---

# Deploy with GitHub Pages

This documentation is built with **VitePress** and deployed automatically by **GitHub Actions**.

## How it's set up

- The plugin **code** repo (`CradGacha`) is **private**. GitHub Pages is free only for *public*
  repos, so the documentation lives in a separate **public** repo: **`CradGacha-docs`**.
- That public repo contains this VitePress project and a workflow
  (`.github/workflows/deploy-docs.yml`) that builds the site and publishes it to Pages.

## Enable it (one time)

On the **CradGacha-docs** repo:

1. **Settings → Pages → Build and deployment → Source = GitHub Actions.**
2. Push to `main` (or click **Run workflow** on the Actions tab). The workflow builds VitePress and
   deploys it.
3. The site goes live at `https://<user>.github.io/CradGacha-docs/`.

> If you rename the docs repo, update `base` in `.vitepress/config.mts` to `"/<new-repo-name>/"`.

## Updating the docs

The source of truth is the `docs/` folder in the private repo. After editing the Markdown:

```bash
# from the private CradGacha project root
git add docs && git commit -m "update docs"
git subtree push --prefix docs docs main   # pushes docs/ -> public CradGacha-docs repo
```

GitHub Actions then rebuilds and redeploys automatically.

## Run locally

```bash
cd docs
npm install
npm run docs:dev      # http://localhost:5173
# or
npm run docs:build    # output: .vitepress/dist
npm run docs:preview
```
