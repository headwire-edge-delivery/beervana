export default async function decorate(block) {
  block.querySelector(':scope div > div')?.classList?.add('hero-content');
  const picture = block.querySelector(':scope picture');
  if (picture) {
    picture.parentNode.replaceWith(picture);
    document.body.classList.add('has-hero');

    const pictureWrapper = document.createElement('div');
    pictureWrapper.classList.add('hero-picture');
    pictureWrapper.appendChild(picture);
    block.appendChild(pictureWrapper);

    const heroContentWrapper = document.createElement('div');
    heroContentWrapper.classList.add('hero-content-wrapper');
    heroContentWrapper.append(...block.querySelectorAll('.hero-content *:not(.hero-picture, .hero-picture *)'));
    block.prepend(heroContentWrapper);

    block.querySelector(':scope > div:not(.hero-picture, .hero-content-wrapper)')?.remove();
  }
}
