import { defineConfig } from 'vitepress'
//import vitepressMermaid from 'vitepress-plugin-mermaid'

//import { MermaidPlugin } from 'vitepress-mermaid-renderer'

// https://vitepress.dev/reference/site-config

export default defineConfig({
    title: "hello-docs",
    description: "Testing VitePress",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Technical Evaluation', link: '/installationVitePress' }
      ],

      sidebar: [
        {
          text: 'Technical Evaluation',
          items: [
            { text: 'Installation Considerations', link: '/installationVitePress' },
            { text: 'Testing Configurations', link: '/testingconfig' }
          ]
        }
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/emilarim/VitePressTesting' }
      ]
    },
    //markdown: {
      //config(md) {
        //md.use(MermaidPlugin)
      //}
    //}
  })
