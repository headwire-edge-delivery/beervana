import { decorateButtons, decorateIcons, getMetadata } from "../../scripts/aem.js";
import { decorateNav } from "./header-nav.js";

function decorateBrand(block) {
  if (block.querySelector("p a .icon-logo")) {
    block.querySelector("p").replaceWith(block.querySelector("p a"));
    decorateIcons(block);
  }
}

function decorateCTA(block) {
  decorateButtons(block);
}

function decorateTools(block) {
  console.log("tools", block);
}

const subBlocksConfig = [
  {
    className: "header-brand",
    decorate: decorateBrand,
  },
  {
    className: "header-nav",
    decorate: decorateNav,
  },
  {
    className: "header-cta",
    decorate: decorateCTA,
  },
  {
    className: "header-tools",
    decorate: decorateTools,
  },
]

export default async function decorate(block) {
  const meta = getMetadata("nav");
  const path = meta ? new URL(meta).pathname : `/nav`;
  const res = await fetch(`${path}.plain.html`);
  if (res.ok) {
    const input = await res.text();
    block.innerHTML = input;

    block.querySelectorAll(":scope div")?.forEach((el, index) => {
      el.classList.add(subBlocksConfig[index].className);
      subBlocksConfig[index].decorate(el);
    });
  } else {
    block.remove();
  }
}