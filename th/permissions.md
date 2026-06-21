---
title: สิทธิ์
---

# สิทธิ์ (Permissions)

[🏠 หน้าแรก](index.html) · [🇬🇧 Read in English](../en/permissions.html) · [🌐 เลือกภาษา](../index.html)

**หน้าทั้งหมด:** [หน้าแรก](index.html) · [การติดตั้ง](installation.html) · [ตั้งค่าครั้งแรก](first-setup.html) · [คำสั่ง](commands.html) · **สิทธิ์** · [การตั้งค่า](configuration.html) · [ตู้กาชา](crates.html) · [Cursor UI](cursor-ui.html) · [หน้าผลรางวัล](result-panel.html) · [แก้ปัญหา](troubleshooting.html) · [คำถามที่พบบ่อย](faq.html) · [โน้ตนักพัฒนา](developer-notes.html)

---

CradGacha ออกแบบสิทธิ์ให้เรียบง่าย

| permission node | ค่าเริ่มต้น | ให้สิทธิ์ |
|---|---|---|
| `cradgacha.admin` | `op` | คำสั่งแอดมิน: `/gacha reload`, `/gacha doctor`, และ `/gacha token …` ทั้งหมด |

ส่วนที่เหลือ — เปิดเมนู (`/gacha`), เปิดตู้ (`/gacha open`), และ `/gacha debug`
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

ถัดไป: [การตั้งค่า →](configuration.html)
