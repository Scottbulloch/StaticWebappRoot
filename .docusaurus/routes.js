import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '235'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'd81'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd84'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'd78'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '97a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '172'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'a11'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'a5c'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '847'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'd4f'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'd3c'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '647'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'f1c'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '846'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'faf'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '450'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '54a'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '16f'),
    exact: true
  },
  {
    path: '/docs/snow-atlas-api/sam/computers',
    component: ComponentCreator('/docs/snow-atlas-api/sam/computers', '08d'),
    exact: true
  },
  {
    path: '/docs/snow-atlas-api/sam/customfields',
    component: ComponentCreator('/docs/snow-atlas-api/sam/customfields', 'd5e'),
    exact: true
  },
  {
    path: '/docs/snow-atlas-api/sam/licenses',
    component: ComponentCreator('/docs/snow-atlas-api/sam/licenses', '37c'),
    exact: true
  },
  {
    path: '/docs/snow-atlas-api/sam/users',
    component: ComponentCreator('/docs/snow-atlas-api/sam/users', '3d7'),
    exact: true
  },
  {
    path: '/docs/snow-atlas-api/sam/users_view',
    component: ComponentCreator('/docs/snow-atlas-api/sam/users_view', '48a'),
    exact: true
  },
  {
    path: '/hello-markdown',
    component: ComponentCreator('/hello-markdown', '7e3'),
    exact: true
  },
  {
    path: '/hello-react',
    component: ComponentCreator('/hello-react', 'c29'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '048'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'b2f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'eda'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '83d'),
    routes: [
      {
        path: '/snow-atlas-api/',
        component: ComponentCreator('/snow-atlas-api/', 'cc7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/example-scripts',
        component: ComponentCreator('/snow-atlas-api/example-scripts', '756'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/', '9d6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/api-authentication/',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/api-authentication/', '5a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/api-authentication/authentication-using-postman',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/api-authentication/authentication-using-postman', 'eae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/api-authentication/authentication-with-client-credentials',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/api-authentication/authentication-with-client-credentials', 'b83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/api-conventions',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/api-conventions', '0c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/rate-limiting',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/rate-limiting', 'd42'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/get-started-with-apis/work-with-openapi-endpoint-definition-files',
        component: ComponentCreator('/snow-atlas-api/get-started-with-apis/work-with-openapi-endpoint-definition-files', '4cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/', '7b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/computers',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/computers', '398'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/custom-fields',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/custom-fields', '6fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/licenses',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/licenses', '219'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/user-accounts',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/user-accounts', 'c8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/snow-atlas-api/sam-core-apis/user-accounts-views',
        component: ComponentCreator('/snow-atlas-api/sam-core-apis/user-accounts-views', '515'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
