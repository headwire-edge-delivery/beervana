import { createOptimizedPicture } from "../../scripts/aem.js";

export default async function decorate(block) {
  block.querySelector(":scope div > div")?.classList?.add("hero-content");
  const picture = block.querySelector(":scope picture");
  if (picture) {
    picture.parentNode.replaceWith(picture);
    document.body.classList.add("has-hero");
    const src = picture.querySelector("img").getAttribute("src")
    if (src) {
      const optimizedPicture = createOptimizedPicture(src);
      picture.replaceWith(optimizedPicture);
    }
  }
}
