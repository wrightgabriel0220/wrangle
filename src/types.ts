export type View = {
  id: string;
  name: string;
  filepath: string;
  iconURI?: string;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  wikiFilepath?: string;
  wikiURL?: string;
  wikiType?: "MARKDOWN" | "WEB" | "";
  dashboard?: Dashboard;
  tags: ProjectTag[];
};

export type ProjectTag = {
  id: string;
  name: string;
  description?: string;
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
  tags: ProjectTag[];
  views: View[];
}

export interface SelectOption {
  display: string;
  value: any;
}
