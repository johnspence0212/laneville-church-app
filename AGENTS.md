# Development Commands

## Frontend (Vue.js + Vite)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- No explicit lint command (consider adding ESLint)
- No explicit test command (consider adding Vitest)

## Backend (PocketBase)
- `./pocketbase serve` - Start PocketBase server
- `./pocketbase migrate up` - Run database migrations
- `./pocketbase migrate down` - Rollback migrations

# Code Style Guidelines

## Vue.js Components
- Use `<script setup>` syntax for Composition API
- Use PascalCase for component names (e.g., `HelloWorld.vue`)
- Use kebab-case for file names (e.g., `hello-world.vue`)
- Import components at the top with single quotes
- Use destructured imports: `import { ref, onMounted } from 'vue'`

## JavaScript/TypeScript
- Use camelCase for variables and functions
- Use PascalCase for component names and classes
- Use single quotes for strings
- Use async/await for asynchronous operations
- Handle errors with try-catch blocks and reactive error state
- Use template literals for string interpolation

## Imports
- Group imports: Vue/Vue Router first, then components, then utilities
- Use single quotes for all imports
- Destructure imports when possible: `import { ref } from 'vue'`

## Error Handling
- Use reactive refs for error state: `const error = ref(null)`
- Try-catch blocks for API calls
- Display user-friendly error messages in templates

## PocketBase Backend
- Migrations in `pb_migrations/` directory
- Use JavaScript for migration files
- Follow PocketBase migration conventions

## File Structure
- Frontend: `src/` with `components/`, `views/`, `assets/`
- Backend: PocketBase with `pb_migrations/` and `pb_data/`</content>
<parameter name="filePath">/home/johnspence/Repos/laneville-church-app/AGENTS.md