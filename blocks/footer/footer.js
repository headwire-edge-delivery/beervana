import {
  decorateBlocks,
  decorateIcons,
  readBlockConfig,
} from "../../scripts/aem.js";
import {
  decorateByMediaQuery,
  decorateSectionsWithClasses,
  fetchDocumentAndReplaceBlock,
} from "../../scripts/utils.js";

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  const input = block;
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

  await fetchDocumentAndReplaceBlock({ input, opts });
  decorateBlocks(input);

  // Decorate and setup breakpoint decorator listener
  const handleMQChange = (matches) => {
    decorateByMediaQuery(
      { input, opts },
      matches,
      opts.desktopDecorators,
      opts.mobileDecorators,
    );
  };
  handleMQChange(opts.mediaQueryListener.matches);
  opts.mediaQueryListener.onchange = (e) => handleMQChange(e.matches);
  decorateIcons(block);
}
