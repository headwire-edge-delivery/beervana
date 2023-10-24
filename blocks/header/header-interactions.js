export function setupNestedNavigationInteractions(input) {
  input.addEventListener('click', nestedNavigationToggleListener);
}

export function nestedNavigationToggleListener(e) {
	const navItem = e.target.parentElement;
	const dropdown = navItem.querySelector('.header-nav-dropdown');
	if (dropdown.hasAttribute('open')) {
		dropdown.close();
	} else {
		dropdown.showModal();
  }
}

export function setupMobileNavigationInteractions(e) {
  console.log("setupMobileNavigationListeners", e);
}
