---
title: CradGacha — Trang chủ
---

# CradGacha



---

## Tổng quan về CradGacha

**CradGacha** là plugin vòng quay gacha (rương may mắn) dành cho các máy chủ Minecraft **Paper 1.21+**.

Thay vì mở một giao diện rương chứa đồ bằng ô vật phẩm thông thường, plugin này sẽ tạo ra một **giao diện 3D nổi (hologram)** ngay trong máy chủ và cung cấp cho người chơi một **con trỏ chuột ảo**. Người chơi có thể di chuyển con trỏ bằng chuột thật để trỏ và nhấp — cảm giác giống hệt như đang trải nghiệm một tựa máy chủ nhập vai thực thụ. Người chơi chỉ cần chọn rương, mở **x1** hoặc **x10**, lật từng lá bài để khám phá phần thưởng, và có thể bấm **Quay tiếp** ngay lập tức mà không cần thoát khỏi màn hình.

CradGacha được tách ra từ một dự án trước đó, chỉ tập trung vào hệ thống con trỏ chuột và được xây dựng lại để hoạt động đơn giản, rõ ràng hơn.

## Plugin này dùng để làm gì?

- Tạo các **rương may mắn / vòng quay gacha** độc đáo cho máy chủ của bạn.
- Mang đến cho người chơi giao diện hiện đại, xịn xò như một client tùy chỉnh — nhưng vẫn chạy mượt mà trên **phiên bản máy chủ gốc (vanilla)** chỉ với gói tài nguyên mặc định (resource pack), không đòi hỏi cài thêm gì.
- Bán các lượt quay bằng **tiền trong máy chủ (Vault)** hoặc **điểm token** có sẵn để người chơi nạp từ cửa hàng.

## Plugin này dành cho ai?

- **Bang chủ** muốn sở hữu hệ thống gacha/rương may mắn chuyên nghiệp và bắt mắt.
- **Quản trị viên mới vào nghề** — chỉ cần chỉnh một vài tệp YAML đơn giản; bộ tài liệu này sẽ hướng dẫn chi tiết từ A đến Z.
- **Mọi loại máy chủ** — kết hợp hoàn hảo với ItemsAdder / Nexo / Oraxen / CraftEngine để có hình ảnh đẹp nhất, hoặc **không cần cài thêm plugin vật phẩm nào** (gói tài nguyên gốc đi kèm vẫn hiển thị trọn vẹn giao diện trên MC 1.21.4+).

---

## Tính năng nổi bật

| Tính năng | Mô tả chi tiết |
|---|---|
| **Giao diện gacha con trỏ** | Giao diện 3D nổi kèm con trỏ chuột ảo (chỉ cần trỏ và nhấp trực tiếp trong máy chủ). |
| **Giao diện Hologram / Display** | Được tạo bằng các Display Entity của Minecraft (văn bản, vật phẩm, hình ảnh), không sử dụng giao diện rương thông thường. |
| **Danh sách chọn rương** | Danh sách rương xếp dọc bên trái; nhấp chọn rương bất kỳ để xem chi tiết. |
| **Mở x1 / x10** | Mở một lá bài hoặc mở 10 lá cùng lúc. Số lượng có thể tuỳ chỉnh trong tệp cấu hình (`max-open`). |
| **Thẻ kết quả** | Các thẻ sẽ lật bằng hiệu ứng xoay theo trục Y để hiển thị phần thưởng người chơi nhận được. |
| **Lật tất cả (chỉ khi quay x10)** | Khi quay 10 lần, người chơi có thể nhấp để lật mở toàn bộ các lá bài còn lại ngay lập tức. |
| **Open Again** | Mở lại với **cùng số lần mở** như lần trước (vẫn sẽ trừ chi phí như bình thường). |
| **Nút quay lại** | Quay về danh sách rương. Khi mở **x10**, nút này chỉ khả dụng sau khi **cả 10 thẻ đã được lật.** |
| **Chi phí & Tiền tệ** | Mỗi rương có thể thiết lập miễn phí `NONE`, tốn vật phẩm `ITEM`, tốn tiền `MONEY` (qua Vault), hoặc dùng điểm `TOKEN` (tích hợp sẵn). |
| **Hệ thống phần thưởng** | Phần thưởng có thể trao vật phẩm, thực thi lệnh hoặc cả hai, đồng thời hỗ trợ tỷ lệ xuất hiện theo từng cấp độ hiếm và cơ chế bảo hiểm. |
| **Điểm Token** | Hệ thống tiền tệ tích hợp sẵn lưu tại `tokens.yml`, quản lý dễ dàng qua các lệnh `/gacha token …`. |
| **Tùy biến giao diện** | Tệp `theme.yml` cho phép quản trị viên di chuyển, thay đổi kiểu dáng từng nút bấm và nhãn chữ mà không cần can thiệp mã nguồn. |
| **Tự kiểm tra** | Lệnh `/gacha doctor` sẽ kiểm tra cấu hình và các thành phần cần thiết như PacketEvents, ItemsAdder, glyphs, Vault, rương và gói tài nguyên. |
<!-- Translator's note for the developer:
Keep the term "glyph" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom font glyphs defined in font JSON files. Translating it to "icon", "character", or "font" would be inaccurate and may confuse server administrators.
-->
| **Lưu phần thưởng tự động** | Phần thưởng sẽ được lưu ngay sau khi quay, nên sẽ không bị mất nếu máy chủ gặp sự cố, người chơi mất kết nối hoặc nhân vật bị chết. |
> ⭐ **Phiên bản Premium** bổ sung bộ chỉnh sửa và tạo rương trực tiếp trong máy chủ, sự kiện tăng tỉ lệ (Rate-Up), độ may mắn theo cấp độ VIP, chìa khóa mở rương, bảng thống kê tỉ lệ, bộ chỉnh giao diện trực quan và Cổng kết nối lập trình API (đồng thời bỏ giới hạn 3 rương). Xem chi tiết tại trang [Premium](/premium).

---

## Bắt đầu nhanh (tóm tắt)

1. Cài đặt plugin **packetevents** (bắt buộc), cùng **Vault** nếu quản trị viên muốn bán lượt quay bằng tiền máy chủ. Các plugin quản lý vật phẩm (ItemsAdder / Nexo / Oraxen / CraftEngine) là tùy chọn.
2. Chép tệp **CradGacha jar** vào thư mục `plugins/` rồi khởi động máy chủ.
3. Chạy lệnh **`/gacha setup`** — hệ thống sẽ tự cài gói tài nguyên phù hợp với plugin vật phẩm quản trị viên muốn dùng (hoặc bản gốc nếu không dùng plugin nào).
4. Chạy lệnh `/gacha doctor` để đảm bảo mọi dòng đều báo xanh, sau đó nhập `/gacha` để trải nghiệm giao diện.

Plugin đã nén sẵn gói tài nguyên và tự giải nén trong lần chạy đầu tiên — quản trị viên chỉ cần chạy lệnh [`/gacha setup`](setup.md). Chi tiết đầy đủ có tại trang [Cài đặt](installation.md) và [Thiết lập lần đầu](first-setup.md).

---

Tiếp theo: [Cài đặt →](installation.md)