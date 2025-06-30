<script setup lang="ts">
const page = usePageStore();
const isLoadingPage = computed(() => {
    return page.currentPage === "loader" ? true : false;
});
</script>

<template>
    <div
        class="bg-background min-h-screen flex flex-col relative"
        :class="
            isLoadingPage ? 'p-0 items-center justify-center' : 'px-20 py-8'
        "
    >
        <AppHeader v-show="!isLoadingPage" />

        <main class="w-full h-full flex items-center justify-center mt-26">
            <slot />
        </main>
    </div>
</template>
