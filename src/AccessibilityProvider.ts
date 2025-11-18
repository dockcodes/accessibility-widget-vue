import { App, reactive, provide, inject, onMounted, Ref, ref } from "vue"
import { accessibility } from "@dockcodes/accessibility-widget"

export interface AccessibilityContextValue {
    accessibility: typeof accessibility | null
    ready: boolean
}

const AccessibilitySymbol = Symbol("Accessibility")

export function createAccessibilityProvider(token: string) {
    const state = reactive<AccessibilityContextValue>({
        accessibility: accessibility,
        ready: false
    })

    onMounted(() => {
        accessibility.init(token).then(() => {
            state.ready = true
        })
    })

    provide(AccessibilitySymbol, state)
    return state
}

export function useAccessibility() {
    const context = inject<AccessibilityContextValue>(AccessibilitySymbol)
    if (!context) {
        throw new Error(
            "Accessibility is not available. Wrap your app with createAccessibilityProvider."
        )
    }
    return context
}

export default {
    install(app: App, token: string) {
        const state = reactive<AccessibilityContextValue>({
            accessibility: accessibility,
            ready: false
        })

        accessibility.init(token).then(() => {
            state.ready = true
        })

        app.provide(AccessibilitySymbol, state)
    }
}
