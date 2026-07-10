---
title: Configuration
---

# Configuration



---

Settings are split across four files in `plugins/CradGacha/`. They are **merged together at runtime**,
so you can edit them separately. After any change, run **`/gacha reload`**.

| File | Purpose |
|---|---|
| `config.yml` | Global behaviour, background, showcase banner, rarities, cooldown. |
| `cursor.yml` | How the cursor and camera feel. |
| `crates.yml` | Your crates — see the [Crates](crates.md) page. |
| `theme.yml` | Menu layout — see [Cursor UI](cursor-ui.md). |
| `language.yml` | All user-facing text (translatable) — see below. |

---

## config.yml

### settings

```yaml
settings:
  max-open: 10                  # max cards per single open (Open All never exceeds this)
  reopen-panel: true            # show the "open again" panel after a pull finishes
  result-title: "&8Open again?" # fallback title for that panel
  require-on-ground: true       # must stand on solid ground to use /gacha open (anti-dupe)
  require-inventory-space: true # block opening if there aren't enough free slots (anti item-loss)
```

- **`max-open`** — the biggest pull size. `Open x10` and `Open All` are capped here.
- **`require-on-ground`** — only affects the **`/gacha open` command**. Opening from the menu
  always skips this (the player is briefly a spectator). Set `false` to allow opening while flying.
- **`require-inventory-space`** — if a player's inventory is nearly full, the open is blocked so
  rewards can't be lost. Set `false` to disable.

### background

The menu's backdrop. You can use a single image, a tiled image, or a solid colour panel.

```yaml
background:
  show: true
  item: "crad_gacha:menu_background"   # single image (used when tiles.enabled = false)
  panel-material: BLACK_CONCRETE         # solid backing (concrete = opaque, glass = translucent)
  panel-width: 11.0
  panel-height: 11.0
  distance: 2.4                          # how far in front of the player (smaller = closer/bigger)
  y: -0.1                                # vertical shift (higher = up)
  glyph: ""
  scale: 1.0
  tiles:                                 # split one big image into a grid of pieces
    enabled: true
    cols: 3
    rows: 2
    tile-width: 2.4
    tile-height: 2.4
    items:                               # row-major: top-left, top-mid, top-right, bottom-left, ...
      - "crad_gacha:bg_1"
      - "crad_gacha:bg_2"
      - "crad_gacha:bg_3"
      - "crad_gacha:bg_4"
      - "crad_gacha:bg_5"
      - "crad_gacha:bg_6"
```

> **Why tiles?** Minecraft caps a single image at 256×256 px. A large background must be split into
> several pieces and arranged in a grid.

### showcase

The banner in the middle of the menu (made of two glyph pieces).

```yaml
showcase:
  x: 0.45          # left-right position (higher = right)
  y: 0.13          # up-down position (higher = up)
  scale: 2.1       # overall size
  seam-offset: -1  # gap between the 2 pieces (negative = pull together, positive = push apart)
```

The per-piece height/size lives in the ItemsAdder glyph file, not here.

### world-reveal

Settings for the fallback "world card" reveal (used only if packetevents is missing). Most servers
use the cursor reveal and never touch this.

```yaml
world-reveal:
  distance: 2.5
  spacing: 0.55
  card-scale: 0.6
  timeout-seconds: 30
  lock-player: true
  private-view: true
  face-player: false
  hide-hand: true
```

### card-back-by-rarity

The face-down card image, chosen by the hidden reward's rarity.

```yaml
card-back-by-rarity:
  COMMON: "crad_gacha:card_back_c"
  RARE: "crad_gacha:card_back_r"
  EPIC: "crad_gacha:card_back_e"
  LEGENDARY: "crad_gacha:card_back_l"
```

### model (optional)

A 3D model animation that plays before the cards appear. Works with **BetterModel** (owner-only display, others
see nothing) or **ModelEngine** (a real model, visible to everyone at the spot). It runs inside the menu's
spectator camera-lock on a clean stage (camera frozen, area cleared to air, background hidden), then the cards
open. Animation is picked by the best rarity rolled.

