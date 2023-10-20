import { getMetadata, decorateIcons, readBlockConfig } from './aem.js';

export async function fetchDocument(opts) {
  const meta = getMetadata(opts.path);
  const path = meta ? new URL(meta).pathname : `/${opts.path}`;
  const resp = await fetch(`${path}.plain.html`);

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
  let { input, opts } = props;
  decorators.forEach(decorator => {
    input = runDecorator({ input, opts }, decorator)
  });
}

export function decorateSectionsWithClasses({ input, opts }) {
  console.log("decorateSectionsWithClasses", input.childNodes, opts)
  if (input) {
    input.querySelectorAll("div").forEach((section, index) => section.classList.add(opts.sectionClasses[index]));
    return input;
  }
}

export function runLoop(input, callback) {
  if (input.length > 0) {
    for (let i = 0; i < input.length; i++) {
      callback(input[i], index);
    }
  }
}
