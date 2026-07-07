---
title: ติดตั้ง & Resource Pack
---

# ติดตั้ง & Resource Pack

เมนูเคอร์เซอร์ การเปิดการ์ด และ editor ใช้ **item-model** (พื้นหลัง การ์ด เคอร์เซอร์ พาเนล) + **font glyph**
(ปุ่ม pity bar ไอคอนเงิน) ซึ่ง asset มาจาก 2 ทาง:

- **item provider** ที่คุณใช้อยู่ — ItemsAdder, Nexo หรือ Oraxen **หรือ**
- **vanilla pack** ที่มากับปลั๊กอิน — resource pack ธรรมดา ไม่ต้องมี item-provider (MC **1.21.4+**)

คำสั่งเดียว **`/gacha setup`** จัดการให้ตามที่คุณมี

## ติดตั้งคำสั่งเดียว — `/gacha setup`

1. ดรอป jar ลง `plugins/` แล้วเปิดเซิร์ฟ — ครั้งแรกจะแตก pack ในตัวไปที่
   `plugins/CradGacha/packs/{itemsadder,nexo,oraxen,vanilla}` (ถ้าคุณแก้เองไว้ จะไม่ทับ)
2. รัน **`/gacha setup`** (ต้องมีสิทธิ์ `cradgacha.admin`) มันจะ:
   - ตรวจ item provider ของคุณ
   - copy pack ที่ตรงเข้าโฟลเดอร์ของปลั๊กอินนั้น + reload
   - ตั้ง `ui.item-provider` + reload CradGacha

| ตรวจเจอ | setup ทำอะไร |
|---------|-------------|
| **ItemsAdder** | copy → `plugins/ItemsAdder/contents/`, รัน `/iazip` + `/iareload` |
| **Nexo** | copy items/glyphs/assets → `plugins/Nexo/`, รัน `/nexo reload all` |
| **Oraxen** | copy items/glyphs/assets → `plugins/Oraxen/`, รัน `/oraxen reload pack` |
| **ไม่มี** | ใช้ **vanilla** pack + เปิด built-in host (ด้านล่าง) |

จากนั้น **rejoin** ให้ client โหลด pack ใหม่ แล้วเปิดเมนู

## ไม่มี provider? โหมด vanilla + built-in host

ถ้าไม่มี ItemsAdder/Nexo/Oraxen CradGacha ใช้ **vanilla** pack: ไอเทมเมนูเป็น `PAPER` ที่ถือ component
`minecraft:item_model` → resource pack ธรรมดา render ให้ ไม่ต้องมีปลั๊กอิน build อะไร (ใช้ได้ **MC 1.21.4+**)

การส่ง pack ให้ผู้เล่นใช้ **built-in host** — ฟรี + ถาวร host จากเซิร์ฟคุณเอง + อัปเดตอัตโนมัติเมื่อ pack เปลี่ยน
`/gacha setup` เปิดให้เอง ตั้งค่าใน `config.yml`:

```yaml
resource-pack-host:
  enabled: false          # /gacha setup เปิดให้เมื่อไม่มี provider
  port: 8765              # port ที่ว่างและ OPEN (เปิดใน firewall)
  address: auto           # 'auto' = server IP แล้ว public-IP lookup; ใส่ IP/domain เองถ้าเดาผิด
  required: false         # บังคับรับ pack
  prompt: "&6CradGacha &7needs this pack for the menu"
```

ผู้เล่นได้ pack ตอน join แล้วเมนูขึ้น ถ้า bind port ไม่ได้ setup จะพิมพ์ path + SHA-1 ให้ host เอง
(เช่นลากวางที่ `mc-packs.net`)

## Provider build มาสำหรับ MC ใหม่กว่า (fallback อัตโนมัติ)

ปลั๊กอิน item ล็อกเวอร์ชัน เช่น **Nexo 1.23+ ต้องการ MC 1.21.5+** (ใช้ component `minecraft:weapon`) → บน
**1.21.4** build item ไม่ได้ เมื่อ `/gacha setup` เจอแบบนี้จะ **fallback เป็น vanilla อัตโนมัติ** + ลบ copy ของ
provider ที่ใช้ไม่ได้ทิ้ง + เปิด host = ไม่ค้างอยู่กับเมนูพัง (หรือจะอัปเป็น 1.21.5+ / ใช้ provider build ที่ตรง MC ก็ได้)

## บังคับ provider — `ui.item-provider`

```yaml
ui:
  item-provider: auto     # auto | itemsadder | nexo | oraxen | vanilla
  namespace: crad_gacha   # namespace ของ pack (ItemsAdder / vanilla)
```

`auto` เลือก ItemsAdder > Nexo > Oraxen ถ้ามี ไม่งั้น vanilla ใน `theme.yml` / `cursor.yml` ที่มากับปลั๊กอิน
ภาพเขียนเป็น `provider:<ชื่อ>` (เช่น `provider:menu_background`) แล้ว token `provider:` ขยายเป็น prefix ตอนรัน
config ชุดเดียวใช้ได้ทุก provider

## เพิ่มปุ่ม/ภาพเอง

`pack/_generate/genpacks.py` สร้าง pack ทั้ง 4 จาก source เดียว วิธีเพิ่ม: ใส่ texture + model + item/glyph →
รัน generator → อ้างใน `theme.yml` (หรือ layout editor) ด้วย `provider:<ชื่อ>` แนะนำใช้ **glyph** กับไอคอนแบน
(ไม่ต้องยุ่ง atlas) และใช้ **item** (`item_model`) กับพาเนล/การ์ดใหญ่

ดู [แก้ปัญหา](troubleshooting.md) ถ้าเมนูเป็นบล็อกหิน, ม่วง-ดำ, หรือ glyph เป็นกล่อง (□)
