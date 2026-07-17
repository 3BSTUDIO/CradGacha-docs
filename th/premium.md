# พรีเมียม

<a class="buy-card" href="https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53" target="_blank" rel="noreferrer">
  <span class="desc">รับ CradGacha Premium — $14.99 · จ่ายครั้งเดียว ไม่มีรายเดือน</span>
  <span class="title">ซื้อที่ MineAssets →</span>
</a>

**jar ฟรีคือเกมกาชาที่สมบูรณ์อยู่แล้ว — พรีเมียมคือวิธีทำเงินจากมัน**

Rate-up banner, กุญแจที่เอาไปขายได้ และ luck ตามยศ คือ 3 อย่างที่เกมกาชาของจริงใช้ทำเงิน —
พรีเมียมให้ครบทั้ง 3 อย่าง บวกกับจัดหน้าตาเมนูเป็นของคุณเอง และแก้ทุกอย่างในเกมได้โดยไม่ต้องเปิดไฟล์ YAML เลย

---

## ทำเงินจากกาชาของคุณ

### Rate-Up Event

**นี่คือเครื่องยนต์ที่เกมกาชาของจริงทุกเกมใช้** ตั้งช่วง banner ที่บูสต์ rarity แล้วเมนูจะมีนับถอยหลังสด ๆ
(`⚡ RATE UP — ends in 2d 5h`) — ช่วงเวลาที่ "มีวันหมด" คือสิ่งที่เปลี่ยนผู้เล่นที่คิดว่า *ไว้ค่อยเปิดวันหลัง*
ให้กลายเป็นคนที่เปิดคืนนี้

```yaml
# crates.yml — ต่อตู้
event:
  start: "2026-07-10 18:00"   # ไม่ใส่ทั้งคู่ = active ตลอด
  end:   "2026-07-17 23:59"
  rate-up: { LEGENDARY: 2.0, EPIC: 1.5 }   # ตัวคูณ weight ระหว่าง active
```

- หน้าเรท **และ** simulator โชว์ % ที่บูสต์แล้วอัตโนมัติ
- ปรับตำแหน่ง/รูปแบบนับถอยหลังที่ `theme.event-line` หรือใส่ `{event}` ใน text element
- แก้ในเกมได้ที่ Settings editor (หน้า 3) — เปิด banner รอบใหม่ได้โดยไม่ต้องแตะไฟล์

### กุญแจตู้ (Keys)

**สินค้าที่คุณเอาไปขายได้จริง** ไอเทมกุญแจเปิดตู้ **ฟรีไม่เสีย cost** — 1 ดอก/ครั้ง (10 ดอก = 10 ครั้ง)
ผู้เล่นที่ไม่มีกุญแจจ่าย cost ปกติ

```yaml
# crates.yml — ต่อตู้
cost: { type: MONEY, amount: 100 }
key: "crad_gacha:starter_key"     # หรือไอเทม vanilla เช่น  key: TRIPWIRE_HOOK
```

- **`/gacha key give <ผู้เล่น> <ตู้> [จำนวน]`** ออกแบบมาให้รันจากแพ็กเกจในร้านค้า —
  Tebex, CrazyVouchers หรืออะไรก็ได้ที่รันคำสั่ง console ตอนลูกค้าจ่ายเงิน
- ตั้งไอเทมกุญแจในหน้า **Keys** ของ Settings editor (หรือ `crates.yml`) และแจกกุญแจให้ตัวเองไว้เทสได้ในนั้น
- ตู้ฟรี (cost `NONE`) ไม่กินกุญแจ, เปิดล้มเหลวจะคืนกุญแจ (ไม่ใช่ cost)

### VIP Luck

**ทำให้ยศทุกยศที่คุณขายมีค่ามากขึ้น** บูสต์เรทตาม permission ทุกครั้งที่สุ่ม

```yaml
# config.yml
luck:
  enabled: true
  permission-prefix: "cradgacha.luck."
  rarities: [EPIC, LEGENDARY]     # rarity ที่ตัวคูณจะมีผล
```

แจก `cradgacha.luck.10` (= +10%), `cradgacha.luck.25` ฯลฯ ผ่านปลั๊กอิน rank — ค่าสูงสุดที่มีจะถูกใช้
โชว์ด้วย `{luck}` ใน text element ของ theme

