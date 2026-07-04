# Premium

CradGacha ships as **two separate jars** built from the same project:

| Build | Jar | What you get |
|-------|-----|--------------|
| **Free** | `CradGacha-x.jar` | The full cursor menu, reveal, pity, duplicate→spark, wishlist, token shop, all cost types, rarity glow, per-reward size/message/title, history, PlaceholderAPI, developer API — up to **3 crates**. |
| **Premium** | `CradGacha-Premium-x.jar` | Everything in Free **plus** the in-game editor, crate creator, rate-up events, VIP luck, crate keys, stats dashboard, live layout editor — and **unlimited crates**. |

The premium features live in a separate source set, so the free jar physically does not contain them. Drop in the premium jar (replacing the free one), restart, and the premium commands light up automatically. Nothing else to configure.

> **Not a runtime flag.** If a command below says *"Premium"*, the free jar answers with a short upsell notice and does nothing.

---

## In-game Reward Editor — `/gacha edit <crate>`

Edit a crate's rewards entirely in-game on a cursor-menu panel — no YAML, no reloads.

- **Reward list** — every reward as an icon grid; hover to inspect (name + lore), click to edit.
- **Per reward (page 1):** name, item, amount, rarity, duplicate→spark exempt, commands (add/clear).
- **Per reward (page 2):** display **size** on the card, a **win message** (chat) and **win title** (big center text) with `{reward}` / `{player}` placeholders.
- **Set from held item** — click the preview to copy the item you're holding (auto-detects ItemsAdder / Nexo / Oraxen / MMOItems / vanilla).
- **[ + Add ]** a new reward, **[ Delete Reward ]**, **[ 🎲 Test 1000 ]** (see Simulator), **[ ⚙ Settings ]**.
- **Submit & Save** writes `crates.yml` and reloads the plugin. Text input uses the native **Dialog API** on 1.21.6+ (a real text field), with a chat-capture fallback on older servers.

## Crate Settings editor

Reached from the editor's **[ ⚙ Settings ]** — a 4-page panel covering (almost) every crate key:

1. **General / Cost / Pity** — name, enabled, cost type/amount/item, pity on/off + rarity + threshold, display item.
2. **Drops / Extras** — broadcast, duplicate→spark + amount, wishlist (on/max/rarity), spark shop + title + items sub-page.
3. **Rate-Up Event** — start/end dates + a weight multiplier per rarity.
4. **Keys** — the key item + give yourself test keys.

Only the keys you actually change are written back, so hand-tuned values (banner/button positions, etc.) are preserved.

## Crate Creator — `/gacha create <id>`

Build a brand-new crate from scratch, 100% in-game: it writes a disabled skeleton to `crates.yml`, reloads, and opens the editor on it. Add rewards, set cost & pity, enable it in Settings, done.

## Global Config editor — `/gacha config`

Tune **global** settings on a cursor panel — no YAML. Each field writes back to its real source file
(`cursor.yml` / `config.yml` / `theme.yml`) and reloads the plugin.

- **Mouse & Cursor** — **mouse speed** (X/Y), UI scale, cursor smoothing.
- **Cursor Feel** — crosshair size, magnetic snap (on/strength/radius).
- **Menu** — hide hand, clear weather, body double, max open (x10), clear-area on/off + radius.
- **Gameplay** — require-on-ground, inventory-space check, cooldown, reward log, VIP luck.
- **Effects** — card glow, pull suspense, 3D open model, global pity default.
- **Rarities** — per rarity: weight, announce, glow color.

Numbers use −/+ buttons (or click the value to type an exact one); toggles flip; enums cycle.

> Settings that could make the menu unusable (camera mode, cursor plane distance, cursor bounds) are
> deliberately **not** exposed here — those stay in `cursor.yml`.

## 1,000-Roll Simulator

The editor's **[ 🎲 Test 1000 ]** rolls the (last-saved) crate 1,000 times and shows the real drop distribution per rarity next to the configured chance — a fast sanity check that your weights feel right (and that rate-up boosts land where you expect).

---

## Rate-Up Events

Schedule a "banner" window per crate that boosts rarity weights, with a live countdown on the menu.

```yaml
# crates.yml — per crate
event:
  start: "2026-07-10 18:00"   # both optional — omit for always-on
  end:   "2026-07-17 23:59"
  rate-up: { LEGENDARY: 2.0, EPIC: 1.5 }   # weight multipliers while active
```

- The rates page **and** the simulator show the boosted percentages automatically.
- A countdown line (`⚡ RATE UP — ends in 2d 5h`) shows on the menu; position/format via `theme.event-line`, or drop `{event}` into any theme text element.
- Also fully editable in the Settings editor (page 3).

## VIP Luck

Permission-based rarity boost applied on every roll — perfect to sell with ranks.

```yaml
# config.yml
luck:
  enabled: true
  permission-prefix: "cradgacha.luck."
  rarities: [EPIC, LEGENDARY]     # which rarities the boost multiplies
```

Grant `cradgacha.luck.10` (= +10%), `cradgacha.luck.25`, etc. via your rank plugin — the highest node the player has wins. Show it with the `{luck}` placeholder in a theme text element.

## Crate Keys

A key item opens the crate **for free, bypassing the cost** — 1 key per open (10 keys = 10 opens). Players without a key pay the normal cost.

```yaml
# crates.yml — per crate
cost: { type: MONEY, amount: 100 }
key: "crad_gacha:starter_key"     # or a vanilla item, e.g. key: TRIPWIRE_HOOK
```

- Set the key item in the Settings editor's **Keys** page (or `crates.yml`), and give yourself test keys there.
- Hand out keys with **`/gacha key give <player> <crate> [amount]`** — designed to run from CrazyVouchers / Tebex packages.
- Free crates (cost `NONE`) never consume keys. A failed open refunds the keys, not the cost.

---

## Stats & History

- **`/gacha stats [crate]`** *(admin)* — a dashboard of the real drop distribution vs configured %, plus top openers, with a crate filter. Built from the reward-log audit file.
- **`/gacha history`** *(everyone — Free)* — the player's own last pulls + current pity per crate.

Both need the audit log on:

```yaml
# config.yml
reward-log:
  enabled: true
```

## Live Layout Editor — `/gacha layout`

Redesign the menu with the mouse instead of tuning `x`/`y` numbers by hand.

- Opens the real crate menu in **layout mode**; click a themed element to pick it up (it rides the cursor), click again to drop it.
- **Undo / Redo / Save / Library / Exit** toolbar; while dragging, drop onto **Delete** or **Duplicate** zones.
- **Button Library** popup — lists every button defined in `theme.yml` (tabs: All / Main / Reveal / Sub Pages / Custom); click one to place a copy. **[ + Add ]** registers a new glyph button by writing a `font_image` into your ItemsAdder pack (then run `/iazip`), and **[ - Remove ]** unregisters custom ones.
- **Save** writes the new positions back to `theme.yml` (and a crate's banner override to `crates.yml`).

---

## Free vs Premium at a glance

| Feature | Free | Premium |
|---------|:----:|:-------:|
| Cursor menu, reveal, pity, cost types (incl. multi-cost) | ✅ | ✅ |
| Duplicate→Spark, Spark Exchange, Wishlist, Token Shop | ✅ | ✅ |
| Rarity glow, per-reward size / message / title | ✅ | ✅ |
| `/gacha history`, PlaceholderAPI, Developer API | ✅ | ✅ |
| Number of crates | up to 3 | unlimited |
| In-game editor / creator / settings | — | ✅ |
| Rate-Up events, VIP luck, crate keys | — | ✅ |
| `/gacha stats`, live layout editor | — | ✅ |