```yaml
model:
  enabled: false
  provider: AUTO          # AUTO / BETTERMODEL / MODELENGINE (AUTO prefers BetterModel if installed)
  id: "open"
  duration-ticks: 40
  distance: 2.0
  spawn-yaw: 0            # ModelEngine only: the model's fixed spawn facing (its bind pose = no rotation on spawn)
  yaw-offset: 180         # ModelEngine only: rotates the CAMERA around the model until it faces you (0/90/180/270)
  brightness: 15          # 0-15 (15 = full bright); -1 = world lighting
  animation-by-rarity: true
  animations: { COMMON: common, RARE: rare, EPIC: epic, LEGENDARY: legendary }
  animation: "open"       # fallback when animation-by-rarity: false
```

::: tip ModelEngine facing
Rather than rotating the model to face the player (ModelEngine lerps that on spawn = a visible "2-step turn"),
the model spawns at its fixed `spawn-yaw` and the **camera** is aimed at it. If the model faces the wrong way,
change `yaw-offset` (try `0`, `90`, `270`) and `/gacha reload` — the model stays still, no turn animation.
:::

### clear-area (clean stage)

Fakes the blocks around the player to **AIR for that viewer only** (packets — the world is never modified, other
players see nothing) so the menu and 3D model have a clean backdrop without teleporting. Restored on close.

```yaml
clear-area:
  enabled: true
  radius: 5               # blocks cleared around the player (1-8); higher = bigger bubble
  forward-distance: 16    # ALSO clear a view-cone this many blocks in front of the camera (0-32; 0 = off)
                          # — stops far blocks peeking through the transparent parts of the menu background
  hide-furniture: true    # also hide nearby armor-stand furniture (Nexo/ItemsAdder decorations)
```

### reveal.suspense (sound only)

A rising drum-roll + climax hit before an `announce` rarity is revealed (owner-only). **Sound only, no particles.**

```yaml
reveal:
  suspense:
    enabled: true
    sound: "block.note_block.bell"               # the rising tick (custom IDs OK); "" = silent
    climax-sound: "ui.toast.challenge_complete"   # the final hit; "" = no hit
    volume: 1.0
    speed: 3                                       # ticks between beats (higher = slower/longer)
```

### cooldown

```yaml
cooldown:
  enabled: false
  seconds: 5
```

### currency (custom token name)

Rename the built-in **token** currency everywhere it appears (balance, cost messages, placeholders).

```yaml
currency:
  token-name: "Token"          # singular — e.g. Coin / Gem / Crystal
  token-name-plural: "Tokens"  # plural (defaults to token-name + "s")
```

Placeholders `{token_name}` / `{token_name_plural}` use these values.

### recovery (ESC / disconnect mid-open)

What happens if a player closes the reveal or disconnects before claiming. **Rewards are never lost**
either way — `pending.yml` is always the source of truth; this only chooses *resume* vs *instant payout*.

```yaml
recovery:
  mode: return_window          # return_window | auto_claim
  timeout-seconds: 30
```

- **`return_window`** (default) — the rolled rewards are held for `timeout-seconds`. Running `/gacha`
  (or rejoining then `/gacha`) within the window **resumes the same reveal** (same rewards, cards
  face-down again). When the window expires the rewards are delivered automatically.
- **`auto_claim`** — deliver the rewards immediately when the reveal is closed unfinished.

> **Data files:** persisted data (`data.yml`, `tokens.yml`, `pending.yml`, `gamemode-recovery.yml`)
> lives in a `plugins/CradGacha/data/` subfolder. Existing files are migrated there automatically on
> first start.

### rarities

Shared by every crate. **Weight** decides how often each rarity drops.

