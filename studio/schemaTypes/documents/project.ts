import {defineField, defineArrayMember, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'
import {seoField} from '../features/seo'
import slug from '../fields/slug'

export default defineType({
  type: 'document',
  name: 'project',
  title: 'Project',
  icon: FolderIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'metas',
      title: 'Metadatas',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    seoField,
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Titre',
      group: 'editorial',
    }),

    slug,
    defineField({
      name: 'subTitle',
      type: 'string',
      title: 'Soustitre',
      group: 'editorial',
    }),

    // defineField({
    //   name: 'tags',
    //   title: 'Tags',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'tag'}],
    //     },
    //   ],
    //   group: 'editorial',
    // }),

    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image clef',
      description: 'Visible on liste pages, project cards (largeur 1400px)',
      group: 'editorial',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Images',
      description: 'Visible dans la page du projet (largeur 2500px)',
      group: 'editorial',
    }),

    defineField({
      name: 'text',
      title: 'Texte',
      type: 'localeBlockContent',
      group: 'editorial',
    }),
    defineField({
      name: 'programme',
      type: 'localeText',
      group: 'metas',
    }),
    defineField({
      name: 'client',
      type: 'string',
      group: 'metas',
    }),
    defineField({
      name: 'city',
      title: 'Ville',
      type: 'string',
      group: 'metas',
    }),
    defineField({
      name: 'zip',
      title: 'Code postal',
      description: '18e, 44',
      type: 'string',
      group: 'metas',
    }),
    defineField({
      name: 'numbers',
      title: 'Chiffres',
      description: '1 270 m² 9,2 M € HT',
      type: 'text',
      rows: 2,
      group: 'metas',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      description: '2017 Concours',
      type: 'text',
      rows: 2,
      group: 'metas',
    }),
    defineField({
      name: 'metas',
      title: 'fiche technique (libre)',
      description: '(libre)',
      type: 'array',
      of: [{type: 'keyVal'}],
      group: 'metas',
    }),

    // defineField({
    //   name: 'modules',
    //   title: 'Modules',
    //   description: 'Zone de contenu Modulaire (images, textes, embed)',
    //   type: 'array',
    //   of: modulesList,
    //   group: 'editorial',
    // }),

    defineField({
      name: 'related',
      title: 'Projet liés',
      type: 'reference',
      to: [{type: 'project'}],
      // type: 'array',
      // of: [{type: 'reference', to: [{type: 'project'}]}],
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      slug: 'slug',
      image: 'imageCover',
    },
    prepare(selection) {
      const {title, slug, image} = selection
      // console.log(images)
      return {
        title: title,
        subtitle: `/project/${slug.current}`,
        media: image,
      }
    },
  },
})
