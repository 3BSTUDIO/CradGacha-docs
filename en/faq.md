---
title: FAQ
---

# FAQ

[🏠 Home](index.html) · [🇹🇭 อ่านภาษาไทย](../th/faq.html) · [🌐 Language picker](../index.html)

**Pages:** [Home](index.html) · [Installation](installation.html) · [First Setup](first-setup.html) · [Commands](commands.html) · [Permissions](permissions.html) · [Configuration](configuration.html) · [Crates](crates.html) · [Cursor UI](cursor-ui.html) · [Result Panel](result-panel.html) · [Troubleshooting](troubleshooting.html) · **FAQ** · [Developer Notes](developer-notes.html)

---

**Q: Do players need a client mod?**
A: No. It works on a normal vanilla client — they just need to accept the server resource pack.

**Q: Do I really need packetevents?**
A: Yes, for the cursor menu (it powers the camera freeze). Without it the menu won't work properly.

**Q: Do I need ItemsAdder?**
A: Strongly recommended. It provides the button/cursor images and reward models. Without it the menu
shows empty boxes (□).

**Q: Does it work on Spigot/Bukkit?**
A: No — it requires **Paper** 1.21+ (it uses Paper-only APIs).

**Q: How do I add a new crate?**
A: Copy a block in `crates.yml`, give it a new id, edit the cost/rewards, then `/gacha reload`.
See [Crates](crates.html).

**Q: How do I change drop chances?**
A: Edit the `weight` of each rarity in `config.yml`. Higher weight = more common. See
[Configuration](configuration.html).

**Q: What are tokens?**
A: A built-in currency (stored in `tokens.yml`) you can sell from your store. Grant with
`/gacha token give <player> <amount>`. Crates can cost `TOKEN`.

**Q: Can my online store give tokens automatically?**
A: Yes. Have the store run `gacha token give {player} <amount>` from the console on purchase.

**Q: What does "Open Again" cost?**
A: The same as a fresh open of that count — it charges the cost again, it does not skip it.

**Q: Why is Back greyed out on a 10-pull?**
A: By design — you must reveal all 10 cards first. Use **Open All** to reveal them instantly.

**Q: A player crashed mid-pull — did they lose the reward?**
A: No. Rewards are saved the moment they're rolled and are delivered on the next join/respawn.

**Q: My buttons/labels are in the wrong spot. How do I move them?**
A: Edit `theme.yml` (and `THEME-REFERENCE.md` for the full reference), then `/gacha reload`.

**Q: The menu text shows broken Thai characters in chat. Why?**
A: That's the resource pack font not supporting stacked Thai vowels — not a plugin bug. Use English
text, or add a Thai-capable font to your pack.

**Q: How do I move the cursor faster / reach the edges?**
A: Raise `sensitivity-x` and widen `bounds` in `cursor.yml`. See [Cursor UI](cursor-ui.html).

**Q: How do I reload after editing a file?**
A: `/gacha reload` for YAML changes. A full server restart is only needed when you replace the jar.

---

Next: [Developer Notes →](developer-notes.html)
