---
title: First Setup
---

# First Setup



---

This page gets you from "installed" to "a working crate" in a few minutes.
All the files below are created automatically in `plugins/CradGacha/` the first time the plugin runs.

## The files you will edit

| File | What it controls |
|---|---|
| `config.yml` | Global settings, background, showcase banner, rarities, cooldown. |
| `crates.yml` | Your crates: their cost, rewards, and pity. |
| `cursor.yml` | How the cursor/camera feels (sensitivity, bounds, mode). |
| `theme.yml` | The layout of the menu (button positions, labels, images). |

> **Tip:** after editing any of these, run `/gacha reload` — no restart needed.

## Step 1 — Look at the starter crate

CradGacha ships with an example crate called `starter` in `crates.yml`. Open the file:

```yaml
starter:
  name: "&a&lDragonJade Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: TOKEN, amount: 1 }     # 1 token per open
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Dragon Jade Pickaxe", material: "dragon_jade:dragon_jade_pickaxe", amount: 1, rarity: COMMON }
    - { name: "Dragon Jade Sword",   material: "dragon_jade:dragon_jade_sword",   amount: 1, rarity: RARE }
    - { name: "Dragon Jade Shield",  material: "dragon_jade:dragon_jade_shield",  amount: 1, rarity: EPIC }
    - { name: "Dragon Jade Spear",   material: "dragon_jade:dragon_jade_spear",   amount: 1, rarity: LEGENDARY }
```

## Step 2 — Make your own crate

Copy the block above, rename the key (`starter` → e.g. `daily`), and change the values.
A minimal crate that gives vanilla items and costs nothing:

```yaml
daily:
  name: "&b&lDaily Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: NONE }
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Diamonds",  material: DIAMOND,     amount: 5, rarity: COMMON }
    - { name: "Emeralds",  material: EMERALD,     amount: 3, rarity: RARE }
    - { name: "Netherite", material: NETHERITE_INGOT, amount: 1, rarity: LEGENDARY }
```

See [Crates](crates.html) for every option (commands, icons, weights, pity).

## Step 3 — Set the cost

The `cost` line decides what a player pays per open. Pick one:

```yaml
cost: { type: NONE }                               # free
cost: { type: ITEM, item: DIAMOND, amount: 1 }     # 1 diamond per open
cost: { type: MONEY, amount: 100 }                 # 100 from Vault economy
cost: { type: TOKEN, amount: 5 }                   # 5 built-in tokens
```

- `MONEY` needs **Vault** + an economy plugin.
- `TOKEN` is a built-in currency. Give tokens with `/gacha token give <player> <amount>`
  (see [Commands](commands.html)).

On a 10-pull the total cost is `amount × 10`.

## Step 4 — Set rewards & rarities

Each reward has a `rarity` (`COMMON`, `RARE`, `EPIC`, `LEGENDARY` by default). How often each
rarity drops is set by its **weight** in `config.yml`:

```yaml
rarities:
  COMMON:    { color: "&f", weight: 60.0, ... }
  RARE:      { color: "&9", weight: 25.0, ... }
  EPIC:      { color: "&5", weight: 12.0, ... }
  LEGENDARY: { color: "&6&l", weight: 3.0, ... }
```

Higher weight = drops more often. A rarity with no rewards is skipped. See [Crates](crates.html).

## Step 5 — Reload and test

```
/gacha reload
/gacha
```

- Move your mouse to point the cursor at a crate, click to select it.
- Click **Open x1** or **Open x10**.
- Click each card to flip it, or use **Open All** (10-pull only).

If the menu shows empty boxes (□), your resource pack/glyphs aren't ready — run `/gacha doctor`
and see [Troubleshooting](troubleshooting.html).

---

Next: [Commands →](commands.html)
