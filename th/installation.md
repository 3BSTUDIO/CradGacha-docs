---
title: การติดตั้ง
---

# การติดตั้ง



---

## สิ่งที่ต้องมี

| สิ่งที่ต้องมี | เวอร์ชัน / หมายเหตุ |
|---|---|
| **ซอฟต์แวร์เซิร์ฟ** | **Paper** 1.21+ (ต้องเป็น Paper เพราะใช้ Paper API) ทดสอบบน 1.21.4–1.21.11 |
| **Java** | **Java 21** ขึ้นไป |
| **packetevents** | **จำเป็น** ใช้ทำ spectator camera freeze ที่ทำให้เมนูเคอร์เซอร์ทำงาน · ใช้ build ให้ตรงเวอร์ชัน MC — บน **1.21.9+ ใช้ packetevents 2.13.0+** (ตัวเก่า encode packet ผิด อาจทำผู้เล่นข้างๆ หลุด) |
| **ตัวให้ custom item** | **แนะนำอย่างยิ่ง — เลือกอย่างใดอย่างหนึ่ง:** **Nexo**, **ItemsAdder** หรือ **Oraxen** ให้รูปปุ่ม รูปเคอร์เซอร์ ไอคอนตู้ และโมเดลรางวัล (เป็น glyph และ/หรือ item) — ถ้าไม่มี เมนูจะเป็นกล่องสี่เหลี่ยม (□) |
| **Vault** | จำเป็น**เฉพาะ**ตอนตู้ใช้ค่าเปิดแบบ `MONEY` และต้องมีปลั๊กอินเศรษฐกิจ (เช่น EssentialsX Economy) ด้วย |
| **BetterModel / ModelEngine** | ไม่บังคับ สำหรับอนิเมชันโมเดล 3D ก่อนการ์ดขึ้น |

> ปลั๊กอินเสริมทั้งหมดเรียกใช้ผ่าน **reflection** — ถ้าไม่มี CradGacha ก็ยังเปิดได้

## ขั้นที่ 1 — ติดตั้ง dependency

วางพวกนี้ใน `plugins/` ก่อน แล้วเปิดเซิร์ฟหนึ่งครั้งให้มันสร้างไฟล์:

- `packetevents` (จำเป็น)
- ตัวให้ custom item — **Nexo**, ItemsAdder หรือ Oraxen (แนะนำ; เลือกอย่างใดอย่างหนึ่ง)
- `Vault` + ปลั๊กอินเศรษฐกิจ (เฉพาะถ้าใช้ค่าเปิดแบบ `MONEY`)

## ขั้นที่ 2 — ติดตั้ง CradGacha

1. ดาวน์โหลดหรือ build `CradGacha-1.0.0.jar`
   - build จาก source: รัน `./gradlew build` แล้วหาไฟล์ใน `build/libs/`
2. คัดลอก jar ไปไว้ในโฟลเดอร์ `plugins/` ของเซิร์ฟ

::: tip ไฟล์เริ่มต้น (ดาวน์โหลด)
โหลด **ไฟล์เริ่มต้น** สำเร็จรูป — resource pack ค่าเริ่มต้น + ตัวอย่าง config/theme — ไว้เป็นจุดตั้งต้น
แทนการทำใหม่ทั้งหมด:

