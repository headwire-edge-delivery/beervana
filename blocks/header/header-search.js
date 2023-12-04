function toggleSearch(e) {
  e.preventDefault();
  const searchButton = e.target.closest('.search-button');
  const searchInput = searchButton.nextElementSibling;
  const searchValue = searchInput.value.trim();
  const header = e.target.closest('.header.block');

  if (!header.classList.contains('search-open')) {
    header.classList.toggle('search-open');
    searchInput.focus();
  } else if (searchValue === '') {
    header.classList.toggle('search-open');
  } else {
    window.location.href = `/search?query=${searchValue}`;
  }
}

function setupSearchInput(searchButton) {
  const searchInput = document.createElement('input');
  searchInput.classList.add('search-input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search');
  searchButton.after(searchInput);
  searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchButton.click();
    }
  });
}

export default function decorateHeaderSearch(block) {
  const searchButton = block.querySelector('.button:has(.icon-search)');
  searchButton.classList.add('search-button');
  searchButton.classList.remove('button');
  searchButton.addEventListener('click', toggleSearch);
  const tempSearchButtonParent = searchButton.parentNode;
  const searchButtonParent = document.createElement('div');
  searchButtonParent.classList.add('header-search');
  searchButtonParent.classList.remove('button-container');
  tempSearchButtonParent.before(searchButtonParent);
  tempSearchButtonParent.remove();
  searchButtonParent.append(searchButton);
  setupSearchInput(searchButton);
}
