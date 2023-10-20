import { setupNestedNavigationListeners } from './header-interactions.js';

export function decorateNestedNavigationItem([input, opts]) {
  const navItem = document.createElement('li');
  const icon = input.querySelector('.icon');
  const link = input.querySelector('a');
  const subtitle = document.createElement('span')

  input.querySelector('.icon').remove();
  input.querySelector('a').remove();
  subtitle.innerText = input.innerText.trim();

  navItem.classList.add(opts.dropdownNestedItemClass);
  navItem.appendChild(icon);
  navItem.appendChild(link);
  navItem.appendChild(subtitle);

  input.parentElement.appendChild(navItem);

  return [input, opts];
}

export function decorateNestedNavigation([input, opts]) {
  const ul = input.querySelector('ul');
  if (ul) { 
    const nestedToggle = document.createElement('button');
    nestedToggle.innerText = "v"; // TODO remove after icon styling
    nestedToggle.classList.add(opts.dropdownToggleClass);
    setupNestedNavigationListeners(nestedToggle);

    const nestedUL = document.createElement('ul');
    ul.querySelectorAll('li')?.listItems?.forEach((li) => {
      decorateNestedNavigationItem(li, opts);
    });
    ul.remove();

    const nestedNav = document.createElement('div');
    nestedNav.classList.add(opts.dropdownClass);
    nestedNav.setAttribute('aria-expanded',  false);
    nestedNav.appendChild(nestedUL)

    input.appendChild(nestedNavToggle);
    input.appendChild(nestedNav);
    input.classList.add(opts.dropdownParentClass);

    return [input, opts];
  }
}

export function decorateNavigation([input, opts]) {
  const navSection = input.querySelector('.header-nav');
  if (navSection) {
    const navHTML = document.createElement('nav');
    const ul = input.querySelector('ul');

    ul.children?.forEach(li, index) => decorateNestedNavigation(li, opts));

    navHTML.appendChild(ul);
    navSection.innerHTML = '';
    navSection.appendChild(navHTML);

    return [input, opts];
  }
}
