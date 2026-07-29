---
title: Các câu hỏi thường gặp (FAQ)
---

# Các câu hỏi thường gặp (FAQ)



---

**Hỏi: Người chơi có cần cài mod vào game không?**
Đáp: Không cần nha. Người chơi dùng phiên bản game gốc (vanilla) vẫn chơi bình thường - chỉ cần bấm đồng ý tải gói tài nguyên (resource pack) của máy chủ là xong.

**Hỏi: Tôi có bắt buộc phải cài plugin packetevents không?**
Đáp: Bắt buộc nha, vì giao diện con trỏ chuột cần Plugin này để cố định camera. Không có, thì giao diện sẽ không hoạt động được.

**Hỏi: Tôi có cần cài ItemsAdder / Nexo / Oraxen không?**
Đáp: **Không bắt buộc.** Các plugin này giúp giao diện đẹp mắt, nhưng CradGacha đã đi kèm sẵn một gói tài nguyên **gốc (vanilla)** giúp hiển thị trọn vẹn giao diện (áp dụng cho Minecraft **1.21.4+**). Quản trị viên chỉ cần chạy lệnh `/gacha setup` — plugin sẽ tự dùng hệ thống Quản trị viên đang có, hoặc tự chuyển về bản gốc và hỗ trợ tự động gửi gói tài nguyên cho người chơi. Xem [Cài đặt & Gói tài nguyên](setup.md).

**Hỏi: Plugin vật phẩm của tôi dành cho bản Minecraft mới hơn bản của máy chủ — liệu có chạy được không?**
Đáp: Các plugin vật phẩm thường bị giới hạn theo phiên bản game (ví dụ Nexo 1.23+ yêu cầu MC 1.21.5+). Nếu máy chủ dùng bản cũ hơn, lệnh `/gacha setup` sẽ tự phát hiện plugin không thể tạo vật phẩm và **tự động chuyển sang dùng gói tài nguyên gốc**, giúp giao diện vẫn hoạt động bình thường. Hoặc quản trị viên có thể nâng cấp máy chủ / dùng bản plugin phù hợp.

**Hỏi: Plugin này có chạy được trên Spigot/Bukkit không?**
Đáp: Không nha - plugin yêu cầu máy chủ chạy **Paper** 1.21 trở lên (vì sử dụng các tính năng riêng của Paper).

**Hỏi: Làm sao để thêm một rương mới?**
Đáp: Quản trị viên sao chép một đoạn mã trong tệp `crates.yml`, đổi tên mã định danh (id), chỉnh lại giá tiền và phần thưởng, sau đó gõ lệnh `/gacha reload`. Xem [Danh sách rương](crates.md).

**Hỏi: Làm sao để thay đổi tỉ lệ rơi đồ?**
Đáp: Quản trị viên thay đổi trọng số `weight` của từng độ hiếm trong tệp `config.yml`. Trọng số càng cao = món đồ càng dễ ra. Xem [Cấu hình](configuration.md).

**Hỏi: Điểm token là gì?**
Đáp: Đây là loại tiền tệ có sẵn trong plugin (lưu ở tệp `tokens.yml`) mà Quản trị viên có thể bán trên cửa hàng của máy chủ. Quản trị viên trao cho người chơi bằng lệnh `/gacha token give <player> <amount>`. Các rương có thể đặt chi phí thanh toán bằng `TOKEN`.

**Hỏi: Cửa hàng trực tuyến của tôi có thể tự động cộng token được không?**
Đáp: Có nha. Quản trị viên chỉ cần thiết lập cửa hàng chạy lệnh `gacha token give {player} <amount>` từ cửa sổ lệnh console khi người chơi mua hàng thành công.

**Hỏi: Lựa chọn "Quay tiếp" tốn bao nhiêu chi phí?**
Đáp: Chi phí tính bằng đúng số lượt quay mới tương ứng - hệ thống sẽ trừ chi phí bình thường chứ không miễn phí.

**Hỏi: Tại sao nút Quay lại bị mờ đi khi quay 10 lần?**
Đáp: Đây là thiết kế cố định - người chơi phải lật mở hết cả 10 lá bài thì mới quay lại được. Người chơi có thể bấm nút **Mở tất cả** để lật bài ngay lập tức.

**Hỏi: Người chơi bị văng game giữa chừng khi đang quay — họ có bị mất phần thưởng không?**
Đáp: Không mất. Phần thưởng được lưu ngay từ khoảnh khắc hệ thống quay ra, và sẽ được trao lại ngay khi người chơi vào lại máy chủ hoặc hồi sinh.

**Hỏi: Nút bấm hoặc nhãn chữ bị lệch chỗ. Làm sao để di chuyển chúng?**
Đáp: Quản trị viên chỉnh tệp `theme.yml` (và xem tệp `THEME-REFERENCE.md` để biết toàn bộ danh sách), sau đó chạy lệnh `/gacha reload`.

**Hỏi: Chữ trên giao diện bị lỗi phông tiếng Thái trong phần trò chuyện. Tại sao vậy?**
Đáp: Đó là do phông chữ của gói tài nguyên không hỗ trợ các dấu của ngôn ngữ Thái - không phải lỗi của plugin. Quản trị viên hãy dùng chữ tiếng Anh/tiếng Việt không dấu, hoặc thêm phông chữ hỗ trợ tiếng Thái vào gói tài nguyên.

**Hỏi: Làm sao để di chuyển con trỏ chuột nhanh hơn / di chuyển ra tận mép màn hình?**
Đáp: Quản trị viên tăng chỉ số `sensitivity-x` và mở rộng phạm vi `bounds` trong tệp `cursor.yml`. Xem [Giao diện con trỏ](cursor-ui.md).

**Hỏi: Làm sao để tải lại sau khi chỉnh tệp?**
Đáp: Dùng lệnh `/gacha reload` khi thay đổi các tệp YAML hoặc khởi động lại toàn bộ máy chủ khi thay thế tệp `.jar` mới.

---

Tiếp theo: [Ghi chú cho nhà phát triển →](developer-notes.md)