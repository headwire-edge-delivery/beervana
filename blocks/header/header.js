import { getMetadata } from "../../scripts/aem.js";
import { decorateHeaderBrand } from "./header-brand.js";
import { decorateHeaderNav } from "./header-nav.js";
import { decorateHeaderTools } from "./header-tools.js";

    const classNames = ["header-brand", "header-nav", "header-tools"];
const headerBlockConfig = [
  {
    className: "header-brand",
    decorator: decorateHeaderBrand,
  },
  {
    className: "header-nav",
    decorator: decorateHeaderNav,
  },
  {
    className: "header-tools",
    decorator: decorateHeaderTools,
  }
];

export default async function decorate(block) {
  const meta = getMetadata("nav");
  const path = meta ? new URL(meta).pathname : `/nav`;
  const res = await fetch(`${path}.plain.html`);
  if (res.ok) {
    block.innerHTML = await res.text();
    block.querySelectorAll(":scope div")?.forEach((el, index) => {
      el.classList.add(headerBlockConfig[index].className);
      headerBlockConfig[index].decorator(el);
    });
  }
}
