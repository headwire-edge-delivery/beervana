export default async function decorate(block) {
  const tags = Array.from(block.classList).filter((c) => c.toLowerCase() !== 'breweries' && c.toLowerCase() !== 'block');
  const response = await fetch('/query-index.json?sheet=breweries');
  if (response.ok && tags.length > 0) {
    const { data: breweries } = await response.json();
    if (breweries?.length > 0) {
      const title = tags[0];
      const breweriesList = breweries.filter((brewery) => JSON.parse(brewery.tags).includes(title));
      const breweriesListHtml = breweriesList.map((brewery) => `
            <li>
              <div class="cards-card-image image-content">
                <a href="${brewery.path}" title="${brewery.title}">
                  <picture>
                    <source type="image/webp" srcset="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=webply&amp;optimize=medium">
                    <img loading="lazy" alt="Migration Brewing" src="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
                  </picture>
                </a>
              </div>
              <div class="cards-card-body">
                <h3 id="brewery-title-${title}">
                  <a href="${brewery.path}" title="${brewery.title}">${brewery.title}</a>
                </h3>
                <p>${brewery.description}</p>
                <p class="button-container">
                  <strong>
                    <a href="${brewery.path}" title="${brewery.title}" class="button primary">More ${brewery.title.split(' ')[0]}</a></strong></p>
              </div>
            </li>`).join('');

      const breweryCards = document.createElement('div');
      breweryCards.classList.add('cards', 'breweries');
      breweryCards.innerHTML = `<ul>${breweriesListHtml}</ul>`;
      block.appendChild(breweryCards);
    }
  }
}
