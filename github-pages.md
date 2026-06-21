---
title: Enabling GitHub Pages
---

# How to enable the documentation website (GitHub Pages)

[English](#english) · [ภาษาไทย](#ภาษาไทย)

---

## English

This repository ships a ready-to-publish documentation site in the `docs/` folder.
You only need to flip one switch in your GitHub settings — no installing, no building.

### Steps

1. Push this repository to GitHub (it is already at `https://github.com/3BSTUDIO/CradGacha`).
2. On GitHub, open the repository and click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` and the folder to **`/docs`**, then click **Save**.
6. Wait about 1–2 minutes. GitHub will show a green message with your site URL, for example:
   `https://3bstudio.github.io/CradGacha/`
7. Open that URL. You will see the language picker (English / ไทย).

### Notes

- The site is built with **Jekyll** (the default GitHub Pages engine). You do **not** need to install Jekyll locally.
- The landing page is `docs/index.html`. English pages live in `docs/en/`, Thai pages in `docs/th/`.
- If you change any `.md` file and push it, GitHub rebuilds the site automatically.
- If the site does not appear, see the **Troubleshooting → GitHub Pages** page.

### Viewing locally (optional)

You do not need this, but if you want to preview before pushing:

```bash
# Requires Ruby + Bundler
gem install bundler jekyll
cd docs
jekyll serve
# open http://localhost:4000
```

---

## ภาษาไทย

repo นี้มีเว็บคู่มือที่พร้อมเผยแพร่อยู่ในโฟลเดอร์ `docs/` แล้ว
คุณแค่เปิดสวิตช์เดียวในหน้า Settings ของ GitHub — ไม่ต้องติดตั้งอะไร ไม่ต้อง build เอง

### ขั้นตอน

1. push repo นี้ขึ้น GitHub (ตอนนี้อยู่ที่ `https://github.com/3BSTUDIO/CradGacha` แล้ว)
2. บน GitHub เปิด repo แล้วกด **Settings**
3. เมนูซ้ายมือ กด **Pages**
4. ที่ **Build and deployment → Source** เลือก **Deploy from a branch**
5. ตั้ง **Branch** เป็น `main` และโฟลเดอร์เป็น **`/docs`** แล้วกด **Save**
6. รอประมาณ 1–2 นาที GitHub จะขึ้นข้อความสีเขียวพร้อม URL ของเว็บ เช่น
   `https://3bstudio.github.io/CradGacha/`
7. เปิด URL นั้น จะเจอหน้าเลือกภาษา (English / ไทย)

### หมายเหตุ

- เว็บนี้สร้างด้วย **Jekyll** (เอนจินมาตรฐานของ GitHub Pages) — **ไม่ต้อง**ติดตั้ง Jekyll ในเครื่อง
- หน้าแรกคือ `docs/index.html` หน้าอังกฤษอยู่ใน `docs/en/` หน้าไทยอยู่ใน `docs/th/`
- ถ้าแก้ไฟล์ `.md` แล้ว push ใหม่ GitHub จะ rebuild เว็บให้อัตโนมัติ
- ถ้าเว็บไม่ขึ้น ดูหน้า **Troubleshooting → GitHub Pages**

### ดูในเครื่อง (ไม่บังคับ)

ไม่จำเป็นต้องทำ แต่ถ้าอยากพรีวิวก่อน push:

```bash
# ต้องมี Ruby + Bundler
gem install bundler jekyll
cd docs
jekyll serve
# เปิด http://localhost:4000
```

---

[← Back to language picker](index.html)
