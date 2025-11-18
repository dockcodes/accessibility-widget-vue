# @dockcodes/accessibility-widget-vue

Check our [Accessibility Widget](https://wcag.dock.codes/#wcag-open).

### Installation

```bash
npm install @dockcodes/accessibility-widget-vue
```
or
```bash
yarn add @dockcodes/accessibility-widget-vue
```

### Usage
main.ts
```tsx
import { createApp } from "vue"
import App from "./App.vue"
import AccessibilityPlugin from "@dockcodes/accessibility-widget-vue"

const app = createApp(App)

app.use(AccessibilityPlugin, "YOUR_TOKEN")

app.mount("#app")
```
Component
```vue
<template>
  <div>
    <button @click="setContrast">Enable contrast</button>
    <button @click="openMenu">Open menu</button>
    <p v-if="!ready">Widget loading…</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAccessibility } from "@dockcodes/accessibility-widget-vue"

export default defineComponent({
  setup() {
    const { accessibility, ready } = useAccessibility()

    const setContrast = () => {
      if (accessibility) accessibility.setContrast(true)
    }
    
    const openMenu = () => {
      if (accessibility) accessibility.openMenu()
    }

    return { setContrast, openMenu, ready }
  }
})
</script>
```
### Base package
👉  [@dockcodes/accessibility-widget](https://www.npmjs.com/package/@dockcodes/accessibility-widget)

### 🔑 Get Your Free Widget Token
👉 https://wcag.dock.codes/my-account/tokens/

### 🤝 Contributing
Contributions are welcome!
If you find a bug or want to improve the library, please open an issue or pull request on
👉 [GitHub](https://github.com/dockcodes/accessibility-widget-vue/issues)
