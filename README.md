## Todo app frontend

### Tech stack
1. React (Vite), tailwind
2. Flowbite (React tailwind UI Library)

### Features
1. Login/Sign up throught JWT
2. Add/Edit/Remove/Update tasks
3. Persistent storage
4. Switch to dark mode as per system preference

### Local setup
1. Clone the repository
2. Create a `.env` file at the root level of the project and replace the following variables in `.env` file.

```
MONGODB_URL=<DB_URL>
VITE_API_URL=http://localhost:3000/api
```
3. run `npm i` at the root level to install all the dependencies
4. run `npm run dev` to serve the frontend 

### Challanges
1. API error handling and overing all the scenarios

### Demo
https://todo-frontend-meetbhalodi.vercel.app

### Backend repo url
https://github.com/meetbhalodi11/todo-backend
