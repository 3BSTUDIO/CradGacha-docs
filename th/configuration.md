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
  item: "crad_gacha:menu_background"   # รูปเดี่ยว (ใช้เมื่อ tiles.enabled = false)
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
      - "crad_gacha:bg_1"
      - "crad_gacha:bg_2"
      - "crad_gacha:bg_3"
      - "crad_gacha:bg_4"
      - "crad_gacha:bg_5"
      - "crad_gacha:bg_6"
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
  COMMON: "crad_gacha:card_back_c"
  RARE: "crad_gacha:card_back_r"
  EPIC: "crad_gacha:card_back_e"
  LEGENDARY: "crad_gacha:card_back_l"
```

### model (ไม่บังคับ)

อนิเมชันโมเดล 3D ก่อนการ์ดขึ้น · ใช้ได้กับ **BetterModel** (display owner-only คนอื่นไม่เห็น) หรือ **ModelEngine**
(โมเดลจริง คนอื่นเห็นด้วยตรงจุดนั้น) · เล่นในเมนู spectator ที่ lock กล้องบนฉากสะอาด (กล้องนิ่ง, เคลียร์บล็อกเป็นอากาศ,
ซ่อนพื้นหลัง) แล้วค่อยเปิดการ์ด · เลือก animation ตาม rarity ดีสุดที่ได้

```yaml
model:
  enabled: false
  provider: AUTO          # AUTO / BETTERMODEL / MODELENGINE (AUTO เลือก BetterModel ก่อนถ้ามี)
  id: "open"
  duration-ticks: 40
  distance: 2.0
  spawn-yaw: 0            # ModelEngine เท่านั้น: ทิศ spawn คงที่ของโมเดล (bind pose = ไม่หมุนตอนเกิด)
  yaw-offset: 180         # ModelEngine เท่านั้น: หมุน "กล้อง" รอบโมเดลจนหันหน้ามาหาผู้เล่น (0/90/180/270)
  brightness: 15          # 0-15 (15 = สว่างสุด); -1 = ตามแสงโลก
  animation-by-rarity: true
  animations: { COMMON: common, RARE: rare, EPIC: epic, LEGENDARY: legendary }
  animation: "open"       # ใช้เมื่อ animation-by-rarity: false
```

::: tip การหันหน้าโมเดล (ModelEngine)
แทนที่จะหมุนโมเดลให้หันหาผู้เล่น (ModelEngine จะ lerp การหมุนตอนเกิด = อาการ "หมุน 2 step") โมเดลจะ spawn ที่
`spawn-yaw` คงที่ แล้วเล็ง **กล้อง** ไปหาแทน · ถ้าโมเดลหันผิดด้าน แก้ `yaw-offset` (ลอง `0`/`90`/`270`) แล้ว
`/gacha reload` — โมเดลจะนิ่งไม่มีอนิเมชันหมุน
:::

### clear-area (ฉากสะอาด)

ทำให้บล็อกรอบตัวเป็น **อากาศเฉพาะคนเปิดเห็น** (packet — ไม่แก้โลกจริง คนอื่นไม่เห็น) ให้เมนู/โมเดลมีฉากหลังโล่ง
โดยไม่ต้องเทเลพอร์ต · คืนบล็อกจริงตอนปิด

```yaml
clear-area:
  enabled: true
  radius: 5               # บล็อกรอบตัว (1-8); สูง = ฟองใหญ่ขึ้น
  forward-distance: 16    # เคลียร์เป็น "กรวย" ตามแนวกล้องไปข้างหน้าอีกกี่บล็อก (0-32; 0 = ปิด)
                          # — กันบล็อกไกลโผล่ทะลุส่วนโปร่งใสของพื้นหลังเมนู
  hide-furniture: true    # ซ่อน armor-stand furniture รอบตัว (Nexo/ItemsAdder) ด้วย
```

### reveal.suspense (เสียงล้วน)

เสียง drum-roll ไต่ระดับ + climax ก่อนเผยของ rarity `announce` (owner-only) — **เสียงล้วน ไม่มี particle**

```yaml
reveal:
  suspense:
    enabled: true
    sound: "block.note_block.bell"               # เสียงไต่ระดับ (custom ได้); "" = เงียบ
    climax-sound: "ui.toast.challenge_complete"   # เสียงตบท้าย; "" = ไม่มี
    volume: 1.0
    speed: 3                                       # ticks ต่อจังหวะ (สูง = ช้า/ยาวขึ้น)
