---
title: Developer Notes
---

# Developer Notes



---

For contributors and curious admins. Built with Gradle (Kotlin DSL), Java 21, Paper API 1.21.4,
packetevents 2.12.2 (compileOnly). Optional integrations are reflection-based.

## Build

```bash
./gradlew build
# output: build/libs/CradGacha-1.0.0.jar
```

## Package layout

```
com.threebstudio.cradgacha
├─ CradGacha              # main plugin: wiring, config merge, lifecycle
├─ Crate / CrateManager  # crate model + loading from crates.yml
├─ Reward / Rarity       # reward + rarity records
├─ CostService           # charges NONE/ITEM/MONEY/TOKEN, affordableCount()
├─ CooldownManager       # in-memory open cooldowns
├─ DataStore             # data.yml (pity counters)
├─ PendingStore          # pending.yml (crash-safe reward delivery)
├─ TokenStore            # tokens.yml (token currency)
├─ ItemService           # "namespace:id" -> ItemStack (vanilla/Nexo/Oraxen/ItemsAdder)
├─ OpenFlow              # cost + cooldown + checks, then start a reveal
├─ Util                  # colour text, effects/titles
├─ cursor/               # the hologram-cursor engine + menus
│  ├─ CursorMenuManager  # core engine: spawn page, spectator freeze, cursor tick, clicks
│  ├─ CursorMenuLoader   # loads YAML menu pages (optional/legacy)
│  ├─ CursorSession      # per-player runtime state
│  ├─ HologramPage / Hologram / ClickArea / AnimationStep   # page model
│  ├─ CursorCrateMenu    # the crate-select menu (theme-driven)
│  ├─ CursorRevealMenu   # the card reveal page (cursor mode)
│  ├─ CursorResultPanel  # the "open again" panel
│  └─ CursorRatesMenu    # the drop-rates page
├─ reveal/               # fallback world-card reveal (no packetevents)
│  ├─ RevealManager / RevealSession / RevealDispatcher
├─ packet/               # packetevents glue
│  ├─ CameraLock         # rotation + Set Camera packets
│  └─ CursorInput        # reads client yaw/pitch + click packets
├─ hook/                 # reflection integrations
│  ├─ VaultHook / ItemsAdderHook / NexoHook / OraxenHook
│  └─ BetterModelHook / ModelEngineHook
└─ command/GachaCommand  # /gacha + tab completion
```

## Config merge

`config.yml` is the base. `cursor.yml`, `crates.yml`, and `theme.yml` are merged into it at runtime
under the keys `cursor.*`, `crates.*`, and `theme.*` (flattened leaf paths). This lets the code read
one config while admins edit separate files. `theme.yml` is chosen by the `theme:` key (defaults to
`theme.yml`, otherwise `themes/<name>.yml`).

## Main flow

1. `/gacha` → `CursorCrateMenu.open` → `CursorMenuManager.openPage`:
   locks the player, spawns the hologram page, sets up the spectator camera freeze, starts the tick.
2. Click **Open** → a registered action calls `OpenFlow.startOpen`:
   clamps count, checks ground/cooldown/inventory space, charges cost via `CostService`.
3. `RevealDispatcher.open` → (cursor) `CursorRevealMenu.open` or (fallback) `RevealManager.open`.
4. Rewards are rolled (`Crate.roll`, with pity from `DataStore`) and **immediately** written to
   `PendingStore` (`pending.yml`).
5. Cards flip; on close, `PendingStore.deliver` hands rewards to the player (online + alive checks),
   removing them from disk atomically to avoid duplicates.

## The cursor / camera technique

`mode: spectator` uses: player → SPECTATOR gamemode, mounted on an invisible armor stand (so head
rotation still flows as packets), plus a **Set Camera** packet so the view renders from the still
armor stand (frozen view). `CursorInput` reads the raw yaw/pitch and click packets; the cursor is a
display entity moved each tick. Teardown is wrapped in try/catch and backed by `gamemode-recovery.yml`.

## Reward safety

The source of truth for delivery is `PendingStore`, not the UI. Rewards survive crash, disconnect,
death, and `/reload` because they are persisted at roll time and delivered on join/respawn/enable.

## Extension points / future ideas

- Animation presets (pulse/pop/shake) — `AnimationStep` is currently scale + glow only.
- More billboard/rotation options for holograms.
- Additional cost types or a placeholder/PlaceholderAPI hook.
- A namespaced ItemsAdder content pack of its own (currently reuses `crates_gacha:*`).

## Adding a custom menu action

`CursorMenuManager.registerAction(name, handler)` lets you bind new theme actions without touching
the engine — that's how `select_crate`, `open_count`, `open_all`, `open_rates`, `close_menu`, and
`link_url` are wired in `CursorCrateMenu.register`.

---

[← Back to Home](index.html) · [🌐 Language picker](../index.html)
