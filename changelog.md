---
title: Changelog
---

# Changelog

## 1.0.5

**New: Season Pass (Premium)**

- **A battle-pass for your gacha.** Players earn **XP** by opening crates (and completing Diary quests, or via `/gacha pass addxp` / the API), level up, and claim rewards on a **free track** and a **premium track**. The premium track is gated on a permission (`cradgacha.pass.premium`) you **sell in your store** — a new revenue stream. Rewards are console commands, so you can hand out items, money, keys, anything.
- In-game cursor menu (`/gacha pass`): the reward track laid out on a board, a page at a time, with each reward's own icon, a lock on what you haven't reached and a tick on what you've collected. Admin: `/gacha pass addxp <player> <n>` · `/gacha pass reset [player|all]`. Config in `pass.yml`.
- **Rewards can show what they are.** A reward is still a list of console commands, but it can also carry an `icon`, a `name` and an `amount` so the menu can display it. The plain-list form keeps working; `pass.yml` now ships rewards for all 30 levels.
- **Seasons can end by themselves.** Set `season-length-days` and the pass resets on that cycle — every player's XP and claims cleared, the countdown rolled on to the next deadline. Leave it at 0 and `season-ends` is just a date shown in the menu, as before. Your `pass.yml` is never rewritten.
- **`/gacha pass layout`** (admin) arranges the page in game: click a piece to pick it up, click again to drop it, `-`/`+` to resize, Save writes the numbers back to `theme.yml`.

**New: Daily Diary quests (Premium)**

- **Daily goals that bring players back.** Quests defined in `quests.yml` (open N crates, reveal N cards, open a specific crate, pull a rarity…) reset each day; completing and claiming one grants rewards **and Season Pass XP**. In-game menu: `/gacha diary`.

**New: MiniMessage formatting (both editions)**

