import { render, cleanup, fireEvent } from "@testing-library/react"
import BaseModal from "./BaseModal";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers)

const TestModalContent = () => (
    <div>Test Modal Content</div>
);

afterEach(() => {
    cleanup();
})

describe("BaseModal", () => {
    it("renders when active", () => {
        const { queryByTestId } = render(<BaseModal data-testid="test-base-modal" isModalOpen={true} onClose={() => {}} modalContent={<TestModalContent />} />);
    
        const testBaseModal = queryByTestId("test-base-modal");
    
        expect(testBaseModal).toBeInTheDocument();
    });
    
    it("doesn't render when inactive", () => {
        const { queryByTestId } = render(<BaseModal data-testid="test-base-modal" isModalOpen={false} onClose={() => {}} modalContent={<TestModalContent />} />);
    
        const testBaseModal = queryByTestId("test-base-modal");
    
        expect(testBaseModal).not.toBeInTheDocument();
    });
    
    it("sets modal status to closed and wipes modal content when a user clicks the close modal button", () => {
        const mockSetIsModalOpen = vi.fn();
        const mockSetModalContent = vi.fn();
    
        const { getAllByRole } = render(
            <BaseModal 
                data-testid="test-base-modal"
                isModalOpen={true}
                onClose={() => {
                    mockSetIsModalOpen(false);
                    mockSetModalContent(null);
                }}
                modalContent={<TestModalContent />}
            />
        );
    
        const closeModalButton = getAllByRole("button").filter(button => button.textContent === "X")[0];
    
        if (closeModalButton) {
            fireEvent(closeModalButton, new MouseEvent('click', { bubbles: true }));
        }
    
        expect(mockSetIsModalOpen.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetIsModalOpen.mock.lastCall?.[0]).toEqual(false);
    
        expect(mockSetModalContent.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(mockSetModalContent.mock.lastCall?.[0]).toEqual(null);
    });
    
    it("renders the appropriate content", () => {
        const { getByText } = render(<BaseModal data-testid="test-base-modal" isModalOpen={true} onClose={() => {}} modalContent={<TestModalContent />} />);
    
        const testModalContent = getByText("Test Modal Content");
    
        expect(testModalContent).toBeInTheDocument();
    });
    
    it("renders the appropriate content if the content updates while the modal is active", () => {
        const NewTestModalContent = () => (<div>Alternate Content</div>)
    
        const { queryByText, getByText, rerender } = render(<BaseModal data-testid="test-base-modal" isModalOpen={true} onClose={() => {}} modalContent={<TestModalContent />} />);
    
        const testModalContent = getByText("Test Modal Content");
        expect(testModalContent).toBeInTheDocument();
    
        rerender(<BaseModal data-testid="test-base-modal" isModalOpen={true} onClose={() => {}} modalContent={<NewTestModalContent />} />);
        
        expect(testModalContent).not.toBeInTheDocument();
    
        const newTestModalContent = getByText("Alternate Content");
        expect(newTestModalContent).toBeInTheDocument();
        expect(queryByText("Test Modal Content")).toEqual(null);
    });
});