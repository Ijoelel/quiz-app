<script setup>
defineProps({
    title: String,
    url: String,
    image: String,
});

const page = usePageStore();
</script>
<template>
    <div
        @click="page.currentPage = `quiz-${url}`"
        class="bg-transparent shadow-md rounded-lg p-4 border border-cream text-white flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
        <img
            :src="`/${image}`"
            :alt="`${title} Image`"
            class="w-full h-52 object-cover rounded-lg mb-4"
        />
        <h2 class="text-lg font-bold mb-2 text-center">{{ title }}</h2>
        <!-- URL is hidden from the UI -->
    </div>
</template>