```yaml
rarities:
  COMMON:    { color: "&f",   weight: 60.0, sound: "entity.experience_orb.pickup",  particle: CRIT,             announce: false }
  RARE:      { color: "&9",   weight: 25.0, sound: "entity.player.levelup",         particle: ENCHANT,          announce: false }
  EPIC:      { color: "&5",   weight: 12.0, sound: "block.note_block.pling",        particle: WITCH,            announce: true }
  LEGENDARY: { color: "&6&l", weight: 3.0,  sound: "ui.toast.challenge_complete",   particle: TOTEM_OF_UNDYING, announce: true }
```

- **`weight`** — relative chance. With the values above a COMMON is dropped 60/100 of the time
  (only counting rarities that actually have rewards in that crate).
- **`announce: true`** — shows a big title on screen when that rarity is revealed.
- **`color`** — uses `&` colour codes.

---

## cursor.yml (key values)

How the virtual cursor and camera behave. See [Cursor UI](cursor-ui.md) for the concepts.

```yaml
mode: spectator        # spectator = frozen view (best). Needs packetevents.
virtual-cursor: true
sensitivity-x: 0.3     # higher = a small head turn moves the cursor farther
sensitivity-y: 0.22
bounds:                # how far the cursor can travel from the center
  min-x: -2.8
  max-x: 2.8
  min-y: -1.6
  max-y: 1.8
smoothing: 0.7         # cursor smoothing (1.0 = raw, 0.6–0.8 = smooth)
crosshair-item: "nexo:ui_cursor"   # the cursor image (ns:id) — or "" to use the glyph crosshair
crosshair-scale: 0.2
hide-hand: true
body-double: true      # show others a standing clone of the player while they're in the menu (see below)
```

**`body-double`** — while in the menu the player is in spectator mode, which makes them invisible to
everyone else. With this on, other players instead see a **packet-only clone** (same name + skin) standing
where the menu was opened, so from the outside the player simply appears to stand still. Nothing is spawned
server-side; the clone vanishes the instant the menu closes. Set `false` to let the player just disappear.

- If the cursor **can't reach the screen edges**, raise `sensitivity-x` / widen `bounds`.
- This is a known limit of a server-side cursor — see [Troubleshooting](troubleshooting.md).

> **Brightness / "dark models":** all menu displays are forced to full brightness (`15/15`) in code,
> so buttons and rewards never look dim from world lighting. You don't configure this — it's automatic.

---

## language.yml (all text)

Every system message lives in `language.yml` so it can be translated/recoloured without touching code.
Missing keys fall back to built-in English defaults, so an old file never breaks. Supports `&` colours
and `{placeholders}` such as `{cost} {balance} {amount} {seconds} {crate} {reward} {token_name} {token_name_plural}`.

```yaml
messages:
  cost:
    not-enough-token: "&cNot enough {token_name_plural}! Cost: &e{cost} &7(you have {balance})"
  reveal:
    rewards-delivered: "&aYou received all your gacha rewards!"
  recovery:
    returned: "&aWelcome back! Resuming your card reveal."
  pity:
    label: "&dPity: &f{pity_current}&7/&f{pity_required}"
  # ... see the file for the full list
```

## Menu placeholders (theme.yml text elements)

Any `type: text` element in `theme.yml` can use these (resolved per selected crate / player):

| Placeholder | Meaning |
|---|---|
| `{cost}` / `{cost-text}` | open cost (bare number / full text) |
| `{money}` / `{token}` | the player's balance |
| `{token_name}` / `{token_name_plural}` | the custom currency name |
| `{pity}` | the formatted pity label (`Pity: 12/90`) |
| `{pity_current}` / `{pity_required}` | pity counter / threshold for the selected crate |
| `{crate}` / `{crate_name}` / `{crate_id}` | selected crate name / id |

### Balance display (token / money)

Both the main menu and the card-reveal page use the **same** balance system — one entry per currency
with an optional background pill — so they're configured identically:

- main menu → `theme.balance`
- reveal page → `theme.reveal-balance`

