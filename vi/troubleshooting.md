---
title: Khắc phục sự cố
---

# Khắc phục sự cố



---

> **Bước đầu tiên cho gần như mọi vấn đề:** chạy `/gacha doctor`. Lệnh này sẽ tự động kiểm tra gói tài nguyên, glyphs, Plugin quản lý hệ thống tiền tệ kinh tế, các rương, sau đó chỉ ra chính xác lỗi quản trị viên đang gặp phải.

## giao diện hiện khối xám và/hoặc văn bản thô (`i_token:1`, `1`, `10`) {#stone-menu}

Đây là **lỗi hiển thị phổ biến nhất**, và thường chỉ có một nguyên nhân: **các tài nguyên giao diện tích hợp chưa được tải cho plugin quản lý vật phẩm tuỳ chỉnh mà quản trị viên đang dùng.** Hình nền giao diện, nút bấm và con trỏ là các item-model + font glyphs được thiết kế riêng trong gói tài nguyên của CradGacha. Khi không thể tìm thấy chúng, item-model sẽ bị biến thành khối đá xám mặc định và các ký tự glyphs sẽ hiển thị dưới dạng văn bản ID thô (`i_token:1`, `1`, `10`).

Hãy kiểm tra lần lượt theo các bước sau:

0. **Không dùng CraftEngine / ItemsAdder / Nexo / Oraxen?** Hãy dùng **chế độ vanilla** — thả thư mục `gói tài nguyên/vanilla` vào như một resource gói tài nguyên thông thường của máy chủ và cài đặt `ui.item-provider: vanilla` trong config (bản gói tài nguyên đi kèm `gói tài nguyên/vanilla/CradGacha` đã được cấu hình sẵn). Toàn bộ giao diện sẽ hiển thị tốt **mà không cần plugin quản lý vật phẩm nào** (yêu cầu Minecraft 1.21.4+; người chơi phải chấp nhận tải resource gói tài nguyên). Chế độ `auto` sẽ tự động chọn vanilla khi không tìm thấy cả ba plugin trên.
1. **Cài đặt gói tài nguyên cho plugin quản lý vật phẩm của quản trị viên.** Thả bộ gói tài nguyên tương ứng với plugin quản trị viên dùng — `gói tài nguyên/itemsadder`, `gói tài nguyên/nexo`, `gói tài nguyên/craftengine` hoặc `gói tài nguyên/oraxen` — vào đúng thư mục (xem phần [Cài đặt](installation.md)), sau đó dựng lại gói tài nguyên: với ItemsAdder dùng `/iazip` + `/iareload`, hoặc tải lại gói tài nguyên của Nexo / Oraxen / CraftEngine.
2. **Chỉ định đúng plugin quản lý vật phẩm tuỳ chỉnh trong thiết đặt.** Trong `config.yml`, đặt `ui.item-provider` thành plugin quản trị viên đang dùng (`itemsadder` / `nexo` / `oraxen` / `CraftEngine`) hoặc để `auto`. Các tệp `theme.yml` / `cursor.yml` đi kèm sẽ tham chiếu hình ảnh dưới dạng `provider:<name>` (hoặc id cụ thể như `craftengine:` / `nexo:` / `oraxen:` / `crad_gacha:`) — tiền tố này bắt buộc phải khớp với plugin thực tế đang chạy. Nếu quản trị viên chạy Nexo nhưng trong config lại ghi `oraxen:`, lỗi hiển thị kiểu nào cũng sẽ xảy ra.
3. **Đảm bảo người chơi chấp nhận tải resource gói tài nguyên.** Người chơi bắt buộc phải đồng ý tải resource gói tài nguyên của máy chủ (thử vào lại máy chủ nếu không chắc chắn). Chạy `/gacha doctor` và kiểm tra dòng thông báo về "resource gói tài nguyên".
4. **Cập nhật gói tài nguyên cũ.** Nếu banner và mặt sau của thẻ bài hiển thị bình thường nhưng *hình nền (background)* lại bị biến thành khối đá, bộ gói tài nguyên của quản trị viên là bản cũ chưa có các tile `giao diện_background` / `bg_1..6` — hãy cài đặt lại gói gói tài nguyên mới nhất từ thư mục `gói tài nguyên/`.

