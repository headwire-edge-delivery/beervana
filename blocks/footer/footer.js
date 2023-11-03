import {
  decorateBlock,
  decorateIcons,
  loadBlocks,
  readBlockConfig,
} from "../../scripts/aem.js";
import {
  decorateByMediaQuery,
  decorateSectionsWithClasses,
  fetchDocumentAndReplaceBlock,
} from "../../scripts/utils.js";

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
    mobileDecorators: [decorateSectionsWithClasses],
    desktopDecorators: [decorateSectionsWithClasses],
    mediaQueryListener: window.matchMedia("(min-width: 800px)"),
  };

  const { input } = await fetchDocumentAndReplaceBlock({ input: block, opts });
  const inputHTML = input.innerHTML;

  // Decorate and setup breakpoint decorator listener
  const handleMQChange = (matches) => {
    block.innerHTML = inputHTML;
    decorateByMediaQuery(
      { input: block, opts },
      matches,
      opts.desktopDecorators,
      opts.mobileDecorators,
    );
    decorateIcons(block);
    decorateBlock(block.querySelector(".form"));
    loadBlocks(document.querySelector("footer"));
  };
  handleMQChange(opts.mediaQueryListener.matches);
  opts.mediaQueryListener.onchange = (e) => handleMQChange(e.matches);
}
