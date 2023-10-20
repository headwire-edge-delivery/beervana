import { getMetadata, decorateIcons, readBlockConfig } from './aem.js';

export async function fetchDocument(opts) {
  const meta = getMetadata(opts.path);
  const path = meta ? new URL(meta).pathname : `/${opts.path}`;
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();
    return html;
  }

  return undefined;
}

export async function fetchDocumentAndReplaceBlock(props) {
  const [input, opts] = props;
  const document = await fetchDocument(opts);
  if (document) {
    block.innerHTML = document;
    return [block, opts];
  }
  return undefined;
}

export function runDecorator(props, decorator) {
  const [input, opts] = props;
  if (input) {
    const output = decorator(props);
    return [output, opts];
  }

  return undefined;
}

export function runDecorators(props, decorators) {
  decorators.forEach(decorator => runDecorator(props, decorator));
}

export function decorateSectionsWithClasses(props) {
  const [input, opts] = props;
  if (input) {
    input.children?.forEach((section, index) => section.classList.add(opts.sectionClasses[index]));
    return [input, opts];
  }
}

export function runLoop(input, callback) {
  if (input.length > 0) {
    for (let i = 0; i < input.length; i++) {
      callback(input[i], index);
    }
  }
}

