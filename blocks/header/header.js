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
      const nestedNav = el.querySelector("ul ul");
      if (nestedNav) {
        const nestedNavParent = document.createElement("nav");
        nestedNavParent.classList.add("header-nav-nested");
        nestedNav.before(nestedNavParent);
        nestedNavParent.append(nestedNav);
      }
    });
    decorateButtons(block);
    decorateIcons(block);
  }
}
