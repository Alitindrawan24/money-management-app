export default defineNuxtRouteMiddleware(() => {
    const token = useCookie("access-token", {
        default: () => "",
    });

    if (token.value == "") {
        return navigateTo('/login')
    }
})