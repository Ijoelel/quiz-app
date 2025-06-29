<script setup lang="ts">
import data from "@/assets/data";

const load = ref(false);
onMounted(() => {
    setTimeout(() => {
        load.value = true;
    }, 100);
});
</script>

<template>
    <section class="flex flex-col items-center justify-center w-full h-full">
        <h1
            class="text-cream text-2xl font-bold mb-4 transition-all duration-1000"
            :class="{ 'opacity-100': load, 'opacity-0': !load }"
        >
            Quiz List
        </h1>
        <div
            class="container flex justify-center items-center gap-4 h-full flex-wrap transition-all duration-500"
            :class="{
                'opacity-100 w-full': load,
                'opacity-0 w-0': !load,
            }"
        >
            <Card
                v-for="item in data"
                :key="item.title"
                :title="item.title"
                :url="item.url"
                :image="item.image"
            />
        </div>
    </section>
</template>
