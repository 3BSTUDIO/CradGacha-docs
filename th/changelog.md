---
title: บันทึกการอัปเดต
---

# บันทึกการอัปเดต

## 1.0.2

**ความเสถียร**

- **แก้โมเดลหายหลัง join** บนเซิร์ฟที่มี item provider — host resource pack ในตัวส่ง pack vanilla ทับ pack ของ provider ทำให้เท็กซ์เจอร์ provider/โมเดลหาย ตอนนี้ host ทำงาน **เฉพาะโหมด vanilla** และ `/gacha setup` จะปิดให้เมื่อ pin ItemsAdder/Nexo/Oraxen
- **แก้ "รูโหว่ผี"** (เช่นน้ำแข็ง/บล็อกที่ดูเหมือนหาย) ที่ค้างหลังเปิดตู้ — ระบบเคลียร์ฉากฝั่ง client คืนบล็อกครบทุกหน้าของเมนู ไม่ใช่แค่หน้าสุดท้าย (โลกจริงไม่เคยถูกแก้อยู่แล้ว)
- **แถบ locator** (1.21.9+) ถูกปิดระหว่างเปิดเมนู และคืนค่าถูกต้องตอนปิด/relog
- Multi-player: ซ่อนผู้เล่นคนอื่นและ armor stand ของกล้องจากคนเปิดเมนู เพื่อไม่ให้คนยืนตรงจุดกาชาบัง UI (`cursor.hide-players`)

**เมนู / เปิดการ์ด**

- ของซ้ำแสดง **`+N ✦ Spark` บนการ์ดที่พลิก** แทนข้อความในแชท (ไม่สปอยก่อนเปิด) · ปรับตำแหน่ง/ขนาดที่ `theme.reveal-cards.dup-y` / `dup-scale`
- ประกาศ Epic/Legendary เด้ง **หลัง** พลิกการ์ด
- **Open Again** พลิกการ์ดที่ยังคว่ำก่อน แล้วค่อยเปิดรอบถัดไป
- โมเดล 3D: กำหนดเวลาเล่นต่อ rarity ด้วย `model.durations.<RARITY>` ไม่ให้อนิเมชันยาวโดนตัด
- `/gacha setup` **merge pack ของ ModelEngine** เข้า Nexo/Oraxen/vanilla ให้อัตโนมัติ (ItemsAdder merge เองเมื่อ `allow_other_plugins_resourcepacks: true`)
- แก้ glyph ของ Nexo ที่แสดงเป็นข้อความ `:id:` ดิบในบางป้ายของเมนู

**พรีเมียม — เครื่องมือแก้ไข**

- **Layout editor** ปรับใหญ่: `/gacha layout <ธีม>` แก้ธีมไหนก็ได้ · ปุ่ม **Text** สร้างข้อความติดเมาส์ · ปุ่ม **Image** เปิด Library เลือกรูปให้ element ที่หยิบ · ปุ่ม **Function** ใส่ action เวลากด (เปิดร้าน/spark/wishlist/rates/history ฯลฯ) · แท็บ **All Images** ในไลบรารีรวม font image ทั้งหมดของ provider · ดู [พรีเมียม → Live Layout Editor](premium.md#live-layout-editor-gacha-layout-ธีม)
- **Reward editor:** ปุ่ม **[ Bag ]** เลือกไอเทมของรางวัลจากกระเป๋าโดยไม่ต้องปิดเมนู
- **Config editor:** ชี้เมาส์ที่ชื่อ setting เพื่อดู**ว่ามันทำอะไร**

คีย์ config ใหม่ดูที่หน้า [การตั้งค่า](configuration.md#คีย์ที่เพิ่มใน-1-0-2)

**หมายเหตุ**

- **Developer API** (event + `CradGachaAPI`) ตอนนี้เป็นฟีเจอร์ **พรีเมียม**

## 1.0.1

- เพิ่มความแข็งแรงให้ host resource pack ในตัว (เสิร์ฟหลายเธรด, ตรวจ request เข้มขึ้น) และ extract pack ครั้งแรกปลอดภัยขึ้น

## 1.0.0

- เวอร์ชันแรก
