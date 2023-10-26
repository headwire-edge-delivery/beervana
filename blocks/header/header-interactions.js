export function setupNestedNavigationInteractions(input) {
  input.addEventListener("click", nestedNavigationToggleListener);
}

export function nestedNavigationToggleListener(e) {
  const navItem = e.target.parentElement;
  const dropdown = navItem.querySelector(".header-nav-dropdown");
  if (dropdown.hasAttribute("open")) {
    dropdown.close();
  } else {
    dropdown.showModal();
  }
}

export function hamburgerMenuInteractions(input, opts) {
  input.addEventListener("click", () => {
    const dropdown = input.parentNode.querySelector(`.${opts.dropdownClass}`);
    if (dropdown.hasAttribute("open")) {
      dropdown.close();
    } else {
      dropdown.showModal();
    }
    document.body.classList.toggle("no-scroll");
  });
}

export function dialogCloseInteractions(input, opts) {
  input.addEventListener("click", () => {
    const dropdown = input.parentNode;
    if (dropdown.hasAttribute("open")) {
      dropdown.close();
    }
  });
}
