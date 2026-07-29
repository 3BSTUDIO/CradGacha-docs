# Premium

<a class="buy-card" href="https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53" target="_blank" rel="noreferrer">
  <span class="desc">Mua CradGacha Premium — $14.99 · Trả một lần, không phí duy trì</span>
  <span class="title">Mua trên MineAssets →</span>
</a>

**Bản miễn phí đã là một hệ thống gacha hoàn chỉnh. Nhưng bản Premium mới là công cụ giúp máy chủ của quản trị viên tạo ra doanh thu.**

Banner tăng tỉ lệ (Rate-up), chìa khoá bán trong shop và chỉ số may mắn theo Rank là 3 yếu tố cốt lõi giúp các game gacha thực thụ kiếm tiền. Bản Premium bổ sung cả ba tính năng này, cho phép quản trị viên tự do thiết kế lại giao diện và quản lý toàn bộ hệ thống ngay trong game mà không cần động đến một dòng tệp YAML nào.

---

## Kiếm tiền từ đam mê nhân phẩm Gacha

### Sự kiện tăng tỉ lệ (Rate-Up)

**Thúc đẩy doanh thu.** Khi quản trị viên lên lịch một khung giờ vàng tăng tỉ lệ ra đồ hiếm, menu gacha sẽ tự động đếm ngược thời gian thực (`⚡ RATE UP — kết thúc sau 2d 5h`). Một khung giờ sắp khép lại chính là hiệu ứng tâm lý biến một người chơi *tính đợi lúc rảnh mới mở rương* thành người phải mở ngay trong đêm.

```yaml
# crates.yml — cấu hình cho từng rương
event:
  start: "2026-07-10 18:00"   # không bắt buộc - bỏ trống nếu muốn bật vĩnh viễn
  end:   "2026-07-17 23:59"
  rate-up: { LEGENDARY: 2.0, EPIC: 1.5 }   # hệ số nhân tỉ lệ khi sự kiện diễn ra
```

- Trang thông tin tỉ lệ **và** trình giả lập sẽ tự động hiển thị phần trăm đã được tăng lên.
- Tuỳ chỉnh vị trí và định dạng thời gian đếm ngược qua `theme.event-line`, hoặc gắn biến `{event}` vào bất kỳ ký tự văn bản nào trong theme.
- Chỉnh sửa toàn bộ ngay trên giao diện Cài đặt trong game (trang 3) — chạy sự kiện mới mà không cần mở tệp.

### Chìa khoá Rương 

**Sản phẩm thương mại chủ lực cho cửa hàng.** Chìa khoá cho phép mở rương miễn phí mà không tốn tiền hay token — 1 chìa = 1 lần mở (10 chìa = 10 lần mở). Người chơi không có chìa khoá sẽ phải trả phí theo quy định của rương như bình thường.

```yaml
# crates.yml — cấu hình cho từng rương
cost: { type: MONEY, amount: 100 }
key: "crad_gacha:starter_key"     # hoặc dùng vật phẩm vanilla, VD: key: TRIPWIRE_HOOK
```

- Lệnh **`/gacha key give <player> <crate> [amount]`** được thiết kế để kết nối trực tiếp với các webshop — Tebex, CrazyVouchers, hay bất kỳ plugin nào thực thih lệnh console khi người dùng mua hàng.
- Cài đặt vật phẩm làm chìa khoá ngay tại trang **Keys** trong giao diện Cài đặt (hoặc trong `crates.yml`), đồng thời quản trị viên có thể tự lấy chìa khoá test ngay tại đó.
- Rương miễn phí (phí `NONE`) sẽ không bao giờ tiêu tốn chìa khoá. Nếu mở thất bại, hệ thống sẽ hoàn lại chìa khoá.

### May mắn cho đặc quyền VIP