- Write your menus and messages in **[MiniMessage](https://docs.papermc.io/adventure/minimessage/)** — gradients, hex colours, hover and click: `<gradient:#ff8800:#ffee00><bold>LEGENDARY</bold></gradient>`. **On by default**; set `minimessage: false` for legacy-only.
- **Your existing `&` colour codes keep working.** Only text that actually contains a `<tag>` is parsed as MiniMessage, and `&` codes inside it are translated too — so you can mix both and convert at your own pace. A malformed tag falls back to plain rendering instead of breaking the line.

**New language: Tiếng Việt**

- **Vietnamese** joins the bundled languages (`language: vi`) — thanks to a player from the community for the translation. The wiki is available in Vietnamese too.

**Menus look finished out of the box**

- **Shop, Spark, Wishlist, Rates and History now have a framed panel behind them** instead of text floating on the menu background — they share the editor panel image, so nothing new to install.
- **The Season Pass XP bar uses the same segmented artwork as the pity bar**, instead of a row of `|` characters.

> **Upgrading?** Bukkit never overwrites a config you already have, so your existing `theme.yml` keeps its current look. To pick these up, either delete `plugins/CradGacha/theme.yml` (it is rebuilt on the next start) or add the new blocks by hand — see [Configuration](/configuration). A **fresh install gets them automatically**.

**New: opening animation without a model plugin (Premium)**

- The animation before your cards can now be a **frame sequence** instead of a 3D model, so you no longer need ModelEngine or BetterModel installed to have one. Set `model.provider: GLYPH` and point it at the frames.
- **The bundled animation is colour-coded by rarity** — white, blue, purple, gold — and the rarer the pull, the longer it runs (3s to 6.3s). Everything before the burst looks the same whatever you rolled, so the colour appearing *is* the moment you find out what you got.
- Bring your own with `/gacha import <url|file>`: a GIF is sliced into frames for you. Big frames can be drawn as a grid of tiles (`model.glyph.tiles`) to cover the screen at full resolution — the same way the menu background does it.

**Theme keys now say what they are**

- `x` / `y` are **`position-x` / `position-y`**, and an element's size is **`width` and `height`** instead of `scale` plus an `aspect` multiplier. Setting the size of something no longer means working out `width = scale x aspect` first.
- **Your existing `theme.yml` keeps working** — the old names are still read, and both in-game layout editors write the new ones. Nothing to do unless you want to.

**Fixed**

- **An NPC no longer blocks the menu.** Opening the gacha by right-clicking a shopkeeper NPC put its body right where the menu renders, covering the UI. Only armor-stand decorations were being hidden, so NPCs (mobs, or fake players like Citizens) slipped through — now anything standing in the way is hidden for that player while the menu is open, and restored on close. Toggle: `clear-area.hide-furniture`.
- **…including NPCs that aren't really there.** **FancyNpcs** NPCs and **ModelEngine** models are drawn straight to your screen without existing as entities on the server, so nothing could hide them — they kept standing in front of the UI. Both are now hidden for the player in the menu (and only that player: everyone else sees the NPC as normal, and its right-click actions are untouched).
- **`/gacha reload` now reloads `pass.yml` and `quests.yml` too.** Editing rewards or quests and reloading did nothing at all — with no error to explain it — until a restart happened to pick the file up.
- **Pack updates reach your server.** The bundled packs are unpacked on every start, but a file that already existed was skipped, so an update that *changed* one never arrived: the plugin shipped new art, the installed pack still had the old list, and the menu silently rendered nothing. Files you edited are still kept — and now named in the log so you know to merge them.
- **`/gacha pass` and `/gacha diary` appear in tab completion.** They always worked; nothing ever announced them.
- **`/gacha fix` also brings back anything left hidden**, so a player whose menu ended badly is never stuck looking at a missing NPC.

**New item providers**

- **MythicArmor** (3D armor sets) is now a supported item provider (free build too). Use `mythicarmor:<piece id>`, e.g. `mythicarmor:mythical_dragon_armor_chest_piece` — perfect as a Legendary reward.
- **Sertraline-Hydrochloride** and **ExecutableItems** (Ssomar) are now supported item providers (free build too). Use `sertraline:<id>` / `executableitems:<id>` for any reward or cost item. See [Crates](/crates).
- **`/gacha doctor` now lists every custom-item provider** — CraftEngine, Sertraline, ExecutableItems and MythicArmor included — so you can confirm at a glance which ones are hooked.
- **Provider ids explain themselves.** If an id like `executableitems:<id>` can't be resolved, the log now names the reason (provider not installed vs. no item with that id) instead of a generic "unresolved custom id", and a provider that finishes loading after CradGacha is picked up without a restart.

## 1.0.4

**New: 12 built-in languages**

- The in-game text now ships in **12 languages** — English, ไทย, Português (BR), Español, Bahasa Indonesia, 简体中文, Русский, 한국어, 日本語, Deutsch, Français, Polski. Set `language: <code>` in `config.yml` (e.g. `language: pt`). See [Configuration → Language](/configuration#language).
- `language.yml` still works as a per-key override on top of the chosen language, so you can tweak individual lines. Switching an older English install? Delete `language.yml` so the new language shows (it otherwise overrides with English).
- The **`/gacha config` editor** (Premium) is now fully localized — page titles, setting names, and the hover tooltips all follow the chosen language. Any untranslated string falls back to English automatically.

**New: everything editable in-game**

- **Pick your language in-game** — the `/gacha config` **Menu** page has a **Language** selector that cycles all 12 languages and reloads instantly (it also clears an overriding default `language.yml` so the switch shows). No YAML needed. Premium.
- **Import a GIF from the layout editor** — the Button Library popup has a new **[ ⬇ Import ]** button: paste a GIF/PNG URL and it's pulled into your pack without leaving the editor (a GIF becomes frames for **[ 🎬 Animation ]**). Premium.

## 1.0.3

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
