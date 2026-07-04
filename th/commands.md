---
title: คำสั่ง
---

# คำสั่ง



---

มีคำสั่งหลักเดียวคือ **`/gacha`** และมี tab-completion ในตัว — กด **Tab** เพื่อดูคำสั่งย่อยและอาร์กิวเมนต์
(คำสั่งย่อยของแอดมินจะโชว์เฉพาะแอดมิน)

| คำสั่ง | ทำอะไร | สิทธิ์ |
|---|---|---|
| `/gacha` | เปิดเมนูเลือกตู้ | ทุกคน |
| `/gacha open <crate> [1\|10]` | เปิดตู้โดยตรงไม่ผ่านเมนู (คิดค่าเปิด + คูลดาวน์) | ทุกคน |
| `/gacha history` | ประวัติของที่ตัวเองได้ + pity ต่อตู้ (ต้อง `reward-log.enabled`) | ทุกคน |
| `/gacha fix [player]` | แก้ตัวเอง (หรือผู้เล่น) ที่ค้าง — รีเซ็ตมุมมอง/กล้อง/gamemode | ตัวเอง · `cradgacha.admin` สำหรับคนอื่น |
| `/gacha debug` | สลับการโชว์พิกัดเคอร์เซอร์ (ต้องเปิดเมนูอยู่) | ทุกคน |
| `/gacha reload` | โหลด `config.yml`, `crates.yml`, `cursor.yml`, `theme.yml` และเมนูใหม่ | `cradgacha.admin` |
| `/gacha doctor` | ตรวจสุขภาพการตั้งค่า (packetevents, ItemsAdder, glyph, Vault, ตู้, resource pack และ Nexo/Oraxen/ModelEngine/BetterModel ที่เป็น optional) | `cradgacha.admin` |
| `/gacha token <player>` · `give`/`take`/`set <player> <amount>` | เช็ค / ให้ / หัก / ตั้งยอด token ของผู้เล่น | `cradgacha.admin` |

### คำสั่งพรีเมียม

มีเฉพาะ jar [พรีเมียม](/th/premium) (jar ฟรีขึ้นข้อความชวนอัปเกรด):

| คำสั่ง | ทำอะไร | สิทธิ์ |
|---|---|---|
| `/gacha edit <crate>` | เปิด editor รางวัล + settings ในเกม | `cradgacha.admin` |
| `/gacha create <id>` | สร้างตู้ใหม่ในเกมแล้วเปิด editor | `cradgacha.admin` |
| `/gacha key give <player> <crate> [amount]` | แจกกุญแจของตู้ (เปิดฟรีไม่เสีย cost) | `cradgacha.admin` |
| `/gacha stats [crate]` | dashboard % ดรอป + อันดับคนเปิด (จาก reward log) | `cradgacha.admin` |
| `/gacha layout` | layout editor — ลาก element เมนูด้วยเมาส์ | `cradgacha.admin` |
| `/gacha config` | ตั้งค่า global ในเกม — ความไวเมาส์, ขอบเคอร์เซอร์, ui-scale, เอฟเฟกต์, rarities (รวม glow) — ไม่ต้องแตะ YAML | `cradgacha.admin` |

## ตัวอย่าง

เปิดเมนู:

```
/gacha
```

เปิดตู้ `starter` สิบครั้งโดยตรง:

```
/gacha open starter 10
```

ให้ผู้เล่น 100 token (รันจาก console ได้ด้วย — สะดวกสำหรับร้านค้า/ระบบบริจาค):

```
/gacha token give Steve 100
```

เช็คยอดผู้เล่น:

```
/gacha token Steve
```

reload หลังแก้ไฟล์ YAML:

```
/gacha reload
```

## หมายเหตุ

- **`/gacha open`** ยังคิดค่าเปิด คูลดาวน์ เช็คช่องว่างกระเป๋า และกฎ "ต้องยืนบนพื้น"
  (ดู [การตั้งค่า](configuration.md)) — ส่วนการเปิดจาก **เมนู** จะข้ามการเช็คพื้น
  เพราะผู้เล่นเป็น spectator ชั่วคราว
- คำสั่ง **token** รันจาก **console** ได้ ซึ่งเป็นวิธีที่ร้านค้าออนไลน์ (Tebex, ปลั๊กอินบริจาค ฯลฯ)
  ใช้ให้ token อัตโนมัติ — ตั้งให้รัน `gacha token give {player} <amount>` ตอนซื้อ
- `/gacha token give` ใช้ได้แม้ผู้เล่นเป้าหมาย **ออฟไลน์**

---

ถัดไป: [สิทธิ์ →](permissions.md)