**Nâng giá trị cho các gói đặc quyền Rank trên máy chủ.** Quyền lợi tăng tỉ lệ ra đồ hiếm dựa trên quyền hạn của người chơi, tự động áp dụng cho mọi lần quay rương.

```yaml
# config.yml
luck:
  enabled: true
  permission-prefix: "cradgacha.luck."
  rarities: [EPIC, LEGENDARY]     # các độ hiếm được áp dụng buff
```

<!-- Translator's note for the developer:
Keep the term "placeholder" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "placeholder" is a technical term referring to custom papi defined in JSON files. Translating it to "biểu tượng" would be inaccurate and may confuse máy chủ administrators.
-->
Cấp quyền `cradgacha.luck.10` (= +10%), `cradgacha.luck.25`... thông qua plugin quản lý đặc quyền Rank của máy chủ — nếu người chơi có nhiều đặc quyền, hệ thống sẽ tự động lấy mốc cao nhất. Hiển thị chỉ số này cho người chơi thấy bằng placeholder `{luck}` trong các ký tự văn bản của giao diện.

---

## Tuỳ biến theo phong cách riêng

### Giao diện ảnh động — Chỉ cần kéo thả tệp GIF

<!-- Translator's note for the developer:
Keep the term "glyph" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom font glyphs defined in font JSON files. Translating it to "icon", "character", or "font" would be inaccurate and may confuse máy chủ administrators.
-->
Thả một tệp GIF vào máy chủ, và tệp đó sẽ lập tức biến thành giao diện ảnh động — CradGacha tự động cắt các khung hình, đăng ký glyphs và thiết lập trực tiếp vào gói tài nguyên máy chủ. Không cần chỉnh sửa thủ công.
Xem chi tiết tại **[Animations](/animations)**.

### Trình chỉnh sửa bố cục trực tiếp — `/gacha layout [theme]`

Tự do thiết kế lại giao diện bằng chuột thay vì ngồi dò từng con số `x`/`y` thủ công — giúp giao diện gacha mang đậm *dấu ấn máy chủ của quản trị viên*, không bị đụng hàng với mẫu mặc định.

- `/gacha layout` sẽ chỉnh sửa **giao diện đang được sử dụng**; `/gacha layout <name>` sẽ chuyển sang và chỉnh sửa giao diện đó (hỗ trợ tự động gợi ý khi nhấn Tab). Nếu muốn giữ nguyên giao diện mặc định, hãy sao chép một giao diện mới bằng **`/gacha config` → Theme → Clone** trước khi chỉnh sửa.
- Mở giao diện rương ở **chế độ chỉnh bố cục**. Nhấp vào một thành phần của giao diện để nhấc nó lên (thành phần sẽ đi theo con trỏ chuột), sau đó nhấp lần nữa để đặt xuống vị trí mong muốn.
- Nút **Save** sẽ lưu tọa độ/giao diện/chức năng mới vào tệp `theme.yml` (các tùy chỉnh riêng của rương sẽ ghi vào `crates.yml`); nút **Exit** hủy bỏ mọi thay đổi.

#### Thanh công cụ trên cùng (khi chưa chọn thành phần nào)

| Nút | Chức năng |
|---|---|
| **Undo** / **Redo** | Hoàn tác / Làm lại từng bước chỉnh sửa |
| **Save** | Lưu thay đổi vào tệp `.yml` |
| **Library** | Mở cửa sổ **Thư viện nút**. |
| **Text** | Tạo một **thành phần văn bản** mới. Thành phần sẽ đi theo con trỏ chuột; nhấp để đặt vào vị trí mong muốn. |
| **Exit** | Hủy các thay đổi và thoát. |

#### Thanh công cụ khi đang di chuyển một thành phần (thành phần đang đi theo con trỏ chuột)

