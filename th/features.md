# ฟีเจอร์

อ้างอิงทุกฟีเจอร์การเล่นของ CradGacha ส่วนใหญ่ **ปิด/ปลอดภัยโดยค่าเริ่มต้น** เปิดเฉพาะที่ต้องการ
แก้ config แล้วสั่ง `/gacha reload` · แก้ resource pack (Nexo/BetterModel) แล้ว **restart + rejoin**

## วิธีเปิดกาชา

| วิธี | ทำยังไง |
|------|---------|
| คำสั่ง | `/gacha` (เมนู) · `/gacha open <crate> [1\|10]` (เปิดตรง) |
| Crate Station | วางโมเดล/บล็อกในโลก แล้ว **คลิก** หรือ **เดินเข้าใกล้** |
| Warp | `/gacha` วาร์ปไปจุดที่ตั้ง แล้วกลับจุดเดิมเมื่อปิดเมนู |

### Crate Stations (จุดวางตู้)
ผูกจุดในโลกกับตู้ — โหมด: `proximity` (เดินเข้าระยะ `radius`), `click` (คลิกขวา), `both`
แนะนำ proximity เพราะเปิดตอนห่างไม่กี่บล็อก → โมเดล 3D อยู่**หลัง** UI ไม่บังปุ่ม

```
/gacha station add <crate> [radius] [click|proximity|both]   # มองที่บล็อกก่อน
/gacha station remove                                        # มองที่บล็อก
/gacha station list
```
```yaml
# config.yml
stations:
  default-mode: proximity     # proximity | click | both
  default-radius: 3.0         # >= 2.5 เพื่อให้โมเดลอยู่หลัง UI
  proximity-check-ticks: 10
```

### Warp ไปจุดกาชา
`/gacha setwarp` ตั้งจุด → `/gacha` วาร์ปไปที่นั่น แล้วกลับจุดเดิมเมื่อปิดเมนู (กัน disconnect — กลับให้ตอน join)
`/gacha delwarp` ยกเลิก · รวมกับ **owner-only menu** ทำให้หลายคนวาร์ปจุดเดียวกันได้โดยไม่เห็น UI ของกันและกัน

## Pity & การันตี
- **Hard pity** — การันตี `rarity` เมื่อครบ `threshold` ครั้ง
- **Soft pity** — ตั้งแต่ `soft-start` เรทบังคับ rarity ค่อย ๆ เพิ่มจนถึง threshold
- pity **reset** เมื่อได้ rarity เป้า หรือของแรร์สุดในตู้
- **หลอด pity** — เรียง segment glyph บนเมนูหลัก (ดู [Cursor UI](/th/cursor-ui))
- **เสียงเด้ง** — เสียงไต่ระดับทุกครั้งที่หลอดเลื่อนขึ้น 1 ช่อง

```yaml
# crates.yml — ต่อตู้
pity: { enabled: true, rarity: LEGENDARY, threshold: 100, soft-start: 80 }
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
duplicate: { enabled: true, give-spark: 5, by-rarity: { RARE: 10, EPIC: 25, LEGENDARY: 100 } }
```

### Spark Exchange (ร้านแลก)
ใช้ Spark (จากของซ้ำ) แลกของที่เลือก — การันตีได้แน่ เป็นร้านแยกจาก Token Shop
```yaml
# crates.yml
spark:
  enabled: true
  items:
    - { reward: "Dragon Jade Spear", cost: 30 }   # reward = ชื่อรางวัลในตู้นี้
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
แทน Featured/50-50 เดิม
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

## Owner-only menu
UI ของเมนู (เคอร์เซอร์/การ์ด/พื้นหลัง) แสดง **เฉพาะคนเปิด** — คนอื่น (รวมคนที่เพิ่ง join) มองไม่เห็น
→ เปิดจุดเดียวกันได้ไม่ชน · อัตโนมัติ ไม่ต้องตั้งค่า

## Pull Suspense (แสง + เสียง)
เสียงไต่ระดับ + sparkle ก่อนเผยของ rarity `announce` (owner-only) — ทางเลือกเบาแทนโมเดล 3D ใช้ได้ทุก Java
```yaml
# config.yml
reveal:
  suspense:
    enabled: true
    sound: "block.note_block.bell"               # เสียงไต่ระดับ (custom ได้); "" = เงียบ
    climax-sound: "entity.firework_rocket.blast"
    volume: 0.7
```

## โมเดล 3D ตอนเปิด (BetterModel)
ตัวเลือกเสริม: เล่นโมเดลหน้าผู้เล่นก่อนเปิดการ์ด — เลือก animation ตาม **rarity ดีสุด** ที่ได้ เล่นครั้งเดียว
(ค้างเฟรมสุดท้าย) + ผู้เล่นถูก freeze + โมเดลสว่างเต็ม owner-only · **ต้องรัน host เป็น Java 25**

```yaml
# config.yml
model:
  enabled: true
  id: "open"                 # ชื่อโมเดลใน BetterModel/models (open.bbmodel -> "open")
  duration-ticks: 150        # safety net; การ์ดเปิดเมื่อ animation จบจริง
  distance: 2.0
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
ทุกช่องเสียงรับ **custom sound id** (namespaced เช่น `crates_gacha:fanfare`) — ใส่ `.ogg` + entry ใน `sounds.json`
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
