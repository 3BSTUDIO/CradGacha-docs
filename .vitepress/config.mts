import { defineConfig } from 'vitepress'

// GitHub Pages project site base path.
// The docs are published from the PUBLIC repo "CradGacha-docs", so the site is at
//   https://<user>.github.io/CradGacha-docs/
// If you rename that repo, change this to "/<new-repo-name>/".
const base = '/CradGacha-docs/'

export default defineConfig({
  base,
  title: 'CradGacha',
  description: 'Cursor-driven hologram gacha plugin for Paper 1.21+',
  lang: 'en-US',
  appearance: 'dark',   // dark mode is the default
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#58a6ff' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }]
  ],

  themeConfig: {
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/3BSTUDIO/CradGacha' }
    ],
    outline: { level: [2, 3], label: 'On this page' }
  },

  // ===== i18n: English at "/" (root), Thai at "/th/". =====
  // VitePress adds a language dropdown automatically and keeps the same
  // sub-path when switching (e.g. /installation <-> /th/installation).
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Premium', link: '/premium' }
        ],
        sidebar: [
          {
            text: 'Getting Started',
            collapsed: false,
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'Installation', link: '/installation' },
              { text: 'Setup & Resource Pack', link: '/setup' },
              { text: 'First Setup', link: '/first-setup' }
            ]
          },
          {
            text: 'Reference',
            collapsed: false,
            items: [
              { text: 'Features', link: '/features' },
              { text: 'Premium', link: '/premium' },
              { text: 'Commands', link: '/commands' },
              { text: 'Permissions', link: '/permissions' },
              { text: 'Configuration', link: '/configuration' },
              { text: 'Crates', link: '/crates' }
            ]
          },
          {
            text: 'Interface',
            collapsed: false,
            items: [
              { text: 'Cursor UI', link: '/cursor-ui' },
              { text: 'Result Panel', link: '/result-panel' }
            ]
          },
          {
            text: 'Help',
            collapsed: false,
            items: [
              { text: 'Troubleshooting', link: '/troubleshooting' },
              { text: 'FAQ', link: '/faq' },
              { text: 'Changelog', link: '/changelog' }
            ]
          },
          {
            text: 'Advanced',
            collapsed: false,
            items: [
              { text: 'Developer API', link: '/developer-api' }
            ]
          }
        ]
      }
    },

    th: {
      label: 'ไทย',
      lang: 'th',
      link: '/th/',
      themeConfig: {
        nav: [
          { text: 'คู่มือ', link: '/th/' },
          { text: 'การติดตั้ง', link: '/th/installation' },
          { text: 'พรีเมียม', link: '/th/premium' }
        ],
        sidebar: {
          '/th/': [
            {
              text: 'เริ่มต้น',
              collapsed: false,
              items: [
                { text: 'บทนำ', link: '/th/' },
                { text: 'การติดตั้ง', link: '/th/installation' },
                { text: 'ติดตั้ง & Resource Pack', link: '/th/setup' },
                { text: 'ตั้งค่าครั้งแรก', link: '/th/first-setup' }
              ]
            },
            {
              text: 'อ้างอิง',
              collapsed: false,
              items: [
                { text: 'ฟีเจอร์', link: '/th/features' },
                { text: 'พรีเมียม', link: '/th/premium' },
                { text: 'คำสั่ง', link: '/th/commands' },
                { text: 'สิทธิ์', link: '/th/permissions' },
                { text: 'การตั้งค่า', link: '/th/configuration' },
                { text: 'ตู้กาชา', link: '/th/crates' }
              ]
            },
            {
              text: 'อินเทอร์เฟซ',
              collapsed: false,
              items: [
                { text: 'Cursor UI', link: '/th/cursor-ui' },
                { text: 'หน้าผลรางวัล', link: '/th/result-panel' }
              ]
            },
            {
              text: 'ช่วยเหลือ',
              collapsed: false,
              items: [
                { text: 'แก้ปัญหา', link: '/th/troubleshooting' },
                { text: 'คำถามที่พบบ่อย', link: '/th/faq' },
                { text: 'บันทึกการอัปเดต', link: '/th/changelog' }
              ]
            },
            {
              text: 'ขั้นสูง',
              collapsed: false,
              items: [
                { text: 'Developer API', link: '/th/developer-api' }
              ]
            }
          ]
        }
      }
    }
  }
})
