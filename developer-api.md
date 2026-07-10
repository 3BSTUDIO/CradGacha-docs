---
title: Developer API
---

# Developer API

CradGacha exposes a small, stable API for other plugins: two Bukkit events and a static facade.
All calls are **main-thread only** and available once CradGacha is enabled.

The API is split into two halves:

| Half | Calls | Available |
|------|-------|-----------|
| **Free** (read-only) | `isMenuOpen`, `getPity`, `getTokens`, `getCrateIds` | any jar |
| **Premium** (actions + events) | `openCrate`, `addTokens`, `takeTokens`, `GachaOpenEvent`, `GachaPreOpenEvent` | Premium jar **or** a valid `api.premium-token` |

::: warning Unlocking the Premium half
The premium calls are active only when **CradGacha Premium** is installed, or a non-empty
`api.premium-token` is set in `config.yml`. The Premium jar **auto-generates** that token into config on
first run — copy it into a companion plugin's config to use the premium API alongside the Free jar.
While locked, `openCrate`/`takeTokens` return `false`, `addTokens` is a no-op, and the events never fire.
Check [`isPremiumApiAvailable()`](#facade-cradgachaapi) first.
:::

## Setup

Add the CradGacha jar as a `compileOnly` dependency, and depend on the plugin so it loads first:

```yaml
# your plugin.yml
depend: [CradGacha]        # or: softdepend: [CradGacha]
```

The API lives in the `com.threebstudio.cradgacha.api` package.

## Facade — `CradGachaAPI`

```java
import com.threebstudio.cradgacha.api.CradGachaAPI;

// ----- Premium: gate your calls on this -----
if (CradGachaAPI.isPremiumApiAvailable()) {
    // Start an open programmatically — same flow as clicking Open in the menu
    // (fires GachaPreOpenEvent, charges the cost, then shows the reveal).
    // false if blocked (unknown crate, cost, cooldown, cancelled event) OR the premium API is locked.
    boolean started = CradGachaAPI.openCrate(player, "starter", 10);
    CradGachaAPI.addTokens(uuid, 100);        // grant tokens (no-op if locked)
    CradGachaAPI.takeTokens(uuid, 50);        // false if the balance is too low, or if locked
}

// ----- Free: always available -----
CradGachaAPI.isMenuOpen(player);          // is the player inside any CradGacha menu?
CradGachaAPI.getPity(uuid, "starter");    // pity counter for a crate
CradGachaAPI.getTokens(uuid);             // built-in token balance
CradGachaAPI.getCrateIds();               // List<String> of all loaded crate ids
```

## Events

> Both events are part of the **Premium** half — they fire only when the premium API is unlocked
> (Premium jar or `api.premium-token`). On a locked Free server your listeners are simply never called.

### `GachaPreOpenEvent` — cancellable

Fired **before** anything is checked or charged. Cancel it to block the open (region gates, quest locks,
permission checks…) or adjust the number of cards.

```java
import com.threebstudio.cradgacha.api.GachaPreOpenEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class MyListener implements Listener {
  @EventHandler
  public void onPreOpen(GachaPreOpenEvent e) {
    if (isInArena(e.getPlayer())) {
      e.setCancelled(true);          // block the open entirely — nothing is charged
      return;
    }
    // e.getCrateId(), e.getCount(), e.setCount(n)  (n is re-clamped to settings.max-open)
  }
}
```

### `GachaOpenEvent` — informational

Fired **after** the rewards are rolled and persisted (they can no longer be lost), right before the reveal
is shown. Not cancellable — use `GachaPreOpenEvent` to block an open. Fired for both the cursor reveal and
the fallback world reveal.

```java
import com.threebstudio.cradgacha.api.GachaOpenEvent;
import com.threebstudio.cradgacha.Reward;

@EventHandler
public void onOpen(GachaOpenEvent e) {
  for (Reward r : e.getResults()) {           // read-only, in card order
    // r.displayName(), r.itemId(), r.amount(), r.rarity().id(), r.hasCommands()
  }
  // e.getPlayer(), e.getCrateId()
}
```

## Notes

- The API surface is intentionally small and kept stable across updates.
- Everything must be called from the main server thread.
- For deeper integration ideas or a missing hook, open an issue on
  [GitHub](https://github.com/3BSTUDIO/CradGacha) or ask on Discord.
