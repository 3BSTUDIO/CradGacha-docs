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

## banner & ปุ่ม ต่อตู้ (ไม่บังคับ)

แต่ละตู้ตั้ง **banner** กลางจอ และ **ปุ่มเลือก** ในรายการตู้ของตัวเองได้ ทุกฟิลด์ไม่บังคับ —
ไม่ใส่ = ใช้ค่า default รวม (`config.yml > showcase` และ `theme.crate-list`)
เมื่อผู้เล่นเลือกตู้ banner จะเปลี่ยนตามตู้นั้น

```yaml
my_crate:
  # banner กลางจอเฉพาะตู้นี้ (override config.yml > showcase)
  banner:
    item: "nexo:my_banner"     # banner แบบ item …
    # glyph: my_banner_glyph   # … หรือใช้ glyph เดี่ยวแทน
    x: 0.3
    y: 0.15
    scale: 1.5
  # ปุ่มเลือกตู้เฉพาะตู้นี้ (override theme.crate-list)
  button:
    item: "nexo:my_icon"           # ไอคอนตอน enabled …
    item-disabled: "nexo:my_off"   # … ตอน enabled:false
    selected-item: "nexo:my_sel"   # … ตอนถูกเลือก
    # glyph: g_crate_1             # หรือใช้ glyph: glyph / glyph-disabled / selected-glyph
    # text: "My Crate"             # หรือข้อความล้วน: enabled-color / disabled-color
    x: -1.9
    y: 0.82
    scale: 0.52
    hitbox: { w: 0.8, h: 0.22 }
```

ลำดับความสำคัญของปุ่ม: `selected-*` (ตอนเลือก) → `item`/`glyph`/`text` (ตามสถานะ) → ค่า default `theme.crate-list`

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
| `duplicate` | `false` = ไม่แปลงเป็น Spark (ส่ง/รัน command ทุกครั้ง) · ดูด้านล่าง |

**คำนำหน้าคำสั่ง:**

- `[console] …` — รันจาก console (ค่าเริ่มต้นถ้าไม่ใส่คำนำหน้า)
- `[player] …` — รันในนามผู้เล่น
- `<player>` — แทนด้วยชื่อผู้เล่น

> รางวัลทุกชิ้นต้องมี `material` **หรือ** `command` อย่างน้อยหนึ่งอย่าง ไม่งั้นจะถูกข้าม
> พร้อมเตือนใน console

## Duplicate & Spark Exchange

**Duplicate → Spark:** ของที่เคยได้แล้ว จ่าย **Spark** แทนการให้ซ้ำ

```yaml
duplicate:
  enabled: true
  give-spark: 5                                   # ค่า fallback ทุก rarity
  by-rarity: { COMMON: 2, RARE: 5, EPIC: 12, LEGENDARY: 30 }
  include-commands: true                          # นับรางวัลแบบ command ด้วย: ของซ้ำจ่าย Spark
                                                  # แทนการรัน command ซ้ำ
                                                  # (default false = เฉพาะรางวัลไอเทมที่เป็น duplicate ได้)
```

- ปกติเฉพาะรางวัล **ไอเทม** ที่เป็น duplicate ได้ (รางวัล command จะรัน command ทุกครั้ง) · ตั้ง
  `include-commands: true` เพื่อให้รางวัล command เข้าระบบ Spark ด้วย
- ยกเว้นรายชิ้นด้วย `duplicate: false` — รางวัลตัวนั้นจะ **ส่ง/รันทุกครั้ง** ไม่แปลงเป็น Spark (เช่นการจ่ายเงินที่
  ต้องจ่ายทุกครั้ง):

```yaml
rewards:
  - { name: "Money Bag", rarity: COMMON, commands: ["[console] eco give <player> 100"], duplicate: false }
```

**ร้าน Spark Exchange:** ใช้ Spark แลกของ · แต่ละชิ้น **อ้างอิงรางวัลเดิม** หรือ **นิยามในตัวเอง** ก็ได้
(เหมือน Token Shop):

