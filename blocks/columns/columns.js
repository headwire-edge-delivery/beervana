import { loadBlocks } from '../../scripts/aem.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach(async (row) => {
    [...row.children].forEach(async (col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      const formLink = col.querySelector('.button-container:has(a[href$=".json"])');
      if (formLink) {
        const formContainer = document.createElement('div');
        formContainer.classList.add('form', 'block');
        formContainer.dataset.blockName = 'form';
        formContainer.append(...formLink.childNodes);
        formLink.before(formContainer);
        formLink.remove();
        await loadBlocks(formContainer.parentElement);
        const section = formContainer.closest('.section');
        section.removeAttribute('data-section-status');
        section.removeAttribute('style');
      }
    });
  });
}
