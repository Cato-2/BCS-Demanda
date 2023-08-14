// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri_plugin_log::LogTarget;
#[cfg(debug_assertions)]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::LogDir];

#[cfg(not(debug_assertions))]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::LogDir];



fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().targets(LOG_TARGETS).build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}