```yaml
spark:
  enabled: true
  title: "&b&lSpark Exchange"
  items:
    - { reward: "Dragon Jade Spear", cost: 120 }              # อ้างอิงชื่อรางวัล
    - { name: "Trident", item: TRIDENT, amount: 1, cost: 30 }  # ไอเทม inline (ไม่ต้องมีรางวัลตรงกัน)
    - { name: "100 Coins", commands: ["[console] eco give <player> 100"], icon: SUNFLOWER, cost: 15 }
```

ฟิลด์ inline: `name` (จำเป็น), แล้ว `item` **หรือ** `commands` (อย่างน้อยหนึ่ง), + `amount`, `icon`,
`rarity` (default `COMMON`) · การจับคู่ชื่อของ `reward:` จะตัด `&`/`§` โค้ดสี ตัวพิมพ์เล็กใหญ่ และช่องว่างส่วนเกิน

## Custom items (ItemsAdder / Nexo / Oraxen)

**ไม่มี config block แยก** สำหรับพวกนี้ — ใช้ custom item ได้ทุกที่ที่ระบุไอเทม โดยเขียนเป็น
**`namespace:id`** แค่ติดตั้งปลั๊กอินนั้นไว้ (เช็คด้วย `/gacha doctor`)

| ตัวให้ไอเทม | รูปแบบ | ตัวอย่าง |
|---|---|---|
| ItemsAdder | `namespace:id` | `dragon_jade:dragon_jade_sword` |
| Nexo | `nexo:id` | `nexo:ruby` |
| Oraxen | `oraxen:id` | `oraxen:ruby` |
| Vanilla | ชื่อ material | `DIAMOND` |

ใช้ id พวกนี้ได้ใน **ทุก** ช่องไอเทม: `material` / `icon` ของรางวัล, `icon` / `display-item` ของตู้,
`cost.item`, และ `card-back-by-rarity` (ใน `config.yml`)

```yaml
my_crate:
  icon: "nexo:crate_icon"            # ไอคอนตู้จาก Nexo
  display-item: "oraxen:showcase"    # ไอเทมกลางจาก Oraxen
  cost: { type: ITEM, item: "nexo:coin", amount: 1 }   # จ่ายด้วยไอเทม Nexo
  rewards:
    - { name: "Ruby",  material: "nexo:ruby",  amount: 1, rarity: RARE }
    - { name: "Gem",   material: "oraxen:gem", amount: 1, rarity: EPIC }
    - name: "Aura Buff"              # รางวัลคำสั่ง โชว์ด้วยไอคอน Nexo
      icon: "nexo:aura_token"
      rarity: LEGENDARY
      commands: [ "[console] aura give <player> fire" ]
```

> ถ้า resolve id ไม่ได้ (ไม่มีปลั๊กอิน/id ผิด) รางวัลแบบไอเทมจะถูก **ข้าม** พร้อมเตือนใน console
> ส่วน **icon** ที่หาไม่เจอจะ fallback เป็น PAPER รัน `/gacha doctor` เพื่อเช็คว่าเจอ Nexo/Oraxen

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
- **ค่า global:** `pity:` ใน `config.yml` (`enabled` / `rarity` / `threshold`) ใช้กับทุกตู้ · `pity:` ในตู้นี้ override รายคีย์ —
  ถ้าไม่ใส่ `pity:` ในตู้เลย จะใช้ค่า global อัตโนมัติ

## x1 / x10 ทำงานอย่างไร

- **x1** เปิดหนึ่งใบ
- **x10** เปิดสิบใบ (จำกัดด้วย `settings.max-open`) แต่ละใบสุ่มแยกกัน
- ค่าเปิดคิดตามจำนวนใบ
- ดูว่าปุ่มหลังเปิดทำอะไรที่หน้า [หน้าผลรางวัล](result-panel.md)

---

ถัดไป: [Cursor UI →](cursor-ui.md)
