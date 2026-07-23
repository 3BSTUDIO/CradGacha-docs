---
title: Setup & Resource Pack
---

# Setup & Resource Pack

The cursor menu, card reveals and editors are drawn with custom **item-models** (backgrounds, cards, cursor,
panels) and **font glyphs** (buttons, pity bar, currency icons). Those assets come from one of two places:

- an **item provider** you already run — ItemsAdder, Nexo or Oraxen, **or**
- the bundled **vanilla pack** — a plain resource pack, no item-provider plugin needed (MC **1.21.4+**).

The one command **`/gacha setup`** wires whichever you have.

## One-command setup — `/gacha setup`

1. Drop the plugin jar in `plugins/` and start the server. On first run it unpacks the bundled packs to
   `plugins/CradGacha/packs/{itemsadder,nexo,oraxen,vanilla}` (your own edits there are never overwritten).
2. Run **`/gacha setup`** (needs `cradgacha.admin`). It:
   - detects your item provider,
   - copies the matching pack into that plugin's folders and reloads it,
   - pins `ui.item-provider` and reloads CradGacha.

| Detected | What setup does |
|----------|-----------------|
| **ItemsAdder** | copies into `plugins/ItemsAdder/contents/`, runs `/iazip` + `/iareload` |
| **Nexo** | copies items/glyphs/assets into `plugins/Nexo/`, runs `/nexo reload all` |
| **Oraxen** | copies items/glyphs/assets into `plugins/Oraxen/`, runs `/oraxen reload pack` |
| **none** | uses the **vanilla** pack + turns on the built-in host (below) |

Then **rejoin** so the client re-downloads the pack, and open the menu.

## No item provider? Vanilla mode + built-in host

With no ItemsAdder/Nexo/Oraxen, CradGacha uses the **vanilla** pack: the menu items are plain `PAPER` carrying
the `minecraft:item_model` component, so a normal resource pack renders them — no plugin builds anything. This
works on **MC 1.21.4+**.

Delivering that pack to players is handled by the **built-in host** — free and permanent, served from your own
server, auto-updated when the pack changes. `/gacha setup` turns it on automatically. Config (`config.yml`):

```yaml
resource-pack-host:
  enabled: false          # /gacha setup enables it on a no-provider server
  port: 8765              # a free, OPEN port (allow it in your firewall)
  address: auto           # 'auto' = server IP, then a public-IP lookup; set your IP/domain if that's wrong
  required: false         # force the pack
  prompt: "&6CradGacha &7needs this pack for the menu"
```

Players receive the pack on join and the menu renders. If the port can't bind, setup falls back to printing
the pack path + SHA-1 so you can host it manually (e.g. drag-drop to `mc-packs.net`).

## Provider built for a newer Minecraft (auto-fallback)

Item plugins are version-locked. For example **Nexo 1.23+ needs MC 1.21.5+** (it uses the `minecraft:weapon`
component), so on **1.21.4** it can't build items. When `/gacha setup` sees this it **automatically falls back
to the vanilla pack**, removes the unusable provider copy, and starts the host — you're never left with a
broken menu. (You can also just run 1.21.5+, or install a provider build matching your MC.)

## Forcing a provider — `ui.item-provider`

`config.yml`:

```yaml
ui:
  item-provider: auto     # auto | itemsadder | nexo | oraxen | craftengine | vanilla
  namespace: crad_gacha   # the pack namespace (ItemsAdder / vanilla)
```

`auto` picks ItemsAdder > Nexo > Oraxen if installed, otherwise the vanilla pack. **CraftEngine** is
supported for reward/cost items (`craftengine:<id>`) but has no bundled CradGacha UI pack, so `auto`
keeps the menu images on the self-hosted vanilla pack even when CraftEngine is present — pin
`item-provider: craftengine` only if you've added the UI images to a CraftEngine pack yourself. In the
shipped `theme.yml` /
`cursor.yml`, images are written as `provider:<name>` (e.g. `provider:menu_background`); the `provider:` token
expands to the active prefix at runtime, so one config works everywhere.

## Adding your own buttons / images

`pack/_generate/genpacks.py` builds all four packs from one source (the ItemsAdder pack). To add an asset:
add the texture + model + item/glyph, run the generator, then reference it in `theme.yml` (or the layout
editor) with `provider:<name>`. Prefer **glyphs** for flat icons — they need no atlas handling; use **items**
(`item_model`) for large panels/cards.

See [Troubleshooting](troubleshooting.md) if the menu shows grey blocks, purple/black, or box-glyphs (□).
