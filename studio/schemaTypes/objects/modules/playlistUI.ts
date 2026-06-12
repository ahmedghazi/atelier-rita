import {MdOutlineQueueMusic} from 'react-icons/md'
import {defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'playlistUI',
  title: 'Playlist UI',
  type: 'object',
  icon: MdOutlineQueueMusic,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: 'Module title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      image: 'image',
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Playlist UI',
        media: image,
      }
    },
  },
})