| Nút | Chức năng |
|---|---|
| **Bigger** / **Smaller** | Phóng to / Thu nhỏ thành phần đang cầm (mỗi lần thay đổi 0.05). |
| **Delete** | Xóa thành phần đang cầm. |
| **Duplicate** | Tạo một bản sao của thành phần đang cầm, và tiếp tục chỉnh sửa bản sao đó. |
| **Image** | Mở **Thư viện** và nhấp vào một hình ảnh để áp dụng cho thành phần đang cầm. |
| **Function** | Gán hành động khi nhấp vào thành phần (xem bảng bên dưới). Nhập `none` để xóa chức năng. |

<!-- Translator's note for the developer:
Keep the term "glyph" untranslated. In the Minecraft resource-pack ecosystem (ItemsAdder, Nexo, Oraxen, CraftEngine.), "glyphs" is a technical term referring to custom font glyphs defined in font JSON files. Translating it to "icon", "character", or "font" would be inaccurate and may confuse máy chủ administrators.
-->
- **Thư viện nút (Button Library)** — Hiển thị tất cả các nút được định nghĩa trong `theme.yml` (được chia theo các tab: **All**, **Main**, **Reveal**, **Sub Pages** và **Custom**). Nhấp vào một nút để tạo một bản sao, hoặc khi đang ở chế độ **Image**, nhấp để áp dụng hình ảnh của nút đó cho thành phần đang cầm. Nút **[ + Add ]** cho phép đăng ký một nút glyphs mới bằng cách thêm `font_image` vào gói tài nguyên của ItemsAdder (sau đó chỉ cần chạy `/iazip`). Nút **[ - Remove ]** dùng để hủy đăng ký các nút glyphs do quản trị viên tạo ra.

#### Các chức năng của thành phần (nút **Function**)

Gán một trong các chức năng dưới đây để biến thành phần văn bản hoặc hình ảnh thành một nút bấm có thể sử dụng. Thiết lập sẽ được lưu vào `theme.yml` dưới `elements.<id>.action` (và `param` nếu có), đồng thời tự động tạo vùng nhấn mặc định để người chơi có thể nhấp vào.

| Thao tác | Chức năng | Tham số |
|--------|----------------------|-------|
| `open_shop` | Mở **Token Shop**. | — |
| `open_spark` | Mở **Spark Exchange**. | — |
| `open_wishlist` | Mở **Wishlist**. | — |
| `open_rates` | Mở trang xem tỷ lệ nhận phần thưởng. | — |
| `open_history` | Mở lịch sử quay của người chơi. | — |
| `open_count` | Mở rương với số lượt quay được chỉ định. | `<crate>:<count>` (ví dụ: `starter:10`) |
| `open_all` | Mở số lượt quay tối đa trong một lần. | ID của rương (không bắt buộc) |
| `back_to_menu` | Quay lại danh sách rương. | — |
| `close_menu` | Đóng toàn bộ giao diện. | — |
| `link_url` | Gửi cho người chơi một liên kết có thể nhấp trong khung chat. | Một đường dẫn trực tuyến |

> **Lưu ý:** Thanh công cụ được tạo từ một hình ảnh duy nhất, sau đó chia thành các ô có kích thước bằng nhau. Nếu quản trị viên thiết kế lại `layout_edit.png` hoặc `layout_edit_1.png` với kích thước khác, nhớ cập nhật `theme.layout-editor.bar-aspect` hoặc `mbar-aspect` (chiều rộng ÷ chiều cao) để ảnh không bị hỏng.

---

## Nói không với việc chỉnh YAML thủ công

Toàn bộ các tính năng trên — cùng mọi phần thưởng, chi phí, bảo hiểm và tỉ lệ rớt đồ — đều có thể chỉnh sửa trực tiếp trong máy chủ thông qua bảng điều khiển con trỏ.

### Trình chỉnh sửa Phần thưởng trong game — `/gacha edit <crate>`

Chỉnh sửa toàn bộ phần thưởng của rương ngay trong game — không cần mở tệp văn bản YAML, không cần dùng lệnh reload.

