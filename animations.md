---
title: Animations & Asset Importer
---

# Animations & Asset Importer

::: warning Premium feature
Everything on this page — the `/gacha import` command, `type: animation` elements, and the GLYPH
open-animation — is **[Premium](/premium) only**. The free build plays 3D model open-animations
(BetterModel / ModelEngine) only.
:::

Play a **GIF-style animation** anywhere in the menu — a spinning icon, a glowing button, or a full
"opening" sequence in place of a 3D model — and get the images onto your server **without touching
FTP**. Two features work together here:

- **Asset Importer** — pull a PNG or GIF into your pack in-game with one command. A GIF is sliced
  into frames automatically.
- **Glyph Animation** — a menu element that cycles through those frames every few ticks. Renders
  per-player, supports play-once, and works on **any** provider including vanilla mode.

Together they deliver the promise: **build an animation start-to-finish in-game**, no file editing.

::: tip Why glyph frames instead of a 3D model?
No ModelEngine, no BetterModel, no Java 25. It's pure font rendering, so it's version-proof and every
server can use it. A frame swap is one tiny text packet, and the menu is owner-only, so it's cheap.
:::

---

## 1. Import an image or GIF

```
/gacha import <url> [name]
```

- `url` — a direct link to a **PNG** or **GIF** (max 2 MB).
- `name` — the id it's registered under (letters/numbers/`_`). Optional; taken from the URL if omitted.

The plugin downloads it off the main thread, checks it really is a PNG/GIF, and writes it into
**whatever provider you use** (ItemsAdder / Nexo / Oraxen / vanilla), then rebuilds that provider's
pack for you.

- A **PNG** becomes a single image called `name`.
- A **GIF** becomes frames `name_0`, `name_1`, `name_2`, … (up to 64), so an animation can auto-collect
  them by prefix.

Imported images appear immediately in the **Layout Library** (Custom + All Images tabs).

::: info No outbound internet?
Drop the file in `plugins/CradGacha/import/` and run:
```
/gacha import file <filename> [name]
```
:::

After an import, **rejoin** (or wait for the pack to re-send) so your client downloads the new image.

---

## 2. Build the animation in `/gacha layout`

1. Run `/gacha layout` and open the **Library** (the toolbar's Library button).
2. Click **`[ 🎬 Animation ]`** to enter frame-pick mode.
3. Click each image in the order you want it to play. The header shows the frame count and the last
   few ids you added. **`[ ⤺ Undo ]`** removes the last one.
4. Set the pace with **`[ ⏱ Nt ]`** (ticks between frames) and the playback with **`[ ⟳ mode ]`**:
   - **loop** — plays forever.
   - **once** — plays through once and stops on nothing.
   - **hold** — plays once and freezes on the last frame.
5. Click **`[ ✔ Create ]`**. The animation rides your cursor — click to place it, resize with the
   held-element toolbar, then **Save**.

That writes an `animation` element into your theme. Frame rate is capped at 20/s (interval `2` ≈ 10
fps, a normal GIF feel).

### What it writes to `theme.yml`

```yaml
elements:
  my_spin:
    type: animation
    frames: [ spin_0, spin_1, spin_2, spin_3 ]
    interval-ticks: 2        # ticks between frames (2 = 10 fps)
    mode: loop               # loop | once | hold
    scale: 0.4
    x: 0.0
    y: 0.5
```

You can also point at a numbered set without listing every frame:

```yaml
    frames-prefix: spin_     # auto-collect spin_0..spin_(N-1)
    frame-count: 8
    frame-start: 0           # optional (default 0)
```

---

## 3. A GIF instead of a 3D open-animation

The same frames can play as the **open animation** — the sequence shown on a clean stage before the
cards appear — so servers without ModelEngine still get the "machine opening" moment.

In `config.yml`:

```yaml
model:
  enabled: true
  provider: GLYPH            # font-frame animation — no model plugin needed
  glyph:
    scale: 2.5               # on-screen size
    interval-ticks: 2        # 2 = 10 fps
    mode: hold               # hold last frame until the cards appear | loop | once
    frames: [ open_0, open_1, open_2, open_3 ]
    frames-by-rarity:        # optional: a different sequence per best rarity rolled
      LEGENDARY: [ leg_0, leg_1, leg_2, leg_3 ]
  duration-ticks: 40         # how long the animation plays before the cards appear
```

Import your open-animation GIF first (`/gacha import <url> open`), which gives you `open_0..open_N`,
then list them here.

---

## Tips & limits

- **Frame count** is capped at **64** and file size at **2 MB** — keep GIFs short and small.
- **All frames share one size** (taken from the first frame), so they line up. Export your GIF at the
  size you want it to render.
- **Vanilla mode** stores imported glyphs in `plugins/CradGacha/imported-glyphs.yml` and appends them
  to the self-hosted pack; a re-zip + re-send happens automatically on import.
- If a frame shows as a **box**, the client hasn't loaded the pack yet — rejoin, or run
  `/gacha doctor` to check the pack state.

## See also

- [Cursor UI](/cursor-ui) — how the menu and elements work.
- [Commands](/commands) — the full command list.
- [Configuration](/configuration) — every config key.
