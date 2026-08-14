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

  it("unshifts new projects so the most recent is first", () => {
    const first = saveProject({ title: "First", description: "", code: "", tags: [] });
    const second = saveProject({ title: "Second", description: "", code: "", tags: [] });
    const projects = loadProjects();
    expect(projects[0].id).toBe(second.id);
    expect(projects[1].id).toBe(first.id);
  });

  it("preserves optional lessonId when saving", () => {
    const saved = saveProject({
      title: "Lesson",
      description: "",
      code: "",
      tags: [],
      lessonId: "lesson-1",
    });
    expect(saved.lessonId).toBe("lesson-1");
  });

  it("keeps unrelated fields when partially updating", () => {
    const saved = saveProject({
      title: "Original",
      description: "keep me",
      code: "1",
      tags: ["a", "b"],
    });
    const updated = updateProject(saved.id, { title: "Renamed" });
    expect(updated?.title).toBe("Renamed");
    expect(updated?.description).toBe("keep me");
    expect(updated?.code).toBe("1");
    expect(updated?.tags).toEqual(["a", "b"]);
    expect(updated?.createdAt).toBe(saved.createdAt);
  });

  it("deletes only the matching project", () => {
    const keep = saveProject({ title: "Keep", description: "", code: "", tags: [] });
    const remove = saveProject({ title: "Remove", description: "", code: "", tags: [] });
    expect(deleteProject(remove.id)).toBe(true);
    expect(getProjectCount()).toBe(1);
    expect(getProjectById(keep.id)?.title).toBe("Keep");
  });

  it("returns an empty list when stored data is invalid JSON", () => {
    const repo = new MemoryRepository();
    repo.setItem("vibe-coding-projects", "not valid json {");
    setRepository(repo);
    expect(loadProjects()).toEqual([]);
  });
});
