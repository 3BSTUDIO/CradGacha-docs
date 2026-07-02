---
title: Troubleshooting
---

# Troubleshooting



---

> **First step for almost everything:** run `/gacha doctor`. It checks packetevents, ItemsAdder,
> glyphs, Vault, your crates, and your resource pack, and tells you what's wrong.

## The plugin doesn't load

- Check the console for a red error during startup.
- Make sure you're on **Paper 1.21+** (not Spigot/Bukkit) and **Java 21+**.
- Make sure the jar is in `plugins/` and you did a **full restart** (not `/reload`).

## A command doesn't work

- Admin commands (`reload`, `doctor`, `token`) need the `cradgacha.admin` permission — be `op` or
  grant it (see [Permissions](permissions.md)).
- Press **Tab** after `/gacha ` to see what's available to you.

## A dependency is missing

- `/gacha doctor` will show a red ✗ next to anything missing.
- **packetevents** is required for the cursor menu. Without it the menu can't open properly.
- **ItemsAdder** provides the images; without it the menu shows boxes (□).
- **Vault** is only needed for `MONEY` cost crates.

## Other players get disconnected when someone opens the gacha

Your **packetevents is too old for your Minecraft version**. On **MC 1.21.9+**, a pre-1.21.9 packetevents
mis-encodes the body-double packet sent to nearby players, and their client drops the connection the moment
someone opens the menu.

- Update to **packetevents 2.13.0+** (matching your server version), restart, and retest.
- As a stopgap you can disable the clone with `cursor.body-double: false` in `cursor.yml`, but updating
  packetevents is the real fix.

## Black seam lines between the background tiles

Only some players see thin black lines between the tiled background images. Those players are on an
**older client connecting through ViaVersion/ViaBackwards** — their client renders item-display sprites
slightly smaller, so gaps appear between tiles.

- In `theme.yml` set `background.tiles.overlap` to `1.06` (try `1.08` if a hairline remains). This
  enlarges each tile image only; the grid spacing is unchanged, so players on a matching client are
  unaffected. Then `/gacha reload`.

## A grey/stone block floats in the middle of the menu

Two possible causes:

1. **A crate banner points at a missing item.** If `crates.<id>.banner.item` (or a reward icon) uses an
   id/namespace your pack doesn't have (e.g. an old `crates_gacha:` name, or an `oraxen:` prefix while you
   run Nexo), the client has no model for it and shows a fallback block. Fix the id and the prefix
   (`nexo:` / `oraxen:` / `itemsadder`) to match your pack, then `/gacha reload`.
2. **A real world block peeking through the background.** Raise `clear-area.forward-distance` (e.g. `16`)
   so the view-cone in front of the camera is cleared too.

## The menu shows empty boxes (□) / images don't appear

This means the resource pack or glyphs aren't ready:

1. Run `/gacha doctor` — check the "glyphs registered" and "resource pack" lines.
2. In ItemsAdder, run `/iazip` then `/iareload` to (re)build the pack.
3. Make sure the player **accepted** the server resource pack (rejoin if unsure).
4. Confirm your glyph/image ids in `theme.yml` match what's registered in ItemsAdder.

## Models or images look dark

They shouldn't — the plugin forces full brightness (`15/15`). If something still looks off, it's
almost always the **resource pack / ItemsAdder model** itself (e.g. the texture has shading baked in
or emissive isn't set in your model). Re-export the model/texture in ItemsAdder.

## Rewards don't come out

- Open `crates.yml` and confirm the crate has a `rewards:` list and the crate is `enabled: true`.
- Each reward needs a `material` **or** a `commands` list. Check the console for a "Skipping reward"
  warning.
- If your inventory was full, items drop at your feet (look on the ground).
- Rolled rewards are saved to `pending.yml`; if you crashed/disconnected, they're given on rejoin.

## Money isn't being charged

- `MONEY` cost needs **Vault** + an economy plugin (e.g. EssentialsX Economy). Run `/gacha doctor`.
- If the economy plugin loaded after CradGacha, it should still be detected automatically; if not,
  `/gacha reload`.
- The player simply may not have enough money — they get a "not enough money" message.

## Permissions don't work

- Confirm the node is exactly `cradgacha.admin`.
- If using LuckPerms: `/lp user <name> permission check cradgacha.admin`.
- Operators have it by default; a permissions plugin can override defaults.

## The cursor can't reach the screen edges

This is a known server-side limit (see [Cursor UI](cursor-ui.md)). In `cursor.yml`:

- Raise `sensitivity-x` (e.g. `0.3` → `0.5`).
- Widen `bounds.min-x` / `max-x`.
- Run `/gacha reload`.

## The player gets stuck in spectator / weird camera

The plugin restores your gamemode and camera when the menu closes, and it has a recovery file
(`gamemode-recovery.yml`) that fixes anyone left in spectator after a crash. If someone is stuck:

- Have them rejoin (recovery runs on join), or set their gamemode manually.
- Ensure **packetevents** is installed and up to date (2.13.0+ on MC 1.21.9+).

## The Spark shop says a reward "is misconfigured"

A spark item couldn't be resolved. Each `spark.items` entry must be **either** `reward: "<an existing
reward's name>"` **or** a self-contained entry with `name:` plus `item:` or `commands:`. See
[Crates → Duplicate & Spark](crates.md#duplicate-amp-spark-exchange). (Name matching ignores colour codes,
case and spacing, so a rename won't break a reference.)

## GitHub Pages site doesn't appear

- On the **CradGacha-docs** repo, **Settings → Pages → Source** must be **GitHub Actions**.
  See [Deploy (GitHub Pages)](deploy.md).
- Check the **Actions** tab for a failed "Deploy Docs (VitePress)" run and read its logs.
- After enabling, push to `main` (or run the workflow) to trigger the first build.
- The site URL is `https://<your-user>.github.io/CradGacha-docs/`.

---

Next: [FAQ →](faq.md)
