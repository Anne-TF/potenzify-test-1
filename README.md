# Potenzify test 1

This is a test project for Potenzify using a speech-to-text API. Down below you'll find the instructions to run the project.

# Intructions to run the project

### 1. Create a .env file, you can copy the .env.example file and rename it to .env.

### 2. Install the dependencies
```bash
npm install
```

### 3. Install json-server
```bash
npm install -g json-server
```

### 4. Start json-server
#### Note: Make sure to run this command in the root of the project. If you use a different port, make sure to change the port in the `.env` file, in the API_PORT variable.
```bash
json-server --watch db.json --port 3030
```

### 5. Start the project
```bash
npm run dev
```

And that's all :)!

**Note**: The JSON server package is used to simulated API calls. **If you don't start the JSON server API, you will not be able to list the universes/worlds, therefore you will not be able to visualize the project correctly.**

# Project Structure

The project is structured following a clean/DDD/Hexagonal architecture. The project is divided into the following folders:

- **app**: Contains the app's assets, such as images, styles, and fonts.
- **common**: Contains the common components and utilities that are used by multiple modules throughout the project. Here you can find utils, common pages (Such as the Error Page), layouts, interfaces, custom hooks and general context providers.
- **modules**: Contains the different modules of the project.
    - **universe**: Contains the universes module. Here you can find the auth related pages, components, interfaces and routes.
    - **worlds**: Contains the worlds/stages (exercises) module. Here you can find the dashboard related pages, components, interfaces and routes.

Each module is divided into the following folders:
- **presentation**: Contains the things that are exposed to the final client, like components, pages and the modules' routes.
- **infrastructure**: Contains the things that are related to the data layer, like API gateways, API routes for the module, and the data models (interfaces, enums).
- **domain**: Contains the things that are related to the business logic, like the use cases.
