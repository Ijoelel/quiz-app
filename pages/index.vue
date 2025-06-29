<script setup lang="ts">
import { usePageStore } from "#imports";
import AppLoading from "~/components/AppLoading.vue";
import Home from "~/components/Home.vue";
import Quiz from "~/components/Quiz.vue";
import { computed } from "vue";

const page = usePageStore();

const currentView = computed(() => {
    if (page.currentPage === "loader") return AppLoading;
    if (page.currentPage === "home") return Home;
    return Quiz;
});
</script>

<template>
    <component
        :is="currentView"
        v-bind="
            page.currentPage.startsWith('quiz-') && {
                url: page.currentPage.replace('quiz-', ''),
            }
        "
    />
</template>
