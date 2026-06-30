---
title: Crates
---

# Crates



---

Crates live in **`crates.yml`**. Each top-level key is one crate's **id** (used in commands and the menu).

## Crate options

```yaml
my_crate:                         # <- the crate id (no spaces)
  name: "&a&lMy Crate"            # display name (supports & colours)
  enabled: true                   # false = shown in the menu but not openable ("coming soon")
  icon: CHEST                     # icon item in the crate list (fallback)
  display-item: CHEST             # item shown in the center
  icon-slot: -1                   # -1 = auto layout
  cost: { type: TOKEN, amount: 5 }
  pity: { enabled: true, rarity: LEGENDARY, threshold: 50 }
  rewards:
    - { name: "...", material: ..., amount: 1, rarity: COMMON }
```

| Field | Meaning |
|---|---|
| `name` | The crate's display name (with `&` colours). |
| `enabled` | `true` = openable. `false` = visible but locked (good for "coming soon"). |
| `icon` / `display-item` | Items shown for the crate. With ItemsAdder you can use `namespace:id`. |
| `cost` | What a player pays per open — see below. |
| `pity` | Optional guarantee — see below. |
| `rewards` | The list of possible rewards. |

## Per-crate banner & button (optional)

Each crate can override the center **banner** and its **select button** in the crate list. Every field
is optional — omit it to fall back to the global default (`config.yml > showcase` and `theme.crate-list`).
When a player selects the crate, the banner switches to that crate's.

```yaml
my_crate:
  # center banner just for this crate (overrides config.yml > showcase)
  banner:
    item: "nexo:my_banner"     # an ItemDisplay banner …
    # glyph: my_banner_glyph   # … OR a single glyph instead
    x: 0.3
    y: 0.15
    scale: 1.5
  # crate-select button just for this crate (overrides theme.crate-list)
  button:
    item: "nexo:my_icon"           # enabled icon …
    item-disabled: "nexo:my_off"   # … shown when enabled:false
    selected-item: "nexo:my_sel"   # … shown when this crate is selected
    # glyph: g_crate_1             # OR use glyphs: glyph / glyph-disabled / selected-glyph
    # text: "My Crate"             # OR plain text: enabled-color / disabled-color
    x: -1.9
    y: 0.82
    scale: 0.52
    hitbox: { w: 0.8, h: 0.22 }
```

Priority for the button visual: `selected-*` (when selected) → `item`/`glyph`/`text` (per state) →
the `theme.crate-list` default.

## Cost types

```yaml
cost: { type: NONE }                            # free
cost: { type: ITEM, item: DIAMOND, amount: 1 }  # consumes items from the inventory
cost: { type: MONEY, amount: 100 }              # Vault economy
cost: { type: TOKEN, amount: 5 }                # built-in token currency
```

- `ITEM` accepts vanilla materials or custom items (`nexo:`, `oraxen:`, `itemsadder:` ids).
- `MONEY` requires **Vault** + an economy plugin.
- `TOKEN` is built in; grant with `/gacha token give …`.
- On a 10-pull the total is `amount × 10`. The plugin only charges for the cards it can afford
  (Open All opens as many as the player can pay for).

## Rewards

Each reward can give an **item**, run **commands**, or both.

```yaml
rewards:
  # item only
  - { name: "Diamonds", material: DIAMOND, amount: 5, rarity: COMMON }

  # custom item (ItemsAdder)
  - { name: "Dragon Jade Sword", material: "dragon_jade:dragon_jade_sword", amount: 1, rarity: RARE }

  # command only (no item given) — use a separate "icon" to show on the card
  - name: "VIP Rank (7 days)"
    icon: GOLD_INGOT
    rarity: LEGENDARY
    commands:
      - "[console] lp user <player> parent addtemp vip 7d"
      - "[player] say I just won VIP!"

  # item AND commands (a bundle)
  - name: "Treasure Bundle"
    material: DIAMOND
    amount: 10
    rarity: EPIC
    commands:
      - "[console] eco give <player> 1000"
```

