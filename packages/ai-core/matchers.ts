import { expect } from 'bun:test';
import type { GradingConfig } from 'promptfoo';
import { assertions } from 'promptfoo';

const {
    matchesSimilarity,
    matchesLlmRubric,
    matchesAnswerRelevance,
    matchesFactuality,
} = assertions;

interface PromptFooMatchers<Result = unknown> {
    toMatchSemanticSimilarity(
        expected: string,
        threshold?: number,
    ): Promise<Result>;
    toPassLLMRubric(
        expected: string,
        gradingConfig: GradingConfig,
    ): Promise<Result>;
}

declare module 'bun:test' {
    interface Assertion<T> extends PromptFooMatchers<T> {}
    interface AsymmetricMatchersContaining extends PromptFooMatchers {}
}

export function installMatchers() {
    expect.extend({
        async toMatchSemanticSimilarity<T extends string>(
            received: string,
            expected: string,
            threshold = 0.8,
        ) {
            const result = await matchesSimilarity(
                received,
                expected,
                threshold,
            );

            const pass = received === expected || result.pass;
            if (pass) {
                return {
                    message: () =>
                        `expected ${received} not to match semantic similarity with ${expected}`,
                    pass: true,
                };
            }
            return {
                message: () =>
                    `expected ${received} to match semantic similarity with ${expected}, but it did not. Reason: ${result.reason}`,
                pass: false,
            };
        },

        async toPassLLMRubric(
            received: string,
            expected: string,
            gradingConfig: GradingConfig,
        ) {
            const gradingResult = await matchesLlmRubric(
                expected,
                received,
                gradingConfig,
            );
            if (gradingResult.pass) {
                return {
                    message: () =>
                        `expected ${received} not to pass LLM Rubric with ${expected}`,
                    pass: true,
                };
            }
            return {
                message: () =>
                    `expected ${received} to pass LLM Rubric with ${expected}, but it did not. Reason: ${gradingResult.reason}`,
                pass: false,
            };
        },

        async toMatchFactuality(input, expected, received, gradingConfig) {
            const gradingResult = await matchesFactuality(
                input,
                expected,
                received,
                gradingConfig,
            );
            if (gradingResult.pass) {
                return {
                    message: () =>
                        `expected ${received} not to match factuality with ${expected}`,
                    pass: true,
                };
            } else {
                return {
                    message: () =>
                        `expected ${received} to match factuality with ${expected}, but it did not. Reason: ${gradingResult.reason}`,
                    pass: false,
                };
            }
        },

        async toMatchClosedQA(input, expected, received, gradingConfig) {
            const gradingResult = await matchesClosedQa(
                input,
                expected,
                received,
                gradingConfig,
            );
            if (gradingResult.pass) {
                return {
                    message: () =>
                        `expected ${received} not to match ClosedQA with ${expected}`,
                    pass: true,
                };
            }
            return {
                message: () =>
                    `expected ${received} to match ClosedQA with ${expected}, but it did not. Reason: ${gradingResult.reason}`,
                pass: false,
            };
        },
    });
}
