import { Project, Tag } from "../bindings";

export type View = {
  id: string;
  name: string;
  filepath: string;
  iconURI?: string;
  color: string;
};

export type Dashboard = {
  id: string;
  projectID: string;
  url: string;
  type: string;
  notes: string;
};

export interface AppData {
  projects: Project[];
  tags: Tag[];
  views: View[];
}

export interface SelectOption {
  display: string;
  value: any;
}
