# ฟีเจอร์

อ้างอิงทุกฟีเจอร์การเล่นของ CradGacha ส่วนใหญ่ **ปิด/ปลอดภัยโดยค่าเริ่มต้น** เปิดเฉพาะที่ต้องการ
แก้ config แล้วสั่ง `/gacha reload` · แก้ resource pack (Nexo/BetterModel) แล้ว **restart + rejoin**

> หา **editor ในเกม, rate-up event, VIP luck, กุญแจตู้, สถิติ หรือ layout editor** อยู่ใช่ไหม? อยู่ที่หน้า [พรีเมียม](/th/premium)

## วิธีเปิดกาชา

| วิธี | ทำยังไง |
|------|---------|
| คำสั่ง | `/gacha` (เมนู) · `/gacha open <crate> [1\|10]` (เปิดตรง) |
| ประวัติ | `/gacha history` — ประวัติของที่ตัวเองได้ + pity ปัจจุบัน (ต้อง `reward-log.enabled: true`) |

### Clean stage (clear-area)
ตอนเปิดเมนู บล็อกรอบตัวผู้เล่นจะถูกทำให้เป็น **อากาศเฉพาะคนเปิดเห็น** (ส่งผ่าน packet — ไม่แก้โลกจริง คนอื่นไม่เห็น)
ทำให้เมนู/โมเดล 3D มีฉากหลังโล่งสะอาด โดยไม่ต้องเทเลพอร์ต · บล็อกจริงกลับมาเองตอนปิด ตั้งค่าใน `config.yml`:

```yaml
clear-area:
  enabled: true
  radius: 5     # จำนวนบล็อกรอบตัว (1-8); สูง = ฟองใหญ่ขึ้น
```

## Pity & การันตี
- **Hard pity** — การันตี `rarity` เมื่อครบ `threshold` ครั้ง
- pity **reset** เมื่อได้ rarity เป้า หรือของแรร์สุดในตู้
- **หลอด pity** — เรียง segment glyph บนเมนูหลัก (ดู [Cursor UI](/th/cursor-ui))
- **เสียงเด้ง** — เสียงไต่ระดับทุกครั้งที่หลอดเลื่อนขึ้น 1 ช่อง

```yaml
# crates.yml — ต่อตู้
pity: { enabled: true, rarity: LEGENDARY, threshold: 100 }
```
```yaml
# config.yml
pity:
  level-sound: "block.note_block.bell"   # ใส่ custom id ได้; "" = ปิด
  level-sound-volume: 1.0
```

## ฟีเจอร์ Retention

