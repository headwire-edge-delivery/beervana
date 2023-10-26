export default async function decorate(block) {
  console.log("hero decorate", block);
  const image = block.querySelector("picture");
  const title = block.querySelector("h1");

  block.innerHTML = `${title.outerHTML}${image.outerHTML}`;
  document.body.classList.add("has-hero");
}
