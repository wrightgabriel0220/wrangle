import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

describe("TagSelector", () => {
    afterEach(() => {
        cleanup();
    });

    it("adjusts tag search state when user enters text into the search input", () => {
        expect(false).toBeTruthy();
    });

    it("clears selected tags when the user clicks the clear tags button", () => {
        expect(false).toBeTruthy();
    });

    it("selects a tag when the user clicks it in the search dropdown", () => {
        expect(false).toBeTruthy();
    });

    it("provides accurate search results in the dropdown", () => {
        expect(false).toBeTruthy();
    });
});