### Duplicate → Spark (ของซ้ำ → แต้ม)
ของที่เคยได้แล้ว จ่ายเป็น **Spark** แทนการให้ไอเทมซ้ำ (แปลงตอน roll = ไม่หาย/ไม่ดูป)
```yaml
# crates.yml
duplicate:
  enabled: true
  give-spark: 5
  by-rarity: { RARE: 10, EPIC: 25, LEGENDARY: 100 }
  include-commands: true   # นับรางวัลแบบ command ด้วย (ของซ้ำจ่าย Spark แทนการรัน command ซ้ำ)
```
ใส่ `duplicate: false` ที่รางวัลตัวไหนเพื่อยกเว้น (ส่ง/รัน command ทุกครั้ง ไม่แปลงเป็น Spark) · ดู
[ตู้กาชา → Duplicate & Spark](/th/crates#duplicate-amp-spark-exchange)

### Spark Exchange (ร้านแลก)
ใช้ Spark (จากของซ้ำ) แลกของที่เลือก — การันตีได้แน่ เป็นร้านแยกจาก Token Shop · แต่ละชิ้น **อ้างอิงรางวัลเดิม**
หรือ **นิยามในตัวเอง** ก็ได้ (เหมือน Token Shop):
```yaml
# crates.yml
spark:
  enabled: true
  items:
    - { reward: "Dragon Jade Spear", cost: 30 }               # อ้างอิงชื่อรางวัลในตู้นี้
    - { name: "Trident", item: TRIDENT, amount: 1, cost: 30 }  # ไอเทม inline (ไม่ต้องมีรางวัลตรงกัน)
    - { name: "100 Coins", commands: ["[console] eco give <player> 100"], icon: SUNFLOWER, cost: 15 }
```

### Token Shop
ร้านทั้งเซิร์ฟ ใช้สกุลเงิน token ซื้อไอเทม
```yaml
# config.yml
token-shop:
  enabled: true
  items:
    - { name: "Dragon Jade Spear", item: "nexo:dragon_jade_spear", amount: 1, cost: 200 }
```

### Wishlist
ผู้เล่นเลือกของ **rarity เป้า** ที่อยากได้ → สุ่มได้ rarity นั้นจะได้ของที่ wish (rarity ไม่เปลี่ยน → pity ยังถูก)
เป็นกลไกหลัก "ลุ้นแบบกำหนดเองได้"
```yaml
# crates.yml
wishlist: { enabled: true, max: 1, rarity: LEGENDARY }
```

### Pull Broadcast
เผยของ rarity ที่ `announce: true` → ประกาศทั้งเซิร์ฟ (hover ดูได้)
```yaml
# crates.yml
broadcast: { enabled: true }
```

## ประเภทค่าเปิด (cost)
`cost.type`: `NONE`, `ITEM`, `MONEY` (Vault), `TOKEN` (สกุลในตัว), `PLAYERPOINTS` (ปลั๊กอิน PlayerPoints)
```yaml
# crates.yml
cost: { type: PLAYERPOINTS, amount: 10 }
```

### ใช้หลายอย่างพร้อมกัน
ต้องมีหลายอย่างถึงเปิดได้ — เขียน `cost` เป็น **list** (ทั้งหมดหรือไม่จ่ายเลย; เปิดล้มเหลวคืนครบ):
```yaml
# crates.yml — ต้องมีเพชร 1 และเงิน 100 ถึงเปิดได้
cost:
  - { type: ITEM, item: DIAMOND, amount: 1 }
  - { type: MONEY, amount: 100 }
```
ตัวแรกเป็นหลัก ที่เหลือเป็นเสริม (หรือใช้ `cost: {…}` เดี่ยว แล้วเพิ่ม `cost.extra: [ … ]` ก็ได้ ผลเหมือนกัน)

### กุญแจตู้
ไอเทม `key` เปิดตู้ **ฟรีไม่เสีย cost** (1 ดอก/ครั้ง) ดู [พรีเมียม → กุญแจตู้](/th/premium#กุญแจตู้-keys)

## ปรับแต่งการ์ดรางวัล

### ขอบเรืองแสงตาม rarity
การ์ดที่พลิกเปิด **เรืองแสงสีตาม rarity** ทำงานเลย (ดึงจาก `color` ของ rarity) กำหนดสีเองหรือปิดได้ต่อ rarity:
```yaml
# config.yml — rarities.<R>.glow
LEGENDARY: { color: "&6&l", weight: 3.0, glow: "#FFAA00" }   # "#RRGGBB" | none
```
```yaml
# config.yml — เปิด/ปิดรวม
theme: { reveal-cards: { glow: true } }
```

### ขนาด/ข้อความ/title ต่อรางวัล
แต่ละรางวัลกำหนดขนาดบนการ์ด + ข้อความแชท / title ตอนได้ (`{reward}` / `{player}`) แก้ใน [editor พรีเมียม](/th/premium) หรือ `crates.yml`:
```yaml
# crates.yml — รางวัลหนึ่ง
- { name: "Trident", material: TRIDENT, rarity: LEGENDARY,
    scale: 1.2,                                   # ขนาดบนการ์ด (ไม่ใส่ = ค่า theme)
    message: "&6&lLEGENDARY! &fYou won {reward}!", # แชทหลังการ์ดพลิก
    title: "&6✦ {reward} ✦" }                      # title ตัวใหญ่กลางจอ
```
ข้อความแชท / broadcast จะส่ง **หลัง** การ์ดพลิกเสร็จ รางวัลจึงโชว์ก่อน

## Owner-only menu + ร่างจำลอง (body double)
UI ของเมนู (เคอร์เซอร์/การ์ด/พื้นหลัง และโมเดล open ของ ModelEngine) แสดง **เฉพาะคนเปิด** — คนอื่น (รวมคนที่เพิ่ง
join) มองไม่เห็น → เปิดจุดเดียวกันได้ไม่ชน · อัตโนมัติ ไม่ต้องตั้งค่า

เพราะเมนูทำให้ผู้เล่นเป็น spectator (คนอื่นเลยมองไม่เห็น) จึงมี **ร่างจำลอง (body double)** — โคลนแบบ packet
ที่มีชื่อ+สกินเหมือนเป๊ะ — ให้คนอื่นเห็น ยืนอยู่ตรงจุดที่เปิดเมนู มองจากข้างนอกเหมือนผู้เล่นยืนนิ่ง ร่างหายทันทีที่
ปิดเมนู · ปิด/เปิดด้วย `cursor.body-double` (default เปิด)

## Pull Suspense (เสียงล้วน)
เสียง drum-roll ไต่ระดับก่อนเผยของ rarity `announce` แล้วตบท้ายด้วย climax — **เสียงล้วน ไม่มี particle** (owner-only)
ทางเลือกเบาแทนโมเดล 3D ใช้ได้ทุก Java
```yaml
# config.yml
reveal:
  suspense:
    enabled: true                                # false = ไม่มี drum-roll (เสียง reward ปกติยังเล่น)
    sound: "block.note_block.bell"               # เสียงไต่ระดับ (custom resource-pack ได้); "" = เงียบ
    climax-sound: "ui.toast.challenge_complete"  # เสียงตบท้าย; "" = ไม่มี
    volume: 1.0
    speed: 3                                      # ticks ต่อจังหวะ (สูง = ช้า/ยาวขึ้น = ลุ้นขึ้น)
```

## โมเดล 3D ตอนเปิด (BetterModel / ModelEngine)
ตัวเลือกเสริม: เล่นโมเดลก่อนเปิดการ์ด — เล่น **ในเมนู spectator ที่ lock กล้องบนฉากสะอาด** (กล้องนิ่งหันไม่ได้,
เคลียร์บล็อกรอบตัวเป็นอากาศ client-side, ซ่อนพื้นหลังเหลือแต่โมเดล) เลือก animation ตาม **rarity ดีสุด** ที่ได้
เล่นครั้งเดียว สว่างเต็ม แล้วค่อยเปิดการ์ด

มี 2 provider (ตั้ง `provider` หรือปล่อย `AUTO`):

- **BetterModel** — โมเดลเป็น display owner-only: **เห็นเฉพาะคนเปิด** · ต้องรัน host เป็น Java 25
- **ModelEngine** — โมเดลเป็น entity จริง **ทุกคนตรงจุดนั้นเห็น** · การหันหน้าใช้การเล็งกล้อง (`spawn-yaw` +
  `yaw-offset`) แทนการหมุนโมเดล — ดู [การตั้งค่า → model](/th/configuration#model-ไม่บังคับ)

```yaml
# config.yml
model:
  enabled: true
  provider: AUTO             # AUTO / BETTERMODEL / MODELENGINE
  id: "open"                 # ชื่อโมเดลใน BetterModel/models หรือ ModelEngine (open.bbmodel -> "open")
  duration-ticks: 150        # BetterModel: safety net (เปิดเมื่อ animation จบ) · ModelEngine: ความยาวจริง
  distance: 2.0
  spawn-yaw: 0               # ModelEngine เท่านั้น — ดูการตั้งค่า
  yaw-offset: 180            # ModelEngine เท่านั้น — หมุนกล้องจนโมเดลหันหน้าหาผู้เล่น
  brightness: 15             # 0-15 (15 = สว่างสุด); -1 = ตามแสงโลก
  animation-by-rarity: true
  animations: { COMMON: common, RARE: rare, EPIC: epic, LEGENDARY: legendary }
```

**หมายเหตุ pack:** เมื่อใช้ BetterModel + Nexo คู่กัน Nexo เป็นคน serve pack ที่ merge แล้ว ใช้ `rebuild-bm-pack.bat`
(อยู่ข้าง jar เซิร์ฟ) หลังแก้ `.bbmodel`: `/bettermodel reload` → รัน bat → restart → rejoin
มันปรับความเร็ว animated texture (`frametime`) ให้ sprite sheet ไม่เร็วเกินด้วย
> Minecraft animated texture loop ตลอด (global, sync เวลาโลก) — "เล่นครั้งเดียวแล้วหยุด" ไม่ได้ ถ้าอยากได้แบบนั้น
> ทำเป็น **bone animation** + texture นิ่ง (model animation ค้างเฟรมสุดท้ายได้จริง)

## Custom sound
ทุกช่องเสียงรับ **custom sound id** (namespaced เช่น `crad_gacha:fanfare`) — ใส่ `.ogg` + entry ใน `sounds.json`
เข้า pack (ผ่าน Nexo) แล้วอ้าง event id · ช่องที่ตั้งได้: `rarities.<R>.sound`, `pity.level-sound`,
`reveal.suspense.sound` / `climax-sound`

## เมนูย่อยคัสตอมได้
เมนู Shop / Spark / Wishlist อ่านหน้าตาจาก `theme.yml` เหมือนปุ่มหลัก — ปุ่ม Back/title แบบ `glyph`/`item`/`text`
+ grid layout · ดู [Cursor UI](/th/cursor-ui)

## PlaceholderAPI
`%cradgacha_tokens%` · `%cradgacha_money%` · `%cradgacha_spark_<crate>%` ·
`%cradgacha_pity_<crate>%` / `_pity_required_<crate>%` / `_pity_remaining_<crate>%` ·
`%cradgacha_token_name%` / `_token_name_plural%`

## ความปลอดภัยรางวัล
roll เขียนลง `pending.yml` ก่อนเล่น animation + ส่งตอนเคลม (atomic — ไม่ดูป/ไม่หาย เมื่อ crash/หลุด/ตาย)
ESC/หลุดกลางเปิด จัดการด้วย recovery (`return_window` หรือ `auto_claim`)
