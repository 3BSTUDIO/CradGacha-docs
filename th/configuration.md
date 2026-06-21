---
title: การตั้งค่า
---

# การตั้งค่า

[🏠 หน้าแรก](index.html) · [🇬🇧 Read in English](../en/configuration.html) · [🌐 เลือกภาษา](../index.html)

**หน้าทั้งหมด:** [หน้าแรก](index.html) · [การติดตั้ง](installation.html) · [ตั้งค่าครั้งแรก](first-setup.html) · [คำสั่ง](commands.html) · [สิทธิ์](permissions.html) · **การตั้งค่า** · [ตู้กาชา](crates.html) · [Cursor UI](cursor-ui.html) · [หน้าผลรางวัล](result-panel.html) · [แก้ปัญหา](troubleshooting.html) · [คำถามที่พบบ่อย](faq.html) · [โน้ตนักพัฒนา](developer-notes.html)

---

การตั้งค่าแยกเป็น 4 ไฟล์ใน `plugins/CradGacha/` และจะถูก **รวมเข้าด้วยกันตอนรัน**
จึงแก้แยกไฟล์ได้ หลังแก้เสร็จให้รัน **`/gacha reload`**

| ไฟล์ | หน้าที่ |
|---|---|
| `config.yml` | พฤติกรรมรวม พื้นหลัง แบนเนอร์ showcase เรต คูลดาวน์ |
| `cursor.yml` | ความรู้สึกของเคอร์เซอร์/กล้อง |
| `crates.yml` | ตู้ของคุณ — ดูหน้า [ตู้กาชา](crates.html) |
| `theme.yml` | เลย์เอาต์เมนู — ดู [Cursor UI](cursor-ui.html) |

---

## config.yml

### settings

```yaml
settings:
  max-open: 10                  # จำนวนใบสูงสุดต่อการเปิด (Open All ไม่เกินค่านี้)
  reopen-panel: true            # โชว์แผง "เปิดอีกครั้ง" หลังเปิดเสร็จ
  result-title: "&8Open again?" # ชื่อสำรองของแผงนั้น
  require-on-ground: true       # ต้องยืนบนพื้นจึงใช้ /gacha open ได้ (กันดูป)
  require-inventory-space: true # ถ้าช่องว่างไม่พอ จะเปิดไม่ได้ (กันของหาย)
```

- **`max-open`** — ขนาดการเปิดสูงสุด `Open x10` และ `Open All` ถูกจำกัดที่นี่
- **`require-on-ground`** — มีผลกับ **คำสั่ง `/gacha open`** เท่านั้น การเปิดจากเมนูจะข้ามเสมอ
  (ผู้เล่นเป็น spectator ชั่วคราว) ตั้ง `false` เพื่อให้เปิดตอนบินได้
- **`require-inventory-space`** — ถ้ากระเป๋าเกือบเต็มจะเปิดไม่ได้ เพื่อกันรางวัลหาย ตั้ง `false` เพื่อปิด

### background

ฉากหลังของเมนู ใช้ได้ทั้งรูปเดี่ยว รูปแบบ tile หรือแผงสีทึบ

```yaml
background:
  show: true
  item: "crates_gacha:menu_background"   # รูปเดี่ยว (ใช้เมื่อ tiles.enabled = false)
  panel-material: BLACK_CONCRETE         # แผงหลัง (concrete = ทึบ, glass = โปร่ง)
  panel-width: 11.0
  panel-height: 11.0
  distance: 2.4                          # ระยะหน้าผู้เล่น (น้อย = ใกล้/ใหญ่)
  y: -0.1                                # เลื่อนแนวตั้ง (มาก = ขึ้น)
  glyph: ""
  scale: 1.0
  tiles:                                 # แยกรูปใหญ่เป็น grid หลายชิ้น
    enabled: true
    cols: 3
    rows: 2
    tile-width: 2.4
    tile-height: 2.4
    items:                               # เรียง row-major: บนซ้าย, บนกลาง, บนขวา, ล่างซ้าย, ...
      - "crates_gacha:bg_1"
      - "crates_gacha:bg_2"
      - "crates_gacha:bg_3"
      - "crates_gacha:bg_4"
      - "crates_gacha:bg_5"
      - "crates_gacha:bg_6"
```

> **ทำไมต้อง tile?** Minecraft จำกัดรูปเดี่ยวที่ 256×256 px พื้นหลังใหญ่จึงต้องแบ่งเป็นหลายชิ้นเรียง grid

### showcase

แบนเนอร์กลางเมนู (ทำจาก glyph 2 ชิ้น)

