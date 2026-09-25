Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Technical Test - Todo Application  A full-stack Todo application consisting of a React Native mobile app, React web app, and Node.js GraphQL backend.  ## Project Structure  ```text  tech-test/  ├── backend/    # Node.js + Apollo GraphQL  ├── mobile/     # React Native + Expo  ├── web/        # React + Vite + Tailwind CSS  └── README.md   `

1\. Setup Instructions
----------------------

### Prerequisites

*   Node.js
    
*   npm
    
*   Expo Go (for testing the mobile application)
    
*   Git
    

### Backend

Navigate to the backend folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend   `

Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

Start the GraphQL server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   node src/server.js   `

The GraphQL API will be available at:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:4000/   `

The backend currently uses in-memory storage, so users and todos are reset whenever the server restarts.

### Web

Navigate to the web folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd web   `

Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

Start the development server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

The web application will be available at the local URL shown by Vite.

The web application connects to the GraphQL backend at:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:4000/   `

### Mobile

Navigate to the mobile folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd mobile   `

Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

Start Expo:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx expo start   `

For testing on a physical device, make sure the mobile device and the computer running the backend are connected to the same Wi-Fi network.

The mobile application's GraphQL API URL is configured in:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   mobile/src/api/apollo.ts   `

Update the API address if the backend is running on a different machine or IP address.

2\. Architecture Decisions
--------------------------

### Overall Architecture

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML                  `┌─────────────────────┐                    │   React Native App  │                    │       (Expo)        │                    └──────────┬──────────┘                               │                               │ GraphQL                               │                    ┌──────────▼──────────┐                    │   Node.js Backend   │                    │   Apollo Server     │                    └──────────┬──────────┘                               │                               │                    ┌──────────▼──────────┐                    │   In-Memory Data    │                    │      Storage        │                    └─────────────────────┘                               ▲                               │ GraphQL                               │                    ┌──────────┴──────────┐                    │     React Web       │                    │   Vite + Tailwind   │                    └─────────────────────┘`

### Backend

*   **Node.js + Apollo Server** was used to implement the GraphQL API.
    
*   GraphQL provides a single API layer shared by both the mobile and web applications.
    
*   The backend implements authentication, user-scoped todo retrieval, and todo CRUD operations.
    
*   In-memory arrays were selected for data storage because the technical test allows in-memory storage and it keeps the implementation simple within the available time.
    
*   Authentication uses a simple token-based approach suitable for the technical test.
    
*   For a production system, persistent database storage, password hashing, and a more robust authentication mechanism would be used.
    

### Mobile

*   **React Native + Expo** was selected for cross-platform mobile development.
    
*   **Apollo Client** is used to consume the GraphQL API.
    
*   **AsyncStorage** is used to store the authentication token and user information locally.
    
*   The application provides login/signup, todo creation, viewing, completion toggling, deletion, and logout.
    
*   **Expo Router** is used for screen navigation.
    

### Web

*   **React + Vite** was used for the web application.
    
*   **Apollo Client** is used for GraphQL communication.
    
*   **Tailwind CSS** is used for styling and responsive UI implementation.
    
*   The web application shares the same GraphQL backend as the mobile application.
    
*   localStorage is used to maintain the authentication token in the browser.
    

### API Communication

Both clients communicate with the same GraphQL backend:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Mobile ──┐           ├── GraphQL / Apollo Server ── Backend  Web ─────┘   `

This keeps the backend logic and data operations centralized while allowing each client to have its own UI.

3\. Time Taken
--------------

ModuleTime TakenBackend30 minutesMobile1 hourWeb1 hour**Total2 hours 30 minutes**