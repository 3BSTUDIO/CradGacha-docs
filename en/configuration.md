---
title: Configuration
---

# Configuration

[🏠 Home](index.html) · [🇹🇭 อ่านภาษาไทย](../th/configuration.html) · [🌐 Language picker](../index.html)

**Pages:** [Home](index.html) · [Installation](installation.html) · [First Setup](first-setup.html) · [Commands](commands.html) · [Permissions](permissions.html) · **Configuration** · [Crates](crates.html) · [Cursor UI](cursor-ui.html) · [Result Panel](result-panel.html) · [Troubleshooting](troubleshooting.html) · [FAQ](faq.html) · [Developer Notes](developer-notes.html)

---

Settings are split across four files in `plugins/CradGacha/`. They are **merged together at runtime**,
so you can edit them separately. After any change, run **`/gacha reload`**.

| File | Purpose |
|---|---|
| `config.yml` | Global behaviour, background, showcase banner, rarities, cooldown. |
| `cursor.yml` | How the cursor and camera feel. |
| `crates.yml` | Your crates — see the [Crates](crates.html) page. |
| `theme.yml` | Menu layout — see [Cursor UI](cursor-ui.html). |

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
  item: "crates_gacha:menu_background"   # single image (used when tiles.enabled = false)
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
      - "crates_gacha:bg_1"
      - "crates_gacha:bg_2"
      - "crates_gacha:bg_3"
      - "crates_gacha:bg_4"
      - "crates_gacha:bg_5"
      - "crates_gacha:bg_6"
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
  COMMON: "crates_gacha:card_back_c"
  RARE: "crates_gacha:card_back_r"
  EPIC: "crates_gacha:card_back_e"
  LEGENDARY: "crates_gacha:card_back_l"
```

### model (optional)

A 3D model animation that plays before the cards appear (needs BetterModel or ModelEngine).

```yaml
model:
  enabled: false
  provider: AUTO          # AUTO / BETTERMODEL / MODELENGINE
  id: "gacha_machine"
  animation: "open"
  duration-ticks: 40
  distance: 2.0
```

### cooldown

```yaml
cooldown:
  enabled: false
  seconds: 5
```

### rarities

Shared by every crate. **Weight** decides how often each rarity drops.

```yaml
rarities:
  COMMON:    { color: "&f",   weight: 60.0, sound: "entity.item.pickup",            particle: CRIT,             announce: false }
  RARE:      { color: "&9",   weight: 25.0, sound: "entity.experience_orb.pickup",  particle: ENCHANT,          announce: false }
  EPIC:      { color: "&5",   weight: 12.0, sound: "block.note_block.pling",        particle: WITCH,            announce: true }
  LEGENDARY: { color: "&6&l", weight: 3.0,  sound: "ui.toast.challenge_complete",   particle: TOTEM_OF_UNDYING, announce: true }
```

- **`weight`** — relative chance. With the values above a COMMON is dropped 60/100 of the time
  (only counting rarities that actually have rewards in that crate).
- **`announce: true`** — shows a big title on screen when that rarity is revealed.
- **`color`** — uses `&` colour codes.

---

## cursor.yml (key values)

How the virtual cursor and camera behave. See [Cursor UI](cursor-ui.html) for the concepts.

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
crosshair-item: "crates_gacha:ui_cursor"   # the cursor image
crosshair-scale: 0.2
hide-hand: true
```

- If the cursor **can't reach the screen edges**, raise `sensitivity-x` / widen `bounds`.
- This is a known limit of a server-side cursor — see [Troubleshooting](troubleshooting.html).

> **Brightness / "dark models":** all menu displays are forced to full brightness (`15/15`) in code,
> so buttons and rewards never look dim from world lighting. You don't configure this — it's automatic.

---

Next: [Crates →](crates.html)
