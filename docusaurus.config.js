// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Welcome to Nishanth's Blog",
  tagline: "Step-by-Step Guides for Tackling Real-World Projects",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://blog.nishanthkp.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nishanthkumarpathi", // Usually your GitHub org/user name.
  projectName: "blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "2W1QTR3IAF",
        apiKey: "c18e3bcc229e19496e631bd3354f7f0f",
        indexName: "nishanthkp",
        contextualSearch: true,
      },
      announcementBar: {
        id: "support_us",
        content:
          'This blog still has some missing articles, as migration is going on. Please refer to my<a target="_blank" rel="noopener noreferrer" href="https://nishanthkp.gitbook.io/b"> older blog</a>',
        backgroundColor: "#20232a",
        textColor: "#FFFFFF",
        isCloseable: true,
      },
      // Replace with your project's social card
      image: "img/logo.png",
      navbar: {
        title: "Nishanth's Blog",
        logo: {
          alt: "Nishanth Blog Logo",
          src: "img/logo.png",
        },
        items: [
          // {
          //   label: "Getting Started",
          //   type: "doc",
          //   docId: "index",
          // },
          {
            label: "Getting Started",
            type: "dropdown",
            items: [
              {
                label: "Start Here",
                type: "doc",
                docId: "getting-started/index",
              },
            ],
          },
          {
            label: "Cyber Security",
            type: "dropdown",
            items: [
              {
                label: "Network Security",
                type: "doc",
                docId: "cs/ns/index",
              },
              {
                label: "Application Security",
                type: "doc",
                docId: "cs/as/index",
              },
              {
                label: "Information Security",
                type: "doc",
                docId: "cs/is/index",
              },
              {
                label: "Incident Response",
                type: "doc",
                docId: "cs/ir/index",
              },
            ],
          },
          {
            label: "Cloud Security",
            type: "dropdown",
            items: [
              {
                label: "Amazon Web Services",
                type: "doc",
                docId: "cloudsec/aws/index",
              },
              {
                label: "Microsoft Azure",
                type: "doc",
                docId: "cloudsec/azure/index",
              },
              {
                label: "Cloud Infrastructure Security",
                type: "doc",
                docId: "cloudsec/cis/index",
              },
              {
                label: "Identity and Access Management in the Cloud",
                type: "doc",
                docId: "cloudsec/iamc/index",
              },
              {
                label: "Compliance and Privacy in the Cloud",
                type: "doc",
                docId: "cloudsec/cpc/index",
              },
            ],
          },
          {
            label: "DevSecOps",
            type: "dropdown",
            items: [
              {
                label: "SAST",
                type: "doc",
                docId: "devsecops/sast/index",
              },
              {
                label: "SCA",
                type: "doc",
                docId: "devsecops/sca/index",
              },
              {
                label: "DAST",
                type: "doc",
                docId: "devsecops/dast/index",
              },
              {
                label: "GitOps",
                type: "doc",
                docId: "devsecops/gitops/index",
              },
            ],
          },
          {
            label: "Infrastructure Automation",
            type: "dropdown",
            items: [
              {
                label: "Ansible",
                type: "doc",
                docId: "infraauto/ansible/index",
              },
              {
                label: "Chaos Engineering",
                type: "doc",
                docId: "infraauto/chaoseng/index",
              },
              {
                label: "Kubernetes",
                type: "doc",
                docId: "infraauto/k8s/index",
              },
              {
                label: "Terraform",
                type: "doc",
                docId: "infraauto/terraform/index",
              },
              {
                label: "Pulumi",
                type: "doc",
                docId: "infraauto/pulumi/index",
              },
              {
                label: "Infrastructure Monitoring and Alerting",
                type: "doc",
                docId: "infraauto/ima/index",
              },
            ],
          },
          {
            label: "QuickRefs",
            type: "dropdown",
            items: [
              {
                label: "QuickRefs",
                type: "doc",
                docId: "quickrefs/index",
              },
            ],
          },

          // {
          //   type: "docSidebar",
          //   sidebarId: "QuickRefsSidebar",
          //   position: "left",
          //   label: "QuickRefs",
          // },
          // {
          //   type: "docSidebar",
          //   sidebarId: "dataScienceSidebar",
          //   position: "left",
          //   label: "Data Science Tutorials",
          // },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://www.nishanthkp.com",
            label: "Nishanth Profile",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Connect with Author",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/nishanthkumarp",
              },
            ],
          },
          {
            items: [
              {
                label: "Linkedin",
                href: "https://www.linkedin.com/in/nishanthkumarpathi",
              },
            ],
          },
          {
            items: [
              {
                label: "Github",
                href: "https://github.com/nishanthkumarpathi",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, All Rights Reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
