export type TDBResult = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type TQuestion = {
    question: string;
    answers: string[];
    correct: string;
};

export type TDBResponse = {
    response_code: number;
    results: TDBResult[];
};
