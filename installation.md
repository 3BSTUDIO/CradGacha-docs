---
title: Installation
---

# Installation



---

## Requirements

| Thing | Version / Notes |
|---|---|
| **Server software** | **Paper** 1.21+ (Paper is required — it uses Paper APIs). Tested on 1.21.4–1.21.11. |
| **Java** | **Java 21** or newer. |
| **packetevents** | **Required.** Powers the spectator camera freeze that makes the cursor menu work. |
| **A custom-item provider** | **Strongly recommended — pick one:** **Nexo**, **ItemsAdder**, or **Oraxen**. Provides the button images, cursor image, crate icons, and reward models (as glyphs and/or items). Without one the menu shows empty boxes (□). |
| **Vault** | Required **only if** a crate costs `MONEY`. Also needs an economy plugin (e.g. EssentialsX Economy). |
| **BetterModel / ModelEngine** | Optional. For a 3D model animation before cards appear. |

> All optional plugins are loaded by **reflection** — if they are missing, CradGacha still starts.

## Step 1 — Install the dependencies

Put these in your `plugins/` folder first and start the server once so they generate their files:

- `packetevents` (required)
- a custom-item provider — **Nexo**, ItemsAdder, or Oraxen (recommended; pick one)
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
See [Troubleshooting](troubleshooting.md) for details.

Then open the menu:

```
/gacha
```

## A note on the resource pack

The button/cursor images and reward models come from your custom-item provider. CradGacha reads
each value by **namespace prefix**, so a theme/config can mix providers freely:

| Prefix in config | Resolved as |
|---|---|
| `nexo:<id>` | a **Nexo** item |
| `oraxen:<id>` | an **Oraxen** item |
| `<namespace>:<id>` (e.g. `crates_gacha:bg_1`) | an **ItemsAdder** item |
| a plain glyph id (e.g. `g_open_x1`) | a **glyph** — resolved via ItemsAdder **or** Nexo |
| a vanilla material (e.g. `CHEST`) | a vanilla item |

After adding or changing images/items, rebuild that provider's pack:

```
/nexo reload           # Nexo   — reloads glyphs + items and rebuilds the pack
/iazip                 # ItemsAdder — then /iareload
/oraxen reload all     # Oraxen — (or /oraxen reload pack)
```

Players must **accept the server resource pack** when they join, or the menu will show as empty
boxes (□). CradGacha warns a player who declined the pack.

### Using Nexo (glyphs + items)

CradGacha ships a glyph set and item models for Nexo. To install them:

1. Copy the glyph config to `plugins/Nexo/glyphs/crates_gacha.yml`.
2. Copy the textures into `plugins/Nexo/pack/assets/crates_gacha/textures/` (keep the `font/` subfolder).
3. Copy the item models into `plugins/Nexo/pack/assets/crates_gacha/models/`.
4. Run `/nexo reload` (Nexo auto-assigns each glyph a character and rebuilds the pack), then **rejoin**.

Reference a glyph in `theme.yml` with `type: glyph` (e.g. `value: g_open_x1`), and a Nexo item in
`config.yml`/`cursor.yml` with the `nexo:` prefix (e.g. `crosshair-item: "nexo:ui_cursor"`).
In any text/MiniMessage context a glyph also works as `<glyph:g_open_x1>` or the shorthand `:g_open_x1:`.

---

Next: [First Setup →](first-setup.md)
