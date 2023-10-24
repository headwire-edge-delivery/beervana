import { getMetadata, decorateIcons, readBlockConfig } from '../../scripts/aem.js';
import { decorateByMediaQuery, decorateSectionsWithClasses, fetchDocumentAndReplaceBlock, runDecorators } from '../../scripts/utils.js';
import { decorateNavigation, decorateMobileNavigation } from './header-decorators.js';

export default async function decorate(block) {
  const input = block;
  const opts = {
    path: 'nav',
    sectionClasses: ['header-brand', 'header-nav', 'header-search'],
    brandClass: 'header-brand',
    navClass: 'header-nav',
    searchClass: 'search',
    mobileButton: 'header-nav-mobile',
    dropdownClass: 'header-nav-dropdown',
    dropdownParentClass: 'header-nav-dropdown-parent',
    dropdownToggleClass: 'header-nav-dropdown-toggle',
    dropdownNestedItemClass: 'header-nav-dropdown-item',
    dropdownNestedItemLinkSubtitleClass: 'header-nav-dropdown-item-link-subtitle',
    mobileDecorators: [decorateSectionsWithClasses, decorateMobileNavigation],
    desktopDecorators: [decorateSectionsWithClasses,decorateNavigation],
    mediaQueryListener: window.matchMedia('(min-width: 800px)'),
  };

  await fetchDocumentAndReplaceBlock({ input: block, opts });

  decorateByMediaQuery({ input, opts }, opts.mediaQueryListener.matches, opts.desktopDecorators, opts.mobileDecorators);
  opts.mediaQueryListener.onchange = (e) => decorateByMediaQuery(e.matches)
  decorateIcons(input);
}