::: tip Lưu ý
Ở các phiên bản mới hiện nay, hình ảnh giao diện nếu không bị lỗi tải sẽ được **ẩn đi** (để lộ ra bảng nền màu đen phía sau) thay vì biến thành tường đá xám. Vì vậy, nếu toàn bộ giao diện của quản trị viên bị biến thành đá xám, điều đó đồng nghĩa với việc quản trị viên cũng đang dùng **bản jar cũ** — hãy cập nhật cả plugin lên bản mới nhất. Các ký tự glyph vẫn bắt buộc phải cài gói tài nguyên mới có thể hiển thị.
:::

<!-- Translator's note for the developer:
Keep the term "glyph" untranslated. In the Minecraft resource-gói tài nguyên ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom font glyphs defined in font JSON tệps. Translating it to "icon", "character", or "font" would be inaccurate and may confuse máy chủ administrators.
-->
## Ký tự Glyphs bị biến thành hình vuông (□ / lỗi văn bản) — nút bấm, bảo hiểm, tiền tệ

Hình ảnh vẫn tải bình thường nhưng các ký tự văn bản lại bị biến thành ô vuông trống. Điều này nghĩa là **font chữ glyphs không phải là font mà máy người chơi đã tải**:

- **Xung đột giữa 2 gói tài nguyên (vanilla + plugin vật phẩm tuỳ chỉnh).** Nếu quản trị viên chạy chế độ vanilla *nhưng* đồng thời vẫn cài một plugin quản lý vật phẩm (Nexo/IA/Oraxen/CraftEngine) tự gửi gói tài nguyên riêng của nó, cả hai sẽ cùng định nghĩa tệp `assets/minecraft/font/default.json` và gói tài nguyên của plugin (vốn không chứa các glyph của CradGacha) sẽ được ưu tiên → gây ra lỗi ô vuông. Các bản cập nhật mới nhất đã chuyển toàn bộ glyphs vanilla vào một **font riêng biệt tên là `crad_gacha:default`** để không plugin nào có thể ghi đè — hãy cập nhật plugin và chạy lại lệnh `/gacha setup`.
- **Chưa tải gói tài nguyên hoặc gói tài nguyên bị lỗi thời.** Đảm bảo người chơi chấp nhận tải gói tài nguyên của máy chủ (thoát ra vào lại), và nếu quản trị viên vừa chỉnh sửa gói tài nguyên khiến thuộc tính gói tài nguyên thay đổi — hãy yêu cầu người chơi vào lại máy chủ, để phía người chơi tải xuống bản gói tài nguyên mới.
<!--
Translator note:
I kept both "namespace" and "font" untranslated because they are established technical terms in Minecraft resource packs. Translating them (e.g. "không gian tên" or "phông chữ") could make it harder for users to match the wiki with JSON tệps, documentation, and existing resource pack tutorials.
-->
- **Sai namespace font chữ sau khi chỉnh sửa thủ công.** Các ký tự glyphs nằm trong `crad_gacha:default`; tuyệt đối không di chuyển chúng sang `minecraft:default` nếu máy chủ đang cài các plugin quản lý vật phẩm khác.

## Hình nền bị biến thành sọc caro tím/đen (lỗi mất đồ hoạ)

<!--
Translator note:
I kept "texture" untranslated because it's a well-established technical term in the Minecraft community. Translating it could be confusing when users compare this guide with Minecraft docs or other resource pack tutorials.
-->
Đây là lỗi **thiếu đồ hoạ** của mô hình. Kể từ Minecraft **1.19.3**, đồ hoạ dùng cho item model phải nằm trong các thư mục được **texture atlas** của Minecraft quét. Theo mặc định, các texture nên được đặt trong `textures/item/` và được tham chiếu bằng đường dẫn như `crad_gacha:item/<name>`. Nếu quản trị viên tự tạo hoặc chỉnh sửa resource pack và đặt texture trực tiếp trong `textures/`, Minecraft sẽ không tìm thấy chúng. Hãy di chuyển các texture vào `textures/item/`, sau đó cập nhật lại đường dẫn trong tệp model cho phù hợp. Nếu đang sử dụng gói tài nguyên Vanilla đi kèm CradGacha, quản trị viên cũng có thể tạo lại bằng lệnh `resourcepack/_generate/genresourcepacks.py`. **Lưu ý:** Lỗi này **không ảnh hưởng** đến **ItemsAdder**, **Nexo**, **Oraxen** hoặc **CraftEngine**, vì các plugin này sẽ tự tạo và quản lý texture atlas của riêng chúng khi build resource pack.

