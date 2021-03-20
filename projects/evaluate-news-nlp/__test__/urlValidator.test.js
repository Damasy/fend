const validateURL = require('../src/client/js/urlValidator');

describe("Verify URL is correct", () => {

    test("Valid HTTPS URL", () => {
        const url_test_case = 'https://example.com';
        const expected = [url_test_case];
        expect(validateURL.validateURL(url_test_case)).toStrictEqual(expected);
    })

    test("Valid HTTP URL", () => {
        const url_test_case = 'http://example.ca';
        const expected = [url_test_case];
        expect(validateURL.validateURL(url_test_case)).toStrictEqual(expected);
    })

    test("Missing H in HTTP", () => {
        const url_test_case = 'ttp://example.com';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Missing colon after HTTPS", () => {
        const url_test_case = 'https//example.com';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Missing one slash after colon", () => {
        const url_test_case = 'https:/example.com';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Missing two slashes after colon", () => {
        const url_test_case = 'https:example.com';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Missing domain name", () => {
        const url_test_case = 'https://.com';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Missing domain extension", () => {
        const url_test_case = 'https://example';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })

    test("Test random characters", () => {
        const url_test_case = 'T5yUGYWGKNuxYOC0oEFfcMQUhItgmvQERfaRQHWfqvqHq6dy5Omyi';
        expect(validateURL.validateURL(url_test_case)).toBe(null);
    })
})