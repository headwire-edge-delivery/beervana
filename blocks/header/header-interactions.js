export function setupNestedNavigationInteractions(input) {
  input.addEventListener("click", nestedNavigationToggleListener);
}

export function nestedNavigationToggleListener(e) {
  const navItem = e.target.closest(".header-nav-dropdown-parent");
  navItem.querySelector(".header-nav-dropdown")?.showModal();
}

export function hamburgerMenuInteractions(input, opts) {
  input.addEventListener("click", () => {
    const dropdown = input.parentNode.querySelector(`.${opts.dropdownClass}`);
    input.classList.add("hide");
    dropdown.show();
    document.body.classList.toggle("no-scroll");
  });
}

export function dialogCloseInteractions(input, opts) {
  input.addEventListener("click", () => {
    const dropdown = input.parentNode;
    if (dropdown.hasAttribute("open")) {
      dropdown.close();
      dropdown.parentNode.querySelector(`.${opts.mobileButton}`).classList.remove("hide");
    }
  });
}
