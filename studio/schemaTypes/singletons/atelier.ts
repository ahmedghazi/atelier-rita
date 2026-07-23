import {defineField, defineType} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'
import {seoField} from '../features/seo'
import slug from '../fields/slug'
import {IoIosPeople} from 'react-icons/io'

export default defineType({
  name: 'atelier',
  title: 'Atelier',
  type: 'document',
  icon: IoIosPeople,
  // groups: [
  //   // {
  //   //   default: true,
  //   //   name: 'editorial',
  //   //   title: 'Editorial',
  //   // },
  //   // {
  //   //   name: 'seo',
  //   //   title: 'SEO (moteurs de recherche google, duckduckgo, ia, ...)',
  //   // },
  // ],
  fields: [
    seoField,

    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    slug,
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'items',
      title: 'Textes',
      description: "Liste de textes s'affichant en modal (rouge)",
      type: 'array',
      of: [{type: 'keyVal'}],
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      // console.log(images)
      return {
        title: title,
      }
    },
  },
})
