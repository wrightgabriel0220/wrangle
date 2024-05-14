import { Project, View } from "../types";

interface ProjectListProps {
  projects: Project[];
  activeView: View;
}

export default function ProjectList({ activeView }: ProjectListProps) {
  return <div id="project-list">{activeView.name} View</div>;
}
