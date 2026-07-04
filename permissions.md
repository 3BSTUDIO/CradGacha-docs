---
title: Permissions
---

# Permissions



---

CradGacha keeps permissions deliberately simple.

| Permission node | Default | Grants |
|---|---|---|
| `cradgacha.admin` | `op` | Admin commands: `/gacha reload`, `/gacha doctor`, `/gacha token …`, and the [Premium](/premium) admin commands (`edit`, `create`, `key`, `stats`, `layout`). |
| `cradgacha.luck.<N>` | `false` | **Premium VIP luck** — a rarity-weight boost of N percent (e.g. `cradgacha.luck.10` = +10%). The highest node a player has wins. Prefix is configurable (`luck.permission-prefix`). |

Everything else — opening the menu (`/gacha`), opening a crate (`/gacha open`), `/gacha history`,
`/gacha fix` (on yourself), and `/gacha debug` — is available to **all players** and needs no permission.

## Who should have what

| Role | Recommended |
|---|---|
| **Normal players** | Nothing. They can already use `/gacha` and open crates. |
| **Staff / moderators** | Usually nothing extra, unless you want them to grant tokens. |
| **Admins / owners** | `cradgacha.admin` (they are likely `op` already). |
| **Online store / console** | The console always has full access, so store hooks can run `gacha token give …`. |

## Granting the permission

With a permissions plugin such as **LuckPerms**:

```
/lp group admin permission set cradgacha.admin true
/lp user Steve permission set cradgacha.admin true
```

If you do not run a permissions plugin, server operators (`/op`) already have it by default.

---

Next: [Configuration →](configuration.md)
