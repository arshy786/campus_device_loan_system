# Campus Device Loan System
## Student Information
**Student Name:** Arshad Aslam  
**Student ID:** K0352250  
**Module:** Cloud Native DevOps (CIS3039-N)  
**University:** Teesside University  
---
## Project Overview
The Campus Device Loan System is a prototype cloud-native style application designed to manage the reservation and borrowing of devices within a university environment.
The system allows students and staff to:
- View available devices  
- Reserve equipment  
- Collect devices through staff authentication  
- Return devices after use  
The project demonstrates key DevOps principles including service-based architecture, automated testing, version control using Git, and Continuous Integration using GitHub Actions.
The aim of the project is to simulate a simplified campus equipment loan platform while demonstrating modern development workflows used in cloud-native environments.
---
## System Architecture
The system is composed of three main components.
### Frontend Interface
A browser-based interface allowing students and staff to interact with the system and manage device reservations.
### API Service
A Node.js and Express-based REST API responsible for device management, authentication, reservations and device availability tracking.
### Worker Service
A background service responsible for processing reservation events and handling asynchronous system operations.
This separation of responsibilities reflects the architectural style used in many modern cloud-native systems where services operate independently but communicate through defined interfaces.
---
## Key Features
The application provides the following functionality:
- Browse available devices  
- View individual device information  
- Reserve a device  
- Collect a device (staff role)  
- Return a device (staff role)  
- Device availability tracking  
- Simulated authentication  
- Automated API endpoint testing  
---
## Technology Stack
The system was implemented using the following technologies:
- Node.js  
- Express.js  
- JavaScript  
- Git  
- GitHub  
- GitHub Actions  
Node.js provides the runtime environment for the application while Express.js is used to implement RESTful API routes.
Git manages version control and GitHub hosts the repository and CI pipeline.
---
## Repository Structure
```text
campus_device_loan_system
│
├── Documentation
│   ├── Diagrams
│   │   ├── fig1-system-context-diagram.png
│   │   ├── fig2-container-architecture-diagram.png
│   │   ├── fig3-component-diagram.png
│   │   ├── fig4-deployment-architecture-diagram.png
│   │   └── fig5-devops-pipeline-architecture.png
│   │
│   └── Report
│       └── Cloud_Native_DevOps_CIS3039_Report_Arshad_Aslam.docx
│
├── Media
│   ├── fig6-github-repository-structure.png
│   ├── fig7-project-structure.png
│   ├── fig8-api-service.png
│   ├── fig9-worker-service.png
│   ├── fig10-api-health-endpoint.png
│   ├── fig11-node-server-terminal.png
│   ├── fig12-device-loan-system-interface.png
│   └── fig13-ci-pipeline-success.png
│
├── Source
│   ├── api
│   │   ├── server.js
│   │   ├── package.json
│   │   └── routes
│   │
│   ├── worker
│   │   └── worker.js
│   │
│   ├── web
│   │   └── index.html
│   │
│   └── tests
│       └── api.test.js
│
├── .github
│   └── workflows
│       └── main.yml
│
├── .gitignore
└── README.md
```
---
## Example API Endpoints
```
GET /health
GET /api/devices
GET /api/devices/:id
POST /api/reserve
POST /api/collect
POST /api/return
```
---
## Automated Testing
Automated tests are implemented to ensure that API endpoints behave correctly.
The test suite verifies several system operations including:
- Health endpoint  
- Device listing endpoint  
- Individual device lookup  
- Authentication endpoint  
- Protected admin endpoint  
- Reservation functionality  
The tests confirm that the API responds with the expected status codes and behaviours.
---
## Continuous Integration
Continuous Integration is implemented using GitHub Actions.
Whenever changes are pushed to the repository, the workflow automatically:
1. Installs project dependencies  
2. Builds the Node.js environment  
3. Runs the automated test suite  
This ensures that new code changes do not introduce errors and demonstrates DevOps automation practices.
---
## Running the Application
### Install dependencies
```
npm install
```
### Start the API service
```
node server.js
```
### Open the web interface
```
http://localhost:3000
```
### Run automated tests
```
npm test
```
---
## DevOps Practices Demonstrated
This project demonstrates several important DevOps practices including:
- Version control using Git  
- Repository hosting using GitHub  
- Continuous Integration using GitHub Actions  
- Automated API testing  
- Modular service-based architecture  
- Structured repository organisation  
---
## Conclusion
The Campus Device Loan System demonstrates the implementation of DevOps and cloud-native development concepts within a practical application scenario.
By combining modular architecture, automated testing and continuous integration, the project reflects a modern development workflow suitable for scalable and maintainable systems.
---
## About node_modules
The `node_modules` directory is excluded from version control using `.gitignore` because dependencies can be installed automatically using:
```
npm install
```
