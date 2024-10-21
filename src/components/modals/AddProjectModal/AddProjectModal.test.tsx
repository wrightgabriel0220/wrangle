import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";
import { Project } from "../../../../bindings";

expect.extend(matchers);

const mockProject: Project = {
    id: "0",
    manager_url: "",
    name: "",
    tags: [],
};

describe("Add Project Modal", () => {
    afterEach(() => {
        cleanup();
    });

    it("returns a populated Project item on successful submit", () => {
        const mockOnSubmit = vi.fn((values) => values);
        
        render(
            <AddProjectModal
                tags={[]}
                fetchAppData={vi.fn()}
                onSubmit={mockOnSubmit}
            />
        );

        const nameInput = screen.getByRole("textbox", { name: "name" });
        const managerURLInput = screen.getByRole("textbox", { name: "manager_url" });

        fireEvent.change(nameInput, { target: { value: mockProject.name }});
        console.log("nameInput: ", nameInput);
        fireEvent.change(managerURLInput, { target: { value: mockProject.manager_url } });

        const submitButton = screen.getByRole("button", { name: "Submit" });
        fireEvent(submitButton, new MouseEvent("click"));

        expect(mockOnSubmit).toHaveBeenLastCalledWith(mockProject);
    });
});