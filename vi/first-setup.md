---
title: Thiết lập lần đầu
---

# Thiết lập lần đầu



---

Trang này sẽ giúp bạn đi từ bước "vừa cài xong" đến khi "có một rương hoàn chỉnh chạy tốt" chỉ trong vài phút.
Tất cả các tệp bên dưới sẽ tự động được tạo trong thư mục `plugins/CradGacha/` khi plugin chạy lần đầu tiên.

## Các tệp bạn sẽ chỉnh sửa

| Tệp | Chức năng quản lý |
|---|---|
| `config.yml` | Cài đặt chung, ảnh nền, ảnh bìa, cấp độ hiếm của vật phẩm và thời gian chờ để dùng lại. |
| `crates.yml` | Quản lý rương: chi phí mở, phần thưởng, và hệ thống bảo hiểm. |
| `cursor.yml` | Cài đặt cách con trỏ hoặc góc nhìn hoạt động (độ nhạy, giới hạn di chuyển, chế độ). |
| `theme.yml` | Bố cục giao diện (vị trí nút bấm, nhãn chữ, hình ảnh). |

> **Mẹo:** Sau khi chỉnh sửa bất kỳ tệp nào ở trên, bạn chỉ cần gõ `/gacha reload` — không cần khởi động lại máy chủ.

## Bước 1 — Xem rương mẫu ban đầu

CradGacha đi kèm một rương mẫu có tên `starter` trong tệp `crates.yml`. Hãy mở tệp này:

```yaml
starter:
  name: "&a&lDragonJade Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: TOKEN, amount: 1 }     # 1 token mỗi lượt mở
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Dragon Jade Pickaxe", material: "dragon_jade:dragon_jade_pickaxe", amount: 1, rarity: COMMON }
    - { name: "Dragon Jade Sword",   material: "dragon_jade:dragon_jade_sword",   amount: 1, rarity: RARE }
    - { name: "Dragon Jade Shield",  material: "dragon_jade:dragon_jade_shield",  amount: 1, rarity: EPIC }
    - { name: "Dragon Jade Spear",   material: "dragon_jade:dragon_jade_spear",   amount: 1, rarity: LEGENDARY }
```

## Bước 2 — Tự tạo rương của riêng bạn

Sao chép khối cấu hình ở trên, đổi tên khóa (`starter` → ví dụ: `daily`), sau đó thay đổi các giá trị theo ý muốn.
Mẫu rương đơn giản, miễn phí và chỉ chứa các vật phẩm Minecraft mặc định:

```yaml
daily:
  name: "&b&lDaily Crate"
  enabled: true
  icon: CHEST
  display-item: CHEST
  cost: { type: NONE }
  pity: { enabled: false, rarity: LEGENDARY, threshold: 90 }
  rewards:
    - { name: "Diamonds",  material: DIAMOND,     amount: 5, rarity: COMMON }
    - { name: "Emeralds",  material: EMERALD,     amount: 3, rarity: RARE }
    - { name: "Netherite", material: NETHERITE_INGOT, amount: 1, rarity: LEGENDARY }
```

Xem [Crates](crates.md) để biết chi tiết tất cả các tùy chọn (lệnh, biểu tượng, tỷ lệ xuất hiện, cơ chế bảo hiểm).

## Step 3 — Thay đổi chi phí mở

Dòng `cost` sẽ quyết định người chơi cần trả gì mỗi lần mở rương. Hãy chọn một trong các tùy chọn sau:

```yaml
cost: { type: NONE }                               # Miễn phí
cost: { type: ITEM, item: DIAMOND, amount: 1 }     # 1 kim cương mỗi lượt
cost: { type: MONEY, amount: 100 }                 # 100 tiền từ hệ thống Vault
cost: { type: TOKEN, amount: 5 }                   # 5 điểm token có sẵn
```

- `MONEY` yêu cầu cài đặt **Vault** và một plugin quản lý hệ thống tiền tệ kinh tế.
- `TOKEN` là loại tiền tệ được tích hợp sẵn. Bạn có thể cấp token bằng lệnh `/gacha token give <người_chơi> <số_lượng>`
  (xem [Commands](commands.md)).

Khi mở 10 lần cùng lúc (10-pull), tổng chi phí sẽ bằng `số lượng × 10`.

## Step 4 — Thiết lập phần thưởng & độ hiếm vật phẩm

Mỗi phần thưởng sẽ có một `rarity` (mặc định gồm `COMMON`, `RARE`, `EPIC` và `LEGENDARY`). Tỷ lệ xuất hiện của từng cấp độ hiếm được quyết định bởi **trọng số** (`weight`) trong tệp `config.yml`:

```yaml
rarities:
  COMMON:    { color: "&f", weight: 60.0, ... }
  RARE:      { color: "&9", weight: 25.0, ... }
  EPIC:      { color: "&5", weight: 12.0, ... }
  LEGENDARY: { color: "&6&l", weight: 3.0, ... }
```

Trọng số càng cao thì cấp độ hiếm đó càng có tỷ lệ xuất hiện nhiều hơn. Nếu một cấp độ hiếm không có phần thưởng nào, plugin sẽ tự động bỏ qua cấp độ đó. Xem thêm tại [Crates](crates.md).

## Step 5 — Khởi chạy lại và kiểm thử

```
/gacha reload
/gacha
```

- Di chuyển chuột đến rương muốn mở, sau đó nhấp chuột để chọn.
- Nhấp **Open x1** để mở 1 lần hoặc **Open x10** để mở 10 lần.
- Nhấp vào từng thẻ để lật chúng, hoặc dùng **Open All** để lật tất cả (chỉ có khi mở 10 lần).

Nếu giao diện hiển thị các ô vuông rỗng (□), nghĩa là gói tài nguyên hoặc glyphs của bạn chưa được thiết lập đúng. Hãy chạy lệnh `/gacha doctor` và xem mục [Troubleshooting](troubleshooting.md).
<!-- Translator's note for the developer:
Keep the term "glyph" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom font glyphs defined in font JSON files. Translating it to "icon", "character", or "font" would be inaccurate and may confuse server administrators.
-->

---

Tiếp theo: [Commands →](commands.md)
