import {
  dialogCloseInteractions,
  hamburgerMenuInteractions,
  setupNestedNavigationInteractions,
} from "./header-interactions.js";
import { setupButton } from "../../scripts/utils.js";

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
    nestedToggle.innerText = "v"; // TODO remove after icon styling
    nestedToggle.classList.add(opts.dropdownToggleClass);
    setupNestedNavigationInteractions(nestedToggle);

    const nestedUL = document.createElement("ul");
    ul.querySelectorAll("li").forEach((li) => {
      nestedUL.appendChild(decorateNestedNavigationItem({ input: li, opts }));
    });
    ul.remove();

    const nestedNav = document.createElement("dialog");
    nestedNav.classList.add(opts.dropdownClass);
    nestedNav.setAttribute("aria-expanded", false);
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
        buttonClasses: opts.mobileButton,
        buttonIcon: "icon-hamburger",
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
        buttonClasses: opts.mobileButton,
        buttonIcon: "icon-close",
        buttonInteractions: dialogCloseInteractions,
      },
    }),
  );
}

export function decorateMobileDialog({ input, opts }) {
  const headerBlock = input.parentNode;
  const dialogHTML = document.createElement("dialog");
  const ul = input.querySelector("ul");

  decorateMobileDialogButton({ input: dialogHTML, opts });

  ul.querySelectorAll("li").forEach((li) => {
    const liHTML = document.createElement("li");
    const link = li.querySelector("a");
    liHTML.appendChild(link);
    dialogHTML.appendChild(liHTML);
  });

  dialogHTML.classList.add(opts.dropdownClass);
  dialogHTML.setAttribute("aria-expanded", false);
  headerBlock.appendChild(dialogHTML);
  dialogHTML.appendChild(input);
}

export function decorateMobileNavigation({ input, opts }) {
  const navSection = input.querySelector(".header-nav");
  if (navSection) {
    decorateMobileDialog({ input: navSection, opts });
    decorateMobileButton({ input, opts });
  }
}
