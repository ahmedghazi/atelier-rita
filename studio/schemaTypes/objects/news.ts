// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'
import {HiOutlineNewspaper} from 'react-icons/hi'

export default defineField({
  name: 'news',
  title: 'News',
  type: 'object',
  icon: HiOutlineNewspaper,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'titre',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      description: 'heure optionnelle',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Texte',
    }),

    defineField({
      name: 'link',
      type: 'linkExternal',
      title: 'lien',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
  },
})
