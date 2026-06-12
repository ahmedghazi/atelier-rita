import {defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'
import {BsCalendar2Event} from 'react-icons/bs'

export default defineField({
  name: 'eventsUI',
  title: 'Events UI',
  type: 'object',
  icon: BsCalendar2Event,
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
      of: [{type: 'reference', to: [{type: 'event'}]}],
    }),
    defineField({
      name: 'cta',
      type: 'linkInternal',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Events UI',
      }
    },
  },
})
