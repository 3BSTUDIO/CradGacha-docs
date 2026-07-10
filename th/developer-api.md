---
title: Developer API
---

# Developer API

::: warning เฉพาะพรีเมียม
Developer API (facade `CradGachaAPI` และ Bukkit event) เป็นฟีเจอร์ **พรีเมียม** — ใช้ได้เฉพาะเมื่อ
ติดตั้ง jar **Premium** เท่านั้น บนเวอร์ชัน Free เมธอดเหล่านี้ไม่รองรับ
:::

CradGacha มี API เล็กๆ ที่เสถียรให้ปลั๊กอินอื่นใช้: Bukkit event 2 ตัว + facade แบบ static
ทุกเมธอด **เรียกจาก main thread เท่านั้น** และใช้ได้เมื่อ CradGacha **Premium** เปิดใช้งานแล้ว

## การตั้งค่า

เพิ่ม jar ของ CradGacha เป็น dependency แบบ `compileOnly` และ depend เพื่อให้โหลดก่อน:

```yaml
# plugin.yml ของคุณ
depend: [CradGacha]        # หรือ: softdepend: [CradGacha]
```

API อยู่ใน package `com.threebstudio.cradgacha.api`

## Facade — `CradGachaAPI`

```java
import com.threebstudio.cradgacha.api.CradGachaAPI;

// สั่งเปิดตู้ผ่านโค้ด — flow เดียวกับกดปุ่ม Open ในเมนู
// (ยิง GachaPreOpenEvent, หักค่าเปิด, แล้วโชว์ผลรางวัล)
// คืน false ถ้าถูกบล็อก: ไม่มีตู้นี้, ค่าเปิด, cooldown, หรือ event ถูก cancel
boolean started = CradGachaAPI.openCrate(player, "starter", 10);

CradGachaAPI.isMenuOpen(player);          // ผู้เล่นอยู่ในเมนู CradGacha ไหม?
CradGachaAPI.getPity(uuid, "starter");    // ตัวนับ pity ของตู้
CradGachaAPI.getTokens(uuid);             // ยอด token ในตัว
CradGachaAPI.addTokens(uuid, 100);        // ให้ token
CradGachaAPI.takeTokens(uuid, 50);        // false ถ้ายอดไม่พอ (ไม่หักอะไรเลย)
CradGachaAPI.getCrateIds();               // List<String> id ของทุกตู้ที่โหลด
```

## Events

### `GachaPreOpenEvent` — cancel ได้

ยิง **ก่อน** เช็ค/หักอะไรทั้งสิ้น · cancel เพื่อบล็อกการเปิด (จำกัด region, ล็อกเควส, เช็คสิทธิ์…) หรือปรับจำนวนการ์ด

```java
import com.threebstudio.cradgacha.api.GachaPreOpenEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class MyListener implements Listener {
  @EventHandler
  public void onPreOpen(GachaPreOpenEvent e) {
    if (isInArena(e.getPlayer())) {
      e.setCancelled(true);          // บล็อกทั้งหมด — ไม่หักอะไรเลย
      return;
    }
    // e.getCrateId(), e.getCount(), e.setCount(n)  (n จะถูก clamp ตาม settings.max-open)
  }
}
```

### `GachaOpenEvent` — เชิงข้อมูล

ยิง **หลัง** สุ่มรางวัลและบันทึกลง pending แล้ว (ของหายไม่ได้แล้ว) ก่อนโชว์ผล · cancel ไม่ได้ — ถ้าจะบล็อกให้ใช้
`GachaPreOpenEvent` · ยิงทั้งหน้า reveal แบบเคอร์เซอร์และ world reveal สำรอง

```java
import com.threebstudio.cradgacha.api.GachaOpenEvent;
import com.threebstudio.cradgacha.Reward;

@EventHandler
public void onOpen(GachaOpenEvent e) {
  for (Reward r : e.getResults()) {           // อ่านอย่างเดียว เรียงตามการ์ด
    // r.displayName(), r.itemId(), r.amount(), r.rarity().id(), r.hasCommands()
  }
  // e.getPlayer(), e.getCrateId()
}
```

## หมายเหตุ

- API ตั้งใจให้เล็กและเสถียรข้ามเวอร์ชัน
- ทุกอย่างต้องเรียกจาก main thread ของเซิร์ฟเวอร์
- ถ้าอยากได้ hook เพิ่มหรือมีไอเดีย integrate เปิด issue ที่
  [GitHub](https://github.com/3BSTUDIO/CradGacha) หรือถามใน Discord
