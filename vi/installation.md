---
title: Thiết đặt
---

# Thiết đặt

## Phần mềm yêu cầu 

| Thành phần | Phiên bản / Ghi chú |
|---|---|
| **Nền tảng máy chủ** | **Paper** 1.21 trở lên (bắt buộc dùng Paper vì plugin dùng các tính năng riêng). Đã kiểm tra tốt trên các bản từ 1.21.4 đến 1.21.11. |
| **Phiên bản Java** | **Java 21** hoặc mới hơn. |
| **packetevents** | **Bắt buộc.** Giúp cố định camera ở chế độ quan sát để giao diện con trỏ hoạt động được. Cần dùng phiên bản tương thích với game — với **MC 1.21.9+ bắt buộc dùng packetevents 2.13.0 trở lên** (các bản cũ hơn gửi sai dữ liệu có thể làm người chơi xung quanh bị ngắt kết nối). |
| **Plugin vật phẩm tuỳ chỉnh** | **Tùy chọn.** ItemsAdder, Nexo, CraftEngine hoặc Oraxen mang lại giao diện đẹp mắt nhất, nhưng không bắt buộc — CradGacha có sẵn gói tài nguyên **gốc (vanilla)** hỗ trợ hiển thị toàn bộ giao diện từ bản MC **1.21.4+** mà không cần plugin bổ sung. quản trị viên có thể chọn loại mình đang có (hoặc không dùng loại nào). |
| **Vault** | Bắt buộc **chỉ khi** có rương cần chi phí mở là `MONEY`. Cần đi kèm một plugin quản lý tiền tệ kinh tế (ví dụ EssentialsX Economy). |
| **BetterModel / ModelEngine** | Tùy chọn. Dùng để tạo hiệu ứng mô hình 3D xuất hiện trước khi lật bài. |

> Tất cả các plugin tùy chọn đều được kết nối theo chế độ tự linh hoạt — nếu thiếu chúng, CradGacha vẫn khởi động bình thường.

## Bước 1 — Cài đặt các plugin bổ trợ

Đặt các tệp plugin này vào thư mục `plugins/` trước và khởi động máy chủ một lần để chúng tự tạo tệp cấu hình:

- `packetevents` (bắt buộc)
- *(tùy chọn)* plugin vật phẩm tuỳ chỉnh — Nexo, ItemsAdder, CraftEngine hoặc Oraxen. **Bỏ qua bước này nếu quản trị viên muốn dùng chế độ mặc định gốc (vanilla).**
- `Vault` + plugin quản lý tiền tệ kinh tế (chỉ cần khi dùng chi phí tiền tệ `MONEY`)

## Bước 2 — Cài đặt CradGacha

1. Tải tệp **CradGacha jar** — bản Miễn phí (Free) hoặc bản Premium nếu quản trị viên đã mua từ trang cung cấp plugin.
2. Sao chép tệp jar vào thư mục `plugins/` và **khởi động máy chủ**. Trong lần chạy đầu tiên, plugin sẽ tự giải nén các gói tài nguyên tích hợp vào thư mục `plugins/CradGacha/packs/`.

## Bước 3 — Chạy lệnh `/gacha setup`

Lệnh duy nhất này sẽ tự động thiết lập gói tài nguyên chuẩn xác cho quản trị viên. Nhập lệnh trong máy chủ với quyền OP hoặc từ cửa sổ console:

```
/gacha setup
```

Hệ thống sẽ tự nhận diện plugin vật phẩm tuỳ chỉnh và thực hiện các bước tương ứng:

| Kết quả nhận diện | Hành động hệ thống |
|----------|--------------|
| **ItemsAdder** | Sao chép gói tài nguyên vào `plugins/ItemsAdder/contents/`, tự chạy lệnh `/iazip` + `/iareload` |
| **Nexo** | Sao chép vật phẩm/ký tự/hình ảnh vào `plugins/Nexo/`, tự chạy lệnh `/nexo reload all` |
| **Oraxen** | Sao chép vật phẩm/ký tự/hình ảnh vào `plugins/Oraxen/`, tự chạy lệnh `/oraxen reload pack` |
| **CraftEngine** | Sao chép vật phẩm/ký tự/hình ảnh vào `plugins/CraftEngine/`, tự chạy lệnh `/ce reload` |
| **Không có** | Dùng gói tài nguyên **gốc (vanilla)** và bật [trình tự động gửi gói tài nguyên](setup.md) để người chơi tự tải khi vào game |

Nếu một plugin vật phẩm tuỳ chỉnh được làm cho phiên bản Minecraft mới hơn bản hiện tại của máy chủ (ví dụ Nexo 1.23+ chạy trên MC 1.21.4), hệ thống sẽ tự phát hiện và **tự động chuyển về gói tài nguyên gốc** — đảm bảo giao diện không bao giờ bị lỗi. Xem chi tiết tại trang [Cài đặt & Gói tài nguyên](setup.md).

Sau đó, người chơi chỉ cần **thoát ra vào lại máy chủ** để tải gói tài nguyên.

## Bước 4 — Kiểm tra lại

```
/gacha doctor
```

## Chỉnh sửa / Kết hợp các plugin vật phẩm

<!-- Translator's note for the developer:
Keep the term "namespace" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom namespace defined in font JSON files. Translating it to "icon", "character", or "font" would be inaccurate and may confuse server administrators.
-->
Thông thường, quản trị viên không cần tự chỉnh sửa các ID rương thủ công. Hai tệp `theme.yml` và `cursor.yml` đã sử dụng **`provider:`** để tham chiếu đến tất cả tài nguyên hình ảnh có sẵn (ví dụ: `provider:menu_background`), và chúng sẽ tự động sử dụng namespace được khai báo trong `ui.item-provider`. Nếu muốn tự tham chiếu đến vật phẩm, CradGacha sẽ xác định từng giá trị dựa trên **tiền tố namespace**:

| Tiền tố trong tệp cấu hình | Hệ thống sẽ hiểu là |
|---|---|
| `provider:<name>` | Hình ảnh giao diện đi kèm dành cho plugin đang kích hoạt (khuyên dùng) |
| `craftengine:<id>` | Vật phẩm của **CraftEngine** |
| `nexo:<id>` | Vật phẩm của **Nexo** |
| `oraxen:<id>` | Vật phẩm của **Oraxen** |
| `mmoitems:<TYPE>:<id>` (ví dụ `mmoitems:SWORD:CUTLASS`) | Vật phẩm của **MMOItems** |
| `crad_gacha:<id>` | Vật phẩm của **ItemsAdder** |
| `vanilla:crad_gacha:<id>` | Vật phẩm gốc mang thành phần `item_model` (chế độ gốc vanilla) |
| Mã ký tự đơn (ví dụ `g_open_x1`) | **Ký tự phông chữ (glyphs)** (ItemsAdder / Nexo / Oraxen / CraftEngine / phông mặc định) |
| Mã vật phẩm gốc (ví dụ `CHEST`) | Vật phẩm mặc định của Minecraft |

Người chơi bắt buộc phải **đồng ý tải gói tài nguyên máy chủ** khi tham gia, nếu không giao diện sẽ hiện các ô vuông rỗng (□). Plugin sẽ tự động phát thông báo nhắc nhở nếu người chơi từ chối tải.

---

Tiếp theo: [Cài đặt & Gói tài nguyên →](setup.md) · [Thiết lập lần đầu →](first-setup.md)
