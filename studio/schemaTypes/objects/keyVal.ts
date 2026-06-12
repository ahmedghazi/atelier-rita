// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  name: 'keyVal',
  title: 'Clef Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'localeString',
      title: 'Clef',
    }),
    defineField({
      name: 'value',
      type: 'localeBlockContent',
      title: 'Valeur',
    }),
  ],
  preview: {
    select: {
      title: `key.${baseLanguage}`,
    },
  },
})
