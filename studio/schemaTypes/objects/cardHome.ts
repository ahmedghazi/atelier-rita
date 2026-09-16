import {PiCarDuotone} from 'react-icons/pi'
import {RxButton} from 'react-icons/rx'
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  name: 'cardHome',
  title: 'Carte Home',
  type: 'object',
  icon: PiCarDuotone,

  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'project',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({
      name: 'link',
      type: 'url',
      description: 'Lien externe si pas lié à un projet',
    }),
  ],
  preview: {
    select: {
      title: `project.title.${baseLanguage}`,
      link: 'link',
      image: 'image',
    },
    prepare({title, link, image}) {
      return {
        title: title || 'Carte Home',
        subtitle: link ? `↗ ${link}` : '',
        media: image || RxButton,
      }
    },
  },
})
