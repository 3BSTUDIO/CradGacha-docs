---
title: แก้ปัญหา
---

# แก้ปัญหา (Troubleshooting)

[🏠 หน้าแรก](index.html) · [🇬🇧 Read in English](../en/troubleshooting.html) · [🌐 เลือกภาษา](../index.html)

**หน้าทั้งหมด:** [หน้าแรก](index.html) · [การติดตั้ง](installation.html) · [ตั้งค่าครั้งแรก](first-setup.html) · [คำสั่ง](commands.html) · [สิทธิ์](permissions.html) · [การตั้งค่า](configuration.html) · [ตู้กาชา](crates.html) · [Cursor UI](cursor-ui.html) · [หน้าผลรางวัล](result-panel.html) · **แก้ปัญหา** · [คำถามที่พบบ่อย](faq.html) · [โน้ตนักพัฒนา](developer-notes.html)

---

> **ขั้นแรกของเกือบทุกปัญหา:** รัน `/gacha doctor` มันตรวจ packetevents, ItemsAdder, glyph, Vault,
> ตู้ของคุณ และ resource pack แล้วบอกว่าอะไรผิด

## ปลั๊กอินไม่โหลด

- ดู console ว่ามี error สีแดงตอนเปิดไหม
- เช็คว่าใช้ **Paper 1.21+** (ไม่ใช่ Spigot/Bukkit) และ **Java 21+**
- เช็คว่า jar อยู่ใน `plugins/` และ **รีสตาร์ทเต็ม** (ไม่ใช่ `/reload`)

## คำสั่งใช้ไม่ได้

- คำสั่งแอดมิน (`reload`, `doctor`, `token`) ต้องมีสิทธิ์ `cradgacha.admin` — เป็น `op` หรือให้สิทธิ์
  (ดู [สิทธิ์](permissions.html))
- กด **Tab** หลัง `/gacha ` เพื่อดูว่ามีอะไรให้ใช้บ้าง

## dependency หาย

- `/gacha doctor` จะขึ้น ✗ สีแดงข้างสิ่งที่ขาด
- **packetevents** จำเป็นต่อเมนูเคอร์เซอร์ ถ้าไม่มีเมนูจะเปิดไม่ถูกต้อง
- **ItemsAdder** ให้รูปภาพ ถ้าไม่มีเมนูจะเป็นกล่อง (□)
- **Vault** ต้องมีเฉพาะตู้ค่าเปิดแบบ `MONEY`

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

เป็นข้อจำกัดฝั่งเซิร์ฟที่รู้กัน (ดู [Cursor UI](cursor-ui.html)) ใน `cursor.yml`:

- เพิ่ม `sensitivity-x` (เช่น `0.3` → `0.5`)
- ขยาย `bounds.min-x` / `max-x`
- รัน `/gacha reload`

## ผู้เล่นค้าง spectator / กล้องเพี้ยน

ปลั๊กอินจะคืน gamemode และกล้องเมื่อปิดเมนู และมีไฟล์กู้คืน (`gamemode-recovery.yml`) ที่ซ่อม
คนที่ค้าง spectator หลังเซิร์ฟดับ ถ้ามีคนค้าง:

- ให้เข้าเกมใหม่ (การกู้คืนทำงานตอน join) หรือตั้ง gamemode ด้วยมือ
- เช็คว่า **packetevents** ติดตั้งและเวอร์ชันใหม่

## เว็บ GitHub Pages ไม่ขึ้น

- ใน **Settings → Pages** ต้องตั้ง **Source** เป็น **Deploy from a branch** branch `main` โฟลเดอร์
  **`/docs`** ดู [วิธีเปิด GitHub Pages](../github-pages.html)
- รอ 1–2 นาทีหลัง Save ครั้งแรก build ใช้เวลาสักครู่
- ดูแท็บ **Actions** ว่ามี run "pages build and deployment" ที่ล้มเหลวไหม
- URL ของเว็บคือ `https://<ชื่อผู้ใช้>.github.io/CradGacha/`

---

ถัดไป: [คำถามที่พบบ่อย →](faq.html)
