import { SanityKeyed } from "sanity-codegen";
import { ImagesUI, ListKeyValUI, ListProjectsUI, TextsUI } from "./schema";

export interface ModulesList {
  modules: Array<
    | SanityKeyed<ImagesUI>
    | SanityKeyed<TextsUI>
    | SanityKeyed<ListProjectsUI>
    | SanityKeyed<ListKeyValUI>
  >;
}
