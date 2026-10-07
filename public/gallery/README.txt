Place your real website photos in this folder, for example:

- public/gallery/crane-site-1.jpg
- public/gallery/hydra-yard.jpg
- public/gallery/plant-relocation.jpg

Then add this to any gallery item in src/config/businessConfig.js:

  image: '/gallery/crane-site-1.jpg',

Keep the existing `art` field as a fallback so the layout still works before real photos are added.
