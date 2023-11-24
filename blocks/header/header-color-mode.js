const LIGHT_MODE_LABEL = "Activate light mode";
const DARK_MODE_LABEL = "Activate dark mode";
const DARK_MODE_TRANSITION_TIME = 500;
const LIGHT_MODE_TRANSITION_TIME = 1500;

export function decorateColorMode(block) {
  console.log("decorateColorMode", block);
  
  const currentModeLabel = getModeLabel();

  const colorButton = `<button aria-label="${currentModeLabel}" title="${currentModeLabel}" class="color-mode-toggle ${getColorScheme()}">
    <svg width="18" height="18" viewBox="0 0 18 18">
      <mask id="moon-mask-main-nav">
        <rect x="0" y="0" width="18" height="18" fill="#FFF"></rect>
        <circle cx="10" cy="2" r="8" fill="black"></circle>
      </mask>
      <circle cx="9" cy="9" fill="var(--color-text)" mask="url(#moon-mask-main-nav)" r="8"></circle>
      <g>
        <circle cx="17" cy="9" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
        <circle cx="13" cy="15.928203" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
        <circle cx="5" cy="15.928203" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
        <circle cx="1" cy="9" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
        <circle cx="5" cy="2.071797" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
        <circle cx="13" cy="2.071797" r="1.5" fill="var(--color-text)" style="transform-origin: center center; transform: scale(0);"></circle>
      </g>
    </svg>
  </button>`;
  const placeholder = block.querySelector('[href="#COLOR_MODE_TOGGLE"]');
  if (placeholder) {
    placeholder.outerHTML = colorButton;
    const button = block.querySelector('button.color-mode-toggle');
    console.log('button', button);
    button.addEventListener('click', toggleColorMode);
  }
}

function toggleColorMode(e) {
  const button = e.target.closest('.color-mode-toggle');
  button.classList.toggle('transition');
  setTimeout(() => button.classList.toggle('transition'), getTransitionTime());

  if (document.documentElement.classList.contains('dark-mode')) {
    window.localStorage.setItem('darkMode', false);
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.add('light-mode');
  } else {
    window.localStorage.setItem('darkMode', true);
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  }
}

function getColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

function setColorScheme() {

}

function getModeLabel() {
  return getColorScheme() === "light" ? DARK_MODE_LABEL : LIGHT_MODE_LABEL;
}

function getTransitionTime() {
  
}