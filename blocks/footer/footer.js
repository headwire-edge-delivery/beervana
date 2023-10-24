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

  await fetchDocumentAndReplaceBlock({ input: block, opts });
  decorateBlocks(block);

  // Decorate and setup breakpoint decorator listener
  decorateByMediaQuery(
    { input, opts },
    opts.mediaQueryListener.matches,
    opts.desktopDecorators,
    opts.mobileDecorators,
  );
  opts.mediaQueryListener.onchange = (e) => decorateByMediaQuery(e.matches);
  decorateIcons(block);
}
