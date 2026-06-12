import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'eventFeaturedUI',
  title: 'Event Featured UI',
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
      to: [{type: 'event'}],
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
  ],
  preview: {
    select: {
      title: `item.title.${baseLanguage}`,
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Event Featured UI',
        media: media,
      }
    },
  },
})
