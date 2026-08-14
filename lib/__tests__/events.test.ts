import { describe, it, expect, vi } from "vitest";
import { onGameEvent, emitGameEvent } from "../events";

describe("onGameEvent / emitGameEvent", () => {
  it("delivers an event to a subscribed handler", () => {
    const handler = vi.fn();
    const off = onGameEvent("lesson:completed", handler);

    emitGameEvent({ type: "lesson:completed", lessonId: "intro" });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({ type: "lesson:completed", lessonId: "intro" });

    off();
  });

  it("does not deliver events of a different type", () => {
    const handler = vi.fn();
    const off = onGameEvent("lesson:completed", handler);

    emitGameEvent({ type: "quiz:completed", lessonId: "intro", score: 3 });

    expect(handler).not.toHaveBeenCalled();

    off();
  });

  it("calls every handler registered for the same type", () => {
    const first = vi.fn();
    const second = vi.fn();
    const offFirst = onGameEvent("daily:visit", first);
    const offSecond = onGameEvent("daily:visit", second);

    emitGameEvent({ type: "daily:visit" });

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    offFirst();
    offSecond();
  });

  it("unsubscribe stops further delivery", () => {
    const handler = vi.fn();
    const off = onGameEvent("exercise:completed", handler);

    emitGameEvent({ type: "exercise:completed", exerciseId: "e1" });
    off();
    emitGameEvent({ type: "exercise:completed", exerciseId: "e2" });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("emitting with no listeners does not throw", () => {
    expect(() => emitGameEvent({ type: "code:reviewed" })).not.toThrow();
  });
});
