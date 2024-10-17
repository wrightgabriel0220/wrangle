import * as matchers from "@testing-library/jest-dom/matchers";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { View } from "../../types";
import MasterDataModal from "../modals/MasterDataModal/MasterDataModal";

expect.extend(matchers);

const mockViews: View[] = [
    {
        id: "0",
        name: "View 0",
        color: "blue",
        filepath: ""
    },
    {
        id: "1",
        name: "View 1",
        color: "blue",
        filepath: ""
    },
    {
        id: "2",
        name: "View 2",
        color: "red",
        filepath: ""
    },
];


describe("Sidebar", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders input views as tabs", () => {
        const { queryByText } = render(
            <Sidebar
                appData={{
                    projects: [],
                    tags: [],
                    views: [],
                }}
                views={mockViews}
                selectedViewId={""}
                setSelectedViewId={() => {}}
                setModalContent={() => {}}
                setIsModalOpen={() => {}}
                deleteProject={() => {}}
                deleteTag={() => {}}
                deleteView={() => {}}
            />
        );

        mockViews.forEach(mockView => {
            const viewButton = queryByText(mockView.name);
            expect(viewButton).toBeInTheDocument();
        });
    });

    it("updates the selected view in state when the user clicks on a view's tab", () => {
        const mockSetSelectedViewId = vi.fn();

        const { getByText } = render(
            <Sidebar
                appData={{
                    projects: [],
                    tags: [],
                    views: [],
                }}
                views={mockViews}
                selectedViewId={""}
                setSelectedViewId={mockSetSelectedViewId}
                setModalContent={() => {}}
                setIsModalOpen={() => {}}
                deleteProject={() => {}}
                deleteTag={() => {}}
                deleteView={() => {}}
            />
        );

        const sidebarTab0 = getByText(mockViews[2].name);
        fireEvent(sidebarTab0, new MouseEvent("click", { bubbles: true }));

        expect(mockSetSelectedViewId.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetSelectedViewId.mock.lastCall?.[0]).toBe(mockViews[2].id);
    });

    it("opens the master data modal when the user clicks the associated button", () => {
        const mockSetIsModalOpen = vi.fn();
        const mockSetModalContent = vi.fn();

        const { getByText } = render(
            <Sidebar
                appData={{
                    projects: [],
                    tags: [],
                    views: mockViews,
                }}
                views={mockViews}
                selectedViewId={""}
                setSelectedViewId={() => {}}
                setModalContent={mockSetModalContent}
                setIsModalOpen={mockSetIsModalOpen}
                deleteProject={() => {}}
                deleteTag={() => {}}
                deleteView={() => {}}
            />
        );

        const masterDataModalButton = getByText("Master Data");
        fireEvent(masterDataModalButton, new MouseEvent("click", { bubbles: true }));

        expect(mockSetIsModalOpen.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetIsModalOpen.mock.lastCall?.[0]).toBe(true);

        expect(mockSetModalContent.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetModalContent.mock.lastCall?.[0].type).toBe(MasterDataModal);
    });
});
