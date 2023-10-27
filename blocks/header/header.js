import {
  getMetadata,
  decorateIcons,
  readBlockConfig,
} from "../../scripts/aem.js";
import {
  decorateByMediaQuery,
  decorateSectionsWithClasses,
  fetchDocumentAndReplaceBlock,
  runDecorators,
} from "../../scripts/utils.js";
import { decorateNavigation } from "./desktop/decorators.js"; 
import { decorateMobileNavigation } from "./mobile/decorators.js";

const INVERSE_ICONS = ["icon-logo", "icon-hamburger", "icon-close", "icon-search"];
function handleInvertedLinksAndIcons(block) {
  if (document.querySelector(".hero")) {
    block.querySelectorAll(".icon")?.forEach((icon) => {
      if (INVERSE_ICONS.includes(icon.classList[1])) {
        const iconName = icon.classList[1];
        icon.classList.remove(iconName);
        icon.classList.add(`${iconName}-inverse`);
      }
    });
  }
}

export default async function decorate(block) {
  const opts = {
    path: "nav",
    blockClass: "header",
    sectionClasses: ["header-brand", "header-nav", "header-search"],
    brandClass: "header-brand",
    navClass: "header-nav",
    searchClass: "search",
    mobileButton: "header-nav-mobile",
    dropdownClass: "header-nav-dropdown",
    dropdownParentClass: "header-nav-dropdown-parent",
    dropdownToggleClass: "header-nav-dropdown-toggle",
    dropdownNestedItemClass: "header-nav-dropdown-item",
    dropdownNestedItemLinkSubtitleClass:
      "header-nav-dropdown-item-link-subtitle",
    mobileDecorators: [decorateSectionsWithClasses, decorateMobileNavigation],
    desktopDecorators: [decorateSectionsWithClasses, decorateNavigation],
    mediaQueryListener: window.matchMedia("(min-width: 800px)"),
  };

  const { input } = await fetchDocumentAndReplaceBlock({ input: block, opts });
  const inputHTML = input.innerHTML;

  const handleMQChange = (matches) => {
    block.innerHTML = inputHTML;
    decorateByMediaQuery(
      { input: block, opts },
      matches,
      opts.desktopDecorators,
      opts.mobileDecorators,
    );
    handleInvertedLinksAndIcons(input);
    decorateIcons(input);
  };
  handleMQChange(opts.mediaQueryListener.matches);
  opts.mediaQueryListener.onchange = (e) => handleMQChange(e.matches);
}
