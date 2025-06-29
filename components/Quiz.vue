<script setup lang="ts">
import type { TDBResponse, TDBResult, TQuestion } from "~/types/type";

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
});

const questions = ref<TQuestion[]>([]);
const activeQuestionIndex = ref(0);
const score = ref(0);
const showScore = ref(false);

function selectAnswer(answer: string) {
    if (questions.value[activeQuestionIndex.value].correct === answer) {
        score.value++;
    }

    if (activeQuestionIndex.value + 1 < questions.value.length) {
        activeQuestionIndex.value++;
    } else {
        showScore.value = true;
    }
}

const { data, error } = await useFetch<TDBResponse>(() => props.url, {
    method: "GET",
});

watchEffect(() => {
    if (data.value && data.value.results) {
        questions.value = data.value.results.map((q: TDBResult) => {
            const allAnswers = [...q.incorrect_answers, q.correct_answer];
            return {
                question: decodeHTMLEntities(q.question),
                answers: shuffle(allAnswers.map(decodeHTMLEntities)),
                correct: decodeHTMLEntities(q.correct_answer),
            };
        });
    } else if (error.value) {
        console.error("Error fetching quiz data:", error.value);
        console.log("trying to fetch again...");
        setTimeout(() => {
            const { data, error } = useFetch<TDBResponse>(() => props.url, {
                method: "GET",
            });

            if (data.value && data.value.results) {
                questions.value = data.value.results.map((q: TDBResult) => {
                    const allAnswers = [
                        ...q.incorrect_answers,
                        q.correct_answer,
                    ];
                    return {
                        question: decodeHTMLEntities(q.question),
                        answers: shuffle(allAnswers.map(decodeHTMLEntities)),
                        correct: decodeHTMLEntities(q.correct_answer),
                    };
                });
            } else if (error.value) {
                console.error("Error fetching quiz data again:", error.value);
            }
        }, 2000);
    }
});

function decodeHTMLEntities(str: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
}
</script>

<template>
    <div
        v-if="questions.length"
        class="text-cream p-12 border rounded-2xl shadow bg-background w-1/3 h-full flex flex-col items-center justify-center"
    >
        <div
            v-if="questions.length && !showScore"
            class="bg-transparent p-6 rounded shadow max-w-xl w-full"
        >
            <h2 class="text-lg font-bold mb-4">
                Question {{ activeQuestionIndex + 1 }} of {{ questions.length }}
            </h2>
            <p class="mb-4 text-lg">
                {{ questions[activeQuestionIndex].question }}
            </p>
            <ul class="space-y-2">
                <li
                    v-for="(answer, index) in questions[activeQuestionIndex]
                        .answers"
                    :key="index"
                >
                    <button
                        @click="selectAnswer(answer)"
                        class="bg-transparent text-white px-4 py-2 rounded w-full text-left border border-cream cursor-pointer hover:bg-cream hover:text-background transition-colors duration-300"
                    >
                        {{ answer }}
                    </button>
                </li>
            </ul>
        </div>
        <div
            v-if="showScore"
            class="bg-transparent p-6 rounded shadow max-w-xl w-full text-center"
        >
            <h2 class="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p class="text-lg">
                You scored {{ score }} out of {{ questions.length }}
            </p>
            <button
                class="mt-4 bg-transparent text-white px-6 py-2 rounded border border-cream cursor-pointer hover:bg-cream hover:text-background"
                @click="
                    activeQuestionIndex = 0;
                    showScore = false;
                    score = 0;
                "
            >
                Retry
            </button>
        </div>
    </div>
    <div
        v-else
        class="p-12 border rounded-2xl shadow bg-transparent border-cream w-1/3 h-full flex flex-col items-center justify-center"
    >
        <div class="bg-transparent p-6 rounded shadow max-w-xl w-full animate-pulse">
            <div>
                <div class="w-48 mb-4 h-8 bg-gray-200/50 rounded"></div>
                <div class="w-full mb-4 h-8 bg-gray-200/50 rounded"></div>
                <div class="w-48 mb-4 h-8 bg-gray-200/50 rounded"></div>
                <ul class="space-y-2">
                    <li v-for="item in Array(4)">
                        <div
                            class="bg-gray-200/50 px-4 py-2 rounded w-full text-left border h-12"
                        ></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
