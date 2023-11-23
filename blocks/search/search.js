export default async function decorate(block) {
  const noResultsText = block.innerText;

  const searchParams = new URLSearchParams(window.location.search);
  block.innerHTML = `
    <div class="search-container">
      <label>
        <h1>${window.documentLanguage === 'de' ? 'Suchen' : 'Search'}</h1>
        <input class="search-input" placeholder="Search" value="${searchParams.get('query') || ''}"></input>
        <button class="search-button">
          <img alt="search" src="/icons/search.svg"></img>
        </button>
      </label>
      <div class="search-results">
        <ul>
        </ul>
      </div>
    </div>
  `;

  const resultsList = block.querySelector('.search-results ul');

  const updateResults = async (query) => {
    if (!query) {
      return;
    }
    const response = await fetch(`https://search.jz-759.workers.dev/?search=${query}`);
    const data = await response.json();

    const listItemsHtml = data.map((resultItem) => {
      let resultImage = '';
      if (resultItem?.image) {
        resultImage = resultItem.image;
      }
      if (resultImage === '<picture></picture>') {
        resultImage = '';
      }

      const snippet = resultItem.snippet === '<strong></strong>' ? '' : resultItem.snippet;

      return `
      <li>
        <a href="${resultItem.url}">
          <div class="result-image">${resultImage}</div>
          <div class="result-content">
            <h2>${resultItem.title}</h2>
            <p>${snippet || resultItem.intro || resultItem.metaDescription}<p>
          </div>
        </a>
      </li>
      `;
    }).join('');

    resultsList.innerHTML = listItemsHtml || `<span>${noResultsText}</span>`;
    searchParams.set('query', query);
    window.history.replaceState(null, null, `?${searchParams.toString()}`);
  };

  // initialize fetch
  updateResults(searchParams.get('query'));

  const searchInput = block.querySelector('input.search-input');
  const searchButton = block.querySelector('button.search-button');

  searchButton.onclick = () => {
    const trimmedValue = searchInput.value.trim();
    if (trimmedValue) {
      updateResults(trimmedValue);
    } else {
      searchInput.focus();
    }
  };

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      updateResults(searchInput.value.trim());
    }
  });
}