---

## ทำให้เป็นของคุณ

### แบนเนอร์ขยับได้ — ลาก GIF เข้าไปเลย

ลากไฟล์ GIF เข้าเกม แล้วมันกลายเป็นแบนเนอร์แอนิเมชัน — CradGacha ตัดเฟรม ลงทะเบียน glyph
และเขียนลงแพ็กให้เอง ไม่ต้องแก้แพ็ก ไม่ต้องใช้โปรแกรมแต่งรูป ดู **[แอนิเมชัน](/th/animations)**

### Live Layout Editor — `/gacha layout [ธีม]`

จัด layout เมนูด้วยเมาส์แทนการปรับเลข `x`/`y` เอง — กาชาของคุณจะได้หน้าตาเหมือน *เซิร์ฟคุณ*
ไม่ใช่ default เหมือนชาวบ้าน

- `/gacha layout` = แก้ธีมที่ใช้อยู่; `/gacha layout <ชื่อ>` = สลับไปแก้ธีมนั้น (มี tab-complete) หากไม่อยากแก้ธีม default ให้โคลนก่อนที่ **`/gacha config` → Theme → Clone**
- เปิดเมนูตู้จริงในโหมด **layout** — คลิก element เพื่อหยิบ (ลอยตามเมาส์) คลิกอีกครั้งเพื่อวาง
- **Save** เขียนตำแหน่ง/รูป/ฟังก์ชันใหม่กลับ `theme.yml` (banner override ของตู้ลง `crates.yml`); **Exit** ยกเลิก

#### แถบบน (ตอนยังไม่หยิบอะไร)

| ช่อง | ทำอะไร |
|------|--------|
| **Undo** / **Redo** | ย้อน/ทำซ้ำการแก้ไข |
| **Save** | บันทึกลง yml |
| **Library** | เปิดหน้าต่าง Button Library |
| **Text** | พิมพ์สร้าง element ข้อความใหม่ — จะลอยตามเมาส์ คลิกเพื่อวาง |
| **Exit** | ยกเลิกแล้วออก |

#### แถบตอนหยิบ element (ขณะ element ลอยตามเมาส์)

| ช่อง | ทำอะไร |
|------|--------|
| **ขยาย** / **ย่อ** | ปรับขนาด element ที่หยิบ (ทีละ 0.05) |
| **ลบ** | เอา element ออก |
| **ก็อป** | วางสำเนา แล้วแก้ที่สำเนาต่อ |
| **รูป** | เปิด Library คลิกภาพไหนก็ได้เพื่อใช้เป็นรูปของ element นี้ |
| **ฟังก์ชัน** | ใส่ action เวลากด (ดูตารางล่าง); พิมพ์ `none` เพื่อลบ |

- **Button Library** — รวมปุ่มทั้งหมดจาก `theme.yml` (แท็บ All / Main / Reveal / Sub Pages / Custom) คลิกเพื่อวางสำเนา (หรือในโหมด *รูป* = ตั้งภาพให้ element ที่หยิบ); **[ + Add ]** ลงทะเบียนปุ่ม glyph ใหม่โดยเขียน `font_image` ลงแพ็ก ItemsAdder (แล้ว `/iazip`), **[ - Remove ]** ถอดปุ่ม custom

#### ฟังก์ชันของปุ่ม (ปุ่ม **ฟังก์ชัน**)

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

## ไม่ต้องเปิดไฟล์ YAML อีกเลย

ทุกอย่างข้างบน — และทุกรางวัล, cost, pity, อัตราดรอป — แก้ในเกมได้หมดบนแผง cursor

### Reward Editor ในเกม — `/gacha edit <ตู้>`

แก้รางวัลของตู้ในเกมล้วน ๆ — ไม่ต้องแตะ YAML ไม่ต้อง reload

