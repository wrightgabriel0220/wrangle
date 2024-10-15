import { cleanup, fireEvent, render } from "@testing-library/react";
import MasterDataModal from "./MasterDataModal";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Project, Tag } from "../../../../bindings";

expect.extend(matchers);

const mockProjects: Project[] = [
    {
        id: "0",
        name: "Project 0",
        manager_url: "",
        tags: []
    },
    {
        id: "1",
        name: "Project 1",
        manager_url: "",
        tags: []
    },
    {
        id: "2",
        name: "Project 2",
        manager_url: "",
        tags: []
    },
];

const mockTags: Tag[] = [
    {
        id: "0",
        name: "Tag 0",
        color: "blue",
        description: "",
    },
    {
        id: "1",
        name: "Tag 1",
        color: "blue",
        description: "",
    },
    {
        id: "2",
        name: "Tag 2",
        color: "red",
        description: "",
    },
];

describe("Master Data Modal", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders all the projects put into it", () => {
        const { getByText } = render(
            <MasterDataModal data={{ projects: mockProjects, tags: [], views: [] }} deleteProject={() => {}} deleteTag={() => {}} deleteView={() => {}} />
        );

        mockProjects.forEach(project => {
            const projectElement = getByText(project.name);

            expect(projectElement).toBeInTheDocument();
        });
    });

    it("deletes a project when the user clicks the X next to the associated project", () => {
        const mockDeleteProject = vi.fn();

        const { getByText } = render(
            <MasterDataModal data={{ projects: mockProjects, tags: [], views: [] }} deleteProject={mockDeleteProject} deleteTag={() => {}} deleteView={() => {}} />
        );

        mockProjects.forEach(project => {
            const projectElement = getByText(project.name);
            const projectElementButtons = Array.from(projectElement.getElementsByTagName("button"));
            const projectDeleteButton = projectElementButtons.filter(button => button.ariaLabel === "delete item")[0];
            fireEvent(projectDeleteButton, new MouseEvent("click", { bubbles: true }));
        });

        expect(mockDeleteProject.mock.calls.length).toEqual(mockProjects.length);
        expect(mockDeleteProject.mock.lastCall?.[0]).toBe(mockProjects[mockProjects.length - 1].id);
    });

    it("renders all the tags put into it", () => {
        const { getByText } = render(
            <MasterDataModal data={{ projects: [], tags: mockTags, views: [] }} deleteProject={() => {}} deleteTag={() => {}} deleteView={() => {}} />
        );

        mockTags.forEach(tag => {
            const tagElement = getByText(tag.name);

            expect(tagElement).toBeInTheDocument();
        });
    });

    it("deletes a tag when the user clicks the X next to the associated tag", () => {
        const mockDeleteTag = vi.fn();

        const { getByText } = render(
            <MasterDataModal data={{ projects: [], tags: mockTags, views: [] }} deleteProject={() => {}} deleteTag={mockDeleteTag} deleteView={() => {}} />
        );

        mockTags.forEach(tag => {
            const tagElement = getByText(tag.name);
            const tagElementButtons = Array.from(tagElement.getElementsByTagName("button"));
            const tagDeleteButton = tagElementButtons.filter(button => button.ariaLabel === "delete item")[0];
            fireEvent(tagDeleteButton, new MouseEvent("click", { bubbles: true }));
        });

        expect(mockDeleteTag.mock.calls.length).toEqual(mockTags.length);
        expect(mockDeleteTag.mock.lastCall?.[0]).toBe(mockTags[mockTags.length - 1].id);
    });
});