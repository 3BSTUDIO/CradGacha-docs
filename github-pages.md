---
title: Publishing the documentation
---

# How to publish the documentation website

[English](#english) · [ภาษาไทย](#ภาษาไทย)

> **Important:** GitHub Pages is **free only for _public_ repositories**. The CradGacha code repo is
> **private**, and on the Free plan a private repo **cannot** enable Pages.
> The recommended solution is **Option A below: a small separate _public_ repo that contains only the
> docs.** Your plugin source code stays private, and the website is free and public.

---

## English

### Option A — separate public docs repo (recommended, free, keeps code private)

You publish just the `docs/` folder as its own public repository. The code repo stays private.

1. On GitHub, click **New repository**.
   - Name it e.g. **`CradGacha-docs`**
   - Visibility: **Public**
   - Do **not** add a README/license (we'll push our own files)
   - Click **Create repository**
2. From the **project root** (not inside `docs/`), push just the `docs/` folder to the new repo
   using `git subtree`. This keeps everything in your existing private repo — it does **not** create
   a nested git repo, and re-publishing later is a single command.

   ```bash
   # from the CradGacha project root
   # replace <user> with your GitHub username/org (e.g. 3BSTUDIO)
   git remote add docs https://github.com/<user>/CradGacha-docs.git
   git subtree push --prefix docs docs main
   ```

   > `--prefix docs` = publish only the `docs/` folder. The first argument `docs` is the remote name,
   > `main` is the branch on the public repo. Your private code repo is untouched.

3. On the **CradGacha-docs** repo: **Settings → Pages → Build and deployment → Source =
   _Deploy from a branch_**, branch **`main`**, folder **`/` (root)**, then **Save**.
4. Wait 1–2 minutes. Your site appears at:
   `https://<user>.github.io/CradGacha-docs/`
   The landing page lets visitors pick **English / ไทย**.

**To update the docs later:** edit the `.md` files, commit them to your private repo as usual, then
re-publish with one command from the project root:
`git subtree push --prefix docs docs main`.

> Because all links in these pages are **relative**, they work the same whether the site is served
> from a repo root or a `/docs` folder — no link changes are ever needed.

### Option B — make the code repo public

If you don't mind the source being visible, make the main repo **Public**
(Settings → General → Danger Zone → Change visibility), then use **Option C** below.

### Option C — in-repo `/docs` (needs a public repo, or GitHub Pro for a private one)

This is the classic single-repo setup. It works if the repo is **public**, or if you have
**GitHub Pro/Team/Enterprise** (which allows Pages on private repos).

1. Open the repository **Settings → Pages**.
2. **Source = Deploy from a branch**, branch **`main`**, folder **`/docs`**, then **Save**.
3. The site appears at `https://<user>.github.io/CradGacha/`.

### Notes

- The site is built with **Jekyll** (the default Pages engine). You do **not** install anything.
- The landing page is `index.html`; English pages are in `en/`, Thai pages in `th/`.
- If the site doesn't appear, check the repo's **Actions** tab for a failed "pages build and
  deployment", and see **Troubleshooting → GitHub Pages**.

### Viewing locally (optional)

```bash
# Requires Ruby + Bundler
gem install bundler jekyll
cd docs
jekyll serve
# open http://localhost:4000
```

---

## ภาษาไทย

### ทางเลือก A — แยก repo สาธารณะเฉพาะ docs (แนะนำ, ฟรี, code ยัง private)

เผยแพร่เฉพาะโฟลเดอร์ `docs/` เป็น repo สาธารณะของตัวเอง ส่วน repo โค้ดยังคง private

1. บน GitHub กด **New repository**
   - ตั้งชื่อเช่น **`CradGacha-docs`**
   - Visibility: **Public**
   - **อย่า** เพิ่ม README/license (เราจะ push ไฟล์ของเราเอง)
   - กด **Create repository**
2. จาก **รากโปรเจ็ค** (ไม่ใช่ใน `docs/`) push เฉพาะโฟลเดอร์ `docs/` ขึ้น repo ใหม่ด้วย `git subtree`
   วิธีนี้ทุกอย่างยังอยู่ใน private repo เดิม — **ไม่**สร้าง git repo ซ้อน และ re-publish ภายหลังใช้คำสั่งเดียว

   ```bash
   # อยู่ที่ราก CradGacha
   # แทน <user> ด้วยชื่อผู้ใช้/org ของคุณ (เช่น 3BSTUDIO)
   git remote add docs https://github.com/<user>/CradGacha-docs.git
   git subtree push --prefix docs docs main
   ```

   > `--prefix docs` = เผยแพร่เฉพาะโฟลเดอร์ `docs/` อาร์กิวเมนต์แรก `docs` คือชื่อ remote
   > `main` คือ branch บน repo สาธารณะ repo โค้ด private ของคุณไม่ถูกแตะ

3. ที่ repo **CradGacha-docs**: **Settings → Pages → Build and deployment → Source =
   _Deploy from a branch_** branch **`main`** โฟลเดอร์ **`/` (root)** แล้ว **Save**
4. รอ 1–2 นาที เว็บจะอยู่ที่:
   `https://<user>.github.io/CradGacha-docs/`
   หน้าแรกให้ผู้เข้าชมเลือก **English / ไทย**

**อัปเดต docs ภายหลัง:** แก้ไฟล์ `.md` commit เข้า private repo ตามปกติ แล้ว re-publish ด้วยคำสั่งเดียว
จากรากโปรเจ็ค: `git subtree push --prefix docs docs main`

> เพราะลิงก์ในหน้าทั้งหมดเป็น **relative** จึงทำงานเหมือนกันไม่ว่าจะ serve จาก root หรือโฟลเดอร์ `/docs`
> — ไม่ต้องแก้ลิงก์เลย

### ทางเลือก B — เปิด repo โค้ดเป็น public

ถ้าไม่ติดที่ source จะเห็นได้ ก็เปิด repo หลักเป็น **Public**
(Settings → General → Danger Zone → Change visibility) แล้วใช้ **ทางเลือก C** ด้านล่าง

### ทางเลือก C — ใช้ `/docs` ใน repo เดิม (ต้องเป็น public repo หรือมี GitHub Pro ถ้า private)

เป็นแบบ repo เดียวคลาสสิก ใช้ได้ถ้า repo เป็น **public** หรือมี **GitHub Pro/Team/Enterprise**
(ที่อนุญาต Pages บน private repo)

1. เปิด **Settings → Pages** ของ repo
2. **Source = Deploy from a branch** branch **`main`** โฟลเดอร์ **`/docs`** แล้ว **Save**
3. เว็บจะอยู่ที่ `https://<user>.github.io/CradGacha/`

### หมายเหตุ

- เว็บสร้างด้วย **Jekyll** (เอนจินมาตรฐานของ Pages) — **ไม่ต้อง**ติดตั้งอะไร
- หน้าแรกคือ `index.html` หน้าอังกฤษอยู่ใน `en/` หน้าไทยอยู่ใน `th/`
- ถ้าเว็บไม่ขึ้น ดูแท็บ **Actions** ของ repo ว่ามี "pages build and deployment" ที่ล้มเหลวไหม
  และดู **แก้ปัญหา → GitHub Pages**

### ดูในเครื่อง (ไม่บังคับ)

```bash
# ต้องมี Ruby + Bundler
gem install bundler jekyll
cd docs
jekyll serve
# เปิด http://localhost:4000
```

---

[← Back to language picker](index.html)
