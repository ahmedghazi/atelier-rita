import {defineField} from 'sanity'
import {BiImages} from 'react-icons/bi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'clientsUI',
  title: 'Clients UI',
  type: 'object',
  icon: BiImages,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: 'Internal',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
  ],

  preview: {
    select: {
      image: 'items.0',
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Clients UI',
        media: image,
      }
    },
  },
})
