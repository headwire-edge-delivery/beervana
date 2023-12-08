function templateCard({ path, title, description }) {
  return `<li>
    <div class="cards-card-image image-content">
      <a href="${path}" title="${title}">
        <picture>
          <source type="image/webp" srcset="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=webply&amp;optimize=medium">
          <img loading="lazy" alt="Migration Brewing" src="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
        </picture>
      </a>
    </div>
    <div class="cards-card-body">
      <h3>
        <a href="${path}" title="${title}">${title}</a>
      </h3>
      <p>${description}</p>
      <p class="button-container">
        <strong>
          <a href="${path}" title="${title}" class="button primary">More ${title.split(' ')[0]}</a></strong></p>
    </div>
  </li>`;
}

function templateCards(block, data) {
  const cards = document.createElement('div');
  cards.classList.add('cards');
  cards.innerHTML = `<ul>${data.map(templateCard).join('')}</ul>`;
  block.appendChild(cards);
}

export default async function decorate(block) {
  const queryA = block.querySelector('a[href*="query-index.json"]');
  if (queryA) {
    const style = Array.from(block.classList).filter((c) => c.toLowerCase() !== 'include' && c.toLowerCase() !== 'block')[0];
    const params = new URLSearchParams(queryA.href);
    const buttonContainer = queryA.closest('.button-container');
    buttonContainer.parentNode.remove();
    const response = await fetch(queryA.href);
    if (response.ok) {
      let { data } = await response.json();
      if (data?.length > 0) {
        if (params.get('tag')) {
          data = data.filter((item) => JSON.parse(item.tags.toLowerCase()).includes(params.get('tag')));
        }
      }

      // template
      switch (style) {
        case 'cards':
          templateCards(block, data);
          break;
        default:
          /* eslint-disable no-console */
          console.log('default');
      }
    }
  }
}
