---
title: Cursor UI
---

# Cursor UI



---

## The idea, in plain words

Normal Minecraft menus are chest windows. CradGacha instead builds the menu out of **floating
holograms in the world** and gives the player a **virtual mouse cursor** they move with their mouse,
exactly like a desktop UI. They point at a button and click.

To make this feel right, the plugin **freezes the camera**: when the menu opens, the player's view
locks in place (so the menu doesn't wobble) while their mouse still moves a cursor across it. This
freeze uses **packetevents**, which is why packetevents is required.

## Key terms

| Term | Meaning |
|---|---|
| **Virtual cursor** | The little pointer image you move with your mouse. It is not the vanilla crosshair — it's a display entity the plugin moves for you. |
| **Clickable area** | An invisible rectangle (a *hitbox*) tied to a button. When the cursor is inside it, that button is "hovered". |
| **Hover** | The cursor is over a button. The button glows and plays a soft tick sound. |
| **Click** | You left- or right-click while hovering. The button's action runs (select a crate, open, etc.). |
| **Spectator freeze** | The camera-lock trick that keeps the view still while the mouse moves the cursor. |

## How a click happens (behind the scenes)

1. Your mouse turns your head; the plugin reads that rotation and moves the cursor.
2. Each tick it checks which clickable area the cursor is inside.
3. When you click, it runs the action of whatever area you're hovering.

You don't configure any of this — it just works. The layout (where the buttons are) is in
`theme.yml`; the *feel* (sensitivity, bounds) is in `cursor.yml` (see [Configuration](configuration.md)).

## Tuning the feel (cursor.yml)

```yaml
sensitivity-x: 0.3   # raise this if the cursor moves too slowly left/right
sensitivity-y: 0.22
bounds: { min-x: -2.8, max-x: 2.8, min-y: -1.6, max-y: 1.8 }  # how far the cursor can reach
smoothing: 0.7       # 1.0 = instant/raw, lower = smoother glide
```

- **Cursor too slow / can't reach the edges?** Raise `sensitivity-x` and/or widen `bounds`.
- **Cursor feels twitchy?** Lower `sensitivity` or lower `smoothing`.

## Why things look bright (no dark models)

Items and text in the menu can look dim if the plugin let world lighting affect them. CradGacha
sets every menu display to **full brightness `15/15`** in code, so buttons and reward models always
look crisp regardless of time of day or where the player stands. This is automatic — there is no
setting to change.

## The theme (theme.yml) in one minute

`theme.yml` controls **where everything is** and **what image/label it uses**. You can move buttons,
change labels, swap images, and even add your own elements — all without touching code. After
editing, run `/gacha reload`.

```yaml
elements:
  btn_x10:
    type: glyph          # glyph (image) | text | item
    value: g_open_x10    # the image/glyph name
    x: 1.85              # left(-)/right(+)
    y: -1.0              # down(-)/up(+)
    scale: 0.425
    action: open_count   # what clicking does
    param: "{crate}:10"  # 10-pull of the selected crate
    hitbox: { w: 0.42, h: 0.16 }
```

Full theme reference: see `THEME-REFERENCE.md` in the repository root.

## Recommended image sizes

If you replace a UI image with your own art, match these dimensions so it stays crisp and doesn't
warp. All are **power-of-two-friendly** where it matters (Minecraft handles textures best that way) —
these are exactly what the bundled Dragon Jade pack uses.

| Element | Recommended PNG size | Notes |
|---|---|---|
| Background tile (`bg_1`…`bg_6`) | **512 × 512** | Minecraft caps one image at 256×256 on screen — a big background is split into a grid of tiles (see Configuration → background) |
| Single background (`menu_background`) | **256 × 256** | one non-tiled backdrop |
| Showcase banner (`showcase` / `showcase_pack`) | **512 × 256** (2 pieces) | wide banner, made of two glyph halves |
| Reward card back (`card_back_*`) | **512 × 512** | square card |
| Crate icon in the picker (`crate_1`, `crate_2`) | **256 × 128** | |
| Open buttons (`g_open_x1`, `g_open_x10`, back/again/all) | **66 × 22** (keep the ~3:1 ratio) | wide pill button |
| Currency / small icons (`i_token`, `i_money`) | **~21 × 22** | ~square, sits inline with text |
| Nav / small glyph buttons (shop, spark, wishlist, rate…) | **24 × 24** | |
| Cursor crosshair (`cursor.png`) | **16 × 16** | keep it small so aiming is precise |
| Pity-bar segments (`pity_0`…`pity_full`) | **16 × 32** (tall) | tiled side-by-side into the bar |
| Editor toolbar strips (`layout_edit`, `layout_edit_1`) | **139 × 24** (6 cells of ~23 px) | if you re-draw a different width, set `theme.layout-editor.bar-aspect` = width ÷ height |

Rules of thumb:
- **Keep the aspect ratio.** A wide button drawn square (or vice-versa) will look stretched — the menu
  scales by height, so width follows the image's own ratio.
- **Square-ish icons** (buttons, currency, cursor) read best; reserve wide sizes for banners/buttons.
- **Don't go huge for tiny icons** — a 512×512 image used as a 16-px cursor just wastes pack size (and,
  in the Library's "All Images" tab, oversized background glyphs are auto-hidden above
  `theme.layout-editor.max-glyph-scale`).
- On ItemsAdder, the on-screen size is the font `scale_ratio` in your `contents/.../configs`, not the
  PNG — the PNG only needs to be sharp at the size above.

## Known limitations (server-side only)

These come from doing a cursor UI purely on the server (no client mod):

- The cursor may not reach the very **left/right screen edges** (sitting on the camera anchor limits
  how far the head turns). Mitigate with higher `sensitivity-x` / wider `bounds`.
- There can be a tiny **input delay** (the server updates 20×/sec vs the client's 60 fps).
- The **vanilla crosshair** can't be hidden by the server — make a transparent `crosshair.png` in
  your resource pack if you want it gone.

---

Next: [Result Panel →](result-panel.md)
