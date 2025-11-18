import {ref, inject, provide, readonly, type Ref, onMounted, type InjectionKey} from "vue"
import {accessibility} from "@dockcodes/accessibility-widget"

export interface AccessibilityContextValue {
    accessibility: typeof accessibility | null
    ready: Ref<boolean>
}

export const accessibilityInjectionKey: InjectionKey<AccessibilityContextValue> = Symbol("accessibility")

interface AccessibilityProviderProps {
    token: string
}

export const UseAccessibility = {
    props: ["token"],
    setup(props: AccessibilityProviderProps, {slots}: any) {
        const ready = ref(false)

        onMounted(() => {
            let mounted = true
            accessibility.init(props.token).then(() => {
                if (mounted) {
                    ready.value = true
                }
            }).catch((error: any) => {
                console.error("Accessibility widget failed to load:", error)
            })

            return () => {
                mounted = false
            }
        })

        const contextValue: AccessibilityContextValue = {
            accessibility: accessibility,
            ready: readonly(ready) as Ref<boolean>
        }

        provide(accessibilityInjectionKey, contextValue)

        return () => slots.default()
    },
    name: "AccessibilityProvider"
}

export const useAccessibility = (): { accessibility: typeof accessibility; ready: Ref<boolean> } => {
    const context = inject(accessibilityInjectionKey)

    if (!context || !context.accessibility) {
        throw new Error("useAccessibility must be used within an <AccessibilityProvider>.")
    }

    return {
        accessibility: context.accessibility,
        ready: context.ready,
    }
}