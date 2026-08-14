import {defineField} from 'sanity'

export const imageFields = [
  defineField({
    name: 'alt',
    title: 'Text alternatif',
    description: "pour le référencement ou si l'image ne s'affiche pas",
    type: 'localeString',
  }),
  defineField({
    name: 'caption',
    title: 'Légende',
    type: 'localeString',
  }),
]
