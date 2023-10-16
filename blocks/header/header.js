import { getMetadata, decorateIcons, readBlockConfig } from '../../scripts/aem.js';

async function fetchNav() {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();
    return html;
  }
  return undefined;
}

function decorateNestedNavItem(html) {
  console.log("decorateNestedNavItem", html);
  const navItem = document.createElement('li');
  const icon = html.querySelector('.icon');
  const link = html.querySelector('a');
  html.querySelector('.icon').remove();
  html.querySelector('a').remove();
  const subtitle = document.createElement('span')
  subtitle.innerText = html.innerText.trim();

  navItem.classList.add('header-nav-dropdown-item');
  navItem.appendChild(icon);
  navItem.appendChild(link);
  navItem.appendChild(subtitle);

  console.log("decorateNestedNavItem", navItem);

  return navItem;
}

function decorateNestedNav(html) {
  console.log("decorateNestedNav", html);
  const nestedNav = document.createElement('div');
  const nestedUL = document.createElement('ul');
  const listItems = html.querySelectorAll('li');
  listItems?.forEach((li) => {
    const navItemHTML = decorateNestedNavItem(li);
    if (navItemHTML) nestedUL.appendChild(navItemHTML);
  });

  nestedNav.classList.add('header-nav-dropdown');
  nestedNav.appendChild(nestedUL);

  return nestedNav;
}

function decorateNav(html) {
  console.log("decorateNav starting html", html.toString());
  const navHTML = document.createElement('nav');
  const ul = html.querySelector('ul');
  console.log("decorateNav ul", ul);

  if (ul.children.length > 0) {
    for (let i = 0; i < ul.children.length; i++) {
      const li = ul.children[i];
      console.log("li", li);
      if (li.querySelector('ul')) {
        const nestedNav = decorateNestedNav(li.querySelector('ul'));
        if (nestedNav) {
          li.querySelector('ul').remove();
          li.appendChild(nestedNav);
        }
      }
    };
  }

  navHTML.appendChild(ul);

  console.log("decorateNav", navHTML);

  return navHTML;
}
export default async function decorate(block) {
  console.log('block', block);
  const navHTML = await fetchNav();
  console.log('navHTML', navHTML);
  if (navHTML) {
    block.innerHTML = navHTML;
    console.log("blockChildren", block.children);
    const sectionClasses = ['brand', 'nav', 'search'];
    if (block.children.length > 0) {
      for (let i = 0; i < block.children.length; i++) {
        const blockSection = block.children[i];
        blockSection.classList.add(`header-${sectionClasses[i]}`);
        if (blockSection.classList.contains('header-nav')) {
          const navHTML = decorateNav(blockSection);
          blockSection.innerHTML = '';
          blockSection.appendChild(navHTML);
        }
      }
    }
  }
}
