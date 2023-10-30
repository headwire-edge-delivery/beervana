import { decorateNestedNavigation } from "../desktop/decorators.js";
import { setupButton } from "../../../scripts/utils.js";
import { dialogCloseInteractions, hamburgerMenuInteractions } from "../header-interactions.js";

export function decorateMobileButton({ input, opts }) {
  input.appendChild(
    setupButton({
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