## Nexo báo lỗi log "Texture … has bad resolution-ratio"

<!--
Translator note:
I kept the term "mipmapping" untranslated because there isn't a commonly accepted Vietnamese equivalent in game development. Most Minecraft, OpenGL, and graphics documentation also uses "mipmapping" directly, so translating it could make the explanation less recognizable to technically inclined users.
-->
Các thông báo này xuất hiện khi plugin quản lý vật phẩm xử lý resource pack của CradGacha. Nếu quản trị viên chuyển sang chế độ **vanilla** trên một plugin không tương thích, lệnh `/gacha setup` sẽ **tự động xóa** các tệp của provider không còn sử dụng để ngăn các thông báo này xuất hiện trong log. quản trị viên cũng có thể tự xóa các tệp `plugins/<Provider>/{items,glyphs}/crad_gacha.yml` và thư mục `plugins/<Provider>/resourcepack/assets/crad_gacha/`, sau đó tải lại plugin quản lý vật phẩm tuỳ chỉnh. Nếu không gặp vấn đề nào khi sử dụng, quản trị viên có thể **bỏ qua hoàn toàn** các thông báo này.

## Vật phẩm Nexo/Oraxen/CraftEngine không tải được trên Minecraft bản cũ (giao diện xám trên 1.21.4/1.21.7)

<!--
Translator note:
I kept "data component" untranslated because it matches Mojang's official terminology introduced in modern Minecraft versions. Translating it could make it harder to relate the wiki to Mojang documentation and plugin documentation.
-->
<!--
Translator note:
"console" untranslated because it's a widely recognized technical term in the Minecraft server community.
-->
Nếu bảng console hiện lỗi **`NoClassDefFoundError`** (ví dụ: `io/papermc/paper/datacomponent/item/Weapon`) khi CradGacha tải các vật phẩm giao diện, điều đó có nghĩa là **plugin quản lý vật phẩm của quản trị viên được dựng cho phiên bản Minecraft mới hơn phiên bản máy chủ đang chạy**. Ví dụ: Nexo 1.23+ sử dụng data component `minecraft:weapon` chỉ xuất hiện trên **Minecraft 1.21.5+**, vì vậy việc dựng bất kỳ vật phẩm Nexo nào trên máy chủ **1.21.4** sẽ gây lỗi và khiến toàn bộ hình ảnh giao diện trả về kết quả rỗng (gây ra giao diện xám). Đây là lỗi lệch phiên bản giữa plugin quản lý vật phẩm tuỳ chỉnh và Minecraft, không phải lỗi của CradGacha.

Cách khắc phục (chọn 1 trong các cách sau):
- **Cập nhật máy chủ** lên phiên bản mà plugin quản lý vật phẩm yêu cầu (Nexo 1.23+ → cần MC 1.21.5+).
- **Dùng bản dựng của plugin cần thiết phù hợp với phiên bản Minecraft của quản trị viên** (dùng bản Nexo/Oraxen/CraftEngine cũ hơn tương thích với 1.21.4).
- **Chuyển sang chế độ vanilla** — đặt `ui.item-provider: vanilla` + dùng thư mục `resourcepack/vanilla` làm gói tài nguyên cho máy chủ. Chế độ này không cần đến Nexo/Oraxen/CraftEngine và hoạt động tốt trên **1.21.4+**, giúp quản trị viên né hoàn toàn vấn đề lệch phiên bản.

Lệnh `/gacha doctor` sẽ trả kết quả cho vấn đề này ("UI provider is … but none of the CradGacha images resolve"), và dòng nhật ký `Nexo lookup '…' failed: your Nexo version is built for a NEWER Minecraft…` sẽ chỉ rõ nguyên nhân chính xác.

