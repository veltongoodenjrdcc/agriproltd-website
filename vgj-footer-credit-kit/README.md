# VGJ Digital Footer Credit Kit

Reusable instructions and snippets for adding a small "Website by VGJ Digital" credit to future website projects.

## Goal

Add a non-obtrusive footer credit that is still visible enough to be noticed. The credit should sit near existing copyright or location text, use the site's current footer styling, and avoid feeling like a separate ad block.

Recommended wording:

```html
Website by <span>VGJ Digital</span>
```

## Basic HTML

Place this inside the existing footer bottom/meta area, near the copyright line.

```html
<p class="footer__credit">Website by <span>VGJ Digital</span></p>
```

If the project uses links for agency credits, use this version:

```html
<p class="footer__credit">
  Website by <a href="https://www.vgjdigital.com/" target="_blank" rel="noopener noreferrer">VGJ Digital</a>
</p>
```

## Basic CSS

Use the site's existing footer colors where possible. The VGJ Digital name can use the footer accent color so the credit is noticeable without competing with primary content.

```css
.footer__credit {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
}

.footer__credit span,
.footer__credit a {
  color: var(--color-highlight, currentColor);
  font-weight: 700;
}

.footer__credit a {
  text-decoration: none;
}

.footer__credit a:hover {
  text-decoration: underline;
}
```

## Placement Notes

- Add it to the lowest footer row if one exists.
- Keep the type size close to the copyright text.
- Use the site's existing accent color for "VGJ Digital".
- Avoid badges, large logos, or a separate full-width band unless the client asks for stronger branding.
- On mobile, allow the credit to wrap naturally with the other footer meta items.

## QA Checklist

- The credit appears in the footer on desktop and mobile.
- It does not crowd the copyright or contact details.
- The color contrast is readable against the footer background.
- If linked, the URL opens in a new tab and includes `rel="noopener noreferrer"`.
- The change is limited to footer markup and footer CSS unless the project has a componentized footer.
