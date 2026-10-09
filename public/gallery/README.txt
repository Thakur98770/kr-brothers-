Place website photos in `public/assets`, for example:

- public/assets/crane-site-1.jpg
- public/assets/hydra-yard.jpg
- public/assets/plant-relocation.jpg

Then add this to any gallery item in src/config/businessConfig.js:

  image: '/assets/crane-site-1.jpg',

Keep the existing `art` field as a fallback so the layout still works before real photos are added.