## Plugin không khởi động được

- Kiểm tra console xem có dòng lỗi màu đỏ nào khi khởi động máy chủ không.
- Đảm bảo máy chủ đang chạy **Paper 1.21+** (không dùng Spigot/Bukkit) và **Java 21+**.
- Đảm bảo tệp `.jar` đã được đặt trong thư mục `plugins/` và quản trị viên đã **khởi động lại toàn bộ máy chủ** (không dùng lệnh `/reload`).

## Lệnh không hoạt động

- Các lệnh quản trị (`reload`, `doctor`, `token`) yêu cầu quyền hạn `cradgacha.admin` — quản trị viên cần có quyền `op` hoặc được cấp quyền này (xem phần [Quyền hạn](permissions.md)).
- Nhấn phím **Tab** sau khi gõ `/gacha ` để xem danh sách các lệnh quản trị viên có quyền sử dụng.

## Thiếu plugin bổ trợ (Dependency)

- Lệnh `/gacha doctor` sẽ hiển thị dấu ✗ màu đỏ bên cạnh bất kỳ plugin cần thiết nào đang bị thiếu.
- **packetevents** là plugin bắt buộc phải có để chạy giao diện con trỏ. Không có nó, giao diện sẽ không thể mở đúng cách.
- **ItemsAdder** (hoặc plugin tương đương) cung cấp hình ảnh tuỳ chỉnh; không có nó, giao diện sẽ chỉ hiện các ô vuông (□).
- **Vault** chỉ cần thiết, khi quản trị viên có rương quay thưởng yêu cầu mở với chi phí bằng tiền tệ trong máy chủ (`MONEY`).

## Không nháy vô được / Người chơi bị đá trong khi đang mở giao diện (do phần mềm chống gian lận - AntiCheat)

Nếu thao tác nháy chuột bị vô hiệu hóa sau khi quản trị viên mở rương — hoặc người chơi bị mất kết nối — plugin **anticheat** của máy chủ đang nghi ngờ các gói tin mà giao diện con trỏ sử dụng. Trong console, quản trị viên sẽ thấy các dòng log như `Grim » <player> failed PacketOrderB (x20) pre-attack` tăng liên tục cho đến khi người chơi bị đá.

CradGacha tự động cấp quyền bỏ qua chống gian lận tạm thời trong thời gian người chơi mở giao diện. Nhớ đảm bảo quyền hạn bỏ qua hệ thống chống gian lận của quản trị viên, đã được thêm vào tệp `cursor.yml`:

```yaml
anticheat-exempt-permissions:
  - grim.exempt        # GrimAC (mặc định)
  # - <permission-node-bypass-anticheat-của-quản trị viên>
```

Các quyền này **chỉ** được cấp trong lúc giao diện mở và sẽ tự động thu hồi ngay khi đóng giao diện. Nếu hệ thống chống gian lận của máy chủ dùng tên quyền hạn khác, hãy thêm nó vào danh sách trên (và chạy `/gacha reload`). Quyền `grim.exempt` của GrimAC đã được tích hợp sẵn theo mặc định.

## Những người chơi khác bị mất kết nối khi có người mở rương Gacha

Plugin **quản lý gói tài nguyên của quản trị viên quá cũ so với phiên bản Minecraft đang chạy**. Trên **Minecraft 1.21.9+**, các bản gói tài nguyên trước 1.21.9 mã hóa sai gói tin gửi đến những người chơi, khiến máy chủ lập tức ngắt kết nối người chơi ngay khi có ai đó mở giao diện gacha.

- Cập nhật lên **packetevents 2.13.0+** (phù hợp với phiên bản máy chủ của quản trị viên), khởi động lại máy chủ và thử lại.
- Để xử lý tạm thời, quản trị viên có thể tắt tính năng tạo bản sao nhân vật bằng cách đặt `cursor.body-double: false` trong `cursor.yml`, nhưng khi và chỉ khi, cập nhật packetevent, mới là giải pháp triệt để nhất.

## Xuất hiện đường viền đen giữa các mảnh hình nền

