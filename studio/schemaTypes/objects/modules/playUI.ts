import {defineField} from 'sanity'
import {BiImages} from 'react-icons/bi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'playUI',
  title: 'Play UI',
  type: 'object',
  icon: BiImages,
  fields: [
    defineField({
      name: 'video',
      type: 'embed',
    }),
  ],

  preview: {
    select: {
      image: 'video.placeholder',
      title: `video.title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Play UI',
        media: image,
      }
    },
  },
})
