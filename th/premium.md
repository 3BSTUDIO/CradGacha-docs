# พรีเมียม

CradGacha มี **2 jar แยกกัน**:

| เวอร์ชัน | Jar | ได้อะไร |
|----------|-----|---------|
| **ฟรี** | `CradGacha-x.jar` | เมนู cursor เต็มรูปแบบ, เปิดการ์ด, pity, duplicate→spark, wishlist, token shop, cost ทุกแบบ, ขอบเรืองแสงตาม rarity, ขนาด/ข้อความ/title รายรางวัล, ประวัติ, PlaceholderAPI — ได้สูงสุด **3 ตู้** |
| **พรีเมียม** | `CradGacha-Premium-x.jar` | ทุกอย่างของฟรี **บวก** editor ในเกม, สร้างตู้, rate-up event, VIP luck, กุญแจ, หน้าสถิติ, layout editor, **Developer API** — และ **ตู้ไม่จำกัด** |

ฟีเจอร์พรีเมียมอยู่ใน source set แยก jar ฟรีจึงไม่มีโค้ดพรีเมียมอยู่จริง แค่เอา jar พรีเมียมวางทับ (แทน jar ฟรี) แล้วรีสตาร์ท คำสั่งพรีเมียมก็ทำงานเอง ไม่ต้องตั้งค่าเพิ่ม

> **ไม่ใช่แค่ flag** — ถ้าคำสั่งด้านล่างเขียนว่า *"พรีเมียม"* jar ฟรีจะขึ้นข้อความชวนอัปเกรดแล้วไม่ทำอะไร

---

## Reward Editor ในเกม — `/gacha edit <ตู้>`

แก้ไขรางวัลของตู้ในเกมทั้งหมดบนแผง cursor — ไม่ต้องแตะ YAML ไม่ต้อง reload

- **รายการรางวัล** — โชว์เป็นกริดไอคอน เอาเมาส์ชี้ดูชื่อ+lore, คลิกเพื่อแก้
- **ต่อรางวัล (หน้า 1):** ชื่อ, ไอเทม, จำนวน, rarity, ยกเว้น duplicate→spark, commands (เพิ่ม/ล้าง)
- **ต่อรางวัล (หน้า 2):** **ขนาด** ตอนโชว์บนการ์ด, **ข้อความ** ตอนได้ (แชท) และ **title** (ตัวใหญ่กลางจอ) รองรับ `{reward}` / `{player}`
- **ตั้งจากไอเทมในมือ** — คลิก preview เพื่อคัดลอกไอเทมที่ถืออยู่ (ตรวจ ItemsAdder / Nexo / Oraxen / MMOItems / vanilla ให้อัตโนมัติ)
- **[ Inventory ]** — เลือกไอเทมของรางวัลจาก**กระเป๋า**แบบ grid ตั้งไอเทมได้หลายชิ้นโดยไม่ต้องปิดเมนูไปสลับของในมือ
- **[ + Add ]** เพิ่มรางวัล, **[ Delete Reward ]**, **[ 🎲 Test 1000 ]** (ดู Simulator), **[ ⚙ Settings ]**
- **[ Reset ]** (มุมขวาบน) — ยกเลิกการแก้ไขที่ยังไม่บันทึกทั้งหมด แล้วโหลดตู้จากดิสก์ใหม่ · ต้องกด 2 ครั้ง (ถามยืนยัน *Discard changes?* ก่อน) กันกดพลาด
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

## Global Config editor — `/gacha config`

ปรับค่า **global** บนแผง cursor — ไม่ต้องแตะ YAML แต่ละค่าจะเขียนกลับไฟล์ต้นทางที่ถูกต้อง
(`cursor.yml` / `config.yml` / `theme.yml`) แล้ว reload ให้เอง · **ชี้เมาส์ที่ชื่อ setting** เพื่อดูคำอธิบายว่าปรับแล้วได้อะไร

- **Mouse & Cursor** — **ความไวเมาส์** (ค่าเดียว; สูง = เร็วขึ้น — ระยะที่เคอร์เซอร์เอื้อมถึงกำหนดด้วยขนาดเมนู ไม่ใช่ความเร็ว), UI scale, cursor smoothing
- **Cursor Feel** — ขนาด crosshair, magnetic snap (เปิด/แรง/รัศมี)
- **Menu** — ซ่อนมือ, ฟ้าใส, body double, max open (x10), clear-area เปิด/ปิด + รัศมี
- **Gameplay** — require-on-ground, เช็คช่องกระเป๋า, cooldown, reward log, VIP luck
- **Effects** — glow การ์ด, pull suspense, โมเดล 3D, pity ค่ากลาง
- **Rarities** — ต่อ rarity: weight, announce, สี glow

ตัวเลขใช้ปุ่ม −/+ (หรือคลิกที่ค่าเพื่อพิมพ์ตรง); toggle สลับ; enum วน

> ค่าที่อาจทำเมนูใช้ไม่ได้ (camera mode, cursor plane distance, cursor bounds) **ไม่** เปิดให้แก้ที่นี่ — อยู่ใน `cursor.yml`

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

## Live Layout Editor — `/gacha layout [ธีม]`

