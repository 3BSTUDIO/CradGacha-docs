---
title: Changelog
---

# Changelog

## 1.0.3

**New: 12 built-in languages**

- The in-game text now ships in **12 languages** — English, ไทย, Português (BR), Español, Bahasa Indonesia, 简体中文, Русский, 한국어, 日本語, Deutsch, Français, Polski. Set `language: <code>` in `config.yml` (e.g. `language: pt`). See [Configuration → Language](/configuration#language).
- `language.yml` still works as a per-key override on top of the chosen language, so you can tweak individual lines. Switching an older English install? Delete `language.yml` so the new language shows (it otherwise overrides with English).
- The **`/gacha config` editor** (Premium) is now fully localized — page titles, setting names, and the hover tooltips all follow the chosen language. Any untranslated string falls back to English automatically.

**New: CraftEngine support**

- **CraftEngine is now a supported item provider** (free build too) — a free, open-source alternative to ItemsAdder / Nexo / Oraxen. Use `craftengine:<id>` for any reward, cost item, crate icon or menu image. Custom-item rewards work out of the box; for the menu **images**, keep `ui.item-provider: vanilla` (the self-hosted pack) unless you've added the UI art to a CraftEngine pack yourself. See [Crates](/crates).

**Animated banners (Premium)**

- **New `/gacha import <url>` — drop a GIF into the game and it becomes an animated banner.** The importer downloads a PNG or GIF (or reads one from `plugins/CradGacha/import/`), slices the GIF into frames with the built-in decoder — no external tool — and writes the frames and glyph entries straight into your active pack (ItemsAdder / Nexo / Oraxen). Up to 64 frames, 2 MB.
- **Font Glyph Animation engine** — any menu element can now cycle a frame sequence (GIF-style), and `model.provider: GLYPH` plays a frame animation as the crate-open sequence with no ModelEngine or BetterModel needed. Per-rarity frame sets and play times are supported.
- These are **Premium** features. The free build plays its full 3D open-animations (BetterModel / ModelEngine) as before; animation elements render their first frame statically. See the [Animations guide](/animations).

**Premium upsell**

- Every "this is a Premium feature" notice now carries a one-line benefit and a **clickable buy link** instead of stopping dead — including the crate-cap and rate-up notices in the console. The link is configurable under `premium.url` / `premium.label`, defaulting to the wiki's premium page.

## 1.0.2

**Setup & first run**

- **`/gacha setup` runs automatically on first launch** once the server has finished starting — a fresh install gets a working menu with no manual step.
- **`/gacha setup` now installs the ModelEngine blueprint** (`cradgacha_open`) into `ModelEngine/blueprints/` and reloads it, then re-merges the model pack — the 3D open model works out of the box instead of looking like the pack was incomplete.

**Menu / cursor**

- **Mouse speed is now a single value** (the old separate X/Y was confusing and made the reachable area seem to shrink). The cursor's reach is set by the menu layout, not the speed.
- **"Not enough item" now names the item** you're missing (e.g. *Not enough Diamond!*).
- **Performance:** the per-tick cursor loop no longer re-reads config every tick (snapshotted and refreshed on reload) — lighter when many players have a menu open.

**Premium — editors**

- Reward editor: the item picker button is renamed **[ Inventory ]**, and a new **[ Reset ]** button discards unsaved edits (two-click confirm).

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

**Developer API split**

- The API is now **Free (read-only)** + **Premium (actions & events)**. `isMenuOpen`, `getPity`,
  `getTokens`, `getCrateIds` work on any jar; `openCrate`, `addTokens`, `takeTokens` and the
  `GachaOpen`/`GachaPreOpen` events require the **Premium jar** or an `api.premium-token` (the Premium jar
  auto-generates one in `config.yml`). See [Developer API](developer-api.md).

## 1.0.1

- Hardened the built-in resource-pack host (multi-threaded serving, stricter requests) and safer first-run pack extraction.

## 1.0.0

- Initial release.
