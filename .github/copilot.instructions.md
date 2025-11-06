---
applyTo: '**'
---
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.
## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
## Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
## Accessibility Requirements
- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
### Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.
## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available. 
- Do not write arrow functions in templates (they are not supported).
- Do not write Regular expressions in templates (they are not supported).
## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Naming Conventions
- Separate words in file names with hyphens (e.g., `user-profile.ts`)
- Match file names to the TypeScript identifier within (e.g., `UserProfile` class → `user-profile.ts`)
- Use the same file name for a component's TypeScript, template, and styles (e.g., `user-profile.ts`, `user-profile.html`, `user-profile.scss`)
- Use the same name for a file's tests with `.spec` at the end (e.g., `user-profile.spec.ts`)
- Use camelCase for directive attribute selectors (e.g., `[mrTooltip]`)
- Name event handlers for what they **do**, not for the triggering event (e.g., `saveUserData()` instead of `handleClick()`)

## Project Structure
- All application code goes in a directory named `src`
- Bootstrap your application in a file named `main.ts` directly inside `src`
- Group closely related files together in the same directory
- Organize your project by **feature areas**, not by file types (avoid directories like `components`, `directives`, `services`)
- One concept per file - prefer focusing source files on a single component, directive, or service
- Keep unit tests in the same directory as the code-under-test

## Component & Directive Style
- Group Angular-specific properties (inputs, outputs, queries, injected dependencies) before methods, typically near the top of the class
- Keep components and directives focused on presentation - refactor complex logic into separate functions or services
- Avoid overly complex logic in templates - use `computed()` for complex derived state
- Use `protected` access modifier for class members that are only used by the component's template
- Use `readonly` for properties that shouldn't change (inputs, outputs, queries)
- Keep lifecycle methods simple - extract complex logic into well-named methods
- Implement lifecycle hook interfaces (e.g., `OnInit`, `OnDestroy`) to ensure methods are named correctly