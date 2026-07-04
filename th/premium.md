# พรีเมียม

CradGacha มี **2 jar แยกกัน** ที่ build จากโปรเจกต์เดียวกัน:

| เวอร์ชัน | Jar | ได้อะไร |
|----------|-----|---------|
| **ฟรี** | `CradGacha-x.jar` | เมนู cursor เต็มรูปแบบ, เปิดการ์ด, pity, duplicate→spark, wishlist, token shop, cost ทุกแบบ, ขอบเรืองแสงตาม rarity, ขนาด/ข้อความ/title รายรางวัล, ประวัติ, PlaceholderAPI, developer API — ได้สูงสุด **3 ตู้** |
| **พรีเมียม** | `CradGacha-Premium-x.jar` | ทุกอย่างของฟรี **บวก** editor ในเกม, สร้างตู้, rate-up event, VIP luck, กุญแจ, หน้าสถิติ, layout editor — และ **ตู้ไม่จำกัด** |

ฟีเจอร์พรีเมียมอยู่ใน source set แยก jar ฟรีจึงไม่มีโค้ดพรีเมียมอยู่จริง แค่เอา jar พรีเมียมวางทับ (แทน jar ฟรี) แล้วรีสตาร์ท คำสั่งพรีเมียมก็ทำงานเอง ไม่ต้องตั้งค่าเพิ่ม

> **ไม่ใช่แค่ flag** — ถ้าคำสั่งด้านล่างเขียนว่า *"พรีเมียม"* jar ฟรีจะขึ้นข้อความชวนอัปเกรดแล้วไม่ทำอะไร

---

## Reward Editor ในเกม — `/gacha edit <ตู้>`

แก้ไขรางวัลของตู้ในเกมทั้งหมดบนแผง cursor — ไม่ต้องแตะ YAML ไม่ต้อง reload

- **รายการรางวัล** — โชว์เป็นกริดไอคอน เอาเมาส์ชี้ดูชื่อ+lore, คลิกเพื่อแก้
- **ต่อรางวัล (หน้า 1):** ชื่อ, ไอเทม, จำนวน, rarity, ยกเว้น duplicate→spark, commands (เพิ่ม/ล้าง)
- **ต่อรางวัล (หน้า 2):** **ขนาด** ตอนโชว์บนการ์ด, **ข้อความ** ตอนได้ (แชท) และ **title** (ตัวใหญ่กลางจอ) รองรับ `{reward}` / `{player}`
- **ตั้งจากไอเทมในมือ** — คลิก preview เพื่อคัดลอกไอเทมที่ถืออยู่ (ตรวจ ItemsAdder / Nexo / Oraxen / MMOItems / vanilla ให้อัตโนมัติ)
- **[ + Add ]** เพิ่มรางวัล, **[ Delete Reward ]**, **[ 🎲 Test 1000 ]** (ดู Simulator), **[ ⚙ Settings ]**
- **Submit & Save** เขียน `crates.yml` แล้ว reload พิมพ์ข้อความใช้ **Dialog API** บน 1.21.6+ (ช่องพิมพ์จริง) และ fallback เป็นแชทบนเวอร์ชันเก่า

## Crate Settings editor

เข้าจากปุ่ม **[ ⚙ Settings ]** — แผง 4 หน้า ครอบคลุมเกือบทุก key ของตู้:

1. **General / Cost / Pity** — ชื่อ, เปิด/ปิด, cost type/amount/item, pity เปิด-ปิด + rarity + threshold, display item
2. **Drops / Extras** — broadcast, duplicate→spark + จำนวน, wishlist (เปิด/max/rarity), spark shop + title + หน้าย่อยรายการ
3. **Rate-Up Event** — วันเริ่ม/จบ + ตัวคูณ weight ต่อ rarity
4. **Keys** — ไอเทมกุญแจ + ปุ่มแจกกุญแจให้ตัวเองไว้เทส

เขียนกลับเฉพาะ key ที่แก้จริง ค่าที่จูนมือไว้ (ตำแหน่ง banner/ปุ่ม ฯลฯ) จึงไม่หาย

## สร้างตู้ — `/gacha create <id>`

สร้างตู้ใหม่จากศูนย์ในเกม 100% — เขียน skeleton (ปิดไว้) ลง `crates.yml`, reload, แล้วเปิด editor ให้ ใส่รางวัล/ตั้ง cost & pity/เปิดใช้งานใน Settings เสร็จ

## Simulator สุ่ม 1,000 ครั้ง

ปุ่ม **[ 🎲 Test 1000 ]** ในeditor สุ่มตู้ (ค่าที่ save ล่าสุด) 1,000 ครั้ง โชว์ % ที่ออกจริงต่อ rarity เทียบกับ % ที่ตั้ง — เช็คเร็วๆ ว่า weight รู้สึกถูกไหม (และ rate-up บูสต์ตรงจุดไหม)

---

## Rate-Up Event

ตั้งช่วง "banner" ต่อตู้ที่บูสต์ weight ของ rarity พร้อมนับถอยหลังบนเมนู

