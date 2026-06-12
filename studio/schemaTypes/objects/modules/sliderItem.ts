import {defineField} from 'sanity'
import {BiCarousel} from 'react-icons/bi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'sliderItem',
  title: 'Slider Item',
  type: 'object',
  icon: BiCarousel,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'cta',
      type: 'linkInternal',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Slider Item',
        media: media,
      }
    },
  },
})
