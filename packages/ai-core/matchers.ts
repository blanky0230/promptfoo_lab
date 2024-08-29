import type { MatcherResult } from 'bun:test';
import { expect } from 'bun:test';
import type { GradingConfig } from 'promptfoo';
import { assertions } from 'promptfoo';

const { matchesSimilarity, matchesLlmRubric } = assertions;

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
            received: T,
            expected: T,
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
        ): Promise<MatcherResult> {
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
    });
}
