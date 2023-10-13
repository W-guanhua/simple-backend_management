export default {
  title: "{{title}}",
  tabs: {
    {{#each tabList}}
      "{{this.tab}}": "{{this.tabName}}",
    {{/each}}
  },
  baseURL: '{{baseURL}}'
}