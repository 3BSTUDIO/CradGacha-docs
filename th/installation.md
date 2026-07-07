---
title: การติดตั้ง
---

# การติดตั้ง

## สิ่งที่ต้องมี

| สิ่งที่ต้องมี | เวอร์ชัน / หมายเหตุ |
|---|---|
| **ซอฟต์แวร์เซิร์ฟ** | **Paper** 1.21+ (ต้องเป็น Paper เพราะใช้ Paper API) ทดสอบบน 1.21.4–1.21.11 |
| **Java** | **Java 21** ขึ้นไป |
| **packetevents** | **จำเป็น** ใช้ทำ spectator camera freeze ที่ทำให้เมนูเคอร์เซอร์ทำงาน · ใช้เวอร์ชันให้ตรง MC — บน **1.21.9+ ใช้ packetevents 2.13.0+** (ตัวเก่า encode packet ผิด อาจทำผู้เล่นข้างๆ หลุด) |
| **ตัวให้ custom item** | **ไม่บังคับ** ItemsAdder, Nexo หรือ Oraxen ให้ภาพสวยสุด แต่ไม่มีก็ได้ — CradGacha มี **vanilla** pack ที่ render เมนูครบบน MC **1.21.4+** โดยไม่ต้องมี provider เลย เลือกตัวที่ใช้อยู่ (หรือไม่มีก็ได้) |
| **Vault** | จำเป็น**เฉพาะ**ตอนตู้ใช้ค่าเปิดแบบ `MONEY` และต้องมีปลั๊กอินเศรษฐกิจ (เช่น EssentialsX Economy) ด้วย |
| **BetterModel / ModelEngine** | ไม่บังคับ สำหรับอนิเมชันโมเดล 3D ก่อนการ์ดขึ้น |

> ปลั๊กอินเสริมทั้งหมดเรียกใช้ผ่าน **reflection** — ถ้าไม่มี CradGacha ก็ยังเปิดได้

## ขั้นที่ 1 — ติดตั้ง dependency

วางพวกนี้ใน `plugins/` ก่อน แล้วเปิดเซิร์ฟหนึ่งครั้งให้มันสร้างไฟล์:

- `packetevents` (จำเป็น)
- *(ไม่บังคับ)* ตัวให้ custom item — Nexo, ItemsAdder หรือ Oraxen · **ข้ามได้ถ้าจะใช้โหมด vanilla**
- `Vault` + ปลั๊กอินเศรษฐกิจ (เฉพาะถ้าใช้ค่าเปิดแบบ `MONEY`)

## ขั้นที่ 2 — ติดตั้ง CradGacha

1. ดาวน์โหลด **CradGacha jar** — ตัว Free หรือ Premium (ถ้าซื้อ) — จากที่ที่คุณได้ปลั๊กอินมา (หน้าซื้อ / resource page)
2. คัดลอก jar ลง `plugins/` แล้ว **เปิดเซิร์ฟ** — ครั้งแรกจะแตก resource pack ในตัวไปที่ `plugins/CradGacha/packs/`

## ขั้นที่ 3 — รัน `/gacha setup`

คำสั่งเดียวติดตั้ง resource pack ให้ตรงตัวที่คุณมี ในเกม (เป็น operator) หรือจาก console:

```
/gacha setup
```

มันตรวจ provider แล้วจัดการให้:

| ตรวจเจอ | ทำอะไร |
|---------|--------|
| **ItemsAdder** | copy pack → `plugins/ItemsAdder/contents/`, รัน `/iazip` + `/iareload` |
| **Nexo** | copy items/glyphs/assets → `plugins/Nexo/`, รัน `/nexo reload all` |
| **Oraxen** | copy items/glyphs/assets → `plugins/Oraxen/`, รัน `/oraxen reload pack` |
| **ไม่มี** | ใช้ **vanilla** pack + เปิด [built-in host](setup.md) ให้ผู้เล่นได้ pack ตอน join |

ถ้า provider build มาสำหรับ MC ใหม่กว่าเซิร์ฟ (เช่น Nexo 1.23+ บน 1.21.4) setup จะตรวจเจอแล้ว **fallback เป็น
vanilla อัตโนมัติ** — ไม่ค้างอยู่กับเมนูพัง รายละเอียดเต็มที่หน้า [ติดตั้ง & Resource Pack](setup.md)

จากนั้น **rejoin** ให้ client โหลด pack

## ขั้นที่ 4 — ตรวจสอบ

```
/gacha doctor
```

ทุกบรรทัดควรขึ้น ✓ สีเขียว ถ้าเป็น ✗ สีแดง ข้อความจะบอกวิธีแก้ (ดู [แก้ปัญหา](troubleshooting.md) ที่มีวิธีแก้
เมนูเป็นหิน, glyph กล่อง (□), พื้นหลังม่วง-ดำ)

แล้วเปิดเมนู:

```
/gacha
```

## แก้ไข / ผสม provider

แทบไม่ต้องแก้ id เองเลย — `theme.yml` / `cursor.yml` ที่มากับปลั๊กอินอ้างภาพทุกตัวเป็น **token `provider:`**
(เช่น `provider:menu_background`) ซึ่งขยายเป็นค่าตาม `ui.item-provider` ถ้าจะอ้าง item เอง CradGacha อ่านตาม
**prefix ของ namespace**:

| prefix ใน config | ตีความเป็น |
|---|---|
| `provider:<ชื่อ>` | ภาพ UI ในตัวของ provider ที่ใช้อยู่ (แนะนำ) |
| `nexo:<id>` | item ของ **Nexo** |
| `oraxen:<id>` | item ของ **Oraxen** |
| `mmoitems:<TYPE>:<id>` (เช่น `mmoitems:SWORD:CUTLASS`) | item ของ **MMOItems** |
| `crad_gacha:<id>` | item ของ **ItemsAdder** |
| `vanilla:crad_gacha:<id>` | item ธรรมดาที่ถือ component `item_model` (โหมด vanilla) |
| ชื่อ glyph เปล่า ๆ (เช่น `g_open_x1`) | **glyph** (ItemsAdder / Nexo / Oraxen / vanilla font) |
| material vanilla (เช่น `CHEST`) | item vanilla |

ผู้เล่นต้อง **ยอมรับ resource pack** ของเซิร์ฟตอนเข้าเกม ไม่งั้นเมนูจะเป็นกล่อง (□) · CradGacha จะเตือนคนที่ปฏิเสธ

---

ถัดไป: [ติดตั้ง & Resource Pack →](setup.md) · [ตั้งค่าครั้งแรก →](first-setup.md)
