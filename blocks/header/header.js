import { decorateButtons, decorateIcons } from "../../scripts/aem.js";
import { fetchDocument } from "../../scripts/utils.js";

export default async function decorate(block) {
  const input = await fetchDocument({ path: "nav" });
  if (input) {
    console.log("Hello from blocks/header/header.js block, input", block, input)
    block.innerHTML = input;
    const classNames = ["header-brand", "header-nav", "header-cta"];
    block.querySelectorAll(":scope div")?.forEach((el, index) => {
      el.classList.add(classNames[index]);
      if (index === 0 && el.querySelector("p a .icon-logo")) {
        el.querySelector("p").replaceWith(el.querySelector("p a"));
      }
      const nestedNav = el.querySelectorAll("ul ul");
      if (nestedNav) {
        nestedNav.forEach((nav) => {
          const nestedNavParent = document.createElement("nav");
          nestedNavParent.classList.add("header-nav-nested");
          nav.before(nestedNavParent);
          nestedNavParent.append(nav);
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
        });
      }
    });
    decorateButtons(block);
    decorateIcons(block);
  }
}
