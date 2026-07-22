import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import modulesList from '../objects/modules/modulesList'
import {baseLanguage} from '../locale/supportedLanguages'
import {seoField} from '../features/seo'
// console.log(modulesList)

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO (moteurs de recherche google, duckduckgo, ia, ...)',
    },
  ],
  fields: [
    seoField,
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Titre',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'projects',
      title: 'Projets',
      type: 'array',
      of: [{type: 'cardHome'}, {type: 'reference', to: [{type: 'project'}]}],
      group: 'editorial',
      hidden: true,
    }),

    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'cardHome'}],
      group: 'editorial',
    }),

    defineField({
      name: 'news',
      title: 'Actualités',
      type: 'array',
      of: [{type: 'news'}],
      group: 'editorial',
    }),
    // defineField({
    //   name: 'modules',
    //   title: 'Modules',
    //   description: 'Zone de contenu Modulaire (images, textes, embed)',
    //   type: 'array',
    //   of: modulesList,
    //   group: 'editorial',
    // }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: '/',
        title: 'Home',
      }
    },
  },
})
