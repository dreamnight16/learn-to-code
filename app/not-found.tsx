import Link from "next/link";
import { Compass, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute inset-0 gradient-warm opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--color-accent-glow)_0%,_transparent_60%)]" />

      {/* Floating decorative shapes */}
      <div className="absolute top-28 left-[18%] w-20 h-20 rounded-3xl border-2 border-accent/15 animate-float hidden md:block" />
      <div
        className="absolute bottom-32 right-[18%] w-12 h-12 rounded-2xl border border-accent/20 animate-float hidden md:block"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative max-w-[1000px] mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center animate-fade-in">
        {/* Emblem */}
        <div className="relative mb-10 animate-float">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-accent-soft border border-accent/20 flex items-center justify-center shadow-glow">
            <Compass className="w-10 h-10 md:w-12 md:h-12 text-accent" />
          </div>
          <span className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-glow animate-bounce-in">
            404
          </span>
        </div>

        {/* Decorative line + heading */}
        <div className="decorative-line mb-6" />
        <h1 className="font-display text-4xl md:text-5xl font-black">
          页面未找到
        </h1>
        <p className="text-muted mt-4 text-lg max-w-md leading-relaxed">
          你寻找的页面不存在或已被移动
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white rounded-xl font-semibold shadow-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <Link
            href="/lesson/1-1"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface-alt border border-edge text-muted hover:text-accent hover:border-accent/30 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            继续学习
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="flex items-center gap-1.5 mt-14 text-accent" aria-hidden="true">
          <span className="decorative-dot" />
          <span className="decorative-dot opacity-60" />
          <span className="decorative-dot opacity-30" />
        </div>
      </div>
    </div>
  );
}
