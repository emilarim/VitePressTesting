// .vitepress/theme/index.ts
import { h, nextTick } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import WarningBox from './components/WarningBox.vue';
import IncludeMarkdown from './components/IncludeMarkdown.vue';
import TestButton from './components/TestButton.vue';
//import './style.css';
import { useRoute } from "vitepress";
import { createMermaidRenderer } from "vitepress-mermaid-renderer";
//import "vitepress-mermaid-renderer/dist/style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app, router }) {
    app.component('WarningBox', WarningBox),
    app.component('IncludeMarkdown', IncludeMarkdown),
    app.component('TestButton', TestButton)
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