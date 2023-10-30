export default async function decorate(block) {
  block.querySelectorAll(":scope > div")?.forEach((el, index) => {
    el.classList.add("faq-item-wrapper");
    const faqMarkup = el.querySelector(":scope > div");
    faqMarkup.classList.add("faq-item");
    if (!faqMarkup.querySelector("p")) {
      el.remove();
    }
  });
}