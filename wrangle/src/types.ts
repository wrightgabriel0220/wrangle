export type View = {
  id: string;
  name: string;
  filepath: string;
  icon_uri?: string;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  wiki_filepath?: string;
  wiki_url?: string;
  wiki_type?: "MARKDOWN" | "TEXT";
};

// projects {
// 	id integer pk increments unique
// 	name varchar(255)
// 	wiki_filepath varchar(255) null
// 	wiki_url varchar(255) null
// 	wiki_type varchar null
// }
