# Features

A reference for every CradGacha gameplay feature. Most are **config-gated and off/safe by default** — turn on
what you need. After editing config run `/gacha reload`. After editing the resource pack (Nexo/BetterModel)
**restart + rejoin**.

> Looking for the **in-game editor, rate-up events, VIP luck, crate keys, stats or the layout editor**? Those
> are on the [Premium](/premium) page.

## Ways to open a crate

| Method | How |
|--------|-----|
| Command | `/gacha` (menu) · `/gacha open <crate> [1\|10]` (direct) |
| History | `/gacha history` — a player's own recent pulls + current pity (needs `reward-log.enabled: true`) |

### Clean stage (clear-area)
When the menu opens, the blocks around the player are faked to **AIR for that viewer only** (sent via packets —
the world is never modified, and other players see nothing), giving the menu and 3D model a clean empty backdrop
without teleporting anyone. The real blocks are re-sent on close. Configure in `config.yml`:

```yaml
clear-area:
  enabled: true
  radius: 5     # blocks cleared around the player (1-8); higher = bigger bubble
```

## Pity & guarantees
- **Hard pity** — guaranteed `rarity` after `threshold` opens.
- Pity **resets** on the pity rarity *or* the rarest reward present.
- **Pity bar** — a tiled segment glyph on the main menu (see [Cursor UI](/cursor-ui)).
- **Level-up sound** — an ascending tick each time the bar gains a segment.

```yaml
# crates.yml — per crate
pity: { enabled: true, rarity: LEGENDARY, threshold: 100 }
```
```yaml
# config.yml
pity:
  level-sound: "block.note_block.bell"   # custom IDs OK; "" = off
  level-sound-volume: 1.0
```

## Retention features

