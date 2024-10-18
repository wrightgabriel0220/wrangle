import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Combobox from "./Combobox";
import { useMultipleSelection } from "downshift";

expect.extend(matchers);

describe("Combobox", () => {
    afterEach(() => {
        cleanup();
    });

    it("clears selected items when the user clicks the clear tags button", () => {
        const mockRemoveSelectedItem = vi.fn()
        
        
        const mockOptions = ["test-a", "test-b", "test-c"];
        const mockSelectedItems = mockOptions.slice(0, 2);
        
        const { getDropdownProps, selectedItems } = useMultipleSelection({ selectedItems: mockSelectedItems });
        
        console.log("1");
        render(
            <Combobox
                addSelectedItem={() => {}}
                createItem={() => {}}
                getDropdownProps={getDropdownProps}
                options={mockOptions}
                removeSelectedItem={mockRemoveSelectedItem}
                selectedItems={selectedItems}
                addItemButtonText=""
            />
        );


        const clearSelectionButton = screen.getByRole("button", { name: "clear combobox" });
        console.log("clearSelectionButton: ", clearSelectionButton);
        fireEvent(clearSelectionButton, new MouseEvent("click", { bubbles: true }));

        expect(mockRemoveSelectedItem.mock.calls.length).toBe(mockSelectedItems.length);
        expect(mockRemoveSelectedItem.mock.lastCall?.[0]).toBe(mockSelectedItems[mockSelectedItems.length - 1]);
    });

    it("selects a tag when the user clicks it in the search dropdown", () => {
        expect(false).toBeTruthy();
    });

    it("provides accurate search results in the dropdown", () => {
        expect(false).toBeTruthy();
    });
});