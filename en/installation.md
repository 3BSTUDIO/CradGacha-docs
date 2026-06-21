---
title: Installation
---

# Installation

[🏠 Home](index.html) · [🇹🇭 อ่านภาษาไทย](../th/installation.html) · [🌐 Language picker](../index.html)

**Pages:** [Home](index.html) · **Installation** · [First Setup](first-setup.html) · [Commands](commands.html) · [Permissions](permissions.html) · [Configuration](configuration.html) · [Crates](crates.html) · [Cursor UI](cursor-ui.html) · [Result Panel](result-panel.html) · [Troubleshooting](troubleshooting.html) · [FAQ](faq.html) · [Developer Notes](developer-notes.html)

---

## Requirements

| Thing | Version / Notes |
|---|---|
| **Server software** | **Paper** 1.21+ (Paper is required — it uses Paper APIs). Tested on 1.21.4–1.21.11. |
| **Java** | **Java 21** or newer. |
| **packetevents** | **Required.** Powers the spectator camera freeze that makes the cursor menu work. |
| **ItemsAdder** | **Strongly recommended.** Provides the button images, cursor image, crate icons, and reward models (glyphs). Without it the menu shows empty boxes (□). |
| **Vault** | Required **only if** a crate costs `MONEY`. Also needs an economy plugin (e.g. EssentialsX Economy). |
| **Nexo / Oraxen** | Optional. Alternative custom-item providers for rewards/icons. |
| **BetterModel / ModelEngine** | Optional. For a 3D model animation before cards appear. |

> All optional plugins are loaded by **reflection** — if they are missing, CradGacha still starts.

## Step 1 — Install the dependencies

Put these in your `plugins/` folder first and start the server once so they generate their files:

- `packetevents` (required)
- `ItemsAdder` (recommended)
- `Vault` + an economy plugin (only if you use `MONEY` cost)

## Step 2 — Install CradGacha

1. Download or build `CradGacha-1.0.0.jar`.
   - To build from source: run `./gradlew build` and find the jar in `build/libs/`.
2. Copy the jar into your server's `plugins/` folder.

## Step 3 — Restart the server

Use a **full restart**, not just `/reload`:

- In your server console, type `stop`, then start the server again.
- Or use your host panel's **Restart** button.

On startup you should see a log line like:

```
[CradGacha] CradGacha enabled! Loaded 3 crate(s).
[CradGacha] Integrations -> ItemsAdder: found | ... | packetevents: found
```

## Step 4 — Verify

In game (as an operator), run:

```
/gacha doctor
```

Every line should show a green ✓. If something shows a red ✗, the message tells you how to fix it.
See [Troubleshooting](troubleshooting.html) for details.

Then open the menu:

```
/gacha
```

## A note on the resource pack

The button/cursor images and reward models come from **ItemsAdder**. After you add or change any
images, run ItemsAdder's commands so it rebuilds the pack:

```
/iazip
/iareload
```

Players must **accept the server resource pack** when they join, or the menu will show as empty
boxes (□). CradGacha warns a player who declined the pack.

---

Next: [First Setup →](first-setup.html)
