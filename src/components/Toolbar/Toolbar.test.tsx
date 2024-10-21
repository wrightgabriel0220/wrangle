import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Toolbar from "./Toolbar";
import { Tag } from "../../../bindings";
import AddProjectModal from "../modals/AddProjectModal/AddProjectModal";

expect.extend(matchers);

const mockTags: Tag[] = [
    {
        id: "0",
        name: "test0",
        description: "test0",
        color: "blue",
    },
    {
        id: "1",
        name: "test1",
        description: "test1",
        color: "red",
    },
    {
        id: "2",
        name: "test2",
        description: "test2",
        color: "yellow",
    },
];

describe("Toolbar", () => {
    afterEach(() => {
        cleanup();
    });

    it("adjusts search text state when the user modifies the search bar's input", () => {
        const mockSetSearchQuery = vi.fn();

        const { getByPlaceholderText } = render(
            <Toolbar
                fetchAppData={() => {}}
                searchQuery=""
                setIsModalOpen={() => {}}
                setModalContent={() => {}}
                setSearchQuery={mockSetSearchQuery}
                setSelectedTags={() => {}}
                tags={[]}
                createTag={async (_tagName) => { return true; }}
                createProject={async (_values) => { return true; }}
            />
        )

        const searchBar = getByPlaceholderText("Search...");
        fireEvent.change(searchBar, {target: { value: "a" } });

        expect(mockSetSearchQuery.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetSearchQuery.mock.lastCall?.[0]).toBe("a");

        fireEvent.change(searchBar, { target: { value: "ab" } });

        expect(mockSetSearchQuery.mock.calls.length).toBeGreaterThanOrEqual(2);
        expect(mockSetSearchQuery.mock.lastCall?.[0]).toBe("ab");
    });

    it("opens the add project modal when the user clicks the add project button", () => {
        const mockSetIsModalOpen = vi.fn();
        const mockSetModalContent = vi.fn();

        render(
            <Toolbar
                fetchAppData={() => {}}
                searchQuery=""
                setIsModalOpen={mockSetIsModalOpen}
                setModalContent={mockSetModalContent}
                setSearchQuery={() => {}}
                setSelectedTags={() => {}}
                tags={[]}
                createTag={async (_tagName) => { return true; }}
                createProject={async (_values) => { return {} as true }}
            />
        );

        const addProjectButton = screen.getByRole("button", { name: "add project" });
        fireEvent(addProjectButton, new MouseEvent("click", { bubbles: true }));

        expect(mockSetIsModalOpen.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetIsModalOpen.mock.lastCall?.[0]).toBe(true);
        
        expect(mockSetModalContent.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetModalContent.mock.lastCall?.[0].type).toBe(AddProjectModal);
    });

    it("renders all selected tags", () => {
        render(
            <Toolbar
                fetchAppData={() => {}}
                searchQuery=""
                setIsModalOpen={() => {}}
                setModalContent={() => {}}
                setSearchQuery={() => {}}
                setSelectedTags={() => {}}
                tags={mockTags}
                createTag={async (_tagName) => { return true; }}
                createProject={async (_values) => { return {} as true }}
            />
        );

        mockTags.forEach(mockTag => {
            const targetTag = screen.getByText(mockTag.name);

            expect(targetTag).toBeInTheDocument();
        });
    });
});