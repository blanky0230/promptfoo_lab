test:
    bun test

test-watch:
    bun --filter "*" test --watch

test-coverage:
    bun test --coverage

dev-lab:
    bun run --filter "*" dev 
