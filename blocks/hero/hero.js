export default async function decorate(block) {
  block.querySelector(":scope div > div")?.classList?.add("hero-content");
}