- **Danh sách phần thưởng** — Hiển thị tất cả phần thưởng dưới dạng lưới biểu tượng. Di chuột lên một phần thưởng để xem tên và mô tả, sau đó nhấp để chỉnh sửa.
- **Mỗi phần thưởng (trang 1):** Chỉnh sửa tên, vật phẩm, số lượng, độ hiếm, có miễn chuyển thành Spark khi trùng lặp hay không và các lệnh sẽ thực thi (thêm/xóa).
- **Mỗi phần thưởng (trang 2):** Chỉnh kích thước hiển thị của thẻ, **tin nhắn nhận thưởng** (trong khung chat) và **tiêu đề nhận thưởng** (dòng chữ lớn ở giữa màn hình), hỗ trợ placeholder `{reward}` và `{player}`.
- **Set from held item** — Nhấp vào ô xem trước để sao chép vật phẩm quản trị viên đang cầm (tự động nhận diện ItemsAdder, Nexo, Oraxen, MMOItems hoặc vật phẩm Minecraft mặc định).
- **[ Inventory ]** — Chọn vật phẩm làm phần thưởng trực tiếp từ **túi đồ** của quản trị viên dưới dạng lưới, giúp thiết lập nhiều vật phẩm khác nhau mà không cần đóng giao diện để đổi vật phẩm đang cầm.
- **[ + Add ]** để thêm phần thưởng mới, **[ Delete Reward ]** để xóa phần thưởng, **[ 🎲 Test 1000 ]** để mô phỏng 1.000 lượt quay (xem **Simulator**), hoặc **[ ⚙ Settings ]** để mở cài đặt.
- **[ Reset ]** (góc trên bên phải) — Hủy tất cả thay đổi chưa lưu và tải lại dữ liệu rương từ `crates.yml`. Cần nhấp hai lần (hệ thống sẽ hỏi *Discard changes?* trước) để tránh thao tác nhầm.
- **Submit & Save** sẽ lưu thay đổi vào `crates.yml` và tải lại plugin. Trên Minecraft 1.21.6+, việc nhập văn bản sử dụng **Dialog API** (ô nhập văn bản Dialogs gốc của trò chơi); trên các phiên bản cũ hơn sẽ tự động chuyển sang chế độ nhập qua khung chat.

### Trình thiết đặt Rương

Truy cập qua nút **[ ⚙ Settings ]** trong trình chỉnh sửa — một bảng điều khiển gồm 4 trang bao quát (gần như) toàn bộ cấu hình của rương:

1. **General / Cost / Pity** — Chỉnh sửa tên, bật/tắt rương, loại và chi phí mở, cơ chế bảo hiểm (bật/tắt, độ hiếm, số lượt kích hoạt) và vật phẩm hiển thị.
<!--
Translator note:
I kept "Spark" untranslated because I'm not sure whether it's a proper noun or just a currency name.
I considered translating it as "Bụi sao", but I'd like to confirm the intended meaning first.
-->
2. **Drops / Extras** — Chỉnh sửa thông báo toàn máy chủ, thiết lập cách xử lý khi quay trúng phần thưởng trùng lặp (đổi thành Bụi sao và số Bụi sao nhận được), cài đặt Wishlist (bật/tắt, số lượng tối đa, độ hiếm) và Cửa hàng Bụi sao - Spark Shop (tiêu đề, trang vật phẩm Bụi sao).
3. **Rate-Up Event** — Thiết lập thời gian bắt đầu, thời gian kết thúc + hệ số tăng tỷ lệ rơi cho từng độ hiếm.
4. **Keys** — Thiết lập vật phẩm chìa khóa + tự cấp chìa khóa thử nghiệm cho bản thân quản trị viên.

Hệ thống ghi nhận những thông số quản trị viên thực sự thay đổi, mới được ghi đè vào tệp, nhờ đó mọi giá trị quản trị viên tự cân chỉnh thủ công trước đó (như tọa độ biểu ngữ/nút bấm...) đều được giữ nguyên vẹn.