| Field | Meaning |
|---|---|
| `name` | Reward display name. |
| `material` | The item actually **given**. Omit for a command-only reward. |
| `icon` | The item **shown** on the card (defaults to `material`; falls back to PAPER). |
| `amount` | Item amount. |
| `rarity` | One of your rarities (`COMMON`/`RARE`/`EPIC`/`LEGENDARY`). |
| `commands` | Console/player commands run on claim. `<player>` is replaced with the winner's name. |

**Command prefixes:**

- `[console] …` — run from the server console (default if no prefix).
- `[player] …` — run as the player.
- `<player>` — replaced with the player's name.

> Every reward must have a `material` **or** at least one `command`, otherwise it is skipped with a
> warning in the console.

## Custom items (ItemsAdder / Nexo / Oraxen)

There is **no separate config section** for these — you use a custom item anywhere an item is
expected by writing its **`namespace:id`**. The matching plugin just needs to be installed
(check with `/gacha doctor`).

| Provider | Format | Example |
|---|---|---|
| ItemsAdder | `namespace:id` | `dragon_jade:dragon_jade_sword` |
| Nexo | `nexo:id` | `nexo:ruby` |
| Oraxen | `oraxen:id` | `oraxen:ruby` |
| Vanilla | material name | `DIAMOND` |

You can use these ids in **any** item field: a reward's `material` / `icon`, the crate `icon` /
`display-item`, the `cost.item`, and `card-back-by-rarity` (in `config.yml`).

```yaml
my_crate:
  icon: "nexo:crate_icon"            # crate-list icon from Nexo
  display-item: "oraxen:showcase"    # center item from Oraxen
  cost: { type: ITEM, item: "nexo:coin", amount: 1 }   # pay with a Nexo item
  rewards:
    - { name: "Ruby",  material: "nexo:ruby",  amount: 1, rarity: RARE }
    - { name: "Gem",   material: "oraxen:gem", amount: 1, rarity: EPIC }
    - name: "Aura Buff"              # command reward shown with a Nexo icon
      icon: "nexo:aura_token"
      rarity: LEGENDARY
      commands: [ "[console] aura give <player> fire" ]
```

> If a custom id can't be resolved (plugin missing or wrong id), an item reward is **skipped** with a
> console warning; a missing **icon** falls back to PAPER. Run `/gacha doctor` to confirm Nexo/Oraxen
> are detected.

## How chance / weight works

A reward's chance comes from its **rarity's weight** (set in `config.yml`), not from the reward itself.

1. The plugin picks a **rarity** using the weights (only rarities that have rewards in this crate count).
2. Then it picks a **random reward** within that rarity (each reward in a rarity is equally likely).

Example: with `COMMON 60`, `RARE 25`, `EPIC 12`, `LEGENDARY 3`, a LEGENDARY drops about **3%** of opens.

The drop % per rarity is shown to players on the in-game **rates** screen.

## Pity (guarantee)

```yaml
pity: { enabled: true, rarity: LEGENDARY, threshold: 50 }
```

- Counts opens since the player last got the `rarity`.
- When the count reaches `threshold`, the next open is **forced** to that rarity.
- The counter is per-player **and** per-crate, saved in `data.yml`.
- Set `enabled: false` to turn pity off for that crate.
- **Global default:** `pity:` in `config.yml` (`enabled` / `rarity` / `threshold`) applies to every crate. A crate's
  own `pity:` here overrides it per-key — omit a crate's `pity:` entirely to just use the global default.

## How x1 / x10 work

- **x1** opens one card.
- **x10** opens ten (capped by `settings.max-open`). Each card is rolled independently.
- Cost scales with the number of cards.
- See [Result Panel](result-panel.md) for what the buttons do after a pull.

---

Next: [Cursor UI →](cursor-ui.md)
