---
title: ตู้กาชา
---

# ตู้กาชา (Crates)



---

ตู้อยู่ในไฟล์ **`crates.yml`** key บนสุดแต่ละอันคือ **id** ของตู้ (ใช้ในคำสั่งและเมนู)

## ตัวเลือกของตู้

```yaml
my_crate:                         # <- id ของตู้ (ห้ามมีช่องว่าง)
  name: "&a&lMy Crate"            # ชื่อแสดง (ใช้สี & ได้)
  enabled: true                   # false = โชว์ในเมนูแต่เปิดไม่ได้ ("coming soon")
  icon: CHEST                     # ไอเทมไอคอนในรายการตู้
  display-item: CHEST             # ไอเทมที่โชว์ตรงกลาง
  icon-slot: -1                   # -1 = จัดอัตโนมัติ
  cost: { type: TOKEN, amount: 5 }
  pity: { enabled: true, rarity: LEGENDARY, threshold: 50 }
  rewards:
    - { name: "...", material: ..., amount: 1, rarity: COMMON }
```

| ฟิลด์ | ความหมาย |
|---|---|
| `name` | ชื่อแสดงของตู้ (ใส่สี `&`) |
| `enabled` | `true` = เปิดได้ / `false` = เห็นแต่ล็อก (เหมาะกับ "เร็ว ๆ นี้") |
| `icon` / `display-item` | ไอเทมที่โชว์ ใช้ `namespace:id` กับ ItemsAdder ได้ |
| `cost` | สิ่งที่ผู้เล่นจ่ายต่อการเปิด — ดูด้านล่าง |
| `pity` | การการันตี (ไม่บังคับ) — ดูด้านล่าง |
| `rewards` | รายการรางวัลที่เป็นไปได้ |

## ประเภทค่าเปิด

```yaml
cost: { type: NONE }                            # ฟรี
cost: { type: ITEM, item: DIAMOND, amount: 1 }  # หักไอเทมจากกระเป๋า
cost: { type: MONEY, amount: 100 }              # เศรษฐกิจ Vault
cost: { type: TOKEN, amount: 5 }                # สกุลเงิน token ในตัว
```

- `ITEM` รับ material vanilla หรือ custom item (`nexo:`, `oraxen:`, `itemsadder:`)
- `MONEY` ต้องมี **Vault** + ปลั๊กอินเศรษฐกิจ
- `TOKEN` มีในตัว ให้ด้วย `/gacha token give …`
- เปิด 10 ใบ รวม = `amount × 10` ระบบจะคิดเงินเฉพาะใบที่จ่ายไหว (Open All เปิดเท่าที่จ่ายได้)

## รางวัล

รางวัลแต่ละชิ้นให้ **ไอเทม** รัน **คำสั่ง** หรือทั้งคู่ได้

```yaml
rewards:
  # ไอเทมอย่างเดียว
  - { name: "Diamonds", material: DIAMOND, amount: 5, rarity: COMMON }

  # custom item (ItemsAdder)
  - { name: "Dragon Jade Sword", material: "dragon_jade:dragon_jade_sword", amount: 1, rarity: RARE }

  # คำสั่งอย่างเดียว (ไม่ให้ไอเทม) — ใช้ "icon" แยกเพื่อโชว์บนการ์ด
  - name: "VIP Rank (7 วัน)"
    icon: GOLD_INGOT
    rarity: LEGENDARY
    commands:
      - "[console] lp user <player> parent addtemp vip 7d"
      - "[player] say ฉันเพิ่งได้ VIP!"

  # ไอเทม + คำสั่ง (bundle)
  - name: "Treasure Bundle"
    material: DIAMOND
    amount: 10
    rarity: EPIC
    commands:
      - "[console] eco give <player> 1000"
```

| ฟิลด์ | ความหมาย |
|---|---|
| `name` | ชื่อรางวัล |
| `material` | ไอเทมที่ **ให้จริง** เว้นไว้ถ้าเป็นรางวัลคำสั่งล้วน |
| `icon` | ไอเทมที่ **โชว์** บนการ์ด (ค่าเริ่มต้น = `material` ไม่มีก็ fallback เป็น PAPER) |
| `amount` | จำนวนไอเทม |
| `rarity` | หนึ่งในเรตของคุณ (`COMMON`/`RARE`/`EPIC`/`LEGENDARY`) |
| `commands` | คำสั่ง console/ผู้เล่นที่รันตอนรับรางวัล `<player>` จะถูกแทนด้วยชื่อผู้ชนะ |

**คำนำหน้าคำสั่ง:**

- `[console] …` — รันจาก console (ค่าเริ่มต้นถ้าไม่ใส่คำนำหน้า)
- `[player] …` — รันในนามผู้เล่น
- `<player>` — แทนด้วยชื่อผู้เล่น

> รางวัลทุกชิ้นต้องมี `material` **หรือ** `command` อย่างน้อยหนึ่งอย่าง ไม่งั้นจะถูกข้าม
> พร้อมเตือนใน console

## chance / weight ทำงานอย่างไร

โอกาสของรางวัลมาจาก **weight ของเรต** (ตั้งใน `config.yml`) ไม่ใช่ที่ตัวรางวัลเอง

1. ระบบสุ่ม **เรต** ตาม weight (นับเฉพาะเรตที่มีรางวัลในตู้นี้)
2. แล้วสุ่ม **รางวัล** ภายในเรตนั้น (แต่ละชิ้นในเรตเดียวกันโอกาสเท่ากัน)

ตัวอย่าง: `COMMON 60`, `RARE 25`, `EPIC 12`, `LEGENDARY 3` → LEGENDARY ออกราว **3%** ต่อการเปิด

เปอร์เซ็นต์ของแต่ละเรตแสดงให้ผู้เล่นเห็นในหน้า **เช็คเรท** ในเกม

## Pity (การการันตี)

```yaml
pity: { enabled: true, rarity: LEGENDARY, threshold: 50 }
```

- นับจำนวนการเปิดตั้งแต่ผู้เล่นได้เรตนั้นครั้งล่าสุด
- เมื่อถึง `threshold` การเปิดครั้งถัดไปจะ **การันตี** เรตนั้น
- ตัวนับแยกตามผู้เล่น **และ** ตามตู้ เก็บใน `data.yml`
- ตั้ง `enabled: false` เพื่อปิด pity ของตู้นั้น

## x1 / x10 ทำงานอย่างไร

- **x1** เปิดหนึ่งใบ
- **x10** เปิดสิบใบ (จำกัดด้วย `settings.max-open`) แต่ละใบสุ่มแยกกัน
- ค่าเปิดคิดตามจำนวนใบ
- ดูว่าปุ่มหลังเปิดทำอะไรที่หน้า [หน้าผลรางวัล](result-panel.html)

---

ถัดไป: [Cursor UI →](cursor-ui.html)
