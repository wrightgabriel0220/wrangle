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
  wikiType?: "MARKDOWN" | "WEB";
  dashboard?: Dashboard;
  tags: ProjectTag[];
};

export type ProjectTag = {
  id: string;
  name: string;
  description?: string;
};

export type Dashboard = {
  id: string;
  projectID: string;
  url: string;
  type: string;
  notes: string;
};

// dashboards {
// 	id integer pk increments unique
// 	project_id integer > projects.id
// 	dashboard_url varchar(255)
// 	dashboard_type varchar(255)
// 	notes varchar(255)
// }

// projects {
// 	id integer pk increments unique
// 	name varchar(255)
// 	wiki_filepath varchar(255) null
// 	wiki_url varchar(255) null
// 	wiki_type varchar null
// }
