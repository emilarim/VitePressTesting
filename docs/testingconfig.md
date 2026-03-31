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

#### Completing Installation

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

#### Installation Considerations

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

For more details see [1](https://vitepress.dev/reference/default-theme-sidebar).

## Link Configurations

VitePress provides very flexible ways to link between documentation pages:

### 1. Using Relative Paths 

Example: [Installation Section](installationVitePress)

    ```md
      [Installation Section](installationVitePress)
    ```
  > It is not necessary to include the `md` extension, as VitePress resolves it automatically.

### 2. Jumping Between Sections Within the Same Document Using an Anchor

Example: [Link Configurations](#link-configurations)

    ```md
      [Link Configurations](#link-configurations)
    ```
  > VitePress automatically generates IDs from the headings.

### 3. Using Standard Markdown Syntax for External Links

Example: [GitHub](https://github.com/emilarim/VitePressTesting).

    ```md
      [GitHub](https://github.com/emilarim/VitePressTesting)
    ```
### 4. Auto-Resolution by Title Using Reference-Style Links

It is possible to define references associated with a page and reuse them throughout the document.

  1. Define a reference in the Markdown content (e.g.,*hello-docs*):

    ```md
      Select [hello-docs][VitePressHome] to start
    ```

  2. Declare the reference with its target path and optional title:

    ```md
      [VitePressHome]: /index.md "UX Evaluation Criteria"
    ```
  
  **Example Usage:**
  
  To start UX Evaluation Criteria, select [hello-docs][VitePressHome].

  <!-- Later in the document -->
  [VitePressHome]: /index.md "UX Evaluation Criteria"

  > References can be decalred once and reused multiple times in the document.

## Page Composition (Content)

In VitePress, each Markdown file is compiled into HTML and then processed as a *Vue Single-File Component*. This allows the user to use any Vue features directly inside Markdown and compose a single rendered page using dynamic templating, Vue components, or custom in-page Vue logic by adding a `<script> tag` 
[6](https://vitepress.dev/guide/using-vue).

For example, once a Vue component is defined in terms of structure and style locally or globally, it can be reused throughout multiple pages in the project.

### **Creating *Warning Boxes* as a Vue Component**
  1. Create the components folder inside the project:

    ```bash
    docs/.vitepress/theme/components/
    ```
  2. Create a Vue component file:

    ```bash
    docs/.vitepress/theme/components/WarningBox.vue
    ```
  3. Example component:

    ```bash
    <template>
      <div class="warning">
        ⚠️ <slot />
      </div>
    </template>

    <style scoped>
    .warning {
      padding: 10px;
      border-left: 4px solid orange;
      background: #fff8e1;
    }
    </style>
    ```
  4. Register the component in `docs/.vitepress/theme/index.ts`:

    ```bash
    import DefaultTheme from 'vitepress/theme'
    import WarningBox from './components/WarningBox.vue'

    export default {
      ...DefaultTheme,
      enhanceApp({ app }) {
        app.component('WarningBox', WarningBox)
      }
    }
    ```

  5. Use the component in any markdown (`.md`) file:

  ```bash
    <WarningBox>
    This is a reusable warning!
    </WarningBox>
  ```
    <WarningBox>
    This is a reusable warning!
    </WarningBox>

### **Creating *notebox* as Reusable Snippets**

  1. Create a Vue component file in the components folder:

    ```bash
    docs/.vitepress/theme/components/NoteBox.vue
    ```
  2. Example component:

    ```bash
    <template>
      <div class="note">
        <strong>{{ title }}</strong>
        <p><slot /></p>
      </div>
    </template>

    <script setup>
    defineProps({
      title: {
        type: String,
        default: 'Note'
      }
    })
    </script>
    ```
  3. Register the component in `docs/.vitepress/theme/index.ts`:

    ```bash
    import DefaultTheme from 'vitepress/theme'
    import NoteBox from './components/NoteBox.vue'

    export default {
      ...DefaultTheme,
      enhanceApp({ app }) {
        app.component('NoteBox', NoteBox)
      }
    }
    ```
  4. Use the component in any Markdown (`.md`) file:

    ```bash
      <NoteBox title="Warning">
      THIS IS A NOTEBOX SNIPPET!
      </NoteBox>
    ```
    <NoteBox title="Warning">
    THIS IS A NOTEBOX SNIPPET!
    </NoteBox>

For additional components that are **not natively** supported, it is possible to use extra plugins to extend functionality. For example, plugins for interactive charts, advanced diagrams, or custom UI elements.

### **Including Markdown Files**

VitePress allows including Markdown files inside other pages, enabling reusable snippets.

  1. Create a `snippets` folder and a Markdown file (`common-errors.md`) inside the project:

    ```bash
    docs/.vitepress/snippets/common-errors.md
    ```
    Example content:

    ```md
    | Error | Solution |
    |-------|----------|
    | `command not found` | Ensure Node.js is in your PATH | `permission 
    | denied` | Try running with `sudo` or fix permissions |
    ```

  2. Install the `market` library to parse Markdown content:

    ```bash
    npm install marked --save-dev
    ```
  3. Create a custom `IncludeMarkdown` component:

    ```bash
    docs/.vitepress/theme/components/IncludeMarkdown.vue
    ```
    Example component:

    ```md
      <template>
        <div class="included-markdown" v-html="renderedContent"></div> </template>

      <script setup>
      import { ref, onMounted } from 'vue'
      import { marked } from 'marked'

      const props = defineProps({
        src: {
          type: String,
          required: true
        }
      })

      const renderedContent = ref('')

      onMounted(async () => {
        try {
          const response = await fetch(props.src)
          const markdown = await response.text()
          renderedContent.value = marked.parse(markdown)
        } catch (error) {
          console.error(`Failed to load ${props.src}:`, error)
          renderedContent.value = `<div class="error">Failed to load content: 
      ${props.src}</div>`
        }
      })
      </script>
    ```
  4. Register the component in `docs/.vitepress/theme/index.ts`:

    ```bash
    import DefaultTheme from 'vitepress/theme'
    import WarningBox from './components/IncludeMarkdown.vue'

    export default {
      ...DefaultTheme,
      enhanceApp({ app }) {
        app.component('IncludeMarkdown', IncludeMarkdown)
      }
    }
    ```

  5. Use the component `common-errors.md` in any Markdown (`.md`) file:

    ```bash
      <IncludeMarkdown src="/.vitepress/snippets/common-errors.md" />
    ```

  <IncludeMarkdown src="/.vitepress/snippets/common-errors.md" />


  :::tip
  If a component is only used by a few pages, it is recommended to import it explicity where it is used. This allows proper code-splitting and loads the component only on relevant pages.
  :::

### **Vue Components**

VitePress supports Vue components inside Markdown, enabling a similar concept to **MDX** *(Markdown with JSX (JavaScript XML) in React).


| Feature | MDX (React) | VitePress (Vue)         |
| ------- | ----------- | ----------------------- |
| Syntax  | JSX         | Vue template            |
| Props   | `{}`        | `""`                    |
| Events  | `onClick`   | `@click`                |
| Logic   | inline JS   | inside `<script setup>` |

Appying basic examples provided by owner [7](https://vitepress.dev/guide/using-vue):

  #### 1. Script & Style

  ```bash
    ---
    Not using `<template> tag`
    ---

    <script setup>
    import { ref } from 'vue'

    const count = ref(0)
    </script>

    ##### Markdown Content

    The count is: {{ count }}

    <button :class="$style.button" @click="count++">Increment</button>

    <style module>
    .button {
      color: red;
      font-weight: bold;
    }
    </style>

  ```
  ![Script](/images/Script.png)

#### 2. Enabling Vue Interpolation Inside Fences

Use Vue-style interpolation in code fences with the `-vue` suffix, e.g. `js-vue`:
  
  ```bash
    ```js-vue
    Hello {{ 1 + 1 }}
    ```
  ```

  ```js-vue
  Hello {{ 1 + 1 }}
  ```

#### 3. Importing and Using Vue Components in Markdown

  1. Create a Vue Component `docs/.vitepress/theme/components/TestButton.vue`:

    ```bash
    <template>
      <button @click="handleClick">
        {{ label }}
      </button>
    </template>

    <script setup>
    // ✅ props (data passed from Markdown)
    const props = defineProps({
      label: {
        type: String,
        default: 'Click me'
      }
    })

    // ✅ event handler
    const handleClick = () => {
      alert(`You clicked: ${props.label}`)
    }
    </script>

    <style scoped>
    button {
      padding: 8px 12px;
      background: #646cff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    </style>
    ```
  2. Register the component in `docs/.vitepress/theme/index.ts`

    ```bash
    import DefaultTheme from 'vitepress/theme'
    import TestButtonButton from './components/TestButton.vue'

    export default {
      ...DefaultTheme,
      enhanceApp({ app }) {
        app.component('TestButton', TestButton)
      }
    }
    ```
  3. Use it in Markdown

    ```bash
    <TestButton label="Press me" />

    <TestButton label="Another button" />
      ```

<TestButton label="Press me" />

<TestButton label="Another button" />


## Content Authoring Experience

VitePress supports Markdown from standard syntax to advance features with minimal setup:

1. Code blocks with syntax highlighting (Java, XML, YAML, Gradle, shell) is supported out of the box using **Shiki** [8](https://shiki.style/languages):

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello, VitePress!");
  }
}
```

```xml
<note>
  <to>User</to>
  <message>Hello, world!</message>
<note>
```

```yaml
title: Hello docs
Version: 1.0.0
```

2. Tabbed code blocks (e.g., Maven vs Gradle) are supported via built-in **code groups**:

::: code-group

```xml [Maven]
<dependency>
  <groupId>org.example</groupId>
</dependency>
```

```gradle [Gradle]
implementation 'org.hellodocsframework.boot:hello-docs-starter-web'
```
:::

3. Collapsible sections, supported natively via `<details>` HTML:

<details>
<summary>Click to expand</summary>

HELLO DOCS, hidden content here!

</details>

4. Badges or labels using built-in components:

<Badge type="tip" text="beta" />
<Badge type="warning" text="experimental" />

## Additional Difficulties Encountered

- During sidebar customization in `config.mts`, an incorrect link (`//installationVitePress`) did not produce detailed error information in the *Node.js* console:

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
  1. The expected URL `http://localhost:5173/installationVitePress.html` was incorrectly redirected to `http://installationVitePress`.
  2. VitePress only reported the most recent configuration change in the `config.mts`, without clearly identifying the root cause of the issue.

    ![WrongLink](/images/WrongLink.png)
  
    A separate misconfiguration (incorrect image path) was correctly reported in the event logs:

    ![WrongImg](/images/WrongImg.png)

- Manual customization of the Mermaid Renderer plugin tends to be error-prone and relies heavily on console logs and external documentation for troubleshooting.

## Analyzing Security Vulnerabilities

After performing the `npm audit report` command, **three moderate severity vulnerabilities** related to **esbuild** (an open-source JavaScript bundler and minifier built for speed and simplicity) [9](https://esbuild.github.io/?utm_source=chatgpt.com) were identified. These vulnerabilities allow any website to send requests to the development server and read the response.

![EsbuildVulnerabilites](/images/EsbuildVulnerabilities.png)

They are nested inside the dependencies of VitePress: 

![esbuild](/images/esbuildNested.png)

These vulnerabilities affect the behavior of the development server and are independent of the application code. The vulnerable dependency chain is as follows:

```
This project
  → VitePress
    → Vite
      → esbuild (vulnerable)
```
### What is the risk?

This is primarily a local development risk. If the development server (`npm run docs:dev`) is running while a malicious or untrusted website is open, that webside could attempt to send requests to the localhost and read the respondes.

Therefore, this can be considered a development‑only risk, not an application security flaw.

#### Countermeasures

- Harden the development server to prevent unauthorized access, for example by allowing only specific IP addresses or networks.
- Wait for upstream fixes from Vite and esbuild in future releases.
- Mitigate locally by binding the development server to localhost only:

  ```Javascript
  export default {
    vite: {
      server: {
        host: '127.0.0.1'
      }
    }
  }
  ```

