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
- Ensure **packetevents** is installed and up to date.

## GitHub Pages site doesn't appear

- On the **CradGacha-docs** repo, **Settings → Pages → Source** must be **GitHub Actions**.
  See [Deploy (GitHub Pages)](deploy.md).
- Check the **Actions** tab for a failed "Deploy Docs (VitePress)" run and read its logs.
- After enabling, push to `main` (or run the workflow) to trigger the first build.
- The site URL is `https://<your-user>.github.io/CradGacha-docs/`.

---

Next: [FAQ →](faq.md)
