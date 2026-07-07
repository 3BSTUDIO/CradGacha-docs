---
title: Troubleshooting
---

# Troubleshooting



---

> **First step for almost everything:** run `/gacha doctor`. It checks packetevents, ItemsAdder,
> glyphs, Vault, your crates, and your resource pack, and tells you what's wrong.

## The menu shows grey stone blocks and/or raw text (`i_token:1`, `1`, `10`) {#stone-menu}

This is the **most common visual issue**, and it has one root cause: **the built-in UI assets aren't loaded
for the item provider you run.** The menu background, buttons and cursor are custom item-models + font glyphs
shipped in the CradGacha pack. When they can't be found, the item-models fall back to a stone block and the
glyphs render as their raw id text (`i_token:1`, `1`, `10`).

Work through these in order:

0. **No ItemsAdder / Nexo / Oraxen at all?** Use **vanilla mode** — drop `pack/vanilla` in as a normal server
   resource pack and set `ui.item-provider: vanilla` (the bundled `pack/vanilla/CradGacha` already does). The
   whole menu then renders with **no item-provider plugin** (needs MC 1.21.4+; players must accept the pack).
   `auto` already picks vanilla when none of the three is installed.
1. **Install the pack for your provider.** Drop in the ready-made pack that matches your item plugin —
   `pack/itemsadder`, `pack/nexo` or `pack/oraxen` — into the right folder (see
   [Installation](installation.md)), then rebuild/reload it: ItemsAdder `/iazip` + `/iareload`, or reload the
   Nexo / Oraxen pack.
2. **Point the config at the right provider.** In `config.yml` set `ui.item-provider` to your provider
   (`itemsadder` / `nexo` / `oraxen`) or leave it `auto`. The shipped `theme.yml` / `cursor.yml` reference
   images as `provider:<name>` (or a literal `nexo:` / `oraxen:` / `crad_gacha:` id) — the prefix must match
   the plugin you actually run. Running Nexo while the config says `oraxen:` gives exactly this symptom.
3. **Make the client accept the resource pack.** The player must accept the server resource pack (rejoin if
   unsure). Run `/gacha doctor` and check the "resource pack" line.
4. **Update an old pack.** If the banner and card backs show but the *background* is stone, your pack predates
   the `menu_background` / `bg_1..6` tiles — reinstall the current pack from `pack/`.

::: tip
In current builds, a UI image that can't be resolved is **hidden** (the solid black backing panel shows
through) instead of turning into a stone wall. So if the whole menu is grey stone, you are also on an **older
jar** — update the plugin as well. Glyphs still need the pack installed to render.
:::

## Glyphs show as boxes (□ / tofu) — buttons, pity bar, currency

The images render but text glyphs are empty boxes. The glyph **font isn't the one the client loaded**:

- **Two packs fighting (vanilla + a provider).** If you run vanilla mode *and* still have an item provider
  (Nexo/IA/Oraxen) that sends its own pack, both define `assets/minecraft/font/default.json` and the
  provider's (which lacks our glyphs) wins → tofu. Current builds put the vanilla glyphs in a **separate
  `crad_gacha:default` font** that no provider can override — update the plugin and re-run `/gacha setup`.
- **Pack not accepted / stale.** Make the client accept the server pack (rejoin), and if you changed the pack,
  its hash changed — rejoin so the client re-downloads it.
- **Wrong font namespace after a manual edit.** The glyphs live in `crad_gacha:default`; don't move them into
  `minecraft:default` when a provider is present.

## The background is purple/black (magenta) checkerboard

That's the vanilla **missing-texture** — a model's texture isn't in the atlas. Since MC 1.19.3 an item-model's
texture must be in a directory the atlas scans. The vanilla pack puts model textures under
`textures/item/` (covered by the stock `item` atlas source) and references them as `crad_gacha:item/<name>`.
If you hand-built a pack with textures at the `textures/` root, either move them to `textures/item/` and fix
the model refs, or regenerate with `pack/_generate/genpacks.py`. (This does **not** affect ItemsAdder/Nexo/
Oraxen — they build their own atlas.)

## Nexo logs "Texture … has bad resolution-ratio"

Harmless **INFO** warnings: some UI textures aren't power-of-two, which only affects mipmapping (distant/
small rendering) — the close-up menu is unaffected. They appear when a provider is processing our textures.
If you fell back to **vanilla** on an incompatible provider, `/gacha setup` now **removes the unused provider
copy** so the warnings stop; otherwise you can delete `plugins/<Provider>/{items,glyphs}/crad_gacha.yml` and
`plugins/<Provider>/pack/assets/crad_gacha/`, then reload that provider. Or ignore them.

## Nexo/Oraxen items don't resolve on an older Minecraft (grey menu on 1.21.4/1.21.7)

If the console shows a **`NoClassDefFoundError`** (e.g. `io/papermc/paper/datacomponent/item/Weapon`) when
CradGacha resolves a UI item, your **item-provider is built for a newer Minecraft than your server**. Nexo
1.23+, for example, uses the `minecraft:weapon` data component that only exists on **1.21.5+**, so building any
Nexo item on **1.21.4** throws and every UI image comes back empty (grey menu). This is a provider↔MC version
mismatch, not a CradGacha bug.

Fix, any one of:
- **Update the server** to the version your provider needs (Nexo 1.23+ → 1.21.5+).
- **Use a provider build made for your MC version** (an older Nexo/Oraxen that matches 1.21.4).
- **Switch to vanilla mode** — `ui.item-provider: vanilla` + `pack/vanilla` as a resource pack. It needs no
  Nexo/Oraxen and works on **1.21.4+**, so it sidesteps the mismatch entirely.

`/gacha doctor` reports this ("UI provider is … but none of the CradGacha images resolve"), and the console
line `Nexo lookup '…' failed: your Nexo version is built for a NEWER Minecraft…` names the exact cause.

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

## Clicks stop working / the player gets kicked in the menu (anticheat)

If clicks stop registering after you open a crate — or the player is disconnected — your **anticheat** is
flagging the packets the cursor menu uses. In the console you'll see lines like
`Grim » <player> failed PacketOrderB (x20) pre-attack` climbing until a kick.

CradGacha grants a temporary bypass while the menu is open. Make sure your anticheat's bypass node is in
`cursor.yml`:

```yaml
anticheat-exempt-permissions:
  - grim.exempt        # GrimAC (default)
  # - <your-anticheat-bypass-node>
```

These permissions are granted **only** while the menu is open and removed on close. If your anticheat uses
a different bypass node, add it here (and `/gacha reload`). GrimAC's `grim.exempt` is included by default.

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