```yaml
showcase:
  x: 0.45          # ตำแหน่งซ้าย-ขวา (มาก = ขวา)
  y: 0.13          # ตำแหน่งบน-ล่าง (มาก = ขึ้น)
  scale: 2.1       # ขนาดรวม
  seam-offset: -1  # ระยะห่าง 2 ชิ้น (ลบ = ดึงเข้า, บวก = ดันออก)
```

ขนาด/ความสูงต่อชิ้นอยู่ในไฟล์ glyph ของ ItemsAdder ไม่ใช่ที่นี่

### world-reveal

ค่าของการเปิดการ์ดแบบ "การ์ดในโลก" (ใช้เฉพาะตอนไม่มี packetevents) เซิร์ฟส่วนใหญ่ใช้ cursor reveal และไม่ต้องแตะ

```yaml
world-reveal:
  distance: 2.5
  spacing: 0.55
  card-scale: 0.6
  timeout-seconds: 30
  lock-player: true
  private-view: true
  face-player: false
  hide-hand: true
```

### card-back-by-rarity

รูปการ์ดคว่ำ เลือกตามเรตของรางวัลที่ซ่อนอยู่

```yaml
card-back-by-rarity:
  COMMON: "crates_gacha:card_back_c"
  RARE: "crates_gacha:card_back_r"
  EPIC: "crates_gacha:card_back_e"
  LEGENDARY: "crates_gacha:card_back_l"
```

### model (ไม่บังคับ)

อนิเมชันโมเดล 3D ก่อนการ์ดขึ้น (ต้องมี BetterModel หรือ ModelEngine)

```yaml
model:
  enabled: false
  provider: AUTO          # AUTO / BETTERMODEL / MODELENGINE
  id: "gacha_machine"
  animation: "open"
  duration-ticks: 40
  distance: 2.0
```

### cooldown

```yaml
cooldown:
  enabled: false
  seconds: 5
```

### rarities

ใช้ร่วมทุกตู้ **weight** กำหนดความถี่ที่แต่ละเรตออก

```yaml
rarities:
  COMMON:    { color: "&f",   weight: 60.0, sound: "entity.item.pickup",            particle: CRIT,             announce: false }
  RARE:      { color: "&9",   weight: 25.0, sound: "entity.experience_orb.pickup",  particle: ENCHANT,          announce: false }
  EPIC:      { color: "&5",   weight: 12.0, sound: "block.note_block.pling",        particle: WITCH,            announce: true }
  LEGENDARY: { color: "&6&l", weight: 3.0,  sound: "ui.toast.challenge_complete",   particle: TOTEM_OF_UNDYING, announce: true }
```

- **`weight`** — โอกาสเชิงเปรียบเทียบ ด้วยค่าด้านบน COMMON ออกราว 60/100 (นับเฉพาะเรตที่มีรางวัลในตู้นั้น)
- **`announce: true`** — โชว์ title ใหญ่กลางจอเมื่อเผยเรตนั้น
- **`color`** — ใช้รหัสสี `&`

---

## cursor.yml (ค่าสำคัญ)

ความรู้สึกของเคอร์เซอร์เสมือนและกล้อง ดูแนวคิดที่ [Cursor UI](cursor-ui.html)

```yaml
mode: spectator        # spectator = วิวแช่นิ่ง (ดีสุด) ต้องมี packetevents
virtual-cursor: true
sensitivity-x: 0.3     # มาก = หันหัวนิดเดียวเคอร์เซอร์ไปไกล
sensitivity-y: 0.22
bounds:                # ระยะที่เคอร์เซอร์ไปได้จากจุดกลาง
  min-x: -2.8
  max-x: 2.8
  min-y: -1.6
  max-y: 1.8
smoothing: 0.7         # ความลื่นเคอร์เซอร์ (1.0 = ดิบ, 0.6–0.8 = ลื่น)
crosshair-item: "crates_gacha:ui_cursor"   # รูปเคอร์เซอร์
crosshair-scale: 0.2
hide-hand: true
```

- ถ้าเคอร์เซอร์ **ไปไม่ถึงขอบจอ** ให้เพิ่ม `sensitivity-x` / ขยาย `bounds`
- นี่เป็นข้อจำกัดที่รู้กันของ cursor ฝั่งเซิร์ฟ — ดู [แก้ปัญหา](troubleshooting.html)

> **ความสว่าง / "โมเดลมืด":** display ทุกตัวในเมนูถูกตั้งความสว่างเต็ม (`15/15`) ในโค้ดอยู่แล้ว
> ปุ่มและรางวัลจึงไม่มืดตามแสงในโลก — ไม่ต้องตั้งค่าเอง เป็นอัตโนมัติ

---

ถัดไป: [ตู้กาชา →](crates.html)
