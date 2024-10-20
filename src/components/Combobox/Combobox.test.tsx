import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Combobox from "./Combobox";
import { useMultipleSelection } from "downshift";

expect.extend(matchers);

interface TestComboboxProps<Item> {
    mockSelectedItems: Item[];
    removeSelectedItem: () => void;
    addSelectedItem: () => void;
    createItem: () => void;
    mockOptions: Item[];
};

const MockCombobox = ({ mockSelectedItems, addSelectedItem, createItem, mockOptions, removeSelectedItem }: TestComboboxProps<string>) => {
    const { getDropdownProps, selectedItems } = useMultipleSelection({ selectedItems: mockSelectedItems });

    return (
        <Combobox 
            addSelectedItem={addSelectedItem}
            createItem={createItem}
            getDropdownProps={getDropdownProps}
            options={mockOptions}
            removeSelectedItem={removeSelectedItem}
            selectedItems={selectedItems}
            addItemButtonText=""
        />
    )
};

describe("Combobox", () => {
    afterEach(() => {
        cleanup();
    });

    it("clears selected items when the user clicks the clear tags button", () => {
        const mockRemoveSelectedItem = vi.fn()
        
        const mockOptions = ["test-a", "test-b", "test-c"];
        const mockSelectedItems = mockOptions.slice(0, 2);

        render(
            <MockCombobox
                addSelectedItem={vi.fn()}
                createItem={vi.fn()}
                mockOptions={mockOptions}
                mockSelectedItems={mockOptions.slice(0, 2)}
                removeSelectedItem={mockRemoveSelectedItem}
            />
        );

        const clearSelectionButton = screen.getByRole("button", { name: "clear combobox" });
        fireEvent(clearSelectionButton, new MouseEvent("click", { bubbles: true }));

        expect(mockRemoveSelectedItem.mock.calls.length).toBe(mockSelectedItems.length);
        expect(mockRemoveSelectedItem).toHaveBeenLastCalledWith(mockSelectedItems[mockSelectedItems.length - 1]);
    });

    it("doesn't show selected items in the search dropdown", () => {
        const mockOptions = ["test-a", "test-b", "test-c"];

        render(
            <MockCombobox
                addSelectedItem={vi.fn()}
                createItem={vi.fn()}
                mockOptions={mockOptions}
                mockSelectedItems={[mockOptions[0]]}
                removeSelectedItem={vi.fn()}
            />
        );

        const comboboxInput = screen.getByRole("combobox");
        fireEvent.change(comboboxInput, { target: { value: "test" } });
        const targetSearchOptionButton = screen.queryByRole("button", { name: mockOptions[0] });

        expect(targetSearchOptionButton).toBeNull();
    })
    
    it("does show all relevant results in the search dropdown", () => {
        const mockOptions = ["test-a", "test-b1", "test-b2", "test-b3", "test-c"];

        render(
            <MockCombobox
                addSelectedItem={vi.fn()}
                createItem={vi.fn()}
                mockOptions={mockOptions}
                mockSelectedItems={[]}
                removeSelectedItem={vi.fn()}
            />
        );

        const comboboxInput = screen.getByRole("combobox");
        fireEvent.change(comboboxInput, { target: { value: "test" } });
        mockOptions.forEach(mockOption => {
            const mockOptionButton = screen.queryByRole("button", { name: mockOption });
            expect(mockOptionButton).not.toBeNull();
        });
    });

    it("doesn't show irrelevant results in the search dropdown", () => {
        const mockOptions = ["test-a", "test-b1", "test-b2", "FOOBAR", "FIZZBUZZ"];

        render(
            <MockCombobox
                addSelectedItem={vi.fn()}
                createItem={vi.fn()}
                mockOptions={mockOptions}
                mockSelectedItems={[]}
                removeSelectedItem={vi.fn()}
            />
        );

        const testQuery = "test";

        const comboboxInput = screen.getByRole("combobox");
        fireEvent.change(comboboxInput, { target: { value: testQuery } });
        mockOptions.forEach(mockOption => {
            const mockOptionButton = screen.queryByRole("button", { name: mockOption });
            if (mockOption.includes(testQuery)) {
                expect(mockOptionButton).toBeDefined();
                expect(mockOptionButton).toBeInTheDocument();
            } else {
                expect(mockOptionButton).toBeNull();
            }
        });
    });

    it("selects an item when the user clicks it in the search dropdown", () => {
        const mockAddSelectedItem = vi.fn();
        
        const mockOptions = ["test-a", "test-b", "test-c"];
        
        render(
            <MockCombobox 
                addSelectedItem={mockAddSelectedItem}
                createItem={vi.fn()}
                mockOptions={mockOptions}
                mockSelectedItems={[]}
                removeSelectedItem={vi.fn()}
            />
        );

        const comboboxInput = screen.getByRole("combobox");
        fireEvent.change(comboboxInput, { target: { value: "test" } });
        const targetSearchOptionButton = screen.getByRole("button", { name: mockOptions[0] });
        fireEvent(targetSearchOptionButton, new MouseEvent("click", { bubbles: true }))

        expect(mockAddSelectedItem.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockAddSelectedItem).toHaveBeenLastCalledWith(mockOptions[0]);
    });
});