import {defineField} from 'sanity'
import {BsFileRichtext} from 'react-icons/bs'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'textImageUI',
  title: 'Text image',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: '',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sous titre',
      type: 'localeString',
      description: 'optionnel',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'cta',
      type: 'linkInternal',
    }),
    defineField({
      name: 'look',
      type: 'string',
      options: {
        list: [
          {title: '1/3', value: '1/3'},
          {title: '1/2', value: '1/2'},
          {title: '2/3', value: '2/3'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Text image UI',
        media: image,
      }
    },
  },
})
