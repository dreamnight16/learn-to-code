# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-06-12

### Added
- Production hardening: Vitest test suite, repository pattern for data access, observability tooling, and security fixes

### Changed
- Updated README translations (zh-CN, zh-Hant, ja) and refreshed blog link

### Fixed
- CSP that was blocking Next.js inline scripts and breaking all client interactivity

## [0.1.2] - 2026-06-05

### Added
- Gamification, exercises, and visualizations for lessons
- Dashboard and showcase views
- Editorial redesign with enhanced lesson content
- Community health files, GitHub issue/PR templates, and multi-language READMEs
- Complete zh-Hant and ja README translations

### Fixed
- Dropped Node 18 from CI to avoid build incompatibilities

### Security
- Require API authentication, removed `unsafe-eval` from the production CSP, added CSRF checks

## [0.1.1] - 2026-05-24

### Added
- MIT LICENSE
- CI workflow running `tsc --noEmit` and Next.js build on Node 18/20/22
- Bilingual English README
- "Related projects" section in the README

### Fixed
- Quiz lookup logic, extracted system prompts, deduplicated progress storage

### Security
- Fixed 11 issues found in a code audit

## [0.1.0] - 2026-05-05

Initial release.

### Added
- Interactive Vibe Coding crash course with 22 lessons
- AI teaching assistant integration
- Multi-model switching with animated UI and a zero-baseline setup guide
- Code playground and progress tracking

### Changed
- Extracted lesson content into separate `.md` files

### Fixed
- Escaped inline code backticks in template literals
- Removed `fs` from the client bundle by loading content in a server-only module
- Loaded markdown content with `fs.readFileSync` instead of `?raw` imports
