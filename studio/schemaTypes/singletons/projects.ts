import {defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {InfoOutlineIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'
import {AiOutlineTable} from 'react-icons/ai'
import {seoField} from '../features/seo'
import slug from '../fields/slug'

export default defineType({
  name: 'projects',
  title: 'Projets Index',
  type: 'document',
  icon: AiOutlineTable,
  // groups: [
  // {
  //   default: true,
  //   name: 'editorial',
  //   title: 'Editorial',
  // },
  // {
  //   name: 'seo',
  //   title: 'SEO',
  // },
  // ],
  fields: [
    seoField,

    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      // group: 'editorial',
    }),

    slug,

    defineField({
      name: 'items',
      title: 'Items',
      description: '',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      // group: 'editorial',
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