**[⬇ ดาวน์โหลดไฟล์เริ่มต้น (MEGA)](https://mega.nz/file/ECoG2baa#RRIBS282vXQRHGTodQ_cmf4mawcSqfYgZ-4QwZueUS0)**

แตกไฟล์แล้วทำตาม [ตั้งค่าครั้งแรก](first-setup.md) เพื่อวางแต่ละส่วนให้ถูกที่ (pack เข้า provider,
`config.yml` / `crates.yml` / `theme.yml` เข้า `plugins/CradGacha/`)
:::

## ขั้นที่ 3 — รีสตาร์ทเซิร์ฟ

ใช้การ **รีสตาร์ทเต็ม** ไม่ใช่แค่ `/reload`:

- ใน console พิมพ์ `stop` แล้วเปิดเซิร์ฟใหม่
- หรือกดปุ่ม **Restart** ใน panel ของโฮสต์

ตอนเปิดควรเห็น log ประมาณนี้:

```
[CradGacha] CradGacha enabled! Loaded 3 crate(s).
[CradGacha] Integrations -> ItemsAdder: found | ... | packetevents: found
```

## ขั้นที่ 4 — ตรวจสอบ

ในเกม (เป็น operator) รัน:

```
/gacha doctor
```

ทุกบรรทัดควรขึ้น ✓ สีเขียว ถ้ามีบรรทัดไหนเป็น ✗ สีแดง ข้อความจะบอกวิธีแก้
ดูเพิ่มที่หน้า [แก้ปัญหา](troubleshooting.md)

แล้วเปิดเมนู:

```
/gacha
```

## หมายเหตุเรื่อง resource pack

รูปปุ่ม/เคอร์เซอร์ และโมเดลรางวัลมาจากตัวให้ custom item ที่คุณใช้ CradGacha อ่านค่าแต่ละช่อง
ตาม **prefix ของ namespace** ดังนั้น theme/config ผสมหลายตัวได้อิสระ:

| prefix ใน config | ตีความเป็น |
|---|---|
| `nexo:<id>` | item ของ **Nexo** |
| `oraxen:<id>` | item ของ **Oraxen** |
| `mmoitems:<TYPE>:<id>` (เช่น `mmoitems:SWORD:CUTLASS`) | item ของ **MMOItems** |
| `<namespace>:<id>` (เช่น `crates_gacha:bg_1`) | item ของ **ItemsAdder** |
| ชื่อ glyph เปล่า ๆ (เช่น `g_open_x1`) | **glyph** — resolve ผ่าน ItemsAdder **หรือ** Nexo |
| material vanilla (เช่น `CHEST`) | item vanilla |

หลังเพิ่ม/แก้รูปหรือไอเทม ให้ rebuild pack ของตัวนั้น:

```
/nexo reload           # Nexo   — โหลด glyph + item ใหม่ และ rebuild pack
/iazip                 # ItemsAdder — แล้ว /iareload
/oraxen reload all     # Oraxen — (หรือ /oraxen reload pack)
```

ผู้เล่นต้อง **ยอมรับ resource pack** ของเซิร์ฟตอนเข้าเกม ไม่งั้นเมนูจะเป็นกล่องสี่เหลี่ยม (□)
CradGacha จะเตือนผู้เล่นที่ปฏิเสธ pack

### การใช้ Nexo (glyph + item)

CradGacha มีชุด glyph และ item model สำหรับ Nexo ให้แล้ว วิธีติดตั้ง:

1. คัดลอก glyph config ไปที่ `plugins/Nexo/glyphs/crates_gacha.yml`
2. คัดลอก texture ไปที่ `plugins/Nexo/pack/assets/crates_gacha/textures/` (เก็บโฟลเดอร์ `font/` ไว้ด้วย)
3. คัดลอก item model ไปที่ `plugins/Nexo/pack/assets/crates_gacha/models/`
4. รัน `/nexo reload` (Nexo จะ auto-assign char ให้แต่ละ glyph และ rebuild pack) แล้ว **เข้าเกมใหม่**

อ้างถึง glyph ใน `theme.yml` ด้วย `type: glyph` (เช่น `value: g_open_x1`) และอ้างถึง item ของ Nexo
ใน `config.yml`/`cursor.yml` ด้วย prefix `nexo:` (เช่น `crosshair-item: "nexo:ui_cursor"`)
ในข้อความ/MiniMessage glyph ใช้ได้เป็น `<glyph:g_open_x1>` หรือแบบย่อ `:g_open_x1:`

---

ถัดไป: [ตั้งค่าครั้งแรก →](first-setup.md)
