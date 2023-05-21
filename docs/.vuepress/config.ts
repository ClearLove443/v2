import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/v2/",

  locales: {
    "/": {
      lang: "en-US",
      title: "clearlove's blog",
      description: "禅与计算机编程艺术",
    },
    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "博客演示",
    //   description: "vuepress-theme-hope 的博客演示",
    // },
  },

  theme,

  shouldPrefetch: false,

  plugins: [
    searchProPlugin(
      {
        indexContent: true
      }
    )
  ]
});