```yaml
theme:
  balance:
    show: true
    money: { show: true, x: 0.7, y: 1.32, scale: 0.35, format: "&f{money}", bg: g_bg_money, bg-scale: 0.3 }
    token: { show: true, x: 1.9, y: 1.32, scale: 0.35, format: "&f{token}", bg: g_bg_token, bg-scale: 0.3 }
```

Each currency: `show`, `x`, `y`, `scale`, `format` (supports `{money}`/`{token}`/`{token_name}` + `&`
colours), plus an optional background — `bg` (a glyph id, or `ns:id` for an item; `bg: ""` hides it),
`bg-x`, `bg-y`, `bg-scale`.

### Reveal card size & spacing

```yaml
theme:
  reveal-cards:
    y: 0.7             # grid base height
    scale: 0.85        # card size for a single row (1-5 cards)
    scale-multi: 0.72  # card size for a grid (6-10 cards)
    spacing-x: 0.98    # horizontal gap between cards
    spacing-y: 1.1     # vertical gap between rows
    reward-scale: 0.4  # revealed reward size, as a multiplier of the card size (0.4 = 40% of the card)
    reward-y: -0.3     # revealed reward vertical offset on the card (negative = lower)
```

`reward-scale` / `reward-y` control the **revealed reward** shown on the flipped card (custom reward
models tend to be large, so the default shrinks and centers them). Raise `reward-scale` for bigger rewards.

### Background tiles

When the menu background is split into a grid (`theme.background.tiles.enabled: true`):

```yaml
theme:
  background:
    tiles:
      enabled: true
      cols: 3
      rows: 2
      tile-width: 2.4
      tile-height: 2.4
      overlap: 1.0      # enlarge each tile image only (spacing unchanged), e.g. 1.06
      items: [ "nexo:bg_1", "nexo:bg_2", "nexo:bg_3", "nexo:bg_4", "nexo:bg_5", "nexo:bg_6" ]
```

`overlap` fixes thin **black seam lines** between tiles that appear for players on **older clients via
ViaVersion/ViaBackwards** (their item-display sprites render slightly smaller). Start at `1.06`; players
on a matching client version are unaffected.

---

## Keys added in 1.0.2

```yaml
cursor:
  hide-players: true      # while your menu is open, hide every other player (and their body double) so
                          # someone standing at the gacha point can't cover the UI. Everyone reappears on close.
                          # On 1.21.9+ the locator bar is muted while the menu is open too.

model:
  # per-rarity play time in ticks — set each to the animation's REAL length (bbmodel length in seconds x 20)
  # or the model gets cut off. Falls back to model.duration-ticks when a rarity isn't listed.
  durations:
    COMMON: 125
    LEGENDARY: 160

theme:
  reveal-cards:
    dup-y: -0.3           # vertical offset of the "+N Spark" text shown on a duplicate card (default = reward-y)
    dup-scale: 0.5        # its size, as a multiplier of the card size
  layout-editor:          # only affects the /gacha layout editor's own toolbars
    bar-aspect: 5.79      # width/height of layout_edit.png (the top toolbar strip) — set if you re-draw it
    mbar-aspect: 5.83     # width/height of layout_edit_1.png (the held-element toolbar)
    max-glyph-scale: 128  # the Library "All Images" tab hides font images bigger than this (backgrounds)
```

Message (in `messages.yml`):

```yaml
duplicate.card: "&b&l+{spark} ✦\n&7Spark"   # shown ON a duplicate card instead of the item (no chat spoiler)
```

> **Resource-pack host (vanilla mode only):** `resource-pack-host` now serves its pack **only** when
> `ui.item-provider` is `vanilla`. With ItemsAdder/Nexo/Oraxen installed, that plugin sends its own pack and
> the built-in host stays off — so the two packs never fight (which used to make models vanish after join).
> `/gacha setup` disables the host automatically when you pin a real provider.

---

Next: [Crates →](crates.md)
