import { setupMobileNavigationInteractions, setupNestedNavigationInteractions } from './header-interactions.js';

export function decorateNestedNavigationItem({ input, opts }) {
  const navItem = document.createElement('li');
  const linkSubtitleContainer = document.createElement('div');
  const icon = input.querySelector('.icon');
  const link = input.querySelector('a');
  const subtitle = document.createElement('span')

  input.querySelector('.icon').remove();
  input.querySelector('a').remove();
  subtitle.innerText = input.innerText.trim();

  navItem.classList.add(opts.dropdownNestedItemClass);
  navItem.appendChild(icon);
  linkSubtitleContainer.classList.add(opts.dropdownNestedItemLinkSubtitleClass);
  linkSubtitleContainer.appendChild(link);
  linkSubtitleContainer.appendChild(subtitle);
  navItem.appendChild(linkSubtitleContainer);

  return navItem;
}

export function decorateNestedNavigation({ input, opts }) {
  const ul = input.querySelector('ul');
  if (ul) { 
    const nestedToggle = document.createElement('button');
    nestedToggle.innerText = "v"; // TODO remove after icon styling
    nestedToggle.classList.add(opts.dropdownToggleClass);
    setupNestedNavigationInteractions(nestedToggle);

    const nestedUL = document.createElement('ul');
    ul.querySelectorAll('li').forEach((li) => {
      nestedUL.appendChild(decorateNestedNavigationItem({ input: li, opts }));
    });
    ul.remove();

    const nestedNav = document.createElement('dialog');
    nestedNav.classList.add(opts.dropdownClass);
    nestedNav.setAttribute('aria-expanded',  false);
    nestedNav.appendChild(nestedUL)

    input.appendChild(nestedToggle);
    input.appendChild(nestedNav);
    input.classList.add(opts.dropdownParentClass);

    return input;
  }
}

export function decorateNavigation({ input, opts }) {
  const navSection = input.querySelector('.header-nav');
  if (navSection) {
    const navHTML = document.createElement('nav');
    const ul = navSection.querySelector('ul');

    ul.querySelectorAll("li").forEach((li, index) => decorateNestedNavigation({ input: li, opts }));

    navHTML.appendChild(ul);
    navSection.innerHTML = '';
    navSection.appendChild(navHTML);

    return input;
  }
}

export function decorateMobileNavigation({ input, opts }) {
  console.log("decorateMobileNavigation", input, opts);
  const navSection = input.querySelector('.header-nav');
  if (navSection) {
    const buttonHTML = document.createElement('button');
    const buttonIcon = document.createElement('span');

    buttonIcon.classList.add('icon', 'icon-hamburger');

    buttonHTML.appendChild(buttonIcon);
    buttonHTML.classList.add(opts.mobileButton);
    setupMobileNavigationInteractions(buttonHTML);
    navSection.parentNode.appendChild(buttonHTML);
  }
}
