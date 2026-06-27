# Features

A reference for every CradGacha gameplay feature. Most are **config-gated and off/safe by default** — turn on
what you need. After editing config run `/gacha reload`. After editing the resource pack (Nexo/BetterModel)
**restart + rejoin**.

## Ways to open a crate

| Method | How |
|--------|-----|
| Command | `/gacha` (menu) · `/gacha open <crate> [1\|10]` (direct) |
| Crate Station | place a model/block in the world, then **click** it or **walk up** to it |
| Warp | `/gacha` teleports to a set spot, then returns the player on close |

### Crate Stations
Bind a world spot to a crate. Triggers: `proximity` (walk within `radius`), `click` (right-click), or `both`.
Proximity is recommended — opening from a few blocks away keeps the 3D model **behind** the UI instead of
covering it.

```
/gacha station add <crate> [radius] [click|proximity|both]   # look at the block first
/gacha station remove                                        # look at the block
/gacha station list
```
```yaml
# config.yml
stations:
  default-mode: proximity     # proximity | click | both
  default-radius: 3.0         # keep >= 2.5 so the model stays behind the UI
  proximity-check-ticks: 10
```

### Warp to a gacha spot
`/gacha setwarp` sets the point; `/gacha` then teleports there and returns the player when the menu closes
(disconnect-safe — they're returned on next join). `/gacha delwarp` clears it. Combined with **owner-only menus**,
many players can warp to the same room without seeing each other's UI.

## Pity & guarantees
- **Hard pity** — guaranteed `rarity` after `threshold` opens.
- **Soft pity** — from `soft-start`, the chance to force the rarity ramps up to the threshold.
- Pity **resets** on the pity rarity *or* the rarest reward present.
- **Pity bar** — a tiled segment glyph on the main menu (see [Cursor UI](/cursor-ui)).
- **Level-up sound** — an ascending tick each time the bar gains a segment.

```yaml
# crates.yml — per crate
pity: { enabled: true, rarity: LEGENDARY, threshold: 100, soft-start: 80 }
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
duplicate: { enabled: true, give-spark: 5, by-rarity: { RARE: 10, EPIC: 25, LEGENDARY: 100 } }
```

### Spark Exchange (shop)
Spend Spark (earned from duplicates) on a chosen reward — pity-proof. A separate shop from the Token Shop.
```yaml
# crates.yml
spark:
  enabled: true
  items:
    - { reward: "Dragon Jade Spear", cost: 30 }   # reward = a reward name in this crate
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
unchanged, so pity stays correct). Replaces the old Featured/50-50.
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

## Owner-only menus
Every menu's UI (cursor, cards, background) is shown **only to the opener** — other players (and players who
join mid-menu) never see it. Lets people open the gacha at the same spot without UI collisions. Automatic, no config.

## Pull Suspense (light + sound)
An escalating sound + sparkle build-up before revealing an `announce` rarity (owner-only). A lightweight
alternative to a 3D model — works on any Java version.
```yaml
# config.yml
reveal:
  suspense:
    enabled: true
    sound: "block.note_block.bell"               # ascending tick (custom IDs OK); "" = silent
    climax-sound: "entity.firework_rocket.blast"
    volume: 0.7
```

## 3D model open animation (BetterModel)
Optional: play a model in front of the player, then open the cards. The animation is chosen by the **best
(rarest) reward** rolled and plays once (holding the last frame); the player is frozen and the model is
shown at full brightness, owner-only. **Requires the server on Java 25** (BetterModel's runtime).

```yaml
# config.yml
model:
  enabled: true
  id: "open"                 # model name in BetterModel/models (open.bbmodel -> "open")
  duration-ticks: 150        # safety net; cards open when the animation actually ends
  distance: 2.0
  brightness: 15             # 0-15 (15 = full bright); -1 = world lighting
  animation-by-rarity: true
  animations: { COMMON: common, RARE: rare, EPIC: epic, LEGENDARY: legendary }
```

**Resource-pack note:** when BetterModel + Nexo are used together, Nexo serves the merged pack. Use the bundled
`rebuild-bm-pack.bat` (next to the server jar) after editing a `.bbmodel`: `/bettermodel reload` → run the bat →
restart → rejoin. It also bumps animated-texture speed (`frametime`) so sprite sheets aren't too fast.
> Minecraft animated textures always loop (global, time-synced) — they can't "play once and stop". For a one-shot
> effect, animate a **bone** with a static texture (the model animation holds the last frame).

## Custom sounds
All sound options accept **custom resource-pack sound IDs** (namespaced, e.g. `crates_gacha:fanfare`). Add the
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
