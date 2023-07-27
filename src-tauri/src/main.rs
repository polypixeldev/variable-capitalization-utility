// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use convert_case::{Case, Casing};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn submit(name: &str, scheme: &str) -> String {
    let mut changed_name = name.to_string();

    match scheme {
        "camelCase" => changed_name = name.to_case(Case::Camel),
        "PascalCase" => changed_name = name.to_case(Case::Pascal),
        "snake_case" => changed_name = name.to_case(Case::Snake),
        "kebab-case" => changed_name = name.to_case(Case::Kebab),
        _ => ()
    }

    changed_name
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![submit])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
