"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute inset-0 gradient-warm opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--color-accent-glow)_0%,_transparent_60%)]" />

      <div className="relative max-w-[1000px] mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center animate-fade-in">
        {/* Emblem */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-accent-soft border border-accent/20 flex items-center justify-center shadow-glow mb-10 animate-scale-in">
          <AlertTriangle className="w-9 h-9 md:w-10 md:h-10 text-accent" />
        </div>

        {/* Decorative line + heading */}
        <div className="decorative-line mb-6" />
        <h1 className="font-display text-4xl md:text-5xl font-black">
          出了点问题
        </h1>
        <p className="text-muted mt-4 text-lg max-w-md leading-relaxed">
          页面加载时发生了一点意外。你可以重试，或返回首页继续浏览。
        </p>

        {/* Error detail */}
        <div className="mt-8 w-full max-w-lg card p-5 text-left animate-slide-up stagger-2">
          <p className="text-xs font-medium uppercase tracking-wider text-faint mb-2">
            错误信息
          </p>
          <p className="font-mono text-sm text-muted break-all leading-relaxed">
            {error.message || "未知错误"}
          </p>
          {error.digest && (
            <p className="mt-3 pt-3 border-t border-edge text-[11px] text-faint">
              错误编号：{error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white rounded-xl font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            重试
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface-alt border border-edge text-muted hover:text-accent hover:border-accent/30 transition-all"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
