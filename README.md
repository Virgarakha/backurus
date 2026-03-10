# Backurus

Backurus is a Laravel-inspired Node.js backend framework built with modern ES Modules and optimized for fast API development.

## Features

- `node urus` CLI for generators and operational commands
- Multipart image/file upload parsing and public disk storage
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
node urus storage:link
node urus config:cache
node urus config:clear
```

## Project Structure

- `app/` controllers, models, middleware, requests, jobs, events, policies, resources, modules
- `bootstrap/` application bootstrap
- `config/` app, database, auth, queue, and storage configuration
- `core/` framework internals
- `database/` migrations and seeders
- `routes/` API, web, and console schedule definitions
- `plugins/` auto-loaded plugins
- `docs/` multilingual documentation website

## File Uploads

Create the public storage symlink:

```bash
node urus storage:link
```

Use multipart form-data in your controller and store the uploaded image on the `public` disk:

```js
import { Storage } from '../../core/facades'

const image = req.file('image')
const path = await Storage.disk('public').putFile('products', image)
const url = Storage.disk('public').url(path)
```
