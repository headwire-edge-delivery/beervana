import { decorateIcons } from "../../scripts/aem.js";

export function decorateNav(block) {
  decorateSubNav(block);

  const mediaQueryListener = window.matchMedia("(min-width: 60rem)");
  // Decorate now
  mediaQueryListener.matches ? decorateDesktop(block) : decorateMobile(block);
  // Decorate on change
  mediaQueryListener.onchange = ({ matches }) => matches ? decorateDesktop(block) : decorateMobile(block);
}

function decorateDesktop(block) {
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
}

function decorateMobile(block) {
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
}

function decorateSubNav(block) {
  block.querySelectorAll("li > ul").forEach((subNav, index) => {
    const parentLi = subNav.parentElement;

    subNav.classList.add('header-nav-nested');
    subNav.id = `header-nav-nested-${index}`;
    subNav.setAttribute('aria-hidden', 'true');
    subNav.setAttribute('aria-labelledby', `header-nav-nested-toggle-${index}`);

    let parentToggle = parentLi.querySelector(':scope > a') || document.createElement('button');
    if (parentToggle.tagName === 'BUTTON') {
      console.log("parentToggle is null", parentLi, parentLi.innerText);
      //parentToggle = 
      parentToggle.innerText = parentLi.innerText;
      parentLi.innerText = '';
      parentLi.prepend(parentToggle);
      parentLi.append(subNav);
    }

    parentToggle.classList.add('header-nav-nested-button');
    parentToggle.id = `header-nav-nested-toggle-${index}`;
    parentToggle.setAttribute('aria-haspopup', 'true');
    parentToggle.setAttribute('aria-controls', `header-nav-nested-${index}`);
    parentToggle.setAttribute('aria-expanded', 'false');
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