- **รายการรางวัล** — ทุกรางวัลเป็นกริดไอคอน; ชี้เพื่อดู (ชื่อ + lore) คลิกเพื่อแก้
- **ต่อรางวัล (หน้า 1):** ชื่อ, ไอเทม, จำนวน, rarity, ยกเว้น duplicate→spark, คำสั่ง (เพิ่ม/ล้าง)
- **ต่อรางวัล (หน้า 2):** **ขนาด** ที่โชว์บนการ์ด, **ข้อความตอนได้** (แชท) และ **title ตอนได้** (ตัวใหญ่กลางจอ) รองรับ `{reward}` / `{player}`
- **ตั้งจากของในมือ** — คลิกที่ preview เพื่อก็อปไอเทมที่ถืออยู่ (ตรวจ ItemsAdder / Nexo / Oraxen / MMOItems / vanilla ให้เอง)
- **[ Inventory ]** — เลือกไอเทมรางวัลจาก**กระเป๋า**เป็นกริด ตั้งของหลายชิ้นได้โดยไม่ต้องปิดเมนูไปสลับของในมือ
- **[ + Add ]** เพิ่มรางวัล, **[ Delete Reward ]**, **[ 🎲 Test 1000 ]** (ดู Simulator), **[ ⚙ Settings ]**
- **[ Reset ]** (ขวาบน) — ทิ้งการแก้ที่ยังไม่ save แล้วโหลดตู้จากดิสก์ใหม่ ต้องคลิก 2 ครั้ง (ถาม *Discard changes?* ก่อน) กันกดโดนพลาด
- **Submit & Save** เขียน `crates.yml` แล้ว reload ปลั๊กอิน ช่องพิมพ์ใช้ **Dialog API** ของเกมบน 1.21.6+ (ช่องกรอกจริง) เซิร์ฟเก่ากว่านั้นใช้พิมพ์ในแชทแทน

### Crate Settings editor

เข้าจากปุ่ม **[ ⚙ Settings ]** ในeditor — แผง 4 หน้า ครอบคลุม key ของตู้ (เกือบ) ทั้งหมด:

1. **General / Cost / Pity** — ชื่อ, เปิด/ปิด, cost type/จำนวน/ไอเทม, pity เปิด/ปิด + rarity + เกณฑ์, ไอเทมที่โชว์
2. **Drops / Extras** — broadcast, duplicate→spark + จำนวน, wishlist (เปิด/สูงสุด/rarity), ร้าน spark + title + หน้าย่อยไอเทม
3. **Rate-Up Event** — วันเริ่ม/จบ + ตัวคูณ weight ต่อ rarity
4. **Keys** — ไอเทมกุญแจ + แจกกุญแจให้ตัวเองไว้เทส

เขียนกลับเฉพาะ key ที่คุณแก้จริง ค่าที่จูนมือไว้ (ตำแหน่ง banner/ปุ่ม ฯลฯ) จึงไม่หาย

### สร้างตู้ — `/gacha create <id>`

สร้างตู้ใหม่จากศูนย์ในเกม 100%: เขียนโครงตู้ (ปิดไว้) ลง `crates.yml`, reload แล้วเปิด editor ให้เลย
เพิ่มรางวัล ตั้ง cost & pity แล้วเปิดใช้งานใน Settings จบ

### Global Config editor — `/gacha config`

ปรับค่า **global** บนแผง cursor — ไม่ต้องแตะ YAML แต่ละช่องเขียนกลับไฟล์ต้นทางจริง
(`cursor.yml` / `config.yml` / `theme.yml`) แล้ว reload ให้ **ชี้ที่ชื่อ setting** เพื่อดูคำอธิบายว่ามันทำอะไร

- **Mouse & Cursor** — **ความเร็วเมาส์** (ค่าเดียว; สูง = ไว — ระยะที่เมาส์ไปถึงกำหนดโดยขนาดเมนู ไม่ใช่ความเร็ว), ui-scale, cursor smoothing
- **Cursor Feel** — ขนาดเป้า, magnetic snap (เปิด/แรง/รัศมี)
- **Menu** — ซ่อนมือ, เคลียร์อากาศ, body double, เปิดสูงสุด (x10), clear-area เปิด/ปิด + รัศมี
- **Gameplay** — ต้องยืนบนพื้น, เช็คช่องว่างกระเป๋า, cooldown, reward log, VIP luck
- **Effects** — การ์ดเรืองแสง, pull suspense, โมเดล 3D ตอนเปิด, pity default
- **Rarities** — ต่อ rarity: weight, ประกาศ, สีเรืองแสง

