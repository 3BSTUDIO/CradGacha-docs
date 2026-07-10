---
title: Developer API
---

# Developer API

::: warning Premium only
The Developer API (the `CradGachaAPI` facade and the Bukkit events) is a **Premium** feature — it is
available only when the **Premium** jar is installed. On the Free version these calls are not supported.
:::

CradGacha exposes a small, stable API for other plugins: two Bukkit events and a static facade.
All calls are **main-thread only** and available once the **Premium** CradGacha is enabled.

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

// Start an open programmatically — same flow as clicking Open in the menu
// (fires GachaPreOpenEvent, charges the cost, then shows the reveal).
// Returns false if blocked: unknown crate, cost, cooldown, or a cancelled event.
boolean started = CradGachaAPI.openCrate(player, "starter", 10);

CradGachaAPI.isMenuOpen(player);          // is the player inside any CradGacha menu?
CradGachaAPI.getPity(uuid, "starter");    // pity counter for a crate
CradGachaAPI.getTokens(uuid);             // built-in token balance
CradGachaAPI.addTokens(uuid, 100);        // grant tokens
CradGachaAPI.takeTokens(uuid, 50);        // false if the balance is too low (takes nothing)
CradGachaAPI.getCrateIds();               // List<String> of all loaded crate ids
```

## Events

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
