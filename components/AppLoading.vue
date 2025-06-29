<script setup>
import { ref } from "vue";
import { usePageStore } from "#imports";

const { redirect } = usePageStore();
const loading = ref(100);
const loaded = ref(false);

const handleClick = () => {
    loaded.value = true;
    const moveTimeout = setTimeout(() => {
        redirect("home");
        clearTimeout(moveTimeout);
    }, 1000);
};

const animate = setTimeout(() => {
    const increaseLoadingValue = setInterval(() => {
        if (loading.value > 0 && loading.value <= 100) loading.value--;
        else if (loading.value < 0) loading.value = 0;
    }, 15);

    increaseLoadingValue();

    if (loading.value == 100) {
        clearTimeout(animate);
        clearInterval(increaseLoadingValue);
    }
}, 750);

onMounted(() => {
    animate;
});
</script>

<template>
    <div
        class="container w-full h-full transition-all duration-500"
        :class="loaded ? 'opacity-0' : 'opacity-100'"
    >
        <div
            class="flex flex-col gap-8 w-full h-full justify-center items-center"
        >
            <div
                class="border rounded-full border-transparent relative transition-all duration-500"
                :class="loading == 0 ? 'p-12' : 'p-24'"
            >
                <div
                    class="w-full h-full absolute top-0 left-0 rounded-full border border-cream scale-y-0 transition-all duration-500"
                    :class="`scale-y-${loading == 0 ? '0' : '100'}`"
                ></div>
                <img
                    src="~/assets/image/logo.gif"
                    alt="image-logo-gif"
                    class="rounded-full transition-all duration-500"
                    :class="loading == 0 ? 'w-24 h-24' : 'w-32 h-32'"
                />
                <p
                    class="text-cream text-xs absolute font-poppins top-4 left-1/2 -translate-x-1/2 bg-background px-2 transition-all duration-500"
                    :class="loading == 0 ? 'hidden' : 'block'"
                >
                    {{ 100 - loading }} %
                </p>
            </div>
            <button
                class="text-white px-14 py-2 border-cream rounded-full border font-semibold tracking-[0.5rem] text-sm text-center cursor-pointer transition-all duration-500 hover:bg-cream hover:text-background"
                :class="loading == 0 ? 'block' : 'hidden'"
                @click="handleClick"
            >
                Try Quiz
            </button>
        </div>
    </div>
</template>