ตัวเลขใช้ปุ่ม −/+ (หรือคลิกที่ค่าเพื่อพิมพ์เลขตรง ๆ); toggle กดสลับ; enum กดวน

> setting ที่ทำให้เมนูพังใช้ไม่ได้ (โหมดกล้อง, ระยะระนาบ cursor, ขอบเขต cursor) **จงใจ**ไม่เอามาไว้ตรงนี้ — อยู่ใน `cursor.yml` เหมือนเดิม

---

## รู้ว่าเกิดอะไรขึ้นจริง ๆ

### สถิติ & ประวัติ

- **`/gacha stats [ตู้]`** *(แอดมิน)* — dashboard % ดรอปจริง vs ที่ตั้ง + อันดับคนเปิด พร้อมตัวกรองรายตู้ (จากไฟล์ audit log)
- **`/gacha history`** *(ทุกคน — ฟรี)* — ประวัติของที่ตัวเองได้ + pity ปัจจุบันทุกตู้

ทั้งคู่ต้องเปิด audit log:

```yaml
# config.yml
reward-log:
  enabled: true
```

### Simulator สุ่ม 1,000 ครั้ง

ปุ่ม **[ 🎲 Test 1000 ]** ในeditor สุ่มตู้ (ค่าที่ save ล่าสุด) 1,000 ครั้ง โชว์ % ที่ออกจริงต่อ rarity เทียบกับ % ที่ตั้ง — เช็คเร็วๆ ว่า weight รู้สึกถูกไหม (และ rate-up บูสต์ตรงจุดไหม)

### Developer API

Bukkit event (`GachaPreOpenEvent` — ยกเลิกได้, `GachaOpenEvent`) พร้อม facade `CradGachaAPI` สำหรับเปิดตู้
จัดการ token และคุมการเปิดจากปลั๊กอินของคุณเอง ดู **[Developer API](/th/developer-api)**

---

## ฟรี vs พรีเมียม โดยสรุป

| ฟีเจอร์ | ฟรี | พรีเมียม |
|---------|:---:|:--------:|
| เมนู cursor, เปิดการ์ด, pity, cost ทุกแบบ (รวม multi-cost) | ✅ | ✅ |
| Duplicate→Spark, Spark Exchange, Wishlist, Token Shop | ✅ | ✅ |
| ขอบเรืองแสง, ขนาด/ข้อความ/title รายรางวัล | ✅ | ✅ |
| `/gacha history`, PlaceholderAPI | ✅ | ✅ |
| แอนิเมชันเปิดตู้แบบโมเดล 3D (BetterModel / ModelEngine) | ✅ | ✅ |
| จำนวนตู้ | สูงสุด 3 | ไม่จำกัด |
| **Rate-Up event, กุญแจตู้, VIP luck** | — | ✅ |
| **นำเข้า GIF + แบนเนอร์ขยับได้** | — | ✅ |
| Live layout editor | — | ✅ |
| editor / สร้างตู้ / settings / config ในเกม | — | ✅ |
| `/gacha stats` + simulator 1,000 ครั้ง | — | ✅ |
| **Developer API** (event + `CradGachaAPI`) | — | ✅ |

::: tip พร้อมแล้ว?
**[รับ CradGacha Premium — $14.99 →](https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53)**
:::

---

## วิธีติดตั้งพรีเมียม

CradGacha มี **2 jar แยกกัน** ฟีเจอร์พรีเมียมอยู่ใน source set แยก jar ฟรีจึงไม่มีโค้ดพรีเมียมอยู่จริง

1. ลบ `CradGacha-x.jar` (ตัวฟรี) ออกจาก `plugins/`
2. วาง `CradGacha-Premium-x.jar` แทน
3. รีสตาร์ท คำสั่งพรีเมียมทำงานเอง ไม่ต้องตั้งค่าเพิ่ม

`config.yml`, `crates.yml` และ `theme.yml` ของคุณใช้ต่อได้เลย ไม่ต้องแก้อะไร

> **ไม่ใช่แค่ flag** — ถ้าคำสั่งไหนเขียนว่า *"พรีเมียม"* jar ฟรีจะขึ้นข้อความชวนอัปเกรดแล้วไม่ทำอะไร
