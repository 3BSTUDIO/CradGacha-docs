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

## How x1 / x10 work

- **x1** opens one card.
- **x10** opens ten (capped by `settings.max-open`). Each card is rolled independently.
- Cost scales with the number of cards.
- See [Result Panel](result-panel.md) for what the buttons do after a pull.

---

Next: [Cursor UI →](cursor-ui.md)