### Duplicate → Spark
An already-owned item pays **Spark** instead of giving the duplicate. Converted at roll time (loss/dupe-proof).
```yaml
# crates.yml
duplicate:
  enabled: true
  give-spark: 5
  by-rarity: { RARE: 10, EPIC: 25, LEGENDARY: 100 }
  include-commands: true   # also count command-only rewards (a duplicate pays Spark instead of re-running)
```
Add `duplicate: false` on any single reward to exempt it (always delivered / commands always re-run). See
[Crates → Duplicate & Spark](/crates#duplicate-amp-spark-exchange).

### Spark Exchange (shop)
Spend Spark (earned from duplicates) on a chosen reward — pity-proof. A separate shop from the Token Shop.
Each item can **reference an existing reward** or be **defined inline** (like the Token Shop):
```yaml
# crates.yml
spark:
  enabled: true
  items:
    - { reward: "Dragon Jade Spear", cost: 30 }              # reference a reward name in this crate
    - { name: "Trident", item: TRIDENT, amount: 1, cost: 30 } # inline item (no matching reward needed)
    - { name: "100 Coins", commands: ["[console] eco give <player> 100"], icon: SUNFLOWER, cost: 15 }
```

### Token Shop
A server-wide shop to spend the token currency on items.
```yaml
# config.yml
token-shop:
  enabled: true
  items:
    - { name: "Dragon Jade Spear", item: "nexo:dragon_jade_spear", amount: 1, cost: 200 }
```

### Wishlist
Players pick which **target-rarity** reward they want; rolling that rarity gives a wished one (the rarity is
unchanged, so pity stays correct). This is the main "steer your luck" mechanic.
```yaml
# crates.yml
wishlist: { enabled: true, max: 1, rarity: LEGENDARY }
```

### Pull Broadcast
Revealing an `announce: true` rarity announces it server-wide with a hover.
```yaml
# crates.yml
broadcast: { enabled: true }
```

## Cost types
`cost.type`: `NONE`, `ITEM`, `MONEY` (Vault), `TOKEN` (built-in currency), `PLAYERPOINTS` (PlayerPoints plugin).
```yaml
# crates.yml
cost: { type: PLAYERPOINTS, amount: 10 }
```

### Multiple costs at once
Require several things to open — write `cost` as a **list** (all-or-nothing; a failed open refunds everything):
```yaml
# crates.yml — needs a diamond AND 100 money to open
cost:
  - { type: ITEM, item: DIAMOND, amount: 1 }
  - { type: MONEY, amount: 100 }
```
The first entry is the primary; the rest are extras. (You can also keep a single `cost: {…}` and add a
`cost.extra: [ … ]` list — same result.)

### Crate keys
A `key` item opens the crate **for free, bypassing the cost** (1 key per open). See [Premium → Crate Keys](/premium#crate-keys).

## Reveal card customization

### Rarity glow
The revealed reward card **glows in its rarity's color**. Works out of the box (auto-derived from the rarity's
`color`); set an exact color or turn it off per rarity:
```yaml
# config.yml — rarities.<R>.glow
LEGENDARY: { color: "&6&l", weight: 3.0, glow: "#FFAA00" }   # "#RRGGBB" | none
```
```yaml
# config.yml — master toggle
theme: { reveal-cards: { glow: true } }
```

### Per-reward size, message & title
Each reward can override its display size on the card and show a custom chat message / big title when won
(`{reward}` / `{player}` placeholders). Editable in the [Premium editor](/premium) or `crates.yml`:
```yaml
# crates.yml — a reward
- { name: "Trident", material: TRIDENT, rarity: LEGENDARY,
    scale: 1.2,                                   # card display size (omit = theme default)
    message: "&6&lLEGENDARY! &fYou won {reward}!", # chat line after the card flips
    title: "&6✦ {reward} ✦" }                      # big center title
```
The chat message / broadcast is sent **after** the card fully flips, so the reward shows first.

## Owner-only menus + body double
Every menu's UI (cursor, cards, background, and the ModelEngine open model) is shown **only to the opener** —
other players (and players who join mid-menu) never see it. Lets people open the gacha at the same spot without
UI collisions. Automatic, no config.

Because the menu puts the player in spectator (which hides them from others), a **body double** — a packet-only
clone with the player's name + skin — is shown to everyone else, standing where the menu was opened. From the
outside the player just appears to stand still; the clone vanishes the instant the menu closes. Toggle with
`cursor.body-double` (default on).

## Pull Suspense (sound only)
A rising drum-roll that builds toward revealing an `announce` rarity, then a climax hit — **sound only, no
particles** (owner-only). A lightweight alternative to a 3D model — works on any Java version.
```yaml
# config.yml
reveal:
  suspense:
    enabled: true                                # false = no drum-roll (the basic per-rarity reward sound still plays)
    sound: "block.note_block.bell"               # the rising tick (custom resource-pack IDs OK); "" = silent
    climax-sound: "ui.toast.challenge_complete"  # the final hit; "" = no hit
    volume: 1.0
    speed: 3                                      # ticks between beats (higher = slower/longer roll = more tension)
```

## 3D model open animation (BetterModel / ModelEngine)
Optional: play a model before the cards appear. It runs **inside the menu's spectator camera-lock on a clean
stage** — the camera is frozen (no free-look), the area around the player is cleared to air (client-side), and
the background panel is hidden so only the model shows. The animation is picked by the **best (rarest) reward**
rolled, plays once at full brightness, then the cards open.

Two providers (set `provider`, or leave `AUTO`):

- **BetterModel** — the model is an owner-only display: **only the opener sees it**. Requires the server on
  Java 25 (BetterModel's runtime).
- **ModelEngine** — the model is a real entity, so **everyone at the spot sees it**. Facing is handled by
  aiming the camera (`spawn-yaw` + `yaw-offset`) rather than rotating the model — see
  [Configuration → model](/configuration#model-optional).

```yaml
# config.yml
model:
  enabled: true
  provider: AUTO             # AUTO / BETTERMODEL / MODELENGINE
  id: "open"                 # model name in BetterModel/models or ModelEngine (open.bbmodel -> "open")
  duration-ticks: 150        # BetterModel: safety net (cards open when the animation ends). ModelEngine: exact length
  distance: 2.0
  spawn-yaw: 0               # ModelEngine only — see Configuration
  yaw-offset: 180            # ModelEngine only — rotate the camera until the model faces you
  brightness: 15             # 0-15 (15 = full bright); -1 = world lighting
  animation-by-rarity: true
  animations: { COMMON: common, RARE: rare, EPIC: epic, LEGENDARY: legendary }
```

**Resource-pack note:** the model's textures live in ModelEngine/BetterModel's own generated pack, which must
reach clients through your item provider's pack. **`/gacha setup` merges it for you** — it copies the
ModelEngine pack into `Nexo/pack/external_packs/`, `Oraxen/pack/uploads/`, or the bundled vanilla zip
automatically. For **ItemsAdder**, set `allow_other_plugins_resourcepacks: true` in `ItemsAdder/config.yml`
and run `/iazip` (IA merges it itself). After editing a `.bbmodel`, regenerate the model pack, then re-run
`/gacha setup` (or your provider's pack rebuild) and **rejoin** so the client re-downloads.
> Minecraft animated textures always loop (global, time-synced) — they can't "play once and stop". For a one-shot
> effect, animate a **bone** with a static texture (the model animation holds the last frame).

## Custom sounds
All sound options accept **custom resource-pack sound IDs** (namespaced, e.g. `crad_gacha:fanfare`). Add the
`.ogg` + a `sounds.json` entry to the pack (via Nexo), then reference the event id. Config sound fields:
`rarities.<R>.sound`, `pity.level-sound`, `reveal.suspense.sound` / `climax-sound`.

## Customizable sub-menus
The Shop / Spark / Wishlist sub-menus read their chrome from `theme.yml` like the main buttons — `glyph` / `item`
/ `text` back button + title + grid layout. See [Cursor UI](/cursor-ui).

## PlaceholderAPI
`%cradgacha_tokens%` · `%cradgacha_money%` · `%cradgacha_spark_<crate>%` ·
`%cradgacha_pity_<crate>%` / `_pity_required_<crate>%` / `_pity_remaining_<crate>%` ·
`%cradgacha_token_name%` / `_token_name_plural%`

## Reward safety
Rolls are written to `pending.yml` before the animation and delivered on claim (atomic — no dupes/loss on
crash/disconnect/death). ESC/disconnect mid-open is handled by recovery (`return_window` or `auto_claim`).
