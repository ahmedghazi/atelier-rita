import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'heroUI',
  title: 'Hero UI',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'image',
      type: 'image',
      fields: [
        // {name: 'title', title: 'Title', type: 'string'},
        {name: 'alt', title: 'Alt Description', type: 'string'},
        // {name: 'attribution', title: 'Attribution', type: 'string'}
      ],
    }),
    defineField({
      name: 'mask',
      title: 'Mask SVG',
      type: 'file',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      image: 'image',
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Hero UI',
        media: image,
      }
    },
  },
})
