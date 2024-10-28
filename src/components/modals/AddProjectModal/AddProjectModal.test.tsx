import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";
import { Project } from "../../../../bindings";
import { userEvent } from "@testing-library/user-event"

expect.extend(matchers);

const mockProject: Project = {
    id: "0",
    manager_url: "https://www.google.com/",
    name: "test",
    tags: [],
};

describe("Add Project Modal", () => {
    afterEach(() => {
        cleanup();
    });

    it("returns a populated Project item on successful submit", async () => {
        const user = userEvent.setup();

        const mockOnSubmit = vi.fn((values, _actions) => values);
        
        render(
            <AddProjectModal
                tags={[]}
                createTag={vi.fn()}
                fetchAppData={vi.fn()}
                onSubmit={mockOnSubmit}
            />
        );

        const nameInput: HTMLInputElement = screen.getByLabelText("Name");
        const managerURLInput: HTMLInputElement = screen.getByRole("textbox", { name: "manager_url" });

        await user.type(nameInput, mockProject.name);
        await user.type(managerURLInput, mockProject.manager_url)

        const submitButton = screen.getByRole("button", { name: "Submit" });
        await user.click(submitButton);

        expect(mockOnSubmit.mock.lastCall?.[0]).toEqual({
            ...mockProject,
            id: "",
        });
    });
});