import {
  decorateBlock,
  decorateIcons,
  getMetadata,
  loadBlocks,
  readBlockConfig,
} from "../../scripts/aem.js";

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  const opts = {
    path: cfg.footer || "footer",
    fetchOptions: window.location.pathname.endsWith("/footer")
      ? { cache: "reload" }
      : {},
    sectionClasses: [
      "footer-brand",
      "footer-nav",
      "footer-newsletter",
      "footer-tnc",
    ],
  };

  const meta = getMetadata("footer");
  const path = meta ? new URL(meta).pathname : `/footer`;
  const res = await fetch(`${path}.plain.html`);
  if (res.ok) {
    const input = await res.text();
    block.innerHTML = input;
    block.querySelectorAll(":scope > div").forEach((section, index) => {
      section.classList.add(opts.sectionClasses[index])
    });
    decorateIcons(block);
    if (block.querySelector(".form")) {
      decorateBlock(block.querySelector(".form"));
      loadBlocks(document.querySelector("footer"));
    }
  }
}
