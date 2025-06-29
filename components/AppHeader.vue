<script setup lang="ts">
const page = usePageStore();

const load = ref(false);
setTimeout(() => {
    load.value = true;
}, 100);
</script>
<template>
    <div class="container bg-transparent flex gap-4 items-center">
        <div class="container w-fit">
            <img
                src="~/assets/image/logo.gif"
                alt="image-logo-gif"
                class="w-10"
            />
        </div>
        <button
            v-if="page.currentPage.startsWith('quiz-')"
            @click="page.currentPage = 'home'"
        >
            <h1
                class="text-cream text-2xl font-bold cursor-pointer transition-all duration-1000 hover:text-cream/80"
                :class="{ 'opacity-100': load, 'opacity-0': !load }"
            >
                Back to Home
            </h1>
        </button>
    </div>
</template>