```

### cooldown

```yaml
cooldown:
  enabled: false
  seconds: 5
```

### currency (ตั้งชื่อ token เอง)

เปลี่ยนชื่อสกุลเงิน **token** ทุกที่ที่แสดง (ยอดคงเหลือ, ข้อความ cost, placeholder)

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

> **ไฟล์ข้อมูล:** ไฟล์ที่เก็บข้อมูล (`data.yml`, `tokens.yml`, `pending.yml`, `gamemode-recovery.yml`)
> ย้ายไปอยู่ในโฟลเดอร์ `plugins/CradGacha/data/` แล้ว — ของเดิมจะถูกย้ายให้อัตโนมัติตอนเปิดเซิร์ฟครั้งแรก

### rarities

ใช้ร่วมทุกตู้ **weight** กำหนดความถี่ที่แต่ละเรตออก

```yaml
rarities:
  COMMON:    { color: "&f",   weight: 60.0, sound: "entity.experience_orb.pickup",  particle: CRIT,             announce: false }
  RARE:      { color: "&9",   weight: 25.0, sound: "entity.player.levelup",         particle: ENCHANT,          announce: false }
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
crosshair-item: "nexo:ui_cursor"   # รูปเคอร์เซอร์ (ns:id) — หรือ "" เพื่อใช้ glyph crosshair
crosshair-scale: 0.2
hide-hand: true
body-double: true      # แสดง "ร่างจำลอง" ของผู้เล่นให้คนอื่นเห็นระหว่างอยู่ในเมนู (ดูด้านล่าง)
```

**`body-double`** — ระหว่างอยู่ในเมนูผู้เล่นเป็น spectator = คนอื่นมองไม่เห็น เปิดค่านี้คนอื่นจะเห็น **ร่างจำลองแบบ
packet** (ชื่อ+สกินเหมือนเป๊ะ) ยืนอยู่ตรงจุดที่เปิดเมนูแทน — มองจากข้างนอกเหมือนผู้เล่นยืนนิ่ง · ไม่มี entity จริง
ในเซิร์ฟเวอร์ ร่างหายทันทีที่ปิดเมนู · ตั้ง `false` เพื่อให้ผู้เล่นหายไปเฉยๆ

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
    reward-scale: 0.4  # ขนาดรางวัลที่เผย เป็นตัวคูณของขนาดการ์ด (0.4 = 40% ของการ์ด)
    reward-y: -0.3     # ตำแหน่งแนวตั้งของรางวัลบนการ์ด (ติดลบ = ต่ำลง)
```

`reward-scale` / `reward-y` คุม **รางวัลที่เผย** บนการ์ดที่พลิกแล้ว (โมเดลรางวัลมักใหญ่ ค่า default เลยย่อ+จัดกลาง
ให้) · เพิ่ม `reward-scale` เพื่อให้รางวัลใหญ่ขึ้น

### พื้นหลังแบบ tiles

เมื่อแยกพื้นหลังเมนูเป็นกริด (`theme.background.tiles.enabled: true`):

```yaml
theme:
  background:
    tiles:
      enabled: true
      cols: 3
      rows: 2
      tile-width: 2.4
      tile-height: 2.4
      overlap: 1.0      # ขยายเฉพาะรูป tile (spacing เท่าเดิม) เช่น 1.06
      items: [ "nexo:bg_1", "nexo:bg_2", "nexo:bg_3", "nexo:bg_4", "nexo:bg_5", "nexo:bg_6" ]
```

`overlap` แก้ **เส้นดำระหว่าง tile** ที่เกิดกับผู้เล่นบน **client เก่าผ่าน ViaVersion/ViaBackwards** (sprite item-display
ของเขา render เล็กกว่านิดหน่อย) · เริ่มที่ `1.06` · ผู้เล่นที่ client ตรงเวอร์ชันไม่ได้รับผลกระทบ

---

ถัดไป: [ตู้กาชา →](crates.md)
