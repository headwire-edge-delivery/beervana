import {
  dialogCloseInteractions,
  hamburgerMenuInteractions,
  setupNestedNavigationInteractions,
} from "../header-interactions.js";
import { setupButton } from "../../../scripts/utils.js";
import { decorateIcons } from "../../../scripts/aem.js";

export function decorateNestedNavigationItem({ input, opts }) {
  const navItem = document.createElement("li");
  const linkSubtitleContainer = document.createElement("div");
  const icon = input.querySelector(".icon");
  const link = input.querySelector("a");
  const subtitle = document.createElement("span");

  if (icon && link && subtitle) {
    input.querySelector(".icon")?.remove();
    navItem.appendChild(icon);

    input.querySelector("a")?.remove();
    subtitle.innerText = input.innerText.trim();

    navItem.classList.add(opts.dropdownNestedItemClass);
    linkSubtitleContainer.classList.add(
      opts.dropdownNestedItemLinkSubtitleClass,
    );
    linkSubtitleContainer.appendChild(link);
    linkSubtitleContainer.appendChild(subtitle);
    navItem.appendChild(linkSubtitleContainer);

    return navItem;
  }
  return false;
}

export function decorateNestedNavigation({ input, opts }) {
  const ul = input.querySelector("ul");
  if (ul) {
    // refactor to use setupButton, and to use CSS for the icon to account for dark/light/inverse modes
    const nestedToggle = setupButton({
      opts: {
        ...opts,
        buttonClasses: [opts.dropdownToggleClass],
        buttonIcon: ["icon-toggle-inverse"],
        buttonInteractions: setupNestedNavigationInteractions,
      }
    });
    /*
    const nestedToggle = document.createElement("button");
    const nestedToggleIcon = document.createElement("span");
    
    nestedToggleIcon.classList.add("icon", "icon-toggle-inverse");
    nestedToggle.appendChild(nestedToggleIcon);
    nestedToggle.classList.add(opts.dropdownToggleClass);
    setupNestedNavigationInteractions(nestedToggle);
    */

    const nestedUL = document.createElement("ul");
    ul.querySelectorAll("li").forEach((li) => {
      const nestedItem = decorateNestedNavigationItem({ input: li, opts });
      if (nestedItem) nestedUL.appendChild(nestedItem);
    });
    ul.remove();

    const nestedNav = document.createElement("dialog");
    const nestedDialogToggle = setupButton({
      opts: {
        ...opts,
        buttonClasses: [opts.dropdownToggleClass],
        buttonIcon: ["icon-toggle-inverse"],
        buttonInteractions: dialogCloseInteractions,
      }
    });
    nestedNav.classList.add(opts.dropdownClass);
    nestedNav.appendChild(nestedDialogToggle);
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
