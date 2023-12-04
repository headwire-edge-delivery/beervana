import { getMetadata } from './aem.js';

export async function fetchJSON(opts) {
  const options = opts.fetchOptions || {};
  const resp = await fetch(opts.path, options);

  if (resp.ok) {
    const json = await resp.json();
    return json;
  }

  return undefined;
}

export async function fetchDocument(opts) {
  const meta = getMetadata(opts.path);
  const path = meta ? new URL(meta).pathname : `/${opts.path}`;
  const options = opts.fetchOptions || {};
  const resp = await fetch(`${path}.plain.html`, options);

  if (resp.ok) {
    const html = await resp.text();
    return html;
  }

  return undefined;
}

export async function fetchDocumentAndReplaceBlock({ input, opts }) {
  const doc = await fetchDocument(opts);
  if (doc) {
    input.innerHTML = doc;
    return { input, opts };
  }
  return undefined;
}

export function runDecorator(props, decorator) {
  if (props.input) return decorator(props);

  return undefined;
}

export function runDecorators(props, decorators) {
  const { opts } = props;
  let { input } = props;
  decorators.forEach((decorator) => {
    input = runDecorator({ input, opts }, decorator);
  });
}

export function decorateSectionsWithClasses({ input, opts }) {
  if (input) {
    input
      .querySelectorAll(':scope > div')
      .forEach((section, index) => section.classList.add(opts.sectionClasses[index]));
    return input;
  }
  return false;
}

export function decorateByMediaQuery(
  props,
  matches,
  matchedDecorators,
  unmatchedDecorators,
) {
  runDecorators(props, matches ? matchedDecorators : unmatchedDecorators);
}

export function setupButton({ opts }) {
  const button = document.createElement('button');
  if (opts?.buttonClasses) {
    button.classList.add(...opts.buttonClasses);
  }
  if (opts?.buttonIcon) {
    const icon = document.createElement('span');
    icon.classList.add(...['icon', ...opts.buttonIcon]);
    button.appendChild(icon);
  }
  if (opts?.buttonText) {
    const text = document.createElement('span');
    text.classList.add('text');
    text.innerHTML = opts.buttonText;
    button.appendChild(text);
  }
  if (opts?.buttonInteractions) {
    opts.buttonInteractions(button, opts);
  }

  return button;
}
