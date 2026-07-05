---
title: แก้ปัญหา
---

# แก้ปัญหา (Troubleshooting)



---

> **ขั้นแรกของเกือบทุกปัญหา:** รัน `/gacha doctor` มันตรวจ packetevents, ItemsAdder, glyph, Vault,
> ตู้ของคุณ และ resource pack แล้วบอกว่าอะไรผิด

## เมนูขึ้นเป็นบล็อกหินสีเทา และ/หรือ ข้อความดิบ (`i_token:1`, `1`, `10`) {#stone-menu}

นี่คือ **ปัญหาภาพที่พบบ่อยที่สุด** และมีสาเหตุเดียว: **asset ของ UI ยังไม่ถูกโหลดสำหรับ item provider ที่คุณใช้**
พื้นหลังเมนู ปุ่ม และเคอร์เซอร์ เป็นไอเทม-โมเดล + font glyph ที่มากับ pack ของ CradGacha เมื่อหาไม่เจอ
ไอเทม-โมเดลจะ fallback เป็นบล็อกหิน และ glyph จะแสดงเป็น id ดิบ (`i_token:1`, `1`, `10`)

ไล่ตามลำดับนี้:

0. **ไม่มี ItemsAdder / Nexo / Oraxen เลย?** ใช้ **โหมด vanilla** — เอา `pack/vanilla` ไปวางเป็น resource pack
   ของเซิร์ฟตามปกติ แล้วตั้ง `ui.item-provider: vanilla` (ตัว `pack/vanilla/CradGacha` ตั้งให้แล้ว) เมนูจะ
   แสดงผลครบ **โดยไม่ต้องมี item-provider plugin เลย** (ต้อง MC 1.21.4+ และผู้เล่นต้องกดรับ pack)
   ถ้าตั้ง `auto` ไว้ ระบบจะเลือก vanilla ให้เองเมื่อไม่มีทั้ง 3 ตัว
1. **ติดตั้ง pack ให้ตรง provider** — เอา pack ที่ตรงกับ item plugin ของคุณ (`pack/itemsadder`, `pack/nexo`
   หรือ `pack/oraxen`) วางลงในโฟลเดอร์ที่ถูกต้อง (ดู [การติดตั้ง](installation.md)) แล้ว rebuild/reload:
   ItemsAdder ใช้ `/iazip` + `/iareload`, หรือ reload pack ของ Nexo / Oraxen
2. **ชี้ config ไปที่ provider ที่ถูก** — ใน `config.yml` ตั้ง `ui.item-provider` เป็น provider ของคุณ
   (`itemsadder` / `nexo` / `oraxen`) หรือปล่อย `auto` ไฟล์ `theme.yml` / `cursor.yml` อ้างภาพเป็น
   `provider:<ชื่อ>` (หรือ id ตรงๆ `nexo:` / `oraxen:` / `crad_gacha:`) — prefix ต้องตรงกับปลั๊กอินที่ใช้จริง
   ถ้าใช้ Nexo แต่ config เขียน `oraxen:` จะเจออาการนี้พอดี
3. **ให้ client รับ resource pack** — ผู้เล่นต้องกดรับ resource pack ของเซิร์ฟ (ไม่แน่ใจให้ relog) แล้วรัน
   `/gacha doctor` ดูบรรทัด "resource pack"
4. **อัปเดต pack เก่า** — ถ้า banner กับการ์ดขึ้นปกติ แต่ *พื้นหลัง* เป็นหิน แปลว่า pack ของคุณเก่ากว่า tile
   `menu_background` / `bg_1..6` — ติดตั้ง pack ปัจจุบันจาก `pack/` ใหม่

::: tip
ในเวอร์ชันปัจจุบัน ภาพ UI ที่ resolve ไม่ได้จะถูก **ซ่อน** (เห็นพาเนลดำด้านหลังแทน) ไม่กลายเป็นกำแพงหินแล้ว
ดังนั้นถ้าเมนูยังเป็นหินเทาทั้งหมด แปลว่าคุณใช้ **jar เวอร์ชันเก่า** ด้วย — อัปเดตปลั๊กอินด้วย
ส่วน glyph ยังต้องติดตั้ง pack ถึงจะแสดงผลได้
:::

## ปลั๊กอินไม่โหลด

- ดู console ว่ามี error สีแดงตอนเปิดไหม
- เช็คว่าใช้ **Paper 1.21+** (ไม่ใช่ Spigot/Bukkit) และ **Java 21+**
- เช็คว่า jar อยู่ใน `plugins/` และ **รีสตาร์ทเต็ม** (ไม่ใช่ `/reload`)

## คำสั่งใช้ไม่ได้

- คำสั่งแอดมิน (`reload`, `doctor`, `token`) ต้องมีสิทธิ์ `cradgacha.admin` — เป็น `op` หรือให้สิทธิ์
  (ดู [สิทธิ์](permissions.md))
