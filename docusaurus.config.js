// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Snow Beta Docs',
  tagline: 'Documentation to help you configure and use Snow Software products',
  url: 'https://docs-app.dev-snowsoftware.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Snow Software', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    localeConfigs: {
      en: {
        htmlLang: 'en-us',
      },
    },
  },
  noIndex: true, // This option adds <meta name="robots" content="noindex, nofollow"> to every page to tell search engines to avoid indexing the site. Remove this when going into production.
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve the docs at the site's root
          // Please change this to your repo. TD- Hiding this. It allows the Edit this page link on pages
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo. TD- Hiding this. It allows the Edit this page link on pages
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }), 
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        debug: Boolean(process.env.DEBUG || process.env.CI),
        config: 'redocly.yaml',
        specs: [
          
          {
            id: 'sam_api_computers',
            //spec: 'docs/snow-atlas-api/sam/computers.json',
            //spec: 'https://westeurope.snowsoftware.io/api/computers/meta/http',
            spec: 'docs/snow-atlas-api/sam-core-apis/computers-spec-beta.json',
            route: 'docs/snow-atlas-api/sam/computers',
          },
          {
            id: 'sam_api_customfields',
            //spec: 'docs/snow-atlas-api/sam/agreements.json',
            spec: 'https://westeurope.snowsoftware.io/api/customfields/meta/http',
            route: 'docs/snow-atlas-api/sam/customfields',
          },  
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        docsRouteBasePath: "/",
        hashed: true,
      }),
    ],
  ],
  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    announcementBar: {
        id: 'Site_Notice',
        content:
          'This site is Temporary! Please use the following link for GA API documentation: <a target="_blank" rel="noopener noreferrer" href="https://docs.snowsoftware.io/snow-atlas-api/resources/"> https://docs.snowsoftware.io/snow-atlas-api/resources/ </a>.',
        backgroundColor: '#20232a',
        textColor: '#fff',
        isCloseable: false,
      },
    navbar: {
      title: 'Snow Atlas API Beta Docs',
      logo: {
        alt: 'Snow Beta Docs Home',
        src: 'img/logo.svg',
      },
      items: [
        //{
        //  type: 'doc',
        //  docId: 'snow-atlas/index',
        //  position: 'left',
        //  label: 'Snow Atlas',
        //},
        //{
        //  type: 'doc',
        //  docId: 'snow-software-products/index',
        //  position: 'left',
        //  label: 'Other products',
        //},
        //{
        //  type: 'doc',
        //  docId: 'atlas-api/index',
        //  position: 'left',
        //  label: 'Developer resources',
        //},
        {
          type: 'dropdown',
          label: 'More resources',
          position: 'left',
          items: [
        //    {
        //      type: 'doc',
        //      docId: 'release-notes/index',
        //      label: 'Release notes',
        //    },
        //    {
        //     to: '/videos',
        //      label: 'Videos',
        //    },
            {
              href: 'https://docs.snowsoftware.com/',
              label: 'Documentation',
            },
            {
              href: 'https://community.snowsoftware.com/s/',
              label: 'Community',
            },
          ],
        },
        //{
        //  to: '/blog',
        //  label: 'Blog',
        //},
        //{
        //  type: 'localeDropdown',
        //  position: 'right',
        //},
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: 'Terms of use',
          href: 'https://www.snowsoftware.com/legal/termsofuse',
        },
        {
          label: 'Privacy policy',
          href: 'https://www.snowsoftware.com/seo/legal-privacy-policy',
        },
        {
          label: 'Data protection',
          href: 'https://www.snowsoftware.com/legal/dataprotection',
        },
        {
          label: 'Subscription center',
          href: 'https://go.snowsoftware.com/subscription-center.html',
        },
        {
          label: 'Community',
          href: 'https://community.snowsoftware.com/s/',
        },
        {
          label: 'Docs Feedback',
          href: 'mailto:docsportal-feedback@snowsoftware.com', 
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Snow Software`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  },
};

 module.exports = config;
