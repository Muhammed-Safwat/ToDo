# Todo
#### ToDo a user-friendly and efficient online to-do list website that helps you stay organized and productive. 
Hint: This is a Simulation for a real Production application now there is no authentication for the project just click login and it will redirect for home page.  
### Login Page 
<hr>
<img alt='App Screen' src='images/login-page.png'/>

### Sign up Page 
<hr>
<img alt='App Screen' src='images/signup-page.png'/>

### Home Page 
<hr>
<img alt='App Screen' src='images/home-screen-page.png'/>

### Error Page 
<hr>
<img alt='App Screen' src='images/error-page-todo.png'/>


### Project structure
<pre>
|-- app
|   |-- shared
|   |   |-- components
|   |   |   |-- cdk-drag-drop-connected-sorting-example
|   |   |   |-- page-not-found
|   |   |   |-- layout
|   |   |   |   |-- footer
|   |   |   |   |-- header
|   |   |-- module
|   |   |   |-- todo
|   |   |-- service
|   |   |   |-- todo-service
|   |   |   |-- auth-service
|   |   |-- directives
|   |   |-- pipes
|   |   |   |-- custom-date-pipe
|   |   |-- core
|   |   |   |-- guards
|   |   |   |   |-- auth-guard
|   |   |   |-- interceptors
|   |   `-- shared.module.ts
|   |-- modules
|   |   |-- home
|   |   |   |-- components
|   |   |   |-- home-routing.module.ts
|   |   |   `-- home.module.ts
|   |   |-- auth
|   |   |   |-- login
|   |   |   |-- signup
|   |   |   `-- auth.module.ts
|   `-- app.component.ts
|   `-- app.module.ts
|   `-- app-routing.module.ts
|-- assets
|   |-- images
|   `-- config.json
|-- environments
|   |-- environment.prod.ts
|   `-- environment.ts
|-- index.html
|-- main.ts
|-- styles.scss
|-- package.json
|-- tsconfig.json
|-- tslint.json
|-- angular.json
|-- karma.config.js
`-- README.md
</pre>
