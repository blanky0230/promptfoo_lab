import { describe, expect, it } from 'bun:test';

describe('example', () => {
    it('is an example', () => {
        // This is an example test. Replace it with your own tests.
        expect(1 + 1).toBe(2);
    });

    it('allows us to use proptfoo matchers', async () => {
        await expect(
            'I love cats, I love every kind of cat',
        ).toMatchSemanticSimilarity('I like cats', 0.8);
    });
});
