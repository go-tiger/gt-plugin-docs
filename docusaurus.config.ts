import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {gtPlugins} from './plugins.config';

const config: Config = {
  title: 'GT Plugin Docs',
  tagline: 'GT 마인크래프트 플러그인 사용자 · 개발자 문서',
  favicon: 'img/favicon.ico',

  future: {v4: true},

  // GitHub Pages: https://<계정>.github.io/gt-plugin-docs/
  url: 'https://go-tiger.github.io',
  baseUrl: '/gt-plugin-docs/',
  organizationName: 'go-tiger',
  projectName: 'gt-plugin-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {defaultLocale: 'ko', locales: ['ko']},

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  // 플러그인마다 독립 docs 인스턴스 → 플러그인별 버전 관리 가능
  plugins: [
    ...gtPlugins.map((p) => [
      '@docusaurus/plugin-content-docs',
      {
        id: p.id,
        path: `plugins/${p.id}`,
        routeBasePath: p.id,
        sidebarPath: './sidebars.plugin.ts',
      },
    ]),
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ko', 'en'],
        docsRouteBasePath: ['docs', ...gtPlugins.map((p) => p.id)],
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'GT Plugin Docs',
      logo: {alt: 'GT', src: 'img/logo.svg'},
      items: [
        {
          type: 'dropdown',
          label: '플러그인',
          position: 'left',
          items: gtPlugins.map((p) => ({to: `/${p.id}/user/intro`, label: p.name})),
        },
        {type: 'docSidebar', sidebarId: 'commonSidebar', label: '공통 가이드', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} GT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'kotlin', 'yaml', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
