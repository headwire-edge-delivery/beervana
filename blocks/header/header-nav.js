import { decorateIcons } from "../../scripts/aem.js";
import { headerCustomNav } from "./header-custom.js";

export function decorateNav(block) {
  // custom header nav
  headerCustomNav(block);

  // setup drowndowns
  decorateSubNav(block);

  const mediaQueryListener = window.matchMedia("(min-width: 60rem)");
  // Decorate now
  mediaQueryListener.matches ? decorateDesktop(block) : decorateMobile(block);
  // Decorate on change
  mediaQueryListener.onchange = ({ matches }) => matches ? decorateDesktop(block) : decorateMobile(block);
}

function decorateDesktop(block) {
  teardownListeners(true);
  console.log("desktop", block);
  const wrapper = block.closest('.header.block');
  const hamburger = wrapper.querySelector(".header .button.open");
  const close = wrapper.querySelector(".header .button.close");
  const dialog = wrapper.querySelector(".header-dialog-dropdown");
  const dialogContent = wrapper.querySelector(".header-dialog-content");
  if (hamburger) {
    hamburger.removeEventListener("click", showDialog);
    hamburger.remove();
  }
  if (close) {
    close.removeEventListener("click", closeDialog);
    close.remove();
  }
  if (dialog) {
    wrapper.append(...dialogContent.childNodes)
    dialog.remove();
  }
  setupListeners(true, block);
}

function decorateMobile(block) {
  teardownListeners(false);
  console.log("mobile", block);
  const wrapper = block.closest('.header.block');
  const hamburgerIcon = document.createElement("span");
  hamburgerIcon.classList.add("icon", "icon-hamburger");
  const hamburger = document.createElement("button");
  hamburger.appendChild(hamburgerIcon);
  hamburger.classList.add("button", "primary", "open");
  hamburger.setAttribute("aria-label", "Open menu");
  const closeIcon = document.createElement("span");
  closeIcon.classList.add("icon", "icon-close");
  const close = document.createElement("button");
  close.appendChild(closeIcon);
  close.classList.add("button", "primary", "close");
  close.setAttribute("aria-label", "Close menu");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("header-dialog-content");
  const dialog = document.createElement("dialog");
  dialog.classList.add("header-dialog-dropdown");
  block.before(hamburger);
  block.appendChild(dialog);
  dialog.appendChild(close);
  dialog.appendChild(dialogContent);
  block.parentElement.appendChild(dialog);
  dialogContent.appendChild(block);
  dialogContent.appendChild(wrapper.querySelector(".header-cta"));

  decorateIcons(hamburger);
  decorateIcons(close);

  hamburger.addEventListener("click", showDialog);
  close.addEventListener("click", closeDialog);
  setupListeners(false, block);
}

function decorateSubNav(block) {
  block.querySelectorAll("li > ul").forEach((subNav, index) => {
    const parentLi = subNav.parentElement;

    subNav.classList.add('header-nav-nested');
    subNav.id = `header-nav-nested-${index}`;
    subNav.setAttribute('aria-hidden', 'true');
    subNav.setAttribute('aria-labelledby', `header-nav-nested-toggle-${index}`);

    let nestedNavToggle = parentLi.querySelector(':scope > a') || document.createElement('button');
    if (nestedNavToggle.tagName === 'BUTTON') {
      nestedNavToggle.innerText = parentLi.innerText;
      parentLi.innerText = '';
      parentLi.prepend(nestedNavToggle);
      parentLi.append(subNav);
    }

    nestedNavToggle.classList.add('header-nav-nested-button');
    nestedNavToggle.id = `header-nav-nested-toggle-${index}`;
    nestedNavToggle.setAttribute('aria-haspopup', 'true');
    nestedNavToggle.setAttribute('aria-controls', `header-nav-nested-${index}`);
    nestedNavToggle.setAttribute('aria-expanded', 'false');
  }); 
}

function showDialog(e) {
  e.target.closest(".header.block")
    ?.querySelector(".header-dialog-dropdown")
    ?.showModal();
}

function closeDialog(e) {
  e.target.closest(".header.block")
    ?.querySelector(".header-dialog-dropdown")
    ?.close();
}

function toggleSubNavEventHandler(e) {
  e.preventDefault();
  const parentLi = e.target.closest('li');
  toggleSubNav(parentLi);
}
function toggleSubNav(parentLi, override) {
  const subNav = parentLi.querySelector(':scope > ul.header-nav-nested');
  const nestedNavButton = parentLi.querySelector(':scope > .header-nav-nested-button');
  const isExpanded = override ? override : nestedNavButton.getAttribute('aria-expanded') === 'true';
  nestedNavButton.setAttribute('aria-expanded', !isExpanded);
  subNav.setAttribute('aria-hidden', isExpanded);
}

function setupListeners(matches, block) {
  block.querySelectorAll('.header-nav-nested-button').forEach(nestedNavButton => {
    !matches && nestedNavButton.addEventListener('click', toggleSubNavEventHandler);
    nestedNavButton.addEventListener('focusin', toggleSubNavEventHandler);
    nestedNavButton.addEventListener('focusout', toggleSubNavEventHandler);
  });
}

function teardownListeners(matches) {
  block.querySelectorAll('.header-nav-nested-button').forEach(nestedNavButton => {
    !matches && nestedNavButton.removeEventListener('click', toggleSubNavEventHandler);
    nestedNavButton.removeEventListener('focusin', toggleSubNavEventHandler);
    nestedNavButton.removeEventListener('focusout', toggleSubNavEventHandler);
  });
}