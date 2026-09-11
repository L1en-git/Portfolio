# Project screenshots

One folder per project, named after that project's `slug` in `src/data/projects.ts`:

```
src/assets/projects/
├── project-one/
│   ├── image-1.png
│   ├── image-2.png
│   └── image-3.png
└── project-two/
    └── image-1.png
```

## Adding images for a project

1. Drop the screenshot files into `src/assets/projects/<slug>/`.
2. In `src/data/projects.ts`, `import` each file at the top of the file:
   ```ts
   import myProjectShot1 from "../assets/projects/my-project/image-1.png";
   ```
3. Reference it in that project's `images` array:
   ```ts
   images: [
     { src: myProjectShot1, alt: "Short, specific description of what's shown" },
   ],
   ```

Omit the `images` field entirely for a project with no screenshots yet — the gallery
section on the details page just won't render. One image hides the arrows/dots
automatically; two or more shows the full carousel.
