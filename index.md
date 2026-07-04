---
title: CradGacha — Home
---

# CradGacha



---

## What is CradGacha?

**CradGacha** is a gacha (loot crate) plugin for **Paper 1.21+** Minecraft servers.

Instead of a normal chest GUI, it shows a **floating hologram menu** in the world and gives the
player a **virtual mouse cursor** they can move with their mouse to point and click — just like a
real game UI. Players pick a crate, open **x1** or **x10**, flip cards to reveal rewards, and can
**Open Again** without leaving the screen.

It is the cursor-only spin-off of an earlier project, rebuilt to be clean and focused.

## What is it for?

- Running **loot crates / gacha pulls** on your server.
- Giving players a polished, modern UI that feels like a custom client — but works on a **normal
  vanilla client** (with a resource pack), no client mod required.
- Selling pulls for **money (Vault)** or a built-in **token** currency you top up from your store.

## Who is it for?

- **Server owners** who want a good-looking crate/gacha system.
- **New admins** — you only edit a few YAML files; this wiki walks you through every step.
- Servers that already use **ItemsAdder** (used for the button/cursor images and reward models).

---

## Features

| Feature | What it does |
|---|---|
| **Cursor gacha menu** | A hologram menu with a virtual mouse cursor (point & click in the world). |
| **Hologram / Display UI** | Built from Minecraft Display entities (text, items, images) — no chest windows. |
| **Crate selection** | A vertical list of crates on the left; click one to select it. |
| **Open x1 / x10** | Open a single card or ten at once. The amount is configurable (`max-open`). |
| **Result cards** | Cards flip over with a Y-axis animation to reveal what you won. |
| **Open All (x10 only)** | On a 10-pull, reveal every remaining card at once. |
| **Open Again** | Re-roll using the **same count** as before (still charges the cost). |
| **Back button** | Returns to the crate menu — but on a 10-pull it only unlocks **after all 10 are revealed**. |
| **Economy / cost** | Each crate costs `NONE`, an `ITEM`, `MONEY` (via Vault), or `TOKEN` (built-in points). |
| **Reward system** | Rewards can give an item, run commands, or both — with per-rarity drop weights and a pity system. |
| **Tokens** | A built-in top-up currency stored in `tokens.yml`, managed with `/gacha token …`. |
| **Theme system** | A `theme.yml` lets you move/restyle every button and label without touching code. |
| **Self-diagnostics** | `/gacha doctor` checks your setup (packetevents, ItemsAdder, glyphs, Vault, crates, resource pack). |
| **Reward safety** | Rolled rewards are saved to disk immediately, so nothing is lost on crash/disconnect/death. |

> ⭐ **Premium** adds an in-game editor & crate creator, rate-up events, VIP luck, crate keys, a stats
> dashboard and a live layout editor (and removes the 3-crate limit). See the [Premium](/premium) page.

---

## Quick start (the short version)

1. Install **packetevents** and **ItemsAdder** (required), plus **Vault** if you sell pulls for money.
2. Drop `CradGacha-1.0.0.jar` into your `plugins/` folder and restart.
3. Run `/gacha doctor` to confirm everything is green.
4. Run `/gacha` to open the menu.

> 💾 **Starter files:** [download the default resource pack + example configs (MEGA)](https://mega.nz/file/ECoG2baa#RRIBS282vXQRHGTodQ_cmf4mawcSqfYgZ-4QwZueUS0) to skip building everything from scratch.

Full details are on the [Installation](installation.md) and [First Setup](first-setup.md) pages.

---

Next: [Installation →](installation.md)