### Trình tạo Rương mới — `/gacha create <id>`

Tạo một rương hoàn toàn mới từ con số 0 ngay trong game: hệ thống sẽ tự tạo một bộ khung cấu hình rỗng (ở trạng thái tắt) vào `crates.yml`, tải lại plugin và mở ngay giao diện chỉnh sửa. Quản trị viên chỉ cần thêm phần thưởng, cài đặt chi phí & bảo hiểm, bật rương lên trong trang Thiết đặt là xong.

### Trình thiết đặt tổng — `/gacha config`

Tinh chỉnh cấu hình **tổng thể** qua bảng điều khiển con trỏ — không cần động tới tệp văn bản YAML. Mỗi thông số khi thay đổi sẽ tự động ghi thẳng vào tệp nguồn tương ứng (`cursor.yml` / `config.yml` / `theme.yml`) và tải lại plugin. **Rẽ chuột vào nhãn của mỗi cài đặt** để xem dòng chú thích nhanh về chức năng của nó.

- **Mouse & Cursor** — Chỉnh tốc độ con trỏ chuột (một giá trị duy nhất; giá trị càng lớn thì con trỏ di chuyển càng nhanh — phạm vi di chuyển phụ thuộc vào kích thước giao diện, không phải tốc độ), tỷ lệ hiển thị giao diện và độ mượt của con trỏ.
- **Cursor Feel** — Chỉnh kích thước tâm chuột và hiệu ứng hút con trỏ (bật/tắt, độ mạnh, phạm vi).
<!--
Translator note:
I'm not sure what "body double" refers to here.
Does it mean a player clone / fake player model shown during the gacha animation?
I kept it untranslated for now to avoid using the wrong term.
-->
- **Menu** — Ân tay người chơi, xoá thời tiết xấu, ẩn nhân vật, số lượt quay tối đa (x10), bật/tắt dọn khu vực và bán kính dọn.
- **Gameplay** — Thiết lập các yêu cầu như người chơi phải đứng trên mặt đất, kiểm tra ô trống trong túi đồ, thời gian chờ, lưu nhật ký phần thưởng và tỷ lệ may mắn đặc quyền VIP.
- **Effects** — Thay đổi hiệu ứng phát sáng của thẻ, hiệu ứng tạo hồi hộp khi quay thẻ, mô hình mở rương 3D và cơ chế bảo hiểm mặc định.
- **Rarities** — Chỉnh trọng số, thông báo và màu phát sáng cho từng độ hiếm.

Các chỉ số dạng số có thể chỉnh nhanh bằng nút −/+ (hoặc nháy trực tiếp vào con số để tự gõ số chính xác); cấu hình Bật/Tắt chỉ cần một nút bấm; các danh sách tùy chọn bấm để chuyển đổi thứ tự.

> **Lưu ý:** Một số thiết lập có thể khiến giao diện không sử dụng được (chế độ camera, khoảng cách mặt phẳng con trỏ và giới hạn phạm vi con trỏ) **không** được chỉnh tại đây. Muốn thay đổi các thiết lập này, hãy chỉnh trực tiếp trong `cursor.yml`.

---

## Kiểm soát toàn bộ dữ liệu quay thưởng

### Thống kê & Lịch sử

- **`/gacha stats [crate]`** *(dành cho admin)* — bảng quản trị hiển thị phân phối tỉ lệ rớt đồ thực tế so với % cấu hình lý thuyết, kèm theo danh sách những người mở rương nhiều nhất, có hỗ trợ bộ lọc theo rương. Dữ liệu được trích xuất từ tệp nhật ký gỡ lỗi phần thưởng.
- **`/gacha history`** *(cho tất cả người chơi — có trên bản Miễn phí)* — xem lại các lần mở rương gần nhất của bản thân + đếm mốc bảo hiểm (pity) hiện tại cho từng rương.

