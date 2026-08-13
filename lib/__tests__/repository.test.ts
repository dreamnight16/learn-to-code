import { describe, it, expect, beforeEach } from "vitest";
import {
  MemoryRepository,
  getRepository,
  setRepository,
} from "../repository";

describe("MemoryRepository", () => {
  let repo: MemoryRepository;

  beforeEach(() => {
    repo = new MemoryRepository();
  });

  it("returns null for a missing key", () => {
    expect(repo.getItem("missing")).toBeNull();
  });

  it("stores and retrieves a value", () => {
    repo.setItem("key", "value");
    expect(repo.getItem("key")).toBe("value");
  });

  it("removes a value", () => {
    repo.setItem("key", "value");
    repo.removeItem("key");
    expect(repo.getItem("key")).toBeNull();
  });
});

describe("repository singleton", () => {
  beforeEach(() => {
    setRepository(new MemoryRepository());
  });

  it("returns the injected repository", () => {
    const repo = new MemoryRepository();
    setRepository(repo);
    expect(getRepository()).toBe(repo);
  });
});
