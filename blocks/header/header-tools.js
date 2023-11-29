import { decorateButtons, decorateIcons } from "../../scripts/aem.js";
import { decorateColorMode } from "./header-color-mode.js";
import { decorateHeaderSearch } from "./header-search.js";

export function decorateHeaderTools(block) {
  decorateButtons(block);
  decorateIcons(block);
  decorateColorMode(block);
  decorateHeaderSearch(block);
}
