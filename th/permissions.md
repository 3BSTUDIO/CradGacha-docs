---
title: สิทธิ์
---

# สิทธิ์ (Permissions)



---

CradGacha ออกแบบสิทธิ์ให้เรียบง่าย

| permission node | ค่าเริ่มต้น | ให้สิทธิ์ |
|---|---|---|
| `cradgacha.admin` | `op` | คำสั่งแอดมิน: `/gacha reload`, `/gacha doctor`, `/gacha token …` และคำสั่งแอดมิน [พรีเมียม](/th/premium) (`edit`, `create`, `key`, `stats`, `layout`) |
| `cradgacha.luck.<N>` | `false` | **VIP luck พรีเมียม** — บูสต์ weight ของ rarity N เปอร์เซ็นต์ (เช่น `cradgacha.luck.10` = +10%) ค่าสูงสุดที่มีชนะ; prefix ปรับได้ (`luck.permission-prefix`) |

ส่วนที่เหลือ — เปิดเมนู (`/gacha`), เปิดตู้ (`/gacha open`), `/gacha history`, `/gacha fix` (ที่ตัวเอง) และ `/gacha debug`
— ใช้ได้กับ **ผู้เล่นทุกคน** ไม่ต้องมีสิทธิ์

## ใครควรมีอะไร

| บทบาท | แนะนำ |
|---|---|
| **ผู้เล่นทั่วไป** | ไม่ต้องมีอะไร ใช้ `/gacha` และเปิดตู้ได้อยู่แล้ว |
| **ทีมงาน/มอด** | ปกติไม่ต้องเพิ่ม เว้นแต่อยากให้แจก token ได้ |
| **แอดมิน/เจ้าของ** | `cradgacha.admin` (ปกติเป็น `op` อยู่แล้ว) |
| **ร้านค้าออนไลน์/console** | console มีสิทธิ์เต็มอยู่แล้ว ระบบร้านจึงรัน `gacha token give …` ได้ |

## วิธีให้สิทธิ์

ด้วยปลั๊กอินสิทธิ์เช่น **LuckPerms**:

```
/lp group admin permission set cradgacha.admin true
/lp user Steve permission set cradgacha.admin true
```

ถ้าไม่ได้ใช้ปลั๊กอินสิทธิ์ operator (`/op`) มีสิทธิ์นี้อยู่แล้วโดยค่าเริ่มต้น

---

ถัดไป: [การตั้งค่า →](configuration.md)
