import home from './singletons/home'
import pageModulaire from './documents/pageModulaire'
import project from './documents/project'
import settings from './singletons/settings'
import projects from './singletons/projects'
import atelier from './singletons/atelier'

import localeString from './locale/localeString'
import localeText from './locale/localeText'
import localeBlockContent from './locale/localeBlockContent'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkIcon from './objects/linkIcon'
import figure from './objects/figure'
import embed from './objects/embed'
import keyVal from './objects/keyVal'
import {seoSchema} from './features/seo'
import news from './objects/news'
import cardHome from './objects/cardHome'

export const schemaTypes = [
  settings,
  home,
  pageModulaire,
  project,
  atelier,
  projects,

  localeString,
  localeText,
  localeBlockContent,
  cardHome,

  blockContent,
  linkExternal,
  linkInternal,
  linkIcon,
  seoSchema,
  embed,
  figure,
  keyVal,
  news,
]
export default schemaTypes
