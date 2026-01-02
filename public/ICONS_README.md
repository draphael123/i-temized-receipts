# PWA Icons

To make the app installable as a PWA, you need to create icon files.

## Required Icons

Create the following icon files in the `/public` directory:

- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

## How to Create Icons

1. **Design your icon** - Create a square icon with your logo/branding
2. **Export at required sizes**:
   - 192x192 pixels (for `icon-192.png`)
   - 512x512 pixels (for `icon-512.png`)
3. **Place in `/public` folder**

## Online Tools

You can use online tools to generate PWA icons:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- https://favicon.io/

## Quick Test

If you don't have icons yet, the app will still work, but the install prompt may not appear in all browsers. The manifest.json references these icons, so create them for the best user experience.

