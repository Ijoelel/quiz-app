export const usePageStore = defineStore("page", () => {
    const currentPage = ref("loader");
    function redirect(to: string) {
        console.log(currentPage);
        currentPage.value = to;
    }
    return { currentPage, redirect };
});
