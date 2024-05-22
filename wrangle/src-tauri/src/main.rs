// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(warnings, unused)]
mod prisma;

use prisma::PrismaClient;
use prisma_client_rust::NewClientError;
use prisma::project;


fn main() {
    tauri::async_runtime::spawn(async {
        if let Ok(client) = PrismaClient::_builder().build().await {
            let projects = client.project().find_many(vec![]).exec().await;
            println!("{:?}", projects);
        } else {
            println!("PCR failed to connect... Please try again.")
        }
    });

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
