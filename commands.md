---
title: Commands
---

# Commands



---

There is one base command: **`/gacha`**. Tab-completion is built in, so you can press **Tab** to see
the available sub-commands and arguments (admin sub-commands only appear for admins).

| Command | What it does | Permission |
|---|---|---|
| `/gacha` | Open the crate-select menu. | everyone |
| `/gacha open <crate> [1\|10]` | Open a crate directly without the menu (charges cost + cooldown). | everyone |
| `/gacha debug` | Toggle the cursor-coordinate overlay (the menu must be open). | everyone |
| `/gacha reload` | Reload `config.yml`, `crates.yml`, `cursor.yml`, `theme.yml` and the menu. | `cradgacha.admin` |
| `/gacha doctor` | Run a setup health-check (packetevents, ItemsAdder, glyphs, Vault, crates, resource pack). | `cradgacha.admin` |
| `/gacha token <player>` | Show a player's token balance. | `cradgacha.admin` |
| `/gacha token give <player> <amount>` | Give tokens to a player. | `cradgacha.admin` |
| `/gacha token take <player> <amount>` | Remove tokens from a player. | `cradgacha.admin` |
| `/gacha token set <player> <amount>` | Set a player's token balance. | `cradgacha.admin` |

## Examples

Open the menu:

```
/gacha
```

Open the `starter` crate ten times directly:

```
/gacha open starter 10
```

Give a player 100 tokens (works from the console too — useful for store/donation hooks):

```
/gacha token give Steve 100
```

Check a player's balance:

```
/gacha token Steve
```

Reload after editing a YAML file:

```
/gacha reload
```

## Notes

- **`/gacha open`** still respects the cost, cooldown, inventory-space check, and the
  "must be on the ground" rule (see [Configuration](configuration.md)). Opening from the **menu**
  skips the ground check, because the player is temporarily a spectator.
- The **token** sub-commands can be run from the **server console**, which is how online stores
  (Tebex, donation plugins, etc.) grant tokens automatically — have them run
  `gacha token give {player} <amount>` on purchase.
- `/gacha token give` works even when the target player is **offline**.

---

Next: [Permissions →](permissions.md)
