import { decorateButtons, decorateIcons, getMetadata } from "../../scripts/aem.js";
import { decorateColorMode } from "./header-color-mode.js";
import { decorateHeaderSearch } from "./header-search.js";

export function decorateTools(block) {
  decorateColorMode(block);
  decorateButtons(block);
  decorateIcons(block);
  decorateHeaderSearch(block);
}

