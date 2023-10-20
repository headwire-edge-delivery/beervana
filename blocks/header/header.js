import { getMetadata, decorateIcons, readBlockConfig } from '../../scripts/aem.js';
import { decorateSectionsWithClasses, fetchDocumentAndReplaceBlock, runDecorators } from '../../scripts/utils.js';
import { decorateNavigation } from './header-decorators.js';

export default async function decorate(input) {
  const opts = {
    path: 'nav',
    sectionClasses: ['header-brand', 'header-nav', 'header-search'],
    brandClass: 'header-brand',
    navClass: 'header-nav',
    searchClass: 'search',
    dropdownClass: 'header-nav-dropdown',
    dropdownParentClass: 'header-nav-dropdown-parent',
    dropdownToggleClass: 'header-nav-dropdown-toggle',
    dropdownNestedItemClass: 'header-nav-dropdown-item',
  };

  fetchDocumentAndReplaceBlock({ input, opts });
  runDecorators({ input, opts }, [
    decorateSectionsWithClasses,
    decorateNavigation,
  ]);
}
