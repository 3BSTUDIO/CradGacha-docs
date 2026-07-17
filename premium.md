# Premium

<a class="buy-card" href="https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53" target="_blank" rel="noreferrer">
  <span class="desc">Get CradGacha Premium — $14.99 · one payment, no subscription</span>
  <span class="title">Buy on MineAssets →</span>
</a>

**The free jar is a complete gacha. Premium is how you make money from it.**

Rate-up banners, sellable keys and rank-based luck are the three things real gacha games monetize
with — Premium adds all three, makes the menu yours to redesign, and lets you run the whole thing
in-game without ever opening a YAML file.

---

## Make money from your gacha

### Rate-Up Events

**The engine every real gacha runs on.** Schedule a banner window that boosts a rarity, and the menu
carries a live countdown (`⚡ RATE UP — ends in 2d 5h`). A window that closes is what turns a player
who was *going to open some crates eventually* into one who opens them tonight.

```yaml
# crates.yml — per crate
event:
  start: "2026-07-10 18:00"   # both optional — omit for always-on
  end:   "2026-07-17 23:59"
  rate-up: { LEGENDARY: 2.0, EPIC: 1.5 }   # weight multipliers while active
```

- The rates page **and** the simulator show the boosted percentages automatically.
- Countdown position/format via `theme.event-line`, or drop `{event}` into any theme text element.
- Fully editable in the Settings editor (page 3) — run a new banner without touching a file.

### Crate Keys

**A product you can sell.** A key opens the crate for free, bypassing the cost — 1 key per open
(10 keys = 10 opens). Players without a key pay the normal cost.

```yaml
# crates.yml — per crate
cost: { type: MONEY, amount: 100 }
key: "crad_gacha:starter_key"     # or a vanilla item, e.g. key: TRIPWIRE_HOOK
```

- **`/gacha key give <player> <crate> [amount]`** is built to be called from a store package —
  Tebex, CrazyVouchers, or anything that runs a console command on purchase.
- Set the key item on the Settings editor's **Keys** page (or `crates.yml`), and give yourself test keys there.
- Free crates (cost `NONE`) never consume keys. A failed open refunds the keys, not the cost.

### VIP Luck

**Makes every rank you sell worth more.** A permission-based rarity boost applied on every roll.

```yaml
# config.yml
luck:
  enabled: true
  permission-prefix: "cradgacha.luck."
  rarities: [EPIC, LEGENDARY]     # which rarities the boost multiplies
```

Grant `cradgacha.luck.10` (= +10%), `cradgacha.luck.25`, etc. via your rank plugin — the highest node
the player has wins. Show it off with the `{luck}` placeholder in a theme text element.

---

## Make it yours

### Animated banners — drag in a GIF

Drop a GIF into the game and it becomes an animated banner — CradGacha slices the frames, registers
the glyphs and writes them into your pack for you. No pack editing, no image tools.
See **[Animations](/animations)**.

### Live Layout Editor — `/gacha layout [theme]`

Redesign the menu with the mouse instead of tuning `x`/`y` numbers by hand — so your gacha looks like
*your server*, not like everyone else's default.

