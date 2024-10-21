import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectList from "./ProjectList";
import { View } from "../../types";
import { Project, Tag } from "../../../bindings";

expect.extend(matchers);

const allProjectsView: View = {
    id: "-1",
    name: "All Projects",
    filepath: "",
    color: "000000",
};

const mockTags: Tag[] = [
    {
        id: "0",
        name: "",
        description: "",
        color: "",
    },
];

const mockProjects: Project[] = [
    {
        id: "0",
        name: "testProject0",
        manager_url: "http://localhost",
        tags: [],
    },
    {
        id: "1",
        name: "testProject1",
        manager_url: "http://localhost",
        tags: [],
    },
    {
        id: "2",
        name: "testProject2",
        manager_url: "http://localhost",
        tags: [],
    },
    {
        id: "3",
        name: "testProject2 + 1",
        manager_url: "http://localhost",
        tags: [mockTags[0]],
    },
    {
        id: "4",
        name: "testProject2 + 2",
        manager_url: "http://localhost",
        tags: [],
    },
];


describe("ProjectList", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders all input projects", () => {
        render(
            <ProjectList
                activeView={allProjectsView}
                projects={mockProjects}
                searchQuery=""
                selectedTags={[]}
            />
        );

        mockProjects.forEach(project => {
            const projectElement = screen.getByText(project.name);
            
            expect(projectElement).toBeDefined();
            expect(projectElement).toBeInTheDocument();
        });
    });

    it("renders only projects with names containing the query when the user enters search text", () => {
        const mockSearchQuery = "testProject2";

        render(
            <ProjectList
                activeView={allProjectsView}
                projects={mockProjects}
                searchQuery={mockSearchQuery}
                selectedTags={[]}
            />
        );

        mockProjects.map(mockProject => mockProject.name).filter(mockProjectName => mockProjectName.includes(mockSearchQuery)).forEach(matchedMockProjectName => {
            const matchedProjectElement = screen.getByText(matchedMockProjectName)
            
            expect(matchedProjectElement).toBeDefined();
            expect(matchedProjectElement).toBeInTheDocument();
        });
    });

    it("renders only projects with the selected tags when the user has selected tags", () => {
        const mockSelectedTags = mockTags;

        render(
            <ProjectList
                activeView={allProjectsView}
                projects={mockProjects}
                searchQuery={""}
                selectedTags={mockSelectedTags}
            />
        );

        mockProjects.filter(mockProject => mockProject.tags.includes(mockSelectedTags[0])).forEach(matchedMockProject => {
            const matchedProjectElement = screen.getByText(matchedMockProject.name);

            expect(matchedProjectElement).toBeDefined();
            expect(matchedProjectElement).toBeInTheDocument();
        });
    });

    it("renders only projects with both the selected tags and names containing the query when the user has selected tags and entered search text", () => {
        const mockSelectedTags = mockTags;
        const mockSearchQuery = "testProject2";
        
        render(
            <ProjectList
                activeView={allProjectsView}
                projects={mockProjects}
                searchQuery={""}
                selectedTags={mockSelectedTags}
            />
        );

        mockProjects.filter(mockProject => mockProject.tags.includes(mockSelectedTags[0])).filter(mockProject => mockProject.name.includes(mockSearchQuery)).forEach(matchedMockProject => {
            const matchedProjectElement = screen.getByText(matchedMockProject.name);

            expect(matchedProjectElement).toBeDefined();
            expect(matchedProjectElement).toBeInTheDocument();
        })
    });
});