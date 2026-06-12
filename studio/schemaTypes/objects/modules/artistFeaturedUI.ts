import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'artistFeaturedUI',
  title: 'Artist Featured UI',
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
      name: 'item',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: 'item.imageCover',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Artist Featured UI',
        media: media,
      }
    },
  },
})