- `/gacha layout` edits the **active** theme; `/gacha layout <name>` switches to and edits that theme (tab-completed). Clone a theme first with **`/gacha config` → Theme → Clone** if you want to keep the default untouched.
- Opens the real crate menu in **layout mode**; click a themed element to pick it up (it rides the cursor), click again to drop it.
- **Save** writes the new positions/looks/functions back to `theme.yml` (a crate's banner override goes to `crates.yml`); **Exit** discards.

#### Top toolbar (nothing held)

| Cell | Does |
|------|------|
| **Undo** / **Redo** | step through every change |
| **Save** | write changes to yml |
| **Library** | open the Button Library popup |
| **Text** | type a new text element — it then rides the cursor; click to place it |
| **Exit** | discard and leave |

#### Held-element toolbar (while an element rides the cursor)

| Cell | Does |
|------|------|
| **Bigger** / **Smaller** | resize the held element (0.05 steps) |
| **Delete** | remove it |
| **Duplicate** | drop a copy, keep editing the copy |
| **Image** | open the Library and click any image to set it as this element's look |
| **Function** | give it a click action (see the table below); type `none` to clear |

- **Button Library** popup — lists every button defined in `theme.yml` (tabs: All / Main / Reveal / Sub Pages / Custom); click one to place a copy (or, in *Image* mode, to set the held element's image). **[ + Add ]** registers a new glyph button by writing a `font_image` into your ItemsAdder pack (then run `/iazip`), and **[ - Remove ]** unregisters custom ones.

#### Element functions (the **Function** button)

Assign any of these so a custom text/image element becomes a working button. Saved to `theme.yml` as `elements.<id>.action` (+ `param`), with a default hitbox so it's clickable.

| Action | What the button does | Param |
|--------|----------------------|-------|
| `open_shop` | open the Token Shop | — |
| `open_spark` | open the Spark Exchange | — |
| `open_wishlist` | open the Wishlist | — |
| `open_rates` | open the drop-rates page | — |
| `open_history` | open the player's pull history | — |
| `open_count` | open this crate for N pulls | `<crate>:<count>` (e.g. `starter:10`) |
| `open_all` | open the max pulls at once | crate id (optional) |
| `back_to_menu` | return to the crate list | — |
| `close_menu` | close the whole menu | — |
| `link_url` | send the player a clickable chat link | a URL |

> Tip: the toolbar strips are single textures split into equal cells. If you re-draw `layout_edit.png` / `layout_edit_1.png` a different width, set `theme.layout-editor.bar-aspect` / `mbar-aspect` (width ÷ height) so they don't stretch.

---

## Never open a YAML file again

Everything above — and every reward, cost, pity and drop rate — is editable in-game on a cursor panel.

### In-game Reward Editor — `/gacha edit <crate>`

Edit a crate's rewards entirely in-game — no YAML, no reloads.

- **Reward list** — every reward as an icon grid; hover to inspect (name + lore), click to edit.
- **Per reward (page 1):** name, item, amount, rarity, duplicate→spark exempt, commands (add/clear).
- **Per reward (page 2):** display **size** on the card, a **win message** (chat) and **win title** (big center text) with `{reward}` / `{player}` placeholders.
- **Set from held item** — click the preview to copy the item you're holding (auto-detects ItemsAdder / Nexo / Oraxen / MMOItems / vanilla).
- **[ Inventory ]** — pick the reward's item from your **inventory** in a grid, so you can set several different items without closing the menu to swap what you're holding.
- **[ + Add ]** a new reward, **[ Delete Reward ]**, **[ 🎲 Test 1000 ]** (see Simulator), **[ ⚙ Settings ]**.
- **[ Reset ]** (top-right) — discard all unsaved edits and reload the crate from disk. Two clicks (it asks *Discard changes?* first) so it can't be hit by accident.
- **Submit & Save** writes `crates.yml` and reloads the plugin. Text input uses the native **Dialog API** on 1.21.6+ (a real text field), with a chat-capture fallback on older servers.

### Crate Settings editor

Reached from the editor's **[ ⚙ Settings ]** — a 4-page panel covering (almost) every crate key:

1. **General / Cost / Pity** — name, enabled, cost type/amount/item, pity on/off + rarity + threshold, display item.
2. **Drops / Extras** — broadcast, duplicate→spark + amount, wishlist (on/max/rarity), spark shop + title + items sub-page.
3. **Rate-Up Event** — start/end dates + a weight multiplier per rarity.
4. **Keys** — the key item + give yourself test keys.

Only the keys you actually change are written back, so hand-tuned values (banner/button positions, etc.) are preserved.

### Crate Creator — `/gacha create <id>`

Build a brand-new crate from scratch, 100% in-game: it writes a disabled skeleton to `crates.yml`, reloads, and opens the editor on it. Add rewards, set cost & pity, enable it in Settings, done.

### Global Config editor — `/gacha config`

Tune **global** settings on a cursor panel — no YAML. Each field writes back to its real source file
(`cursor.yml` / `config.yml` / `theme.yml`) and reloads the plugin. **Hover a setting's label** to see a
one-line description of what it does.

- **Mouse & Cursor** — **mouse speed** (one value; higher = faster — the reachable area is set by the menu size, not the speed), UI scale, cursor smoothing.
- **Cursor Feel** — crosshair size, magnetic snap (on/strength/radius).
- **Menu** — hide hand, clear weather, body double, max open (x10), clear-area on/off + radius.
- **Gameplay** — require-on-ground, inventory-space check, cooldown, reward log, VIP luck.
- **Effects** — card glow, pull suspense, 3D open model, global pity default.
- **Rarities** — per rarity: weight, announce, glow color.

Numbers use −/+ buttons (or click the value to type an exact one); toggles flip; enums cycle.

> Settings that could make the menu unusable (camera mode, cursor plane distance, cursor bounds) are
> deliberately **not** exposed here — those stay in `cursor.yml`.

---

## Know what's actually happening

### Stats & History

- **`/gacha stats [crate]`** *(admin)* — a dashboard of the real drop distribution vs configured %, plus top openers, with a crate filter. Built from the reward-log audit file.
- **`/gacha history`** *(everyone — Free)* — the player's own last pulls + current pity per crate.

Both need the audit log on:

```yaml
# config.yml
reward-log:
  enabled: true
```

### 1,000-Roll Simulator

The editor's **[ 🎲 Test 1000 ]** rolls the (last-saved) crate 1,000 times and shows the real drop distribution per rarity next to the configured chance — a fast sanity check that your weights feel right (and that rate-up boosts land where you expect).

### Developer API

Bukkit events (`GachaPreOpenEvent` — cancellable, `GachaOpenEvent`) plus a `CradGachaAPI` facade to open
crates, manage tokens and gate opens from your own plugins. See **[Developer API](/developer-api)**.

---

## Free vs Premium at a glance

| Feature | Free | Premium |
|---------|:----:|:-------:|
| Cursor menu, reveal, pity, cost types (incl. multi-cost) | ✅ | ✅ |
| Duplicate→Spark, Spark Exchange, Wishlist, Token Shop | ✅ | ✅ |
| Rarity glow, per-reward size / message / title | ✅ | ✅ |
| `/gacha history`, PlaceholderAPI | ✅ | ✅ |
| 3D open animation (BetterModel / ModelEngine) | ✅ | ✅ |
| Number of crates | up to 3 | unlimited |
| **Rate-Up events, crate keys, VIP luck** | — | ✅ |
| **GIF importer + animated banners** | — | ✅ |
| Live layout editor | — | ✅ |
| In-game editor / creator / settings / config | — | ✅ |
| `/gacha stats` + 1,000-roll simulator | — | ✅ |
| **Developer API** (events + `CradGachaAPI`) | — | ✅ |

::: tip Ready?
**[Get CradGacha Premium — $14.99 →](https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53)**
:::

---

## Installing Premium

CradGacha ships as **two separate jars**. The premium features live in a separate source set, so the free
jar physically does not contain them.

1. Delete the free `CradGacha-x.jar` from `plugins/`.
2. Drop in `CradGacha-Premium-x.jar`.
3. Restart. The premium commands light up automatically — nothing else to configure.

Your `config.yml`, `crates.yml` and `theme.yml` all carry over untouched.

> **Not a runtime flag.** If a command says *"Premium"*, the free jar answers with a short upsell notice
> and does nothing.
