import { decorateIcons } from "../../scripts/aem.js";

export function headerCustomNav(block) {
  block.querySelectorAll("ul ul").forEach(nav => {
    nav.querySelectorAll('br').forEach(br => br.remove());
    nav.querySelectorAll(':scope > li')?.forEach((li) => {
      const subNavItem = document.createElement("li");
      const icon = li.querySelector('.icon');
      const link = li.querySelector('a');
      if (icon && link) {
        subNavItem.classList.add('header-nav-nested-item');
        subNavItem.append(icon);
        subNavItem.append(link);
        const text = document.createElement("span");
        text.classList.add('header-nav-nested-item-text');
        text.innerText = li.innerText;
        subNavItem.append(text);

        li.replaceWith(subNavItem);
      }
    })
    decorateIcons(nav);
  });
}