import {App, reactive, provide, inject} from "vue"
import {accessibility} from "@dockcodes/accessibility-widget"

export interface AccessibilityContextValue {
    accessibility: typeof accessibility | null
    ready: boolean
}

export const AccessibilitySymbol = Symbol("Accessibility")

export function createAccessibilityProvider(token: string) {
    const state: AccessibilityContextValue = reactive({
        accessibility,
        ready: false
    })

    provide(AccessibilitySymbol, state)

    accessibility.init(token).then(() => {
        state.ready = true
    })

    return state
}

export function useAccessibility() {
    const context = inject<AccessibilityContextValue>(AccessibilitySymbol)
    if (!context) {
        throw new Error(
            "Accessibility is not available. Wrap your app with AccessibilityPlugin using app.use() or createAccessibilityProvider."
        )
    }
    return context
}

export default {
    install(app: App, token: string) {
        const state: AccessibilityContextValue = reactive({
            accessibility,
            ready: false
        })

        app.provide(AccessibilitySymbol, state)

        accessibility.init(token).then(() => {
            state.ready = true
        })
    }
}
