---
outline: deep
---

# Testing Configurations

As part of the technical evaluation criteria, features such as chart creation (*Mermaid*), folder structures, cross-referencing, and new findings were tested in order to identify the strenghts and weaknesses of the VitePress documentation generator.

## Creating Mermaid Diagrams

VitePress supports different kinds of plugins for creating everything from simple static diagrams to fully interactive visualizations. Two of the most popular plugins are intended to be tested:

| Plugin | Key Feature | Best For | Configuration Complexity |
| :--- | :--- | :--- | :--- |
| **vitepress-plugin-mermaid** [1](https://emersonbottero.github.io/vitepress-plugin-mermaid/)| The standard, most widely-used plugin for basic Mermaid support. | Simple, reliable diagram rendering with dark theme detection. | Low |
| **vitepress-mermaid-renderer** [2](https://github.com/sametcn99/vitepress-mermaid-renderer) | Transforms diagrams into **interactive** visualizations with a toolbar for zoom, pan, fullscreen, and download. | Creating engaging, interactive diagrams for complex documentation. | Medium |


### 1. Testing **vitepress-plugin-mermaid**

#### Difficulties Encountered

While trying to install the official Mermaid plugin using:

```bash
npm npm install vitepress-plugin-mermaid -D
```
a dependency conflict ocurred. The `vitepress-plugin-mermaid` (v2.0.17) requires VitePress versions `1.0.0` or `1.0.0-alpha`, while, the current installed version is `2.0.0-alpha.16`.

![DependencyConflict](/images/DependencyConflict.png)

Currently, the stable, actively maintained, and recommended version for VitePress is in the
1.x release line (specifically 1.6.4). The current alpha version does not provide compatibility with the Mermaid plugin. Therefore, it is necessary to downgrade the VitePress version (see npm versions [3](https://www.npmjs.com/package/vitepress?activeTab=versions)).

::: info
Performing a downgrade must not cause loss of site content or configuration, since the content is store in `./docs`, while the Vitepress configuration relies on `./node_modules` and `./package-lock.json`.
::: 

##### Downgrading to VitePress 1.6.4
- Remove the entire `node_modules` directory and the `package-lock.json` file, then install the stable version, and reinstall dependencies:

```bash
npm uninstall vitepress
```
```cmd
rmdir /s /q node_modules
del package-lock.json
```
```bash
npm install vitepress@1.6.4 -D
```
```bash
npm install
```
- Verify the installed version:

```bash
npm vitepress --version
```
![v1.6.4](/images/v1.6.4.png)

After downgrading, the `npm audit report` shows ***3 moderate severity vulnerabilities*** related to its dependency chain, specifically involving `esbuild` (a fast build tool used in modern web development to bundle and optimize JavaScript/TypeScript code). 

The recommended fix suggests downgrading VitePress to the very old version `0.1.1` using `npm audit fix --force`. However, this approach prioritizes *“fixing vulnerabilities”* over maintaining project stability and compatibility. 

In previous tests with another documentation generator (*Docusaurus*), this command caused cascading dependency errors and system instability [4](https://github.com/emilarim/hello-docs-v2/blob/main/docs/technical-evaluation/testingconfig.md) [5](https://medium.com/@instatunnel/why-npm-audit-fix-force-is-a-terrible-idea-052ac56a3ae2).  

![Vulnerabilities](/images/Vulnerabilities.png)

#### Completing installation

::: warning
After completing the installation of the *vitepress-plugin-mermaid*, another moderate-severity vulnerability appears, bringing the total to four.
:::

```bash
npm install vitepress-plugin-mermaid -D
```
![MermaidVulnerabilities](/images/MermaidVulnerabilities.png)

- As part of completing the feature installation, it was neccesary to customize the `.vitepress/config.mts`:
  1. Import the `withMermaid` feature from the `vitepress-plugin-mermaid` plugin
  2. Call this feature within the `export default` configuration. 

  ````md
  ```js{4}
  
    import { defineConfig } from 'vitepress'
    import { withMermaid } from 'vitepress-plugin-mermaid'

    export default withMermaid(
    defineConfig({
      title: "hello-docs",
      description: "Testing VitePress"
    })
    )
  ```

#### Writing a Mermaid Diagram in Markdown

The `vitepress-plugin-mermaid` is a lightweight, static plugin that provides basic support for Mermaid diagrams.

- Simple FlowChart:

```bash
  ```mermaid
  graph TD
      A[Start] --> B{Is it working?}
      B -->|Yes| C[Celebrate]
      B -->|No| D[Debug]
      D --> B
    ```
```
![SimpleFlowChart](/images/SimpleFlowChart.png)

- Sequence Diagram:

```bash
  ```mermaid
  sequenceDiagram
      participant Alice
      participant Bob
      Alice->>Bob: Hello Bob, how are you?
      Bob->>Alice: I am good thanks!
    ```
```
![SequenceDiagram](/images/SequenceDiagram.png)

- The latest version `mermaid@11.13.0` does not support advance diagrams such as *gitGraph* [4](https://github.com/emersonbottero/vitepress-plugin-mermaid/issues/80).

  ```
    ```mermaid
      gitGraph
        commit id: "Initial"
        commit id: "Second"
    ```
  ```

  ```mermaid
  gitGraph
      commit id: Initial commit
      branch develop
      checkout develop
      commit id: First develop commit
      commit id: Second develop commit
      checkout main
      merge develop id: Merge develop
      commit id: Final commit
  ```

### 2. Testing **vitepress-mermaid-renderer**

In order to test diagrams with interactive visualizations supporting features such as zoom, pan, fullscreen, and copy, it was necessary to uninstall the current `vitepress-plugin-mermaid` and install `vitepress-mermaid-renderer` instead.

::: warning
Keeping both plugins installed caused runtime conflicts, resulting in diagrams not rendering correctly after navigation.
:::

#### Installation considerations

1. Run the renderer plugin `npm install vitepress-mermaid-renderer mermaid -D`. 
2. Configure the `.vitepress/config.mts`:

  ```md
    ```js{4}
      import { defineConfig } from 'vitepress'
      import { withMermaid } from 'vitepress-mermaid-renderer'

      export default withMermaid(
      defineConfig({
        title: "hello-docs",
        description: "Testing VitePress"
      })
      )
  ```

3. Create a `theme` folder and `index.ts` file manually (*VitePress does NOT create it by default*), to support the follow folder structure.

  ```
    docs/
    └─ .vitepress/
        ├─ config.mts
        └─ theme/
            └─ index.ts
  ```

4. Edit the `.vitepress/config.mts`, deleting previous Mermaid configurations.

  ```md
    ```js{4}
      export default withMermaid(
      defineConfig({
        title: "hello-docs",
        description: "Testing VitePress"
      })
      )
    ```
  ```

5. Configure the `./docs/theme/index.ts` file [5](https://github.com/sametcn99/vitepress-mermaid-renderer)

  ```md
    ```js{4}
      // .vitepress/theme/index.ts
    import { h, nextTick } from "vue";
    import type { Theme } from "vitepress";
    import DefaultTheme from "vitepress/theme";
    import { useRoute } from "vitepress";
    import { createMermaidRenderer } from "vitepress-mermaid-renderer";

    export default {
      extends: DefaultTheme,
      Layout: () => {
        return h(DefaultTheme.Layout, null, {});
      },
      enhanceApp({ app, router }) {
        // Initialize the mermaid renderer
        const mermaidRenderer = createMermaidRenderer({
          theme: 'default',
          //startOnLoad: false,
          gitGraph: {
            rotateCommitLabel: true,
            showCommitLabel: true,
            showBranches: true,
            mainBranchName: 'main' 
          },
          themeVariables: {
            commitLabelFontSize: '16px'
          }
        });
        
        mermaidRenderer.initialize();

        // Re-render diagrams after route changes
        if (router) {
          router.onAfterRouteChange = () => {
            nextTick(() => mermaidRenderer.renderMermaidDiagrams());
          };
        }
      },
    } satisfies Theme;
    ```
  ```

::: info
The number of vulnerabilities reported after upgrading the Mermaid plugin remained the same (*4 Moderate-severity*).
:::

![MermaidRendererVulnerabilities](/images/MermaidRendererVulnerabilities.png)

#### Writing Renderer Mermaid Diagrams in Markdown

- Simple FlowChart:

  ```mermaid
  graph TD
      A[Start] --> B{Is it working?}
      B -->|Yes| C[Celebrate]
      B -->|No| D[Debug]
      D --> B
  ```

- Sequence Diagram:

  ```mermaid
  sequenceDiagram
      participant Alice
      participant Bob
      Alice->>Bob: Hello Bob, how are you?
      Bob->>Alice: I am good thanks!
  ```

- gitGraph:

  ```mermaid
  gitGraph
      commit id: "Project Start"
      commit id: "Initial Setup"
      commit id: "Basic Structure"
      branch develop
      checkout develop
      commit id: "Sprint 1 - Planning"
      commit id: "Sprint 1 - Feature A"
      commit id: "Sprint 1 - Tests"
      commit id: "Sprint 2 - Feature B"
      commit id: "Sprint 2 - Documentation"
      commit id: "Sprint 3 - Feature C"
      commit id: "Sprint 3 - Performance"
      commit id: "Sprint 3 - Bug fixes"
      checkout main
      merge develop id: "Release v1.0"
      commit id: "Post-release"
      commit id: "Maintenance"
  ```

- Pie Chart:

  ```mermaid
  pie
      title Project Resource Allocation
      "Development" : 45
      "Testing" : 20
      "Documentation" : 15
      "Management" : 10
      "Desing" : 10
  ```

## Reorder Sections and Pages

Reordering documentation sections and pages is done by manually editing the *side bar* configuration file in `.vitepress/config.mts`. The order of the list items determines the order in which they appear.

According to the following figure, *'Installation Considerations'* appears first in the *'Technical Evaluation'* menu, followed by *'Testing Configurations'*.

![Reorder](/images/ReorderSectionsPages.png)

To reorder pages within a section, it is necessary to rearrange each object inside the `items` array. To reorder entire sections, the corresponding block (from text: ' ', items:[] ) must be moved up or down within the `sidebar` array.

## Link Configurations

- How can link from one documentation page to another? (relative paths, special syntax, auto-resolution by title?)

VitePress is very flexible linking between documentation pages in several ways.

- Using relative paths: [Installation Section](installationVitePress)

        ```md
        [Installation Section](installationVitePress)
        ```
  > It is not necessary to include the `.md` extension, as VitePress resolves it automatically.

- Jumping between sections within the same document using an anchor: [Link Configurations](#link-configurations)

        ```md
        [Link Configurations](#link-configurations)
        ```
  > VitePress automatically generates IDs from the headings.

- Using standard Markdown syntax for external links: [GitHub](https://github.com/emilarim/VitePressTesting).

      ```md
      [GitHub](https://github.com/emilarim/VitePressTesting)
      ```
- Auto-Resolution by Title is possible using reference-style links in Markdown:

  1. Define a reference associated with a page (e.g.,*hello-docs*):

    ```md
    Select [hello-docs][VitePressHome] to start
    ```

  2. Declare the reference with the target path and optional title:

    ```md
    [VitePressHome]: /index.md "UX Evaluation Criteria"
    ```
  
  Example usage:
  
  To start UX Evaluation Criteria select [hello-docs][VitePressHome].

  <!-- Later in the document -->
  [VitePressHome]: /index.md "UX Evaluation Criteria"



## Additional Difficulties Encountered

- During the customization of the sidebar in the *`config.mts`* file, an issue caused by an incorrect configuration, especifically using double slashes in the link field `//installationVitePress` (syntax error), did not produce detailed error information in the *Node.js* console.

  ````md
  ```js{config.mts}
  sidebar: [
      {
        text: 'Technical Evaluation',
        items: [
          { text: 'Installation Considerations', link: '//installationVitePress' }
        ]
      }
    ],
  ```
  ````
  1. The expected URL `http://localhost:5173/installationVitePress.html` was incorrectly redirected to the invalid website `http://installationVitePress`.
  2. VitePress only reported the most recent configuration change in the *`config.mts`* file, without clearly identifying the root cause of the issue.

    ![WrongLink](/images/WrongLink.png)
  
    However, a separate misconfiguration involving an incorrect image path (indicating a folder structure issue) was successfully reported on the event logs:

    ![WrongImg](/images/WrongImg.png)

- Manual customization of the Mermaid Renderer plugin tends to be error-prone and relies heavilyon console logs and external documentation for troubleshooting.