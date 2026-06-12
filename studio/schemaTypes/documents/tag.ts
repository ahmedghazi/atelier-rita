import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'tagType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Thème', value: 'theme'},
          {title: 'Géographie', value: 'geography'},
          {title: 'Métier', value: 'job'},
        ], // <-- predefined values
      },
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      subtitle: 'tagType',
    },
  },
  orderings: [
    {
      title: 'Trier par theme ASC',
      name: 'themeAsc',
      by: [{field: 'tagType', direction: 'asc'}],
    },
    {
      title: 'Trier par theme DESC',
      name: 'themeDesc',
      by: [{field: 'tagType', direction: 'desc'}],
    },
  ],
})
