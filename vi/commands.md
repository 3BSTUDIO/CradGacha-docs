---
title: Các câu lệnh
---

# Các câu lệnh



---

Chỉ có một lệnh gốc: **`/gacha`**. Hệ thống tự động gợi ý lệnh đã được tích hợp sẵn, quản trị viên chỉ cần nhấn **Tab** để xem các lệnh con và tham số có thể sử dụng (các lệnh dành cho quản trị viên, sẽ chỉ hiển thị với người có quyền quản trị).

| Lệnh | Công dụng | Quyền |
|---|---|---|
| `/gacha` | Mở giao diện chọn rương | Tất cả người chơi |
| `/gacha open <crate> [1\|10]` | Mở rương trực tiếp không cần qua giao diện (tốn chi phí + có thời gian chờ) | Tất cả người chơi |
| `/gacha history` | Xem lịch sử quay gần đây của bản thân + số lần bảo hiểm hiện tại của từng rương (cần bật `reward-log.enabled`). | Tất cả người chơi |
| `/gacha fix [player]` | Khắc phục trạng thái bị kẹt (cho bản thân hoặc người chơi khác) - đặt lại camera, góc nhìn và chế độ chơi nếu menu gây lỗi. | Không cần quyền với bản thân · `cradgacha.admin` với người khác |
| `/gacha debug` | Bật hoặc tắt hiển thị tọa độ con trỏ trên màn hình (yêu cầu giao diện đang mở). | Tất cả người chơi |
| `/gacha reload` | Tải lại các tệp `config.yml`, `crates.yml`, `cursor.yml`, `theme.yml` và giao diện. | `cradgacha.admin` |
| `/gacha doctor` | Chạy kiểm tra tình trạng thiết lập của máy chủ (PacketEvents, ItemsAdder, glyph, Vault, crate, gói tài nguyên và các plugin tùy chọn như CraftEngine, Nexo, Oraxen, ModelEngine hoặc BetterModel). | `cradgacha.admin` |
| `/gacha token <player>` · `give`/`take`/`set <player> <amount>` | Xem / thêm / lấy / đặt lại số dư điểm token của người chơi. | `cradgacha.admin` |

### Lệnh bản Premium

Những lệnh này chỉ có trên phiên bản [Premium](/premium) (bản miễn phí sẽ hiện thông báo gợi ý nâng cấp):

| Lệnh | Công dụng | Quyền |
|---|---|---|
| `/gacha edit <crate>` | Mở bộ chỉnh sửa phần thưởng + thiết lập rương ngay trong máy chủ. | `cradgacha.admin` |
| `/gacha create <id>` | Tạo một rương mới ngay trong máy chủ, và mở luôn giao diện chỉnh sửa cho rương đó. | `cradgacha.admin` |
| `/gacha key give <player> <crate> [amount]` | Trao chìa khóa rương cho người chơi (sẽ mở miễn phí, không tốn phí). | `cradgacha.admin` |
| `/gacha stats [crate]` | Thống kê tỉ lệ rơi đồ thực tế + danh sách người chơi mở nhiều nhất (lấy dữ liệu từ nhật ký phần thưởng). | `cradgacha.admin` |
| `/gacha layout [theme]` | Mở trình chỉnh sửa bố cục theo thời gian thực — cho phép kéo thả các thành phần giao diện, sửa văn bản, chọn hình ảnh từ Thư viện (Library) và thiết lập hành động khi nhấp. Nếu cung cấp tên giao diện, trình chỉnh sửa sẽ chuyển sang giao diện đó để chỉnh sửa. | `cradgacha.admin` |
| `/gacha config` | Trình chỉnh sửa cấu hình chung ngay trong game — điều chỉnh tốc độ chuột, giới hạn con trỏ, tỉ lệ giao diện, hiệu ứng và độ hiếm (bao gồm cả hiệu ứng phát sáng) mà không cần chỉnh sửa tệp YAML. **Rê chuột lên từng thiết lập để xem mô tả chi tiết.** | `cradgacha.admin` |
| `/gacha import <url> [name]` | Tải trực tiếp tệp ảnh PNG hoặc ảnh động GIF, vào gói tài nguyên đang dùng (ảnh GIF sẽ tự động tách thành các khung hình chuyển động). Xem thêm [Hiệu ứng chuyển động](/animations). | `cradgacha.admin` |
| `/gacha import file <filename> [name]` | Tương tự lệnh trên, nhưng nhập từ tệp trong thư mục `plugins/CradGacha/import/` (trên các máy chủ không có kết nối Internet). | `cradgacha.admin` |

## Ví dụ minh họa

Mở giao diện:

```
/gacha
```
<!-- VN-QUESTION:
Should `starter` be kept as-is, or is it intended to be translated?
-->

Mở trực tiếp rương `starter` 10 lần:

```
/gacha open starter 10
```

Thêm cho người chơi 100 điểm token (chạy thẳng được từ console - rất tiện khi kết nối với hệ thống nạp thẻ):

```
/gacha token give Steve 100
```

Kiểm tra số dư điểm token của người chơi:

```
/gacha token Steve
```

Tải lại phần mềm, sau khi chỉnh sửa tệp thiết đặt YAML:

```
/gacha reload
```

## Lưu ý

- Lệnh **`/gacha open`** vẫn kiểm tra đầy đủ các điều kiện: chi phí mở, thời gian chờ, chỗ trống trong túi đồ, và quy tắc "phải đứng trên mặt đất" (xem [Cấu hình](configuration.md)). Khi mở rương từ **giao diện**, quy tắc kiểm tra mặt đất sẽ được bỏ qua vì người chơi lúc đó đang ở chế độ quan sát tạm thời.
- Các lệnh con của **token** có thể chạy trực tiếp từ **cửa sổ lệnh console của máy chủ**. Đây là cách các cửa hàng trực tuyến (như Tebex, plugin ủng hộ/nạp thẻ) cộng điểm token tự động — thiết lập cửa hàng chạy lệnh `gacha token give {player} <amount>` khi mua thành công.
- Lệnh `/gacha token give` hoạt động bình thường kể cả khi người chơi nhận điểm **đang ngoại tuyến (offline)**.

---

Tiếp theo: [Phân quyền →](permissions.md)