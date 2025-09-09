// vitest.setup.ts
// NOTE: Extend Jest DOM matchers for Testing Library
import '@testing-library/jest-dom'

// NOTE: If you use MSW for API mocking in tests, you can also start the server here.
// import { server } from './src/test/mocks/server'
// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
