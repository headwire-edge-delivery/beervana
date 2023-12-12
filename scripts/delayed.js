// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
function handleExternalLinks() {
  document.querySelectorAll('a:not(.interstitial a.button)').forEach((link) => {
    if (link.host !== window.location.host && link.href !== '#back' && link.href !== '#redirect') {
      link.href = `${window.location.origin}/external-link-interstitial?redirect=${link.href}&back=${window.location.href}`;
    }
  });
}

function decorateBreweryTemplate() {
  // get brewery metadata and make the selling points
  // get previous and next metadata and make the previous/next links
  const previousLink = document.querySelector('meta[name="previous-link"]')?.getAttribute('content');
  const previousLinkText = document.querySelector('meta[name="previous-link-text"]')?.getAttribute('content');
  const nextLink = document.querySelector('meta[name="next-link"]')?.getAttribute('content');
  const nextLinkText = document.querySelector('meta[name="next-link-text"]')?.getAttribute('content');

  if (previousLink || previousLinkText || nextLink || nextLinkText) {
    const pagination = document.createElement('div');
    pagination.classList.add('columns', 'pagination', 'columns-2');

    pagination.innerHTML = `<div class="previous-link">
      <h4 id="to-the-back">To the back</h4>
      <p class="button-container">
        <a href="${previousLink}" title="${previousLinkText}" class="button primary">
          <span class="icon icon-arrow-left">
            <img data-icon-name="arrow-left" src="/icons/arrow-left.svg" loading="lazy" alt="arrow-left" width="16" height="16">
          </span>
          <span>${previousLinkText}</span>
        </a>
      </p>
    </div>
    <div class="next-link">
      <h4 id="to-the-back">On Tap</h4>
      <p class="button-container">
        <a href="${nextLink}" title="${nextLinkText}" class="button primary">
          <span>${nextLinkText}</span>
          <span class="icon icon-arrow-right">
            <img data-icon-name="arrow-right" src="/icons/arrow-right.svg" loading="lazy" alt="arrow-right" width="16" height="16">
          </span>
        </a>
      </p>
    </div>`;

    document.querySelector('main .section:last-child').appendChild(pagination);
  }

  const hours = document.querySelector('meta[name="hours"]')?.getAttribute('content') || '';
  const address = document.querySelector('meta[name="address"]')?.getAttribute('content') || '';
  const telephone = document.querySelector('meta[name="telephone"]')?.getAttribute('content') || '';
  const website = document.querySelector('meta[name="website"]')?.getAttribute('content') || '';
  const websiteTitle = document.querySelector('meta[name="website-title"]')?.getAttribute('content') || '';
  const email = document.querySelector('meta[name="email"]')?.getAttribute('content') || '';
  const onTap = document.querySelector('meta[name="on-tap"]')?.getAttribute('content') || '';

  if (hours || address || telephone || website || websiteTitle || email || onTap) {
    const contact = document.createElement('div');
    contact.classList.add('sidebar-left', 'metadata-wrapper');
    contact.innerHTML = `<div class="contact-info">
      <h4>Contact</h4>
      <ul class="icon-list">
        ${address && `<li><span class="icon icon-map-pin"><img data-icon-name="map-pin" src="/icons/map-pin.svg" loading="lazy" alt="map-pin" width="16" height="16"></span><a href="https://google.com/maps/place/${address.replaceAll('<br/>,', '').replaceAll(' ', '+')}">${address.replaceAll('<br/>,', '<br/>')}</a></li>`}
        ${telephone && `<li><span class="icon icon-phone"><img data-icon-name="phone" src="/icons/phone.svg" loading="lazy" alt="phone" width="16" height="16"></span><a href="tel:${telephone}" title="Telephone Number">${telephone}</a></li>`}
        ${email && `<li><span class="icon icon-mail"><img data-icon-name="mail" src="/icons/mail.svg" loading="lazy" alt="mail" width="16" height="16"></span><a href="mailto:${email}" title="${email}">${email}</a></li>`}
        ${website && `<li><span class="icon icon-link"><img data-icon-name="link" src="/icons/link.svg" loading="lazy" alt="link" width="16" height="16"></span><a href="${website}" title="${websiteTitle || ''}">${websiteTitle || website}</a></li>`}
      </ul>
    </div>
    ${hours && `<div class="hours-info">
      <h4>Hours</h4>
      <ul class="icon-list">
      <li><span class="icon icon-clock"><img data-icon-name="clock" src="/icons/clock.svg" loading="lazy" alt="clock" width="16" height="16"></span>${hours.replaceAll('<br/>,', '<br/>')}</li>
      </ul>
    </div>`}
    <div class="on-tap-info">
      <h4 id="on-tap">On Tap</h4>
      <ul>${onTap.split(',').map((beer) => `<li>${beer}</li>`).join('')}</ul>
    </div>`;

    document.querySelector('main .hero-wrapper').after(contact);
  }
}

const templateConfig = {
  brewery: decorateBreweryTemplate,
};

function decorateTemplate() {
  const template = document.querySelector('meta[name="template"]')?.getAttribute('content');
  if (template && templateConfig[template]) {
    templateConfig[template]();
  }
}

decorateTemplate();
handleExternalLinks();
