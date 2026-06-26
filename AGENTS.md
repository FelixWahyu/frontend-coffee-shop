<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

When reviewing or creating UI, use web design guidance skills.

# Project Overview

Name project : Coffee Shop

Tech Stack:

- Next.js (App Router)
- TypeScript (Strict Mode)
- Tailwind CSS 4
- React 19
- Express
- Prisma
- MySQL

Objective:
An e-commerce coffee shop website featuring a homepage, product catalog/menu, About page, Blog, Contact page, cart, checkout, admin dashboard, and CMS.

Priority:

- Clean Architecture
- Modular/Clean Code
- Scalability
- SEO Friendly
- Accessibility
- High Performance
- Maintainability

# General Rules

Always:

- Analyze the request before writing code.
- Explain the implementation plan first.
- Ask for confirmation before implementation.
- Only modify files related to the requested feature.
- Keep the existing code style consistent.
- Prefer readability over clever code.

Never:

- Refactor unrelated code.
- Remove existing functionality without explanation.
- Introduce breaking changes without confirmation.
- Create unnecessary dependencies.

# Confirmation Rules

Before doing any of the following, ALWAYS ask for confirmation:

- Creating a new feature
- Large refactoring
- Installing packages
- Removing files
- Renaming files
- Database migration
- Running terminal commands
- Updating project configuration
- Modifying environment variables

Do not execute commands automatically.

# Planning Rules

Before implementation:

1. Analyze the requirement.
2. Explain the proposed solution.
3. Mention affected files.
4. Wait for approval.
5. Start implementation.

# Code Style

Use:

- TypeScript strict typing
- Functional Components
- React Hooks
- Async/Await
- ES Modules

Avoid:

- any
- Nested callbacks
- Large functions
- Duplicated logic
- Magic numbers

# Modular Architecture

Keep files small and focused.

Separate logic into:

- components
- context
- hooks
- services
- lib
- utils
- types
- constants
- validations

One file should have one responsibility.

If a file becomes too large, split it into smaller modules.

# Folder Structure

Preferred structure:

logs/
public/
src/
|--app/
| |--(auth)
| |--(main)
| |--admin
|--components/
|--hooks/
|--context
|--lib/
|--services/
|--types/
|--utils/
|--constants/
|--validations/

Avoid creating unnecessary folders.

# Naming Convention

Components

PascalCase

Example:

ProductCard.tsx

Hooks

camelCase

Example:

useCart.ts

Utilities

camelCase

Example:

formatCurrency.ts

Types

user.type.ts

Validation

login.schema.ts

Constants

app.constant.ts

# Components

Prefer reusable components.

If a component is only used by one feature,
place it inside that feature.

If reusable,
place it inside /components.

# API Rules

Never call fetch directly inside Client Components unless necessary.

Use:

services/

Example:

services/productService.ts

services/authService.ts

Business logic should not live inside UI components.

# State Management

Prefer:

- React Context for small global state
- Zustand if global state grows
- React Hook Form for forms

Avoid unnecessary global state.

# Validation

Use Zod whenever possible.

Validate:

- Forms
- API payloads
- Query parameters
- Environment variables

Never trust user input.

# Error Handling

Always use:

try/catch

Provide meaningful error messages.

Do not expose internal server errors to users.

Handle loading and error states properly.

# Security

Never:

- Hardcode API Keys
- Hardcode Secrets
- Hardcode Passwords

Always use environment variables.

Validate every user input.

Escape HTML if necessary.

Sanitize data before saving.

# Performance

Prefer:

- Server Components
- Dynamic Import
- Lazy Loading
- Image Optimization
- Code Splitting
- Memoization only when needed

Avoid unnecessary re-rendering.

# SEO

Whenever creating public pages:

Always include:

- Metadata
- OpenGraph
- Twitter Card
- Canonical URL
- robots.txt
- sitemap.xml
- Structured Data when appropriate

# Accessibility

Use semantic HTML.

Always include:

- alt attribute
- aria-label when needed
- keyboard accessibility
- sufficient color contrast

# Documentation

After every completed feature,
create documentation inside:

/logs

File naming:

00_setup_project.md

01_authentication.md

02_product.md

03_checkout.md

Documentation must include:

- Date
- Feature Name
- Purpose
- Files Created
- Files Modified
- Implementation Details
- Notes
- Future Improvements

# Git Rules

After implementation,
suggest a Conventional Commit message.

Examples:

feat(product): add product filtering

fix(auth): resolve login validation issue

refactor(cart): simplify cart state

docs(logs): add checkout documentation

# Testing

Code should be testable.

Separate business logic from UI.

Avoid placing complex logic inside components.

# AI Behavior

Before writing code:

- Think first.
- Explain first.
- Ask first.
- Code after approval.

If multiple solutions exist:

Explain:

- Advantages
- Disadvantages
- Recommendation

Never choose silently.

# Best Practices

Follow:

- SOLID
- DRY
- KISS
- YAGNI
- Clean Code

Prefer built-in Next.js features over external libraries.

Avoid installing packages unless absolutely necessary.

# Code Review

After implementation:

Perform a self-review.

Check for:

- duplicated code
- unused imports
- unnecessary state
- possible bugs
- performance improvements
- accessibility issues

Provide improvement suggestions if found.

# Response Format

When implementing a feature, always respond with:

## Summary

Brief explanation.

## Files Created

List of new files.

## Files Modified

List of changed files.

## Reasoning

Why the implementation was chosen.

## Notes

Anything important for future development.

## Suggested Commit

Provide a Conventional Commit message.

<!-- END:nextjs-agent-rules -->
