import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages (header, footer, ...)',
  type: 'document',
  icon: CogIcon,
  groups: [
    // {
    //   default: true,
    //   name: 'navigation',
    //   title: 'Navigation',
    // },
    // {
    //   default: true,
    //   name: 'seo',
    //   title: 'Default SEO',
    // },
    {
      name: 'header',
      title: 'Naviguation',
    },
    // {
    //   name: 'footer',
    //   title: 'Footer',
    // },

    {
      name: 'design',
      title: 'Couleurs',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
  ],
  fields: [
    // defineField({
    //   name: 'seo',
    //   title: 'Defauly SEO',
    //   type: 'seo',
    //   group: 'seo',
    // }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'header',
    }),
    // defineField({
    //   name: 'siteDescription',
    //   title: 'Description du site',
    //   type: 'localeString',
    //   group: 'header',
    // }),
    defineField({
      name: 'siteDescriptions',
      title: 'Descriptions du site',
      description: 'Random',
      type: 'array',
      of: [
        {
          type: 'localeString',
        },
      ],
      group: 'header',
    }),

    defineField({
      name: 'navPrimary',
      title: 'Naviguation Primary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'navSocial',
      title: 'Naviguation Social',
      type: 'array',
      of: [
        {
          type: 'linkIcon',
        },
      ],
      group: 'header',
    }),
    // defineField({
    //   name: 'navSecondary',
    //   title: 'Naviguation Secondary',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'linkInternal',
    //     },
    //     {
    //       type: 'linkExternal',
    //     },
    //   ],
    //   group: 'footer',
    // }),

    // defineField({
    //   name: 'baseline',
    //   title: 'Baseline',
    //   type: 'localeBlockContent',
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'contact',
    //   title: 'Contact',
    //   type: 'string',
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'labelNewsletter',
    //   title: 'Label newsletter',
    //   type: 'localeString',
    //   group: 'footer',
    // }),
    // defineField({
    //   name: 'msgNewsletter',
    //   title: 'Message newsletter',
    //   type: 'localeText',
    //   group: 'footer',
    // }),

    defineField({
      name: 'message404',
      title: 'Message 404',
      type: 'blockContent',
      group: 'misc',
    }),

    defineField({
      name: 'colors',
      title: 'Couteurs',
      description: 'Palette de couleurs',
      type: 'array',
      of: [
        {
          type: 'color',
        },
      ],
      group: 'design',
    }),

    defineField({
      name: 'customCss',
      type: 'text',
      group: 'design',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Réglages (header, footer, ...)',
      }
    },
  },
})