Chỉ một số người chơi thấy các đường kẻ đen mỏng giữa các hình ảnh nền được ghép nối. Những người chơi này đang dùng **phiên bản cũ kết nối vào máy chủ thông qua ViaVersion / ViaBackwards** — trò chơi của họ hiển thị các gói thành phần đồ hoạ nhỏ hơn một chút, dẫn đến việc, xuất hiện các khe hở giữa các mảnh thành phần đồ hoạ.

- Trong tệp `theme.yml`, thử chỉnh `background.tiles.overlap` lên `1.06` (hoặc thử `1.08` nếu vẫn còn các viền mờ). Thao tác này chỉ phóng to kích thước của từng mảnh ảnh mà không làm thay đổi khoảng cách lưới, do đó những người chơi dùng phiên bản chuẩn sẽ không bị ảnh hưởng gì. Sau đó chạy `/gacha reload`.

## Có khối đá / khối xám lơ lửng giữa màn hình giao diện

Có hai nguyên nhân khả thi:

1. **Biểu ngữ của rương trỏ đến một vật phẩm không tồn tại.** Nếu `crates.<id>.banner.item` (hoặc biểu tượng phần thưởng) sử dụng một id/namespace mà gói tài nguyên của quản trị viên chưa có (ví dụ: dùng tên cũ `crad_gacha:` hoặc dùng tiền tố `oraxen:` trong khi máy chủ đang chạy Nexo), phía người chơi sẽ không tìm thấy mô hình và hiển thị khối xám mặc định. Đảm bảo sửa lại ID và tiền tố (`nexo:` / `oraxen:` / `itemsadder` / `craftengine` ) cho khớp với gói tài nguyên của quản trị viên, rồi `/gacha reload`.
2. **Một khối thực tế trong thế giới bị lọt vào màn hình nền.** Kiểu này phải tăng giá trị `clear-area.forward-distance` (ví dụ: lên `16`) để khu vực hình nón phía trước góc nhìn của người chơi cũng được dọn dẹp sạch sẽ khi mở giao diện.

## Giao diện hiện các ô vuông trống (□) / hình ảnh không xuất hiện

Điều này có nghĩa là gói tài nguyên hoặc các glyphs chưa sẵn sàng:

1. Chạy `/gacha doctor` — kiểm tra dòng trạng thái "glyphs registered" và "gói tài nguyên".
2. Trong ItemsAdder, chạy `/iazip` sau đó gõ `/iareload` để build lại gói tài nguyên.
3. Đảm bảo người chơi đã **chấp nhận** tải gói tài nguyên của máy chủ (thoát ra vào lại nếu không chắc chắn).
4. Xác nhận các id glyphs/hình ảnh trong `theme.yml` khớp hoàn toàn với những gì đã đăng ký trong ItemsAdder.

## Mô hình hoặc hình ảnh nhìn bị tối màu

Theo lý thuyết thì không thể nào có chuyện này — thiết lập đã buộc độ sáng luôn ở mức tối đa (`15/15`). Nếu vẫn bị tối, nguyên nhân gần như chắc chắn nằm ở **gói tài nguyên/ mô hình trong ItemsAdder** (ví dụ: texture có đổ bóng sẵn hoặc mô hình chưa được cài đặt thuộc tính tự phát sáng). Lại phải xuất lại mô hình/texture trong ItemsAdder từ đầu thôi.

## Không nhận được phần thưởng

- Mở `crates.yml`, xác nhận rằng rương đó có danh sách `rewards:` và rương đã được bật (`enabled: true`).
- Mỗi phần thưởng cần có `material` (vật phẩm) **hoặc** một danh sách lệnh `commands`. Kiểm tra bảng console xem có cảnh báo "Skipping reward" nào không.
- Nếu túi đồ của người chơi bị đầy, vật phẩm sẽ rơi ngay ở dưới chân.
- Các phần thưởng đã quay ra sẽ được lưu tạm vào tệp `pending.yml`; nếu người chơi bị ngắt kết nối giữa chừng, sẽ tự động nhận lại phần thưởng ngay khi vào lại máy chủ.

## Không bị trừ tiền khi mở rương

