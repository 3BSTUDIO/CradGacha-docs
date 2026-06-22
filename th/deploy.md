---
title: เผยแพร่ (GitHub Pages)
---

# เผยแพร่ด้วย GitHub Pages

เอกสารนี้สร้างด้วย **VitePress** และ deploy อัตโนมัติด้วย **GitHub Actions**

## โครงสร้างการตั้งค่า

- repo **โค้ด** ปลั๊กอิน (`CradGacha`) เป็น **private** ส่วน GitHub Pages ฟรีเฉพาะ repo *public*
  เอกสารจึงอยู่ในอีก repo แบบ **public** ชื่อ **`CradGacha-docs`**
- repo สาธารณะนั้นมีโปรเจ็ค VitePress นี้ และ workflow
  (`.github/workflows/deploy-docs.yml`) ที่ build เว็บแล้ว publish ขึ้น Pages

## เปิดใช้งาน (ทำครั้งเดียว)

ที่ repo **CradGacha-docs**:

1. **Settings → Pages → Build and deployment → Source = GitHub Actions**
2. push ขึ้น `main` (หรือกด **Run workflow** ในแท็บ Actions) workflow จะ build VitePress แล้ว deploy
3. เว็บจะออนไลน์ที่ `https://<user>.github.io/CradGacha-docs/`

> ถ้าเปลี่ยนชื่อ repo เอกสาร ให้แก้ `base` ใน `.vitepress/config.mts` เป็น `"/<ชื่อ-repo-ใหม่>/"`

## อัปเดตเอกสาร

แหล่งความจริงคือโฟลเดอร์ `docs/` ใน private repo หลังแก้ Markdown:

```bash
# อยู่ที่รากโปรเจ็ค CradGacha (private)
git add docs && git commit -m "update docs"
git subtree push --prefix docs docs main   # push docs/ -> public repo CradGacha-docs
```

จากนั้น GitHub Actions จะ rebuild และ redeploy ให้อัตโนมัติ

## รันในเครื่อง

```bash
cd docs
npm install
npm run docs:dev      # http://localhost:5173
# หรือ
npm run docs:build    # ผลลัพธ์: .vitepress/dist
npm run docs:preview
```
