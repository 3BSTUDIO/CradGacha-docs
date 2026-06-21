---
title: Result Panel
---

# Result Panel

[🏠 Home](index.html) · [🇹🇭 อ่านภาษาไทย](../th/result-panel.html) · [🌐 Language picker](../index.html)

**Pages:** [Home](index.html) · [Installation](installation.html) · [First Setup](first-setup.html) · [Commands](commands.html) · [Permissions](permissions.html) · [Configuration](configuration.html) · [Crates](crates.html) · [Cursor UI](cursor-ui.html) · **Result Panel** · [Troubleshooting](troubleshooting.html) · [FAQ](faq.html) · [Developer Notes](developer-notes.html)

---

After you press **Open**, the reveal screen appears with your face-down cards and a row of buttons
at the bottom. Click a card to flip it and reveal the reward.

## x1 pull

- Shows **one** card.
- Buttons: **Back** and **Open Again**.
- There is **no Open All** on a single pull (nothing to bulk-reveal).

## x10 pull

- Shows **ten** cards in a grid.
- Buttons: **Back**, **Open All**, and **Open Again**.

## The buttons

| Button | What it does |
|---|---|
| **Open All** | *(x10 only)* Reveals every remaining card at once. Disappears once all cards are revealed. |
| **Open Again** | Opens the crate again using the **same count** as before (x1 → x1, x10 → x10). The cost is charged again — nothing is bypassed. |
| **Back** | Returns to the crate-select menu. |

## Back button rule (important)

On a **10-pull**, **Back is locked until all 10 cards are revealed.**

- Before all cards are flipped, Back is greyed out (`&7`) and clicking it just plays a "no" sound.
- Once every card is revealed, Back turns green (`&a`) and becomes clickable, and the **Open All**
  button is removed.

This makes sure players actually see all their rewards before leaving. (On an x1 pull, you reveal
the single card and Back unlocks the same way.)

## When do I get my rewards?

Rewards are delivered when the reveal screen closes (you press Back / Open Again, or the screen
times out). They are also written to disk **the moment they are rolled**, so:

- If the server crashes, you disconnect, or you die mid-reveal, **nothing is lost** — the rewards
  are handed to you the next time you join or respawn.
- If your inventory is full, items drop at your feet instead of vanishing.

## Customising the buttons

The Back / Open All / Open Again buttons are configurable in `theme.yml`:

```yaml
reveal-buttons:
  y: -1.2                       # vertical position of the whole row
  back:
    text: "&7&l[ Back ]"
    text-revealed: "&a&l[ Back ]"   # text once all cards are revealed
    # glyph: g_back               # use an image instead of text
    # glyph-revealed: g_back_on
    x: -1.15
    scale: 0.4
    hitbox: { w: 0.45, h: 0.18 }
  all:    { text: "&b&l[ Open All ]",    x: 0,    scale: 0.4, hitbox: { w: 0.5,  h: 0.18 } }
  again:  { text: "&e&l[ Open Again ]",  x: 1.15, scale: 0.4, hitbox: { w: 0.55, h: 0.18 } }

reveal-cards:
  y: 0.7   # how high the card grid sits (higher = up)
```

If you don't set a field, it uses the built-in default, so behaviour stays the same.

---

Next: [Troubleshooting →](troubleshooting.html)
