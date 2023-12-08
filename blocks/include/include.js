function templateCard({ path, title, description }) {
  return `<div class="card">
    <div class="cards-card-image image-content">
      <a href="${path}" title="${title}">
        <picture>
          <source type="image/webp" srcset="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=webply&amp;optimize=medium">
          <img loading="lazy" alt="Migration Brewing" src="/media_12d37a59a0671d5f5dba24f7f51319ab0d16d9666.jpeg?width=750&amp;format=jpeg&amp;optimize=medium">
        </picture>
      </a>
    </div>
    <div class="cards-card-body">
      <h3>
        <a href="${path}" title="${title}">${title}</a>
      </h3>
      <p>${description}</p>
      <p class="button-container">
        <strong>
          <a href="${path}" title="${title}" class="button primary">More ${title.split(' ')[0]}</a></strong></p>
    </div>
  </div>`;
}

/* eslint-disable no-unused-vars */
function templateBreakout({ path, title, description }, index) {
  return `<div class="breakout-${index % 2 === 0 ? 'left' : 'right'} two-columns block">
    <div class="default-content-wrapper">
      <h2 id="portland-art-museum">Portland Art Museum</h2>
      <p>The Portland Art Museum has 240,000 square feet, with more than 112,000 square feet of gallery space. The museum’s permanent collection has over 42,000 works of art</p>
      <ul>
        <li><span class="icon icon-map-pin"><img data-icon-name="map-pin" src="/icons/map-pin.svg" loading="lazy" alt="map-pin" width="16" height="16"></span>1219 SW Park Avenue<br>Portland, OR 97205</li>
        <li><span class="icon icon-phone"><img data-icon-name="phone" src="/icons/phone.svg" loading="lazy" alt="phone" width="16" height="16"></span>General info: 503-226-2811</li>
        <li><span class="icon icon-phone"><img data-icon-name="phone" src="/icons/phone.svg" loading="lazy" alt="phone" width="16" height="16"></span>Membership: 503-276-4249</li>
        <li><span class="icon icon-link"><img data-icon-name="link" src="/icons/link.svg" loading="lazy" alt="link" width="16" height="16"></span><a href="http://localhost:3000/external-link-interstitial?redirect=https://portlandartmuseum.org/&amp;back=http://localhost:3000/activities" title="https://portlandartmuseum.org/">https://portlandartmuseum.org/</a></li>
      </ul>
    </div>
    <div class="default-content-wrapper image-content">
      <picture>
        <source type="image/webp" srcset="./media_1ddaedc26276f9520db5a059733923dcbdb8cff5e.png?width=2000&amp;format=webply&amp;optimize=medium" media="(min-width: 600px)">
        <source type="image/webp" srcset="./media_1ddaedc26276f9520db5a059733923dcbdb8cff5e.png?width=750&amp;format=webply&amp;optimize=medium">
        <source type="image/png" srcset="./media_1ddaedc26276f9520db5a059733923dcbdb8cff5e.png?width=2000&amp;format=png&amp;optimize=medium" media="(min-width: 600px)">
        <img loading="lazy" alt="" src="./media_1ddaedc26276f9520db5a059733923dcbdb8cff5e.png?width=750&amp;format=png&amp;optimize=medium" width="1133" height="934">
      </picture>
    </div>
  </div>`;
}

const templateConfig = {
  cards: templateCard,
  breakout: templateBreakout,
  default: templateCard,
};

export default async function decorate(block) {
  const queryA = block.querySelector('a[href*="query-index.json"]');
  if (queryA) {
    const styles = Array.from(block.classList).filter((c) => c.toLowerCase() !== 'include' && c.toLowerCase() !== 'block');
    const params = new URLSearchParams(queryA.href);
    block.querySelector(':scope > div:first-child').remove();
    const response = await fetch(queryA.href);
    if (response.ok) {
      let { data } = await response.json();
      if (data?.length > 0) {
        /* refactor to loop over params and filter data */
        if (params.get('tag')) {
          data = data.filter((item) => JSON.parse(item.tags.toLowerCase()).includes(params.get('tag')));
        }
      }

      const template = templateConfig[styles[0]] || templateConfig.default;
      const container = document.createElement('div');
      container.className = `${styles.join(' ')} wrapper`;
      container.innerHTML = data.map(template).join('');
      block.appendChild(container);
    }
  }
}
