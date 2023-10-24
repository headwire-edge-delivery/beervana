export default async function decorate(block) {
  console.log("form decorate", block);
  const input = block;
  const opts = {
    path: 'form',
  }

  block.classList.add('form', 'form-block')
}
