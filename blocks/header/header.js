import { decorateButtons, decorateIcons } from "../../scripts/aem.js";

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

function handleMQChange(matches) {
  const wrapper = document.querySelector(".header-wrapper");
  const block = wrapper.querySelector(".header.block");
  if (matches) {
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
      block.append(...dialogContent.childNodes)
      dialog.remove();
    }

  } else {
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
    wrapper.querySelector(".header-nav").before(hamburger);
    dialog.before(wrapper.querySelector(".header-nav"));
    dialog.appendChild(close);
    dialog.appendChild(dialogContent);
    dialogContent.appendChild(wrapper.querySelector(".header-nav"));
    dialogContent.appendChild(wrapper.querySelector(".header-cta"));
    block.appendChild(dialog);
    decorateIcons(hamburger);
    decorateIcons(close);

    hamburger.addEventListener("click", showDialog);
    close.addEventListener("click", closeDialog);
  }
}

export default async function decorate(block) {
  const meta = getMetadata("nav");
  const path = meta ? new URL(meta).pathname : `/nav`;
  const input = await fetch(`${path}.plain.html`);
  if (input.ok) {
    block.innerHTML = input;
    const classNames = ["header-brand", "header-nav", "header-cta"];
    block.querySelectorAll(":scope div")?.forEach((el, index) => {
      el.classList.add(classNames[index]);
      if (index === 0 && el.querySelector("p a .icon-logo")) {
        el.querySelector("p").replaceWith(el.querySelector("p a"));
      }
      const nestedNav = el.querySelectorAll("ul ul");
      if (nestedNav) {
        nestedNav.forEach((nav) => {
          const nestedNavParent = document.createElement("nav");
          nestedNavParent.classList.add("header-nav-nested");
          nav.before(nestedNavParent);
          nestedNavParent.append(nav);
          nav.querySelectorAll(':scope > li')?.forEach((li) => {
            const subNavItem = document.createElement("li");
            const icon = li.querySelector('.icon');
            const link = li.querySelector('a');
            if (icon && link) {
              subNavItem.classList.add('header-nav-nested-item');
              subNavItem.append(icon);
              subNavItem.append(link);
              const text = document.createElement("span");
              text.classList.add('header-nav-nested-item-text');
              text.innerText = li.innerText;
              subNavItem.append(text);

              li.replaceWith(subNavItem);
            }
          })
        });
      }
    });
    decorateButtons(block);
    decorateIcons(block);

    const mediaQueryListener = window.matchMedia("(min-width: 60rem)");
    handleMQChange(mediaQueryListener.matches);
    mediaQueryListener.onchange = (e) => handleMQChange(e.matches);
  }
}
