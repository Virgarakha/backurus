# Backurus

Backurus is a Laravel-inspired Node.js backend framework built with modern ES Modules and optimized for fast API development.

## Features

- `node urus` CLI for generators and operational commands
- Laravel-like route syntax with controller string actions
- Eloquent-style ORM with CRUD, query builder, pagination, soft deletes, and relationships
- Schema builder and migration system for MySQL and SQLite
- Request validation, JWT auth, middleware aliases, queue, scheduler, plugins, facades, and WebSocket support
- Multilingual docs in `docs/` (EN + ID)

## Quick Start

```bash
npm install
node urus migrate
node urus db:seed
node urus serve
```

## Main Commands

```bash
node urus make:controller UserController
node urus make:model User
node urus make:migration create_users_table
node urus make:middleware AuthMiddleware
node urus make:request StoreUserRequest
node urus make:job SendEmailJob
node urus make:event UserRegistered
node urus make:seeder UserSeeder
node urus make:policy UserPolicy
node urus make:resource UserResource
node urus make:module Admin

node urus migrate
node urus migrate:rollback
node urus migrate:reset
node urus migrate:fresh
node urus migrate:status
node urus db:seed
node urus route:list
node urus queue:work
node urus queue:restart
node urus schedule:run
node urus serve
node urus config:cache
node urus config:clear
```

## Project Structure

- `app/` controllers, models, middleware, requests, jobs, events, policies, resources, modules
- `bootstrap/` application bootstrap
- `config/` app, database, auth, and queue configuration
- `core/` framework internals
- `database/` migrations and seeders
- `routes/` API, web, and console schedule definitions
- `plugins/` auto-loaded plugins
- `docs/` multilingual documentation website
