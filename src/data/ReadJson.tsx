import React, { useEffect } from "react";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

export const ReadJson = async (type: string) => {
    let name = "";
    if (type === "tareas") {
      name = "tareas.json";
    } else if (type === "roles") {
      name = "roles.json";
    }
  
    try {
      const contents = await readTextFile(name, {
        dir: BaseDirectory.App,
      });
      const parsedContents = JSON.parse(contents); // Parse JSON contents
      console.log(parsedContents); // or do something with the parsed contents
      return parsedContents;
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
};

// Usage:
