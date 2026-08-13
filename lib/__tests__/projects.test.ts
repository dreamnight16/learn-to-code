import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRepository, setRepository } from "../repository";
import {
  loadProjects,
  saveProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectCount,
} from "../projects";

describe("projects", () => {
  beforeEach(() => {
    setRepository(new MemoryRepository());
  });

  it("loads empty list when nothing stored", () => {
    expect(loadProjects()).toEqual([]);
  });

  it("saves a new project with generated metadata", () => {
    const saved = saveProject({
      title: "Demo",
      description: "desc",
      code: "console.log('hi')",
      tags: ["js"],
    });
    expect(saved.id).toBeTruthy();
    expect(saved.createdAt).toBeTruthy();
    expect(saved.updatedAt).toBeTruthy();
    expect(loadProjects()).toHaveLength(1);
  });

  it("updates an existing project", () => {
    const saved = saveProject({
      title: "Demo",
      description: "desc",
      code: "1",
      tags: [],
    });
    const updated = updateProject(saved.id, { title: "Renamed" });
    expect(updated?.title).toBe("Renamed");
    expect(getProjectById(saved.id)?.title).toBe("Renamed");
  });

  it("returns null when updating a missing project", () => {
    expect(updateProject("missing", { title: "x" })).toBeNull();
  });

  it("deletes an existing project and reports missing deletions", () => {
    const saved = saveProject({
      title: "Demo",
      description: "desc",
      code: "1",
      tags: [],
    });
    expect(deleteProject(saved.id)).toBe(true);
    expect(getProjectCount()).toBe(0);
    expect(deleteProject("missing")).toBe(false);
  });

  it("finds a project by id", () => {
    const saved = saveProject({
      title: "Demo",
      description: "desc",
      code: "1",
      tags: [],
    });
    expect(getProjectById(saved.id)).toBeDefined();
    expect(getProjectById("missing")).toBeUndefined();
  });
});
