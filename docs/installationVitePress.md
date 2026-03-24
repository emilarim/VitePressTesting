# Installation Considerations

The **[VitePress](https://vitepress.dev/guide/getting-started)** site provides a basic depoyment guide with the following prerequisites:

- Installation of `Node.js` ([Node.js](https://nodejs.org/en/download/) (version 20.0 or above) to transform source files (Markdown, MDX) into static HTML during the build process, compile Vue/React components used in documentation, and generate search indexes and navigation structures.
- Use of the LTS (Long-Term Support) version to ensure a stable and reliable foundation.

This documentation generator deployment considers the following (pre-release) version, installed using the command:

  ```bash
  npm add -D vitepress@next
  ```
  - Initialize VitePree with `npx vitepress init` to scafffold a basic project
  - And start the documentation server with `npm run docs:dev`

  >Once the VitePress starts, it does not automatically open the website. It requires to manually open a browser and navigate to `http://localhost:5173`
  
VitePress supports *Hot reloading*, so when the project files are saved, the website reloads automatically and displays the changes.

>This installation was performed on Windows 11 Enterprise.
