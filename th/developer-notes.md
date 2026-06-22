---
title: โน้ตนักพัฒนา
---

# โน้ตนักพัฒนา (Developer Notes)



---

สำหรับผู้ร่วมพัฒนาและแอดมินที่อยากรู้ลึก สร้างด้วย Gradle (Kotlin DSL), Java 21, Paper API 1.21.4,
packetevents 2.12.2 (compileOnly) ปลั๊กอินเสริมเรียกผ่าน reflection

## Build

```bash
./gradlew build
# ได้ไฟล์: build/libs/CradGacha-1.0.0.jar
```

## โครงสร้าง package

```
com.threebstudio.cradgacha
├─ CradGacha              # ปลั๊กอินหลัก: wiring, merge config, lifecycle
├─ Crate / CrateManager  # โมเดลตู้ + โหลดจาก crates.yml
├─ Reward / Rarity        # record รางวัล + เรต
├─ CostService            # คิดค่าเปิด NONE/ITEM/MONEY/TOKEN, affordableCount()
├─ CooldownManager        # คูลดาวน์ในหน่วยความจำ
├─ DataStore              # data.yml (ตัวนับ pity)
├─ PendingStore           # pending.yml (แจกรางวัลกันหายแม้เซิร์ฟดับ)
├─ TokenStore             # tokens.yml (สกุลเงิน token)
├─ ItemService            # "namespace:id" -> ItemStack (vanilla/Nexo/Oraxen/ItemsAdder)
├─ OpenFlow               # ค่าเปิด + คูลดาวน์ + เช็ค แล้วเริ่มเผยการ์ด
├─ Util                   # ข้อความสี, เอฟเฟกต์/title
├─ cursor/                # เอนจิน hologram-cursor + เมนู
│  ├─ CursorMenuManager   # เอนจินหลัก: spawn page, แช่กล้อง, tick เคอร์เซอร์, คลิก
│  ├─ CursorMenuLoader    # โหลดเมนู YAML (ทางเลือก/legacy)
│  ├─ CursorSession        # สถานะ runtime ต่อผู้เล่น
│  ├─ HologramPage / Hologram / ClickArea / AnimationStep   # โมเดลหน้า
│  ├─ CursorCrateMenu     # เมนูเลือกตู้ (ขับด้วย theme)
│  ├─ CursorRevealMenu    # หน้าเผยการ์ด (โหมด cursor)
│  ├─ CursorResultPanel   # แผง "เปิดอีกครั้ง"
│  └─ CursorRatesMenu     # หน้าเช็คเรท
├─ reveal/                # การเผยการ์ดในโลก (fallback ตอนไม่มี packetevents)
│  ├─ RevealManager / RevealSession / RevealDispatcher
├─ packet/                # ตัวเชื่อม packetevents
│  ├─ CameraLock          # packet หมุนกล้อง + Set Camera
│  └─ CursorInput         # อ่าน yaw/pitch + packet คลิก จาก client
├─ hook/                  # การเชื่อมแบบ reflection
│  ├─ VaultHook / ItemsAdderHook / NexoHook / OraxenHook
│  └─ BetterModelHook / ModelEngineHook
└─ command/GachaCommand   # /gacha + tab completion
```

## การ merge config

`config.yml` เป็นฐาน ส่วน `cursor.yml`, `crates.yml`, `theme.yml` ถูก merge เข้าไปตอนรัน
ใต้ key `cursor.*`, `crates.*`, `theme.*` (flatten เป็น leaf path) ทำให้โค้ดอ่าน config เดียว
ขณะที่แอดมินแก้แยกไฟล์ได้ ตัว `theme.yml` เลือกตาม key `theme:` (ค่าเริ่มต้น `theme.yml`
ไม่งั้น `themes/<ชื่อ>.yml`)

## flow หลัก

1. `/gacha` → `CursorCrateMenu.open` → `CursorMenuManager.openPage`:
   ล็อกผู้เล่น, spawn หน้า hologram, ตั้งค่าแช่กล้อง spectator, เริ่ม tick
2. คลิก **Open** → action ที่ลงทะเบียนเรียก `OpenFlow.startOpen`:
   จำกัดจำนวน, เช็คพื้น/คูลดาวน์/ช่องว่างกระเป๋า, คิดค่าเปิดผ่าน `CostService`
3. `RevealDispatcher.open` → (cursor) `CursorRevealMenu.open` หรือ (fallback) `RevealManager.open`
4. สุ่มรางวัล (`Crate.roll` พร้อม pity จาก `DataStore`) แล้วเขียนลง `PendingStore` (`pending.yml`) **ทันที**
5. การ์ดพลิก เมื่อปิด `PendingStore.deliver` แจกรางวัลให้ผู้เล่น (เช็ค online + มีชีวิต)
   แล้วลบออกจากดิสก์แบบ atomic เพื่อกันแจกซ้ำ

## เทคนิคเคอร์เซอร์ / กล้อง

`mode: spectator` ใช้: ผู้เล่น → gamemode SPECTATOR นั่งบน armor stand ล่องหน (เพื่อให้การหมุนหัว
ยังส่งเป็น packet) + ส่ง packet **Set Camera** ให้วิว render จาก armor stand ที่นิ่ง (วิวแช่)
`CursorInput` อ่าน yaw/pitch ดิบและ packet คลิก เคอร์เซอร์เป็น display entity ที่ขยับทุก tick
การ teardown ครอบ try/catch และมี `gamemode-recovery.yml` หนุนหลัง

## ความปลอดภัยรางวัล

แหล่งความจริงของการแจกคือ `PendingStore` ไม่ใช่ UI รางวัลจึงรอดจากเซิร์ฟดับ หลุด ตาย และ `/reload`
เพราะถูกบันทึกตอนสุ่มและแจกตอน join/respawn/enable

## จุดต่อยอด / ไอเดียอนาคต

- animation preset (pulse/pop/shake) — ตอนนี้ `AnimationStep` มีแค่ scale + glow
- ตัวเลือก billboard/การหมุนของ hologram เพิ่มเติม
- เพิ่มประเภทค่าเปิด หรือ hook PlaceholderAPI
- ทำ content pack ItemsAdder ของตัวเอง (ตอนนี้ใช้ร่วม `crates_gacha:*`)

## เพิ่ม action ของเมนูเอง

`CursorMenuManager.registerAction(name, handler)` ให้ผูก action ใหม่ของ theme ได้โดยไม่แตะเอนจิน
นี่คือวิธีที่ `select_crate`, `open_count`, `open_all`, `open_rates`, `close_menu`, และ `link_url`
ถูกผูกใน `CursorCrateMenu.register`

---

[← กลับหน้าแรก](index.md) · [🌐 เลือกภาษา](index.md)
