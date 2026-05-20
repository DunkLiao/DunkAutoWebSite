# AutoTool 網站 — AI 代理指南

企業自動化小工具服務的靜態行銷網站，無建置工具、無框架、無伺服器。

## 專案架構

| 檔案                   | 用途                                                     |
| ---------------------- | -------------------------------------------------------- |
| `index.html`           | 主要一頁式行銷網站（9 個 Section + Header + Footer）     |
| `styles.css`           | **所有頁面共用**的樣式，CSS 變數定義於 `:root`           |
| `script.js`            | `index.html` 的互動功能（導航、FAQ Accordion、平滑滾動） |
| `github-projects.html` | GitHub 公開專案展示頁                                    |
| `github-projects.js`   | 呼叫 GitHub API（`DunkLiao` 帳號）動態渲染專案卡片       |
| `user-manual.html`     | 使用手冊頁面                                             |

## 設計系統（必須遵守）

CSS 變數定義在 `styles.css` `:root`，**禁止寫死顏色或尺寸**：

- `--primary-color: #004E5B`（深藍綠，主要品牌色）
- `--secondary-color: #E2BCB8`（柔和粉膚色，輔色）
- `--accent-color: #FF6B6B`
- `--border-radius-sm/md/lg`、`--spacing-xs/sm/md/lg/xl/2xl`
- `--shadow-sm/md/lg`、`--transition: all 0.3s ease-in-out`

字體：中文用 `Noto Sans TC`，英文強調用 `Poppins`，圖示用 **Font Awesome 6**。

## 開發規範

- **語言**：所有介面文字使用繁體中文（`zh-TW`）
- **響應式斷點**：Mobile < 768px、Tablet 768–1023px、Desktop 1024px+
- **容器寬度**：`max-width: 1200px`
- **新增頁面**時，複製既有頁面的 `<head>` 區塊（含 Google Fonts、Font Awesome、styles.css）與 Header/Footer HTML 結構
- 無需 `npm install`、無建置步驟，直接以瀏覽器開啟 HTML 檔案即可預覽

## 常見任務提示

- **新增 Section**：在 `index.html` 加入 `<section id="xxx">`，於 `styles.css` 新增對應樣式，並在 `<ul class="nav-menu">` 加入導覽連結
- **修改 GitHub 帳號**：編輯 `github-projects.js` 第 5 行的 `GITHUB_USERNAME`
- **修改品牌色**：只需改 `styles.css` 的 `:root` 變數