```yaml
# crates.yml — ต่อตู้
event:
  start: "2026-07-10 18:00"   # ไม่ใส่ทั้งคู่ = active ตลอด
  end:   "2026-07-17 23:59"
  rate-up: { LEGENDARY: 2.0, EPIC: 1.5 }   # ตัวคูณ weight ระหว่าง active
```

- หน้าเรท **และ** simulator โชว์ % ที่บูสต์แล้วอัตโนมัติ
- บรรทัดนับถอยหลัง (`⚡ RATE UP — ends in 2d 5h`) โผล่บนเมนู; ปรับตำแหน่ง/รูปแบบที่ `theme.event-line` หรือใส่ `{event}` ใน text element
- แก้ในเกมได้ที่ Settings editor (หน้า 3)

## VIP Luck

บูสต์เรทตาม permission ทุกครั้งที่สุ่ม — เหมาะขายคู่กับ rank

```yaml
# config.yml
luck:
  enabled: true
  permission-prefix: "cradgacha.luck."
  rarities: [EPIC, LEGENDARY]     # rarity ที่ตัวคูณจะมีผล
```

แจก `cradgacha.luck.10` (= +10%), `cradgacha.luck.25` ฯลฯ ผ่านปลั๊กอิน rank — ค่าสูงสุดที่มีจะถูกใช้ โชว์ด้วย `{luck}` ใน text element ของ theme

## กุญแจตู้ (Keys)

ไอเทมกุญแจเปิดตู้ **ฟรีไม่เสีย cost** — 1 ดอก/ครั้ง (10 ดอก = 10 ครั้ง) ผู้เล่นที่ไม่มีกุญแจจ่าย cost ปกติ

```yaml
# crates.yml — ต่อตู้
cost: { type: MONEY, amount: 100 }
key: "crad_gacha:starter_key"     # หรือไอเทม vanilla เช่น  key: TRIPWIRE_HOOK
```

- ตั้งไอเทมกุญแจในหน้า **Keys** ของ Settings editor (หรือ `crates.yml`) และแจกกุญแจให้ตัวเองไว้เทสได้ในนั้น
- แจกกุญแจให้ผู้เล่นด้วย **`/gacha key give <ผู้เล่น> <ตู้> [จำนวน]`** — ออกแบบมาให้รันจาก CrazyVouchers / Tebex
- ตู้ฟรี (cost `NONE`) ไม่กินกุญแจ, เปิดล้มเหลวจะคืนกุญแจ (ไม่ใช่ cost)

---

## สถิติ & ประวัติ

- **`/gacha stats [ตู้]`** *(แอดมิน)* — dashboard % ดรอปจริง vs ที่ตั้ง + อันดับคนเปิด พร้อมตัวกรองรายตู้ (จากไฟล์ audit log)
- **`/gacha history`** *(ทุกคน — ฟรี)* — ประวัติของที่ตัวเองได้ + pity ปัจจุบันทุกตู้

ทั้งคู่ต้องเปิด audit log:

```yaml
# config.yml
reward-log:
  enabled: true
```

## Live Layout Editor — `/gacha layout`

จัด layout เมนูด้วยเมาส์แทนการปรับเลข `x`/`y` เอง

- เปิดเมนูตู้จริงในโหมด **layout** — คลิก element เพื่อหยิบ (ลอยตามเมาส์) คลิกอีกครั้งเพื่อวาง
- แถบเครื่องมือ **Undo / Redo / Save / Library / Exit**; ระหว่างลากปล่อยบนโซน **Delete** หรือ **Duplicate**
- **Button Library** — รวมปุ่มทั้งหมดจาก `theme.yml` (แท็บ All / Main / Reveal / Sub Pages / Custom) คลิกเพื่อวางสำเนา; **[ + Add ]** ลงทะเบียนปุ่ม glyph ใหม่โดยเขียน `font_image` ลงแพ็ก ItemsAdder (แล้ว `/iazip`), **[ - Remove ]** ถอดปุ่ม custom
- **Save** เขียนตำแหน่งใหม่กลับ `theme.yml` (และ banner override ของตู้ลง `crates.yml`)

---

## ฟรี vs พรีเมียม โดยสรุป

| ฟีเจอร์ | ฟรี | พรีเมียม |
|---------|:---:|:--------:|
| เมนู cursor, เปิดการ์ด, pity, cost ทุกแบบ (รวม multi-cost) | ✅ | ✅ |
| Duplicate→Spark, Spark Exchange, Wishlist, Token Shop | ✅ | ✅ |
| ขอบเรืองแสง, ขนาด/ข้อความ/title รายรางวัล | ✅ | ✅ |
| `/gacha history`, PlaceholderAPI, Developer API | ✅ | ✅ |
| จำนวนตู้ | สูงสุด 3 | ไม่จำกัด |
| editor / สร้างตู้ / settings ในเกม | — | ✅ |
| Rate-Up event, VIP luck, กุญแจตู้ | — | ✅ |
| `/gacha stats`, live layout editor | — | ✅ |