- กด **Tab** หลัง `/gacha ` เพื่อดูว่ามีอะไรให้ใช้บ้าง

## dependency หาย

- `/gacha doctor` จะขึ้น ✗ สีแดงข้างสิ่งที่ขาด
- **packetevents** จำเป็นต่อเมนูเคอร์เซอร์ ถ้าไม่มีเมนูจะเปิดไม่ถูกต้อง
- **ItemsAdder** ให้รูปภาพ ถ้าไม่มีเมนูจะเป็นกล่อง (□)
- **Vault** ต้องมีเฉพาะตู้ค่าเปิดแบบ `MONEY`

## คลิกไม่ติด / ผู้เล่นถูกเตะในเมนู (anticheat)

ถ้าคลิกไม่ติดหลังเปิดตู้ — หรือผู้เล่นหลุด — แสดงว่า **anticheat** จับ packet ที่เมนูเคอร์เซอร์ใช้ ใน console
จะเห็นบรรทัดแบบ `Grim » <player> failed PacketOrderB (x20) pre-attack` ไต่ขึ้นเรื่อยๆ จนถูกเตะ

CradGacha จะ grant สิทธิ์ยกเว้นชั่วคราวระหว่างอยู่ในเมนู เช็คว่า node ยกเว้นของ anticheat คุณอยู่ใน `cursor.yml`:

```yaml
anticheat-exempt-permissions:
  - grim.exempt        # GrimAC (ค่าเริ่มต้น)
  # - <node-ยกเว้นของ-anticheat-คุณ>
```

สิทธิ์เหล่านี้ถูก grant **เฉพาะ** ตอนเปิดเมนู และเอาออกเมื่อปิด · ถ้า anticheat ใช้ node อื่น เพิ่มตรงนี้ (แล้ว
`/gacha reload`) · `grim.exempt` ของ GrimAC ใส่ให้เป็นค่าเริ่มต้นแล้ว

## ผู้เล่นคนอื่นหลุดตอนมีคนเปิดกาชา

**packetevents เก่าเกินไปสำหรับเวอร์ชัน Minecraft** ของคุณ · บน **MC 1.21.9+** packetevents ก่อน 1.21.9 จะ
encode packet ร่างจำลอง (body double) ที่ส่งให้ผู้เล่นข้างๆ ผิด → client ของเขาตัดการเชื่อมต่อทันทีที่มีคนเปิดเมนู

- อัปเป็น **packetevents 2.13.0+** (ให้ตรงเวอร์ชันเซิร์ฟ) แล้ว restart + ทดสอบใหม่
- แก้ชั่วคราวได้ด้วย `cursor.body-double: false` ใน `cursor.yml` แต่การอัป packetevents คือการแก้จริง

## เส้นดำระหว่าง tile ของพื้นหลัง

ผู้เล่นบางคนเห็นเส้นดำบางๆ ระหว่างรูปพื้นหลังแบบ tile · ผู้เล่นเหล่านั้นใช้ **client เก่าต่อผ่าน
ViaVersion/ViaBackwards** — client เขา render sprite item-display เล็กกว่านิดหน่อยเลยเกิดช่องว่าง

- ตั้ง `background.tiles.overlap` ใน `theme.yml` เป็น `1.06` (ลอง `1.08` ถ้ายังมีเส้นบางๆ) · มันขยายเฉพาะรูป
  tile · spacing เท่าเดิม ผู้เล่นที่ client ตรงเวอร์ชันไม่ได้รับผลกระทบ · แล้ว `/gacha reload`

## มีก้อนหิน/บล็อกลอยกลางเมนู

เป็นได้ 2 สาเหตุ:

1. **banner ของตู้ชี้ไปไอเทมที่ไม่มี** · ถ้า `crates.<id>.banner.item` (หรือ icon ของรางวัล) ใช้ id/namespace ที่
   pack ไม่มี (เช่นชื่อเก่า `crates_gacha:` หรือ prefix `oraxen:` ทั้งที่ใช้ Nexo) client จะไม่มี model เลยขึ้น
   บล็อก fallback · แก้ id + prefix (`nexo:` / `oraxen:` / `itemsadder`) ให้ตรง pack แล้ว `/gacha reload`
2. **บล็อกโลกจริงโผล่ทะลุพื้นหลัง** · เพิ่ม `clear-area.forward-distance` (เช่น `16`) ให้เคลียร์กรวยหน้ากล้องด้วย

## เมนูเป็นกล่องสี่เหลี่ยม (□) / รูปไม่ขึ้น

แปลว่า resource pack หรือ glyph ยังไม่พร้อม:

