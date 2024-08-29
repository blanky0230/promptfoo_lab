import { describe, expect, it } from 'bun:test';
import { installMatchers } from './matchers';

installMatchers();

describe('startup', () => {
    it('should work', () => {
        expect(true).toBe(true);
    });
});
