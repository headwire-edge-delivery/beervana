import {
  dialogCloseInteractions,
  hamburgerMenuInteractions,
  setupNestedNavigationInteractions,
} from "./header-interactions.js";
import { setupButton } from "../../scripts/utils.js";
import { decorateIcons } from "../../scripts/aem.js";

export function decorateNestedNavigationItem({ input, opts }) {
  const navItem = document.createElement("li");
  const linkSubtitleContainer = document.createElement("div");
  const icon = input.querySelector(".icon");
  const link = input.querySelector("a");
  const subtitle = document.createElement("span");

  input.querySelector(".icon").remove();
  input.querySelector("a").remove();
  subtitle.innerText = input.innerText.trim();

  navItem.classList.add(opts.dropdownNestedItemClass);
  navItem.appendChild(icon);
  linkSubtitleContainer.classList.add(opts.dropdownNestedItemLinkSubtitleClass);
  linkSubtitleContainer.appendChild(link);
  linkSubtitleContainer.appendChild(subtitle);
  navItem.appendChild(linkSubtitleContainer);

  return navItem;
}

export function decorateNestedNavigation({ input, opts }) {
  const ul = input.querySelector("ul");
  if (ul) {
    const nestedToggle = document.createElement("button");
    const nestedToggleIcon = document.createElement("span");
    nestedToggleIcon.classList.add("icon", "icon-toggle-inverse");
    nestedToggle.appendChild(nestedToggleIcon);
    nestedToggle.classList.add(opts.dropdownToggleClass);
    setupNestedNavigationInteractions(nestedToggle);

    const nestedUL = document.createElement("ul");
    ul.querySelectorAll("li").forEach((li) => {
      nestedUL.appendChild(decorateNestedNavigationItem({ input: li, opts }));
    });
    ul.remove();

    const nestedNav = document.createElement("dialog");
    nestedNav.classList.add(opts.dropdownClass);
    //nestedNav.setAttribute("aria-expanded", false);
    nestedNav.appendChild(nestedUL);

    input.appendChild(nestedToggle);
    input.appendChild(nestedNav);
    input.classList.add(opts.dropdownParentClass);

    return input;
  }
}

export function decorateNavigation({ input, opts }) {
  const navSection = input.querySelector(".header-nav");
  if (navSection) {
    const navHTML = document.createElement("nav");
    const ul = navSection.querySelector("ul");

    ul.querySelectorAll("li").forEach((li, index) =>
      decorateNestedNavigation({ input: li, opts }),
    );

    navHTML.appendChild(ul);
    navSection.innerHTML = "";
    navSection.appendChild(navHTML);

    return input;
  }
}

export function decorateMobileButton({ input, opts }) {
  input.appendChild(
    setupButton({
      input,
      opts: {
        ...opts,
        buttonClasses: [opts.mobileButton, "button-hamburger"],
        buttonIcon: ["icon-hamburger"],
        buttonInteractions: hamburgerMenuInteractions,
      },
    }),
  );
}

export function decorateMobileDialogButton({ input, opts }) {
  input.appendChild(
    setupButton({
      input,
      opts: {
        ...opts,
        buttonClasses: [opts.mobileButton, "button-close"],
        buttonIcon: ["icon-close"],
        buttonInteractions: dialogCloseInteractions,
      },
    }),
  );
}

export function decorateMobileDialog({ input, opts }) {
  console.log("input", input);
  const headerBlock = input.parentNode;
  console.log("headerBlock", headerBlock.classList.toString());
  const dialogHTML = document.createElement("dialog");
  decorateMobileDialogButton({ input: dialogHTML, opts });

  input.querySelectorAll("ul > li").forEach((li) => {
    decorateNestedNavigation({ input: li, opts });
  });

  dialogHTML.classList.add(opts.dropdownClass);
  dialogHTML.appendChild(input);
  headerBlock.appendChild(dialogHTML);
}

export function decorateMobileNavigation({ input, opts }) {
  const navSection = input.querySelector(".header-nav");
  if (navSection) {
    decorateMobileButton({ input, opts });
    decorateMobileDialog({ input: navSection, opts });
    //decorateIcons(navSection);
  }
}
