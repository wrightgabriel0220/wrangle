// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    use tauri_plugin_sql::{Migration, MigrationKind};

    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE testtable (id INTEGER PRIMARY KEY, name TEXT);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "remove_testtable",
            sql: "DROP TABLE testtable;",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_projects",
            sql: "CREATE TABLE projects (
                id INTEGER PRIMARY KEY,
                name TEXT,
                wiki_type TEXT CHECK(wiki_type in ('MARKDOWN', 'TEXT')) NULL,
                wiki_url TEXT NULL,
                wiki_filepath TEXT NULL
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_project_tags",
            sql: "CREATE TABLE project_tags (id INTEGER PRIMARY KEY, name TEXT, description TEXT NULL);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_projects_tags",
            sql: "CREATE TABLE projects_tags (
                id INTEGER PRIMARY KEY,
                project_id INTEGER,
                project_tag_id INTEGER,
                FOREIGN KEY (project_id) REFERENCES projects(id),
                FOREIGN KEY (project_tag_id) REFERENCES project_tags(id)
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create_dashboards",
            sql: "CREATE TABLE dashboards (
                id INTEGER PRIMARY KEY,
                project_id INTEGER,
                dashboard_url TEXT,
                dashboard_type TEXT CHECK(dashboard_type in ('WRANGLE', 'WEB')) DEFAULT 'WRANGLE',
                FOREIGN KEY (project_id) REFERENCES projects(id)
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "create_views",
            sql: "CREATE TABLE views (
                id INTEGER PRIMARY KEY,
                name TEXT,
                filepath TEXT,
                icon_uri TEXT NULL,
                color VARCHAR(6) DEFAULT '000000'
            );",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
        .add_migrations("sqlite:wrangle.db", migrations)
        .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
