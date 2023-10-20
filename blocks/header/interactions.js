export function setupNestedNavigationListeners(input) {
  input.addEventListener('click', nestedNavigationToggleListener);
}

export function headerNavDropdownListener(e) {
	console.log("headerNavDropdownListener", e);
	const navItem = e.target.parentElement;
	console.log('navItem', navItem);
	const dropdown = navItem.querySelector('.header-nav-dropdown');
	if (dropdown) {
		console.log('getattribute', dropdown.getAttribute('aria-expanded') === "true" ? true : false)
		dropdown.setAttribute('aria-expanded', dropdown.getAttribute('aria-expanded') === "true" ? false : true);
	}
}
