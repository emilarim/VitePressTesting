# Installation Considerations

The **[VitePress](https://vitepress.dev/guide/getting-started)** website provides a basic depoyment guide with the following prerequisites:

- Installation of [Node.js](https://nodejs.org/en/download/) (version 20.0 or above) to transform source files (Markdown, MDX/Vue) into static HTML during the build process, compile Vue/React components used in documentation, and generate search indexes and navigation structures.
- Use of the LTS (Long-Term Support) version to ensure a stable and reliable foundation.

This documentation generator deployment considers the following (pre-release) version, installed with the command:

  ```bash
  npm add -D vitepress@next
  ```
  - Initialize VitePree with `npx vitepress init` to scaffold a basic project.
  - Start the documentation server with `npm run docs:dev`.

  >Once VitePress starts, it does not automatically open the website. It requires to manually open a browser and navigate to `http://localhost:5173`
  
VitePress supports *Hot reloading*, so whenever project files are saved, the website automatically reloads and displays the changes.

>This installation was performed on Windows 11 Enterprise.

## Exploring Additional Setups

### Right Sidebar

VitePress provides a basic scaffolded project with a right sidebar structure. It automatically generates the `/doc` folder containing:

- Three layout options: the home page `index.md`, section 1 `api-examples.md`, and section 2 `markdown-examples`. If no specific structure is defined, the page is treated as a blank documentation page.
- A `.Vitepress` subfolder containing the `config.mts` file used to configure page references in the sidebar.
- Additional custom subfolders can also be created, such as a folder for storing images (`docs/images`).

VitePress supports heading levels, such as titles and subtitles within a document, which can be configured both *globally*, and *per page*:

```md
# My Documentation        ← H1 (Page title, on top of the page)

## Installation           ← H2 (Main sections)
### Requirements          ← H3 (Subsections)
#### Node Version         ← H4

## Usage                  ← H2
### Basic Example         ← H3
```

The `config.mts` for VitePress version `1.6.4` does not include explicit outline settings to control heading levels. Therefore, by default, it allows heading levels up to `H6`, as shown the following test:

![HeadingLevels](/images/HeadingLevels.png)

`config.mts` default configuration without `outline` settings:

```bash
  export default defineConfig({
      title: "Vitepress test",
      description: "A VitePress Site",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/markdown-examples' },
              { text: 'Runtime API Examples', link: '/api-examples' }
            ]
          }
        ],
```

### Numbering Sections

For numbering subsections (`H2`, `H3`, etc.), for example:

```bash
  1. Installation
  1.1 Requirements
  1.2 Setup
```
Vitepress does not perform this automatically by default, so it requires either manual numbering,

```bash
## 1. Installation
### 1.1 Requirements
### 1.2 Setup
```
or automatic numbering using CSS counters.

1. Ceate a CSS File
  
  Creating a Cascading Style Sheets file at in `docs/.vitepress/theme/style.css`

```bash
/* Enable counter for sections */
body {
   counter-reset: h2-counter;
}

/* Number h2 headings */
h2 {
   counter-reset: h3-counter;
   counter-increment: h2-counter;
}

h2:before {
   content: counter(h2-counter) ". ";
   font-weight: inherit;
}

/* Number h3 headings */
h3 {
   counter-increment: h3-counter;
}

h3:before {
   content: counter(h2-counter) "." counter(h3-counter) " ";
   font-weight: inherit;
}
```
2. Enable the CSS in `.vitepress/theme/index.ts`

```bash
import DefaultTheme from "vitepress/theme";
import './style.css';
```
3. Automatic heading numbering in Markdown

  Once enabled, headings in Markdown will be numbered automatically.

  ![NumberHeading](/images/NumberHeading.png)

::: info
For practicality, this blog will use manual nummeric headings.
:::

## GitHub Configuration

To upload the VitePress project to GitHub, it is necessary to create a repository and push the local project to it, following these simple steps:

1. **Initialize a Git repository**

  Open a terminal in the project root directory:

   ```bash
   cd Documents\Generators\VitePress
   ```
2. **Add a `.gitignore` file**
  This prevents unncessary files and folders from being uploaded:

  ```bash
  node_modules/
  dist/
  .vitepress/cache/
  .vitepress/dist/
  .DS_Store
  ```
3. **Add and commit the files**

  ```bash
  git add .
  git commit -m "Initial commit - VitePress configuration"
  ```
4. **Create a repository on GitHub**

  - Go to GitHub
  - Click **New repository**
  - Give the repository a name (e.g., `VitePressTesting`) and optionally a description.

5. **Link the local repository to GitHub**

  Replace `YourUsername` and `Repo_name` with the GitHub username and and repository name.

  ```bash
  git remote add origin https://github.com/YourUsername/Repo_name.git
  ```
6. **Push the project**

  ```bash
  git branch -M main
  git push -u origin main
  ```


