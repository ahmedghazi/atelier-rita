import {defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'
import {MdOutlineTextFields} from 'react-icons/md'

export default defineField({
  name: 'titleUI',
  title: 'Titre UI',
  type: 'object',
  icon: MdOutlineTextFields,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      // description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'background',
      type: 'color',
      title: 'Couleur de fond',
    }),
    defineField({
      name: 'foreground',
      type: 'color',
      title: 'Couleur de text',
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
        subtitle: 'Titre UI',
      }
    },
  },
})
