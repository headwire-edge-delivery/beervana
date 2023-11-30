import { getMetadata } from "../../scripts/aem.js";
import { decorateBrand } from "./header-brand.js";
import { decorateNav } from "./header-nav.js";
import { decorateTools } from "./header-tools.js";

const headerDecorators = [
  {
    className: "header-brand",
    decorator: decorateBrand,
  },
  {
    className: "header-nav",
    decorator: decorateNav,
  },
  {
    className: "header-tools",
    decorator: decorateTools,
  }
];

export default async function decorate(block) {
  const meta = getMetadata("nav");
  const path = meta ? new URL(meta).pathname : `/nav`;
  const res = await fetch(`${path}.plain.html`);
  if (res.ok) {
    block.innerHTML = await res.text();
    block.querySelectorAll(":scope div")?.forEach((el, index) => {
      const { className, decorator } = headerDecorators[index];
      el.classList.add(className);
      decorator(el);
    });
  }
}