1. รัน `/gacha doctor` — ดูบรรทัด "glyphs registered" และ "resource pack"
2. ใน ItemsAdder รัน `/iazip` แล้ว `/iareload` เพื่อ (re)build pack
3. เช็คว่าผู้เล่น **ยอมรับ** resource pack ของเซิร์ฟแล้ว (ไม่แน่ใจให้เข้าใหม่)
4. เช็คว่า id ของ glyph/รูปใน `theme.yml` ตรงกับที่ลงทะเบียนใน ItemsAdder

## โมเดล/รูปมืด

ไม่ควรมืด — ปลั๊กอินตั้งความสว่างเต็ม (`15/15`) ถ้ายังดูแปลก มักเป็นที่ **resource pack / โมเดล
ItemsAdder** เอง (เช่น texture มี shading ติดมา หรือไม่ได้ตั้ง emissive ในโมเดล) ให้ export โมเดล/
texture ใหม่ใน ItemsAdder

## รางวัลไม่ออก

- เปิด `crates.yml` เช็คว่าตู้มี `rewards:` และตู้ `enabled: true`
- รางวัลแต่ละชิ้นต้องมี `material` **หรือ** `commands` ดู console ว่ามีคำเตือน "Skipping reward" ไหม
- ถ้ากระเป๋าเต็ม ไอเทมจะดรอปที่เท้า (มองหาที่พื้น)
- รางวัลที่สุ่มแล้วเก็บใน `pending.yml` ถ้าหลุด/ดับ จะได้ตอนเข้าใหม่

## ไม่หักเงิน

- ค่าเปิด `MONEY` ต้องมี **Vault** + ปลั๊กอินเศรษฐกิจ (เช่น EssentialsX Economy) รัน `/gacha doctor`
- ถ้าปลั๊กอินเศรษฐกิจโหลดหลัง CradGacha ปกติจะตรวจเจอเอง ถ้าไม่ ให้ `/gacha reload`
- ผู้เล่นอาจแค่เงินไม่พอ จะได้ข้อความ "not enough money"

## สิทธิ์ไม่ทำงาน

- เช็คว่า node คือ `cradgacha.admin` เป๊ะ
- ถ้าใช้ LuckPerms: `/lp user <name> permission check cradgacha.admin`
- operator มีโดยค่าเริ่มต้น แต่ปลั๊กอินสิทธิ์อาจ override ค่าเริ่มต้นได้

## เคอร์เซอร์ไปไม่ถึงขอบจอ

เป็นข้อจำกัดฝั่งเซิร์ฟที่รู้กัน (ดู [Cursor UI](cursor-ui.md)) ใน `cursor.yml`:

- เพิ่ม `sensitivity-x` (เช่น `0.3` → `0.5`)
- ขยาย `bounds.min-x` / `max-x`
- รัน `/gacha reload`

## ผู้เล่นค้าง spectator / กล้องเพี้ยน

ปลั๊กอินจะคืน gamemode และกล้องเมื่อปิดเมนู และมีไฟล์กู้คืน (`gamemode-recovery.yml`) ที่ซ่อม
คนที่ค้าง spectator หลังเซิร์ฟดับ ถ้ามีคนค้าง:

- ให้เข้าเกมใหม่ (การกู้คืนทำงานตอน join) หรือตั้ง gamemode ด้วยมือ
- เช็คว่า **packetevents** ติดตั้งและเวอร์ชันใหม่ (2.13.0+ บน MC 1.21.9+)

## ร้าน Spark ขึ้นว่ารางวัล "is misconfigured"

spark item ตัวนั้น resolve ไม่ได้ · แต่ละ `spark.items` ต้อง **อ้างอิง** ด้วย `reward: "<ชื่อรางวัลที่มีอยู่>"`
**หรือ** นิยามในตัวเองด้วย `name:` + `item:` หรือ `commands:` · ดู
[ตู้กาชา → Duplicate & Spark](crates.md#duplicate-amp-spark-exchange) (การจับคู่ชื่อจะตัดโค้ดสี/ตัวพิมพ์/ช่องว่าง
เปลี่ยนชื่อแล้วจึงไม่พังการอ้างอิง)

## เว็บ GitHub Pages ไม่ขึ้น

- ที่ repo **CradGacha-docs** ตั้ง **Settings → Pages → Source** เป็น **GitHub Actions**
  ดู [เผยแพร่ (GitHub Pages)](deploy.md)
- ดูแท็บ **Actions** ว่ามี run "Deploy Docs (VitePress)" ที่ล้มเหลวไหม แล้วอ่าน log
- หลังเปิดใช้งาน push ขึ้น `main` (หรือกด Run workflow) เพื่อ trigger build ครั้งแรก
- URL ของเว็บคือ `https://<ชื่อผู้ใช้>.github.io/CradGacha-docs/`

---

ถัดไป: [คำถามที่พบบ่อย →](faq.md)
