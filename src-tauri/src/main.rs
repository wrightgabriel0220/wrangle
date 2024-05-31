// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(warnings, unused)]
mod prisma;

use std::borrow::Borrow;
use std::fmt;

use prisma::project::Data as DBProject;
use prisma::project_tag_relation;
use prisma::tag::Data as DBTag;
use prisma::PrismaClient;
use prisma::project;
use prisma::tag;
use prisma_client_rust::QueryError as QueryError;
use taurpc::Router;
use taurpc::procedures;
use taurpc::ipc_type;
use tokio::join;

impl From<DBTag> for Tag {
    fn from(db_tag: DBTag) -> Self {
        Tag {
            id: db_tag.id,
            name: db_tag.name,
            description: db_tag.description,
            color: db_tag.color
        }
    }
}

#[ipc_type]
struct Tag {
    id: String,
    name: String,
    description: Option<String>,
    color: String,
}

impl fmt::Debug for Tag {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{\nid: {},\nname: {},\ndescription: {:?},\ncolor: {}\n}}", self.id, self.name, self.description, self.color)
    }
}

#[ipc_type]
struct Project {
    id: String,
    name: String,
    tags: Vec<Tag>,
}

impl fmt::Debug for Project {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{\nid: {},\nname: {},\ntags: {:?}\n}}", self.id, self.name, self.tags)
    }
}

impl From<DBProject> for Project {
    fn from(db_project: DBProject) -> Self {
        Project {
            id: db_project.id,
            name: db_project.name,
            tags: db_project.tags.unwrap_or(vec![]).iter().map(|db_project_tag| Tag::from(db_project_tag.to_owned())).collect(),
        }
    }
}


#[procedures]
trait API {
    async fn create_project(new_project: Project) -> bool;

    async fn create_tag(name: String) -> bool;

    async fn create_view();

    async fn get_tags() -> Vec<Tag>;

    async fn get_views();

    async fn get_projects() -> Vec<Project>;

    async fn delete_project();

    async fn delete_tag();

    async fn delete_view();
}

#[derive(Clone)]
struct APIImplementation;

#[taurpc::resolvers]
impl API for APIImplementation {
    async fn create_project(self, new_project_input: Project) -> bool {
        let client = PrismaClient::_builder().build().await;
        println!("CREATING PROJECT: {:?}", new_project_input);

        async fn add_project_with_client(client: PrismaClient, new_project_input: Project) -> Result<Project, QueryError> {
            println!("new_project_input.tags: {:?}", new_project_input.tags);
            let new_db_project = client.project().create(new_project_input.name, vec![]).exec().await;

            async fn add_project_tag_relation(client: &PrismaClient, project: &Project, tag: &Tag) -> Option<project_tag_relation::Data> {
                println!("tag: {:?}", tag);
                let create_relation_res = client.project_tag_relation().create(project::id::equals(project.id.clone()), tag::id::equals(tag.id.clone()), vec![]).exec().await;
                match create_relation_res {
                    Ok(create_relation_res) => {
                        println!("Successfully added tag {} to project {}!", tag.name, project.name);
                        return Some(create_relation_res);
                    },
                    Err(_err) => {
                        println!("There was an error adding the tag {} to the project {}!", tag.name, project.name);
                        None
                    }
                }
            }

            match new_db_project {
                Ok(new_db_project) => {
                    let new_project = Project::from(new_db_project);
                    for tag in new_project.tags.iter() {
                        add_project_tag_relation(client.borrow(), new_project.borrow(), tag).await;
                    }
                    println!("Added tags for new project: {:?}", new_project.tags);
                    return Ok(new_project);
                },
                Err(error) => { return Err(error)},
            };
        }

        match client {
            Ok(client) => {
                let result = add_project_with_client(client, new_project_input).await;
                match result {
                    Ok(_result) => {
                        return true
                    },
                    Err(error) => {
                        println!("There was an error querying the DB to create a project: {}", error);
                    }
                }
            },
            Err(error) => {
                println!("There was an error connecting to the database while attempting to create a project: {}", error);
            },
        };

        return true;
    }

    async fn create_tag(self, name: String) -> bool {
        let client = PrismaClient::_builder().build().await;
        println!("CREATING TAG: {}", name);
        let randomColor = "#000000";

        match client {
            Ok(client) => {
                let new_tag = client.tag().create(name, randomColor.to_owned(), vec![]).exec().await;
                match new_tag {
                    Ok(_result) => {
                        return true;
                    },
                    Err(error) => {
                        println!("There was an error querying the DB to create a tag: {:?}", error);
                    }
                }
                return false;
            },
            Err(error) => {
                println!("There was an error connecting to the database while attempting to create a tag: {}", error);
            }
        }
        return false;
    }

    async fn create_view(self) {
        println!("CREATING VIEW");
    }

    async fn get_tags(self) -> Vec<Tag> {
        let mut tags = Vec::new();

        if let Ok(client) = PrismaClient::_builder().build().await {
            let db_tags = client.tag().find_many(vec![]).exec().await.unwrap();
            tags = db_tags.iter().map(|db_tag| Tag::from(db_tag.to_owned())).collect();
        }

        println!("tags: {:?}", tags);

        return tags;
    }

    async fn get_views(self) {
        println!("FETCHING VIEWS");
    }

    async fn get_projects(self) -> Vec<Project> {
        let mut projects = Vec::new();

        if let Ok(client) = PrismaClient::_builder().build().await {
            let db_projects = client.project().find_many(vec![]).exec().await.unwrap();
            projects = db_projects.iter().map(|db_project| Project::from(db_project.to_owned())).collect();
        }

        println!("projects: {:?}", projects);

        return projects;
    }

    async fn delete_project(self) {
        println!("DELETING PROJECT");
    }

    async fn delete_tag(self) {
        println!("DELETING TAG");
    }

    async fn delete_view(self) {
        println!("DELETING VIEW");
    }
}




#[tokio::main]
async fn main() {
    let router = Router::new()
        .merge(APIImplementation.into_handler());

    tauri::async_runtime::spawn(async {
        if let Ok(client) = PrismaClient::_builder().build().await {
            let projects = client.project().find_many(vec![]).exec().await;
            println!("{:?}", projects);
        } else {
            println!("PCR failed to connect... Please try again.")
        }
    });

    tauri::Builder::default()
        .invoke_handler(router.into_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
