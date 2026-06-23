---
title: การตั้งค่า
---

# การตั้งค่า



---

การตั้งค่าแยกเป็น 4 ไฟล์ใน `plugins/CradGacha/` และจะถูก **รวมเข้าด้วยกันตอนรัน**
จึงแก้แยกไฟล์ได้ หลังแก้เสร็จให้รัน **`/gacha reload`**

| ไฟล์ | หน้าที่ |
|---|---|
| `config.yml` | พฤติกรรมรวม พื้นหลัง แบนเนอร์ showcase เรต คูลดาวน์ |
| `cursor.yml` | ความรู้สึกของเคอร์เซอร์/กล้อง |
| `crates.yml` | ตู้ของคุณ — ดูหน้า [ตู้กาชา](crates.md) |
| `theme.yml` | เลย์เอาต์เมนู — ดู [Cursor UI](cursor-ui.md) |
| `language.yml` | ข้อความทั้งหมด (แปลภาษาได้) — ดูด้านล่าง |

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

### currency (ตั้งชื่อ token เอง)

เปลี่ยนชื่อสกุลเงิน **token** ทุกที่ที่แสดง (ยอดคงเหลือ, ข้อความ cost, history, placeholder)

```yaml
currency:
  token-name: "Token"          # เอกพจน์ — เช่น Coin / Gem / Crystal
  token-name-plural: "Tokens"  # พหูพจน์ (ไม่ใส่ = token-name + "s")
```

### recovery (หลุด/ESC ระหว่างเปิด)

จัดการกรณีผู้เล่นปิดหน้าเปิดการ์ดหรือหลุดก่อน claim **รางวัลไม่หายทั้ง 2 โหมด** (`pending.yml` คือแหล่งความจริง)
อันนี้แค่เลือกว่าจะ *กลับมาเปิดต่อ* หรือ *แจกทันที*

```yaml
recovery:
  mode: return_window          # return_window | auto_claim
  timeout-seconds: 30
```

- **`return_window`** (ค่าเริ่มต้น) — เก็บรางวัลที่สุ่มไว้ `timeout-seconds` วินาที พิมพ์ `/gacha`
  (หรือเข้าเกมใหม่แล้ว `/gacha`) ในเวลา = **กลับไปเปิดต่อชุดเดิม** หมดเวลา = แจกอัตโนมัติ
- **`auto_claim`** — แจกรางวัลทันทีเมื่อปิดหน้าทั้งที่ยังเปิดไม่จบ

### history (ประวัติการเปิด)

```yaml
history:
  enabled: true
  max-records-per-player: 50   # เกินจำนวนนี้ตัดอันเก่าทิ้ง (กัน history.yml โตไม่จำกัด)
  show-per-page: 8             # จำนวนแถวต่อหน้า (ที่เหลือแบ่งหน้า)
```

เพิ่มปุ่ม `action: open_history` ใน `theme.yml` เพื่อเปิดหน้าประวัติในเกม หน้านี้แบ่งหน้าด้วยปุ่ม Prev/Next
ที่ custom ได้ใน `theme.history-buttons.{prev,back,next}` (แต่ละปุ่มใช้ `text` / `glyph` / `item` + `x` / `y` / `scale` / `hitbox`)

> **ไฟล์ข้อมูล:** ไฟล์ที่เก็บข้อมูล (`data.yml`, `tokens.yml`, `pending.yml`, `history.yml`,
> `gamemode-recovery.yml`) ย้ายไปอยู่ในโฟลเดอร์ `plugins/CradGacha/data/` แล้ว — ของเดิมจะถูกย้ายให้อัตโนมัติตอนเปิดเซิร์ฟครั้งแรก

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

ความรู้สึกของเคอร์เซอร์เสมือนและกล้อง ดูแนวคิดที่ [Cursor UI](cursor-ui.md)

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
- นี่เป็นข้อจำกัดที่รู้กันของ cursor ฝั่งเซิร์ฟ — ดู [แก้ปัญหา](troubleshooting.md)

