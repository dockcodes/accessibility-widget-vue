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
App.vue
```vue
<template>
  <AccessibilityProvider token="YOUR_TOKEN">
    <Demo />
  </AccessibilityProvider>
</template>

<script setup lang="ts">
  import { AccessibilityProvider } from "@dockcodes/accessibility-widget-vue"
  import Demo from './Demo.vue'
</script>
```
Demo.vue
```vue
<template>
  <div v-if="!ready">
    <p>Widget loading…</p>
  </div>
  <div v-else style="padding: 20px;">
    <h1>Demo Accessibility Widget</h1>
    <button @click="accessibility.setContrast(true)">Enable contrast</button>
    <button @click="accessibility.toggleInvertColors()">Invert colors</button>
    <button @click="accessibility.setFontSize(4)">Large font</button>
    <button @click="accessibility.resetAll()">Reset</button>
  </div>
</template>

<script setup lang="ts">
  import { watchEffect } from 'vue'
  import { useAccessibility } from '@dockcodes/accessibility-widget-vue'

  const { accessibility, ready } = useAccessibility()

  watchEffect(() => {
    if (ready) {
      accessibility.onMenuOpen(() => console.log('Menu opened!'))
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
