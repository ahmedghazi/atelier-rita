import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'artistsFeaturedUI',
  title: 'Artists Featured UI',
  type: 'object',
  icon: ImEmbed,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
      description: 'Title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artist'}]}],
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: 'items.0.imageCover',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Artists Featured UI',
        media: media,
      }
    },
  },
})