> **ความสว่าง / "โมเดลมืด":** display ทุกตัวในเมนูถูกตั้งความสว่างเต็ม (`15/15`) ในโค้ดอยู่แล้ว
> ปุ่มและรางวัลจึงไม่มืดตามแสงในโลก — ไม่ต้องตั้งค่าเอง เป็นอัตโนมัติ

---

## language.yml (ข้อความทั้งหมด)

ข้อความระบบทุกอย่างอยู่ใน `language.yml` แปล/เปลี่ยนสีได้โดยไม่แตะโค้ด ถ้าคีย์ไหนหาย จะ fallback
เป็นค่า default ภาษาอังกฤษ (ไฟล์เก่าไม่พัง) รองรับสี `&` และ `{placeholder}` เช่น
`{cost} {balance} {amount} {seconds} {crate} {reward} {token_name} {token_name_plural}`

```yaml
messages:
  cost:
    not-enough-token: "&cNot enough {token_name_plural}! Cost: &e{cost} &7(you have {balance})"
  recovery:
    returned: "&aWelcome back! Resuming your card reveal."
  pity:
    label: "&dPity: &f{pity_current}&7/&f{pity_required}"
  # ... ดูคีย์ทั้งหมดในไฟล์
```

## placeholder ในเมนู (text element ใน theme.yml)

element แบบ `type: text` ใน `theme.yml` ใช้ได้ (แทนค่าตามตู้ที่เลือก/ผู้เล่น):

| placeholder | ความหมาย |
|---|---|
| `{cost}` / `{cost-text}` | ค่าเปิด (ตัวเลขล้วน / ข้อความเต็ม) |
| `{money}` / `{token}` | ยอดคงเหลือของผู้เล่น |
| `{token_name}` / `{token_name_plural}` | ชื่อสกุลเงินที่ตั้งเอง |
| `{pity}` | ข้อความ pity จัดรูปแล้ว (`Pity: 12/90`) |
| `{pity_current}` / `{pity_required}` | ตัวนับ / เพดาน pity ของตู้ที่เลือก |
| `{crate}` / `{crate_name}` / `{crate_id}` | ชื่อ / id ตู้ที่เลือก |

### ยอดคงเหลือ (token / money)

หน้าเมนูหลักและหน้าเปิดการ์ดใช้ระบบยอดคงเหลือ**เดียวกัน** — 1 บรรทัดต่อสกุลเงิน + พื้นหลัง (bg pill) ตั้งเหมือนกัน:

- เมนูหลัก → `theme.balance`
- หน้าเปิดการ์ด → `theme.reveal-balance`

```yaml
theme:
  balance:
    show: true
    money: { show: true, x: 0.7, y: 1.32, scale: 0.35, format: "&f{money}", bg: g_bg_money, bg-scale: 0.3 }
    token: { show: true, x: 1.9, y: 1.32, scale: 0.35, format: "&f{token}", bg: g_bg_token, bg-scale: 0.3 }
```

แต่ละสกุลเงิน: `show`, `x`, `y`, `scale`, `format` (ใช้ `{money}`/`{token}`/`{token_name}` + สี `&`)
และพื้นหลัง — `bg` (ชื่อ glyph หรือ `ns:id` สำหรับ item; `bg: ""` = ปิด), `bg-x`, `bg-y`, `bg-scale`

### ขนาด/ระยะห่างการ์ดหน้าเปิด

```yaml
theme:
  reveal-cards:
    y: 0.7             # ความสูงฐานของกริด
    scale: 0.85        # ขนาดการ์ดแถวเดียว (1-5 ใบ)
    scale-multi: 0.72  # ขนาดการ์ดแบบกริด (6-10 ใบ)
    spacing-x: 0.98    # ระยะห่างแนวนอน
    spacing-y: 1.1     # ระยะห่างแนวตั้ง
```

---

ถัดไป: [ตู้กาชา →](crates.md)