จัด layout เมนูด้วยเมาส์แทนการปรับเลข `x`/`y` เอง

- `/gacha layout` = แก้ธีมที่ใช้อยู่; `/gacha layout <ชื่อ>` = สลับไปแก้ธีมนั้น (มี tab-complete) หากไม่อยากแก้ธีม default ให้โคลนก่อนที่ **`/gacha config` → Theme → Clone**
- เปิดเมนูตู้จริงในโหมด **layout** — คลิก element เพื่อหยิบ (ลอยตามเมาส์) คลิกอีกครั้งเพื่อวาง
- **Save** เขียนตำแหน่ง/รูป/ฟังก์ชันใหม่กลับ `theme.yml` (banner override ของตู้ลง `crates.yml`); **Exit** ยกเลิก

### แถบบน (ตอนยังไม่หยิบอะไร)

| ช่อง | ทำอะไร |
|------|--------|
| **Undo** / **Redo** | ย้อน/ทำซ้ำการแก้ไข |
| **Save** | บันทึกลง yml |
| **Library** | เปิดหน้าต่าง Button Library |
| **Text** | พิมพ์สร้าง element ข้อความใหม่ — จะลอยตามเมาส์ คลิกเพื่อวาง |
| **Exit** | ยกเลิกแล้วออก |

### แถบตอนหยิบ element (ขณะ element ลอยตามเมาส์)

| ช่อง | ทำอะไร |
|------|--------|
| **ขยาย** / **ย่อ** | ปรับขนาด element ที่หยิบ (ทีละ 0.05) |
| **ลบ** | เอา element ออก |
| **ก็อป** | วางสำเนา แล้วแก้ที่สำเนาต่อ |
| **รูป** | เปิด Library คลิกภาพไหนก็ได้เพื่อใช้เป็นรูปของ element นี้ |
| **ฟังก์ชัน** | ใส่ action เวลากด (ดูตารางล่าง); พิมพ์ `none` เพื่อลบ |

- **Button Library** — รวมปุ่มทั้งหมดจาก `theme.yml` (แท็บ All / Main / Reveal / Sub Pages / Custom) คลิกเพื่อวางสำเนา (หรือในโหมด *รูป* = ตั้งภาพให้ element ที่หยิบ); **[ + Add ]** ลงทะเบียนปุ่ม glyph ใหม่โดยเขียน `font_image` ลงแพ็ก ItemsAdder (แล้ว `/iazip`), **[ - Remove ]** ถอดปุ่ม custom

### ฟังก์ชันของปุ่ม (ปุ่ม **ฟังก์ชัน**)

ใส่ค่าเหล่านี้เพื่อทำให้ element ข้อความ/รูป กลายเป็นปุ่มที่กดได้จริง บันทึกลง `theme.yml` เป็น `elements.<id>.action` (+ `param`) พร้อม hitbox ให้กดได้อัตโนมัติ

| Action | ปุ่มทำอะไร | Param |
|--------|-----------|-------|
| `open_shop` | เปิดร้าน Token | — |
| `open_spark` | เปิด Spark Exchange | — |
| `open_wishlist` | เปิด Wishlist | — |
| `open_rates` | เปิดหน้าอัตราดรอป | — |
| `open_history` | เปิดประวัติการสุ่มของผู้เล่น | — |
| `open_count` | เปิดตู้นี้จำนวน N ครั้ง | `<ตู้>:<จำนวน>` (เช่น `starter:10`) |
| `open_all` | เปิดสูงสุดรวดเดียว | id ตู้ (ใส่หรือไม่ก็ได้) |
| `back_to_menu` | กลับไปหน้ารายการตู้ | — |
| `close_menu` | ปิดเมนูทั้งหมด | — |
| `link_url` | ส่งลิงก์คลิกได้ในแชทให้ผู้เล่น | URL |

> เคล็ดลับ: แถบเครื่องมือเป็นภาพเดียวที่ถูกแบ่งเป็นช่องเท่า ๆ กัน ถ้าวาด `layout_edit.png` / `layout_edit_1.png` ใหม่ให้กว้างต่างจากเดิม ให้ตั้ง `theme.layout-editor.bar-aspect` / `mbar-aspect` (กว้าง ÷ สูง) จะได้ไม่ยืด

---

## ฟรี vs พรีเมียม โดยสรุป

| ฟีเจอร์ | ฟรี | พรีเมียม |
|---------|:---:|:--------:|
| เมนู cursor, เปิดการ์ด, pity, cost ทุกแบบ (รวม multi-cost) | ✅ | ✅ |
| Duplicate→Spark, Spark Exchange, Wishlist, Token Shop | ✅ | ✅ |
| ขอบเรืองแสง, ขนาด/ข้อความ/title รายรางวัล | ✅ | ✅ |
| `/gacha history`, PlaceholderAPI | ✅ | ✅ |
| จำนวนตู้ | สูงสุด 3 | ไม่จำกัด |
| editor / สร้างตู้ / settings ในเกม | — | ✅ |
| Rate-Up event, VIP luck, กุญแจตู้ | — | ✅ |
| `/gacha stats`, live layout editor | — | ✅ |
| **Developer API** (event + `CradGachaAPI`) | — | ✅ |
