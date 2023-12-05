function toggleSearch(e) {
  e.preventDefault();
  const searchParent = e.target.closest('.header-search');
  const searchInput = searchParent.querySelector('.search-input');
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
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 13) {
      e.preventDefault();
      searchButton.click();
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        toggleSearch(e);
        document.querySelector('.header-tools .color-mode-toggle')?.focus();
      } else {
        toggleSearch(e);
        document.querySelector('.header-tools .button-container a')?.focus();
      }
    }
  });
}

export default function decorateHeaderSearch(block) {
  const searchButton = block.querySelector('.button:has(.icon-search)');
  searchButton.classList.add('search-button');
  searchButton.classList.remove('button');
  searchButton.addEventListener('click', (e) => {
    const searchValue = e.target.closest('.header-search')?.querySelector('.search-input')?.value.trim();
    if (searchValue !== '') {
      window.location.href = `/search?query=${searchValue}`;
    } else {
      toggleSearch(e);
    }
  });

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
