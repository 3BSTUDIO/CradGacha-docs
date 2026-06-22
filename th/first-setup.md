---
title: ตั้งค่าครั้งแรก
---

# ตั้งค่าครั้งแรก



---

หน้านี้พาคุณจาก "ติดตั้งเสร็จ" ไปสู่ "ตู้ที่ใช้งานได้" ในไม่กี่นาที
ไฟล์ทั้งหมดด้านล่างถูกสร้างอัตโนมัติใน `plugins/CradGacha/` ตอนเปิดปลั๊กอินครั้งแรก

## ไฟล์ที่คุณจะแก้

| ไฟล์ | ควบคุมอะไร |
|---|---|
| `config.yml` | การตั้งค่ารวม พื้นหลัง แบนเนอร์ showcase เรต คูลดาวน์ |
| `crates.yml` | ตู้ของคุณ: ค่าเปิด รางวัล และ pity |
| `cursor.yml` | ความรู้สึกของเคอร์เซอร์/กล้อง (ความไว ขอบเขต โหมด) |
| `theme.yml` | เลย์เอาต์ของเมนู (ตำแหน่งปุ่ม ข้อความ รูป) |

> **เคล็ดลับ:** หลังแก้ไฟล์พวกนี้ ให้รัน `/gacha reload` — ไม่ต้องรีสตาร์ท

## ขั้นที่ 1 — ดูตู้ตัวอย่าง

CradGacha มาพร้อมตู้ตัวอย่างชื่อ `starter` ใน `crates.yml` เปิดไฟล์ดู:

```yaml
starter:
  name: "&a&lDragonJade Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: TOKEN, amount: 1 }     # 1 token ต่อการเปิด
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Dragon Jade Pickaxe", material: "dragon_jade:dragon_jade_pickaxe", amount: 1, rarity: COMMON }
    - { name: "Dragon Jade Sword",   material: "dragon_jade:dragon_jade_sword",   amount: 1, rarity: RARE }
    - { name: "Dragon Jade Shield",  material: "dragon_jade:dragon_jade_shield",  amount: 1, rarity: EPIC }
    - { name: "Dragon Jade Spear",   material: "dragon_jade:dragon_jade_spear",   amount: 1, rarity: LEGENDARY }
```

## ขั้นที่ 2 — สร้างตู้ของคุณเอง

คัดลอกบล็อกด้านบน เปลี่ยน key (`starter` → เช่น `daily`) แล้วแก้ค่า
ตัวอย่างตู้ง่าย ๆ ที่ให้ไอเทม vanilla และเปิดฟรี:

```yaml
daily:
  name: "&b&lDaily Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: NONE }
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Diamonds",  material: DIAMOND,         amount: 5, rarity: COMMON }
    - { name: "Emeralds",  material: EMERALD,         amount: 3, rarity: RARE }
    - { name: "Netherite", material: NETHERITE_INGOT, amount: 1, rarity: LEGENDARY }
```

ดูทุกตัวเลือก (คำสั่ง ไอคอน น้ำหนัก pity) ที่หน้า [ตู้กาชา](crates.html)

## ขั้นที่ 3 — ตั้งค่าเปิด

บรรทัด `cost` กำหนดว่าผู้เล่นจ่ายอะไรต่อการเปิดหนึ่งครั้ง เลือกหนึ่งอย่าง:

```yaml
cost: { type: NONE }                               # ฟรี
cost: { type: ITEM, item: DIAMOND, amount: 1 }     # 1 เพชรต่อการเปิด
cost: { type: MONEY, amount: 100 }                 # 100 จากเศรษฐกิจ Vault
cost: { type: TOKEN, amount: 5 }                   # 5 token (แต้มในตัว)
```

- `MONEY` ต้องมี **Vault** + ปลั๊กอินเศรษฐกิจ
- `TOKEN` เป็นสกุลเงินในตัว ให้แต้มด้วย `/gacha token give <player> <amount>`
  (ดู [คำสั่ง](commands.html))

ตอนเปิด 10 ใบ ค่าเปิดรวม = `amount × 10`

## ขั้นที่ 4 — ตั้งรางวัล & เรต

รางวัลแต่ละชิ้นมี `rarity` (ค่าเริ่มต้น `COMMON`, `RARE`, `EPIC`, `LEGENDARY`)
ความถี่ที่แต่ละเรตออกตั้งด้วย **weight** ใน `config.yml`:

```yaml
rarities:
  COMMON:    { color: "&f", weight: 60.0, ... }
  RARE:      { color: "&9", weight: 25.0, ... }
  EPIC:      { color: "&5", weight: 12.0, ... }
  LEGENDARY: { color: "&6&l", weight: 3.0, ... }
```

weight สูง = ออกบ่อยกว่า เรตที่ไม่มีรางวัลจะถูกข้าม ดูเพิ่มที่ [ตู้กาชา](crates.html)

## ขั้นที่ 5 — reload และทดสอบ

```
/gacha reload
/gacha
```

- ขยับเมาส์ให้เคอร์เซอร์ชี้ตู้ คลิกเพื่อเลือก
- คลิก **Open x1** หรือ **Open x10**
- คลิกการ์ดทีละใบเพื่อพลิก หรือใช้ **Open All** (เฉพาะเปิด 10 ใบ)

ถ้าเมนูเป็นกล่องสี่เหลี่ยม (□) แปลว่า resource pack/glyph ยังไม่พร้อม ให้รัน `/gacha doctor`
แล้วดู [แก้ปัญหา](troubleshooting.html)

---

ถัดไป: [คำสั่ง →](commands.html)
