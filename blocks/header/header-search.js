function toggleSearch() {
  const header = document.querySelector('.header.block');
  const searchParent = document.querySelector('.header-search');
  const searchInput = searchParent.querySelector('.search-input');

  if (!header.classList.contains('search-open')) {
    header.classList.toggle('search-open');
    searchInput.focus();
  } else {
    header.classList.toggle('search-open');
  }
}

function searchButtonClickHandler(e) {
  e.preventDefault();
  const searchButton = e.target;
  const searchValue = document.querySelector('.header-search .search-input')?.value.trim();
  if (searchValue !== '') {
    window.location.href = `/search?query=${searchValue}`;
  } else {
    searchButton.blur();
  }
}

function setupSearchInput(searchButton) {
  const searchInput = document.createElement('input');
  searchInput.classList.add('search-input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search');
  searchButton.after(searchInput);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchButton.click();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      toggleSearch(e);
      document.querySelector(e.shiftKey ? '.header-tools .color-mode-toggle' : '.header-tools .button-container a')?.focus();
    }
  });
  searchInput.addEventListener('blur', (e) => {
    if (e.relatedTarget === null) {
      toggleSearch(e);
    }
  });
}

export default function decorateHeaderSearch(block) {
  const searchButton = block.querySelector('.button:has(.icon-search)');
  searchButton.classList.add('search-button');
  searchButton.classList.remove('button');
  searchButton.addEventListener('click', searchButtonClickHandler);
  searchButton.addEventListener('focus', toggleSearch);
  const tempSearchButtonParent = searchButton.parentNode;
  const searchButtonParent = document.createElement('div');
  searchButtonParent.classList.add('header-search');
  searchButtonParent.classList.remove('button-container');
  tempSearchButtonParent.before(searchButtonParent);
  tempSearchButtonParent.remove();
  searchButtonParent.append(searchButton);
  setupSearchInput(searchButton);
}
