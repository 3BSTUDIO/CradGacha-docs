---
title: Changelog
---

# Changelog

## 1.0.2

**Stability**

- **Fixed models disappearing after joining** on servers with an item provider. The built-in resource-pack host was sending its vanilla pack on top of the provider's pack; the second load wiped the provider/model textures. The host now runs **only in vanilla mode**, and `/gacha setup` turns it off when you pin ItemsAdder/Nexo/Oraxen.
- **Fixed "ghost holes"** (e.g. ice/blocks that looked removed) left after opening a crate — the client-side clear-area now restores every faked block from all menu pages, not just the last one. The world was never actually changed; a relog always fixed it, and now nothing is left behind.
- **Locator bar** (1.21.9+) is muted while a menu is open and reliably restored on close/relog.
- Multi-player: other players and the camera armour stands are hidden from the menu owner, so someone standing at the gacha point can't cover the UI (`cursor.hide-players`).

**Menu / reveal**

- Duplicate pulls now show **`+N ✦ Spark` on the flipped card** instead of a chat line (no spoiler before you open it). Position/size via `theme.reveal-cards.dup-y` / `dup-scale`.
- Epic/Legendary broadcast fires **after** the card is flipped.
- **Open Again** flips any face-down cards first, then starts the next open.
- 3D open model: per-rarity play time with `model.durations.<RARITY>` so longer animations aren't cut off.
- `/gacha setup` **auto-merges the ModelEngine pack** into the Nexo/Oraxen/vanilla pack (ItemsAdder merges it itself when `allow_other_plugins_resourcepacks: true`).
- Fixed Nexo glyphs showing as raw `:id:` text in some menu labels.

**Premium — editors**

- **Layout editor** got a big pass: `/gacha layout <theme>` to edit any theme; a **Text** tool that creates text riding the cursor; an **Image** tool that opens the Library to pick an image for the held element; a **Function** tool to assign a click action (open shop/spark/wishlist/rates/history, etc.); an **All Images** Library tab listing every font image your provider defines. See [Premium → Live Layout Editor](premium.md#live-layout-editor-gacha-layout-theme).
- **Reward editor:** a **[ Bag ]** button to pick a reward's item from your inventory without closing the menu.
- **Config editor:** hover any setting's label to see **what it does**.

New config keys are listed on the [Configuration](configuration.md#keys-added-in-1-0-2) page.

## 1.0.1

- Hardened the built-in resource-pack host (multi-threaded serving, stricter requests) and safer first-run pack extraction.

## 1.0.0

- Initial release.
