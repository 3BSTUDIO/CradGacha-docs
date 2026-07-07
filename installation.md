---
title: Installation
---

# Installation

## Requirements

| Thing | Version / Notes |
|---|---|
| **Server software** | **Paper** 1.21+ (Paper is required — it uses Paper APIs). Tested on 1.21.4–1.21.11. |
| **Java** | **Java 21** or newer. |
| **packetevents** | **Required.** Powers the spectator camera freeze that makes the cursor menu work. Use a version that matches your MC — on **1.21.9+ use packetevents 2.13.0+** (older ones mis-encode packets and can disconnect nearby players). |
| **A custom-item provider** | **Optional.** ItemsAdder, Nexo or Oraxen give the nicest look, but you don't need one — CradGacha ships a **vanilla** pack that renders the whole menu on MC **1.21.4+** with no provider. Pick whichever you already run (or none). |
| **Vault** | Required **only if** a crate costs `MONEY`. Also needs an economy plugin (e.g. EssentialsX Economy). |
| **BetterModel / ModelEngine** | Optional. For a 3D model animation before cards appear. |

> All optional plugins are loaded by **reflection** — if they are missing, CradGacha still starts.

## Step 1 — Install the dependencies

Put these in `plugins/` first and start the server once so they generate their files:

- `packetevents` (required)
- *(optional)* a custom-item provider — Nexo, ItemsAdder or Oraxen. **Skip this to use vanilla mode.**
- `Vault` + an economy plugin (only if you use `MONEY` cost)

## Step 2 — Install CradGacha

1. Download your **CradGacha jar** — the Free version, or the Premium version if you bought it — from where
   you got the plugin (your purchase / the resource page).
2. Copy the jar into `plugins/` and **start the server**. On first run it unpacks the bundled resource packs
   into `plugins/CradGacha/packs/`.

## Step 3 — Run `/gacha setup`

This one command installs the right resource pack for you. In game (as an operator) or from console:

```
/gacha setup
```

It detects your item provider and does the rest:

| Detected | What it does |
|----------|--------------|
| **ItemsAdder** | copies the pack into `plugins/ItemsAdder/contents/`, runs `/iazip` + `/iareload` |
| **Nexo** | copies items/glyphs/assets into `plugins/Nexo/`, runs `/nexo reload all` |
| **Oraxen** | copies items/glyphs/assets into `plugins/Oraxen/`, runs `/oraxen reload pack` |
| **none** | uses the **vanilla** pack and turns on the [built-in resource-pack host](setup.md) so players get it on join |

If a provider is built for a newer Minecraft than your server (e.g. Nexo 1.23+ on 1.21.4), setup detects it
and **automatically falls back to vanilla** — you're never left with a broken menu. Full details on the
[Setup & Resource Pack](setup.md) page.

Then **rejoin** so the client downloads the pack.

## Step 4 — Verify

```
/gacha doctor
```

Every line should show a green ✓. A red ✗ tells you what's wrong (see [Troubleshooting](troubleshooting.md),
which has the exact fix for grey/stone menus, box-glyphs (□) and purple/black backgrounds).

Then open the menu:

```
/gacha
```

## Editing / mixing providers

You rarely need to touch ids by hand — the shipped `theme.yml` / `cursor.yml` reference every built-in image
as the **`provider:` token** (e.g. `provider:menu_background`), which resolves to whatever `ui.item-provider`
is set to. If you do reference items yourself, CradGacha reads each value by **namespace prefix**:

| Prefix in config | Resolved as |
|---|---|
| `provider:<name>` | the built-in UI image for the active provider (recommended) |
| `nexo:<id>` | a **Nexo** item |
| `oraxen:<id>` | an **Oraxen** item |
| `mmoitems:<TYPE>:<id>` (e.g. `mmoitems:SWORD:CUTLASS`) | an **MMOItems** item |
| `crad_gacha:<id>` | an **ItemsAdder** item |
| `vanilla:crad_gacha:<id>` | a plain item carrying the `item_model` component (vanilla mode) |
| a plain glyph id (e.g. `g_open_x1`) | a **glyph** (ItemsAdder / Nexo / Oraxen / vanilla font) |
| a vanilla material (e.g. `CHEST`) | a vanilla item |

Players must **accept the server resource pack** on join, or the menu shows empty boxes (□). CradGacha warns
a player who declined it.

---

Next: [Setup & Resource Pack →](setup.md) · [First Setup →](first-setup.md)
