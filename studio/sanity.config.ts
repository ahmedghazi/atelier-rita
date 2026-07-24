import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {linkResolverPreview} from './src/linkResolverPreview'
import {colorInput} from '@sanity/color-input'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {media} from 'sanity-plugin-media'
// import {defaultDocumentNode} from './src/defaultDocumentNode'

const remoteURL = 'https://atelier-rita.vercel.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

const plugins = [
  structureTool({structure}),
  media({
    creditLine: {
      enabled: true,
      // boolean - enables an optional "Credit Line" field in the plugin.
      // Used to store credits e.g. photographer, licence information
      // excludeSources: ['unsplash']
      // string | string[] - when used with 3rd party asset sources, you may
      // wish to prevent users overwriting the creditLine based on the `source.name`
    },
    locales: [
      {id: 'fr', title: 'French'},
      {id: 'en', title: 'English'},
    ],
  }),
  visionTool(),
  colorInput(),
  // ...(isDev ? devOnlyPlugins : []),
  presentationTool({
    title: 'Live preview',
    resolve: linkResolverPreview,
    previewUrl: {
      origin: previewURL,
      previewMode: {
        enable: '/api/preview',
        disable: '/api/exit-preview',
      },
    },
  }),
]
export default defineConfig({
  name: 'default',
  title: 'Rita Backoffice',

  projectId: 'ra5yjexn',
  dataset: 'production',

  plugins: plugins,

  schema: {
    types: schemaTypes,
  },
  document: {
    actions: [resolveProductionUrl],
  },
})
