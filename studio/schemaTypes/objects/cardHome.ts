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
  ],
  preview: {
    select: {
      title: `project.title.${baseLanguage}`,
      image: 'image',
    },
    prepare({title, image}) {
      return {
        title: title || 'Carte Home',
        media: image || RxButton,
      }
    },
  },
})
