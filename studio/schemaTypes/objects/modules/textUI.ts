import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'textUI',
  title: 'Text',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      // description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sous titre',
      type: 'localeString',
      description: 'optionnel',
    }),
    defineField({
      type: 'boolean',
      name: 'columns',
      title: 'columns',
      description: 'text multi-colonne',
    }),
    defineField({
      name: 'centered',
      type: 'boolean',
      title: 'Centré',
      description: 'text centré',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
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
        subtitle: 'Text UI',
      }
    },
  },
})
