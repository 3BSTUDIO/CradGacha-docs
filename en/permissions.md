---
title: Permissions
---

# Permissions

[🏠 Home](index.html) · [🇹🇭 อ่านภาษาไทย](../th/permissions.html) · [🌐 Language picker](../index.html)

**Pages:** [Home](index.html) · [Installation](installation.html) · [First Setup](first-setup.html) · [Commands](commands.html) · **Permissions** · [Configuration](configuration.html) · [Crates](crates.html) · [Cursor UI](cursor-ui.html) · [Result Panel](result-panel.html) · [Troubleshooting](troubleshooting.html) · [FAQ](faq.html) · [Developer Notes](developer-notes.html)

---

CradGacha keeps permissions deliberately simple.

| Permission node | Default | Grants |
|---|---|---|
| `cradgacha.admin` | `op` | Admin commands: `/gacha reload`, `/gacha doctor`, and all `/gacha token …` commands. |

Everything else — opening the menu (`/gacha`), opening a crate (`/gacha open`), and `/gacha debug`
— is available to **all players** and needs no permission.

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

Next: [Configuration →](configuration.html)