- Chi phí bằng tiền (`MONEY`) bắt buộc phải có **Vault** + một plugin quản lý tiền tệ kinh tế (ví dụ: EssentialsX Economy). Hãy chạy `/gacha doctor` để kiểm tra.
- Nếu plugin kinh tế khởi động sau CradGacha, hệ thống vẫn có thể tự nhận diện; nếu không, hãy thử chạy `/gacha reload`.
- Có thể đơn giản là người chơi không có đủ tiền — họ sẽ nhận được thông báo "không đủ tiền" trên khung tin nhắn.

## Quyền hạn không hoạt động

- Xác nhận rằng tên quyền chính xác là `cradgacha.admin`.
- Nếu dùng LuckPerms: kiểm tra bằng lệnh `/lp user <name> permission check cradgacha.admin`.
- Người điều hành máy chủ (OP) mặc định sẽ có quyền này; một số plugin quản lý quyền có thể ghi đè cài đặt mặc định đó.

## Con trỏ chuột không di chuyển tới được các mép màn hình

Đây là giới hạn phía máy chủ đã được biết đến (xem phần [Giao diện con trỏ](cursor-ui.md)). Trong tệp `cursor.yml`:

- Tăng độ nhạy chuột `sensitivity-x` (ví dụ: từ `0.3` lên `0.5`).
- Mở rộng giới hạn `bounds.min-x` / `max-x`.
- Chạy lệnh `/gacha reload`.

## Người chơi bị kẹt ở chế độ Khán giả / góc nhìn bị lỗi

Plugin sẽ tự động khôi phục chế độ chơi và góc nhìn khi đóng giao diện, đồng thời có cơ chế phục hồi qua tệp `gamemode-recovery.yml` để xử lý những trường hợp bị kẹt ở chế độ Spectator sau khi crash máy chủ. Nếu có người chơi bị kẹt:

- Yêu cầu người chơi thoát ra và vào lại máy chủ (cơ chế phục hồi phần thưởng sẽ tự động kích hoạt khi đăng nhập), hoặc dùng lệnh chỉnh lại chế độ thủ công cho họ.
- Đảm bảo plugin **packetevent** đã được cài đặt và cập nhật bản mới nhất (2.13.0+ trên Minecraft 1.21.9+).

##  Cửa hàng Bụi sao - Shop Spark báo lỗi phần thưởng "chưa được cấu hình đúng"

Hệ thống không tìm thấy vật phẩm Bụi sao tương ứng. Mỗi mục trong `spark.items` bắt buộc phải là **hoặc** `reward: "<tên một phần thưởng có sẵn>"` **hoặc** là một cấu hình độc lập gồm có `name:` đi kèm với `item:` hoặc `commands:`. Xem chi tiết tại phần [Rương → Đổi trùng & Spark](crates.md#duplicate-amp-spark-exchange). (Việc đối chiếu tên sẽ tự động bỏ qua mã màu, chữ hoa/thường và khoảng trắng, vì vậy việc đổi tên vật phẩm sẽ không làm hỏng liên kết).

## Trang web tài liệu trên GitHub Pages không hiển thị

- Trên kho lưu trữ (repo) **CradGacha-docs**, vào **Settings → Pages → Source** và chắc chắn rằng quản trị viên chọn **GitHub Actions**. Xem thêm tại bài [Triển khai (GitHub Pages)](deploy.md).
- Kiểm tra tab **Actions** xem có luồng chạy "Deploy Docs (VitePress)" nào bị lỗi không và đọc log của nó.
<!--
Translator note:
I kept GitHub-specific terms (GitHub Actions, commit, push, branch, main, Actions tab) untranslated because they are official GitHub terminology. Translating these keywords could make the instructions harder to follow, especially since the GitHub interface uses these exact names.
-->
- Sau khi bật GitHub Actions, hãy push một commit mới lên nhánh `main` (hoặc kích hoạt thủ công trong tab Actions) để bắt đầu bản dựng đầu tiên của bạn.
- Đường dẫn trực tuyến của quản trị viên sẽ có dạng `https://<tên-của-quản trị viên>.github.io/CradGacha-docs/`.

---

Tiếp theo: [FAQ →](faq.md)