Cả hai lệnh trên đều yêu cầu bật nhật ký gỡ lỗi trong tệp thiết đặt:

```yaml
# config.yml
reward-log:
  enabled: true
```

### Trình giả lập 1.000 lần quay

Nút **[ 🎲 Test 1000 ]** trong trang chỉnh sửa sẽ tự động chạy mô phỏng quay rương đó 1.000 lần (dựa theo dữ liệu lưu gần nhất) và hiển thị phân phối tỉ lệ rớt thực tế theo từng độ hiếm ngay cạnh con số cấu hình — một công cụ test nhanh cực kỳ đáng giá để đảm bảo trọng số quản trị viên cài đặt mang lại cảm giác chuẩn xác (và để kiểm tra xem các hiệu ứng tăng tỉ lệ từ sự kiện tăng thưởng có hoạt động đúng như mong đợi hay không).

### API dành cho nhà phát triển

CradGacha cung cấp các sự kiện Bukkit (`GachaPreOpenEvent` — có thể hủy, `GachaOpenEvent`) và API `CradGachaAPI` để mở rương, quản lý Token và kiểm soát việc mở rương từ plugin của máy chủ. Xem **[Developer API](/developer-api)**.

---

## So sánh nhanh Bản Miễn phí vs Premium

| Tính năng | Miễn phí | Premium |
|---|:---:|:---:|
| Menu con trỏ, lật thẻ, bảo hiểm (pity), nhiều loại chi phí (hỗ trợ chi phí kết hợp) | ✅ | ✅ |
| Đổi đồ trùng lấy Spark, Shop Spark, Wishlist, Shop Token | ✅ | ✅ |
| Viền sáng độ hiếm, chỉnh kích thước / thông báo / title cho từng phần thưởng | ✅ | ✅ |
| Lệnh `/gacha history`, hỗ trợ PlaceholderAPI | ✅ | ✅ |
| Hiệu ứng mở rương 3D (BetterModel / ModelEngine) | ✅ | ✅ |
| Số lượng rương tối đa | Tối đa 3 rương | Không giới hạn |
| **Sự kiện tăng tỉ lệ, chìa khoá rương, may mắn cho đặc quyền VIP** | — | ✅ |
| **Nhập tệp GIF + giao diện ảnh động** | — | ✅ |
| Trình chỉnh sửa bố cục trực tiếp | — | ✅ |
| Chỉnh sửa trực tiếp / Tạo rương / Thiết lập ngay trong game | — | ✅ |
| Lệnh `/gacha stats` + giả lập 1.000 lần quay | — | ✅ |
| **API dành cho nhà phát triển** (Events + `CradGachaAPI`) | — | ✅ |

::: Nghe này: quản trị viên đã sẵn sàng chưa?
**[Mua ngay CradGacha Premium — $14.99 →](https://mineassets.com/p/crad-gacha-archived-mcmodels-e64dhv53)**
:::

---

## Cài đặt bản Premium

CradGacha được phân phối thành **hai tệp .jar riêng biệt**. Bộ tính năng premium được đóng gói độc lập, do đó bản jar miễn phí về mặt vật lý hoàn toàn không chứa mã nguồn của các tính năng này.

1. Xoá tệp `CradGacha-x.jar` (bản miễn phí) khỏi thư mục `plugins/`.
2. Thêm tệp `CradGacha-Premium-x.jar` vào.
3. Khởi động lại máy chủ. Các lệnh và tính năng Premium sẽ tự động được kích hoạt — không cần phải cấu hình thêm bất cứ điều gì.

Toàn bộ dữ liệu trong các tệp `config.yml`, `crates.yml` và `theme.yml` của quản trị viên đều được tự động giữ nguyên vẹn.

> **Lưu ý quan trọng:** Bản miễn phí không dùng được tính năng của **premium**.
