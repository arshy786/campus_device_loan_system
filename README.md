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
A Node.js and Express-based REST API responsible for:
- Device management  
- Authentication  
- Reservations  
- Device availability tracking  
### Worker Service
A background service responsible for processing reservation events and handling asynchronous system operations.
This separation of responsibilities reflects the architectural style used in modern cloud-native systems where services operate independently and communicate through APIs.
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
## Mapping to Assessment Requirements
This project satisfies the core assessment requirements:
- Architecture design using C4 diagrams  
- Implementation of a web interface  
- Two cooperating backend services (API and Worker)  
- DevOps pipeline including build and test  
- Demonstration and supporting evidence  
- Explanatory report included  
---
## Technology Stack
The system was implemented using:
- Node.js  
- Express.js  
- JavaScript  
- Git  
- GitHub  
- GitHub Actions  
Node.js provides the runtime environment, while Express.js is used to implement RESTful API endpoints.
Git is used for version control and GitHub hosts the repository and CI pipeline.
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
│   ├── demo-video
│   │   └── fig14-system-demo-video
│   │
│   └── screenshots
│       ├── fig6-github-repository-structure.png
│       ├── fig7-project-structure.png
│       ├── fig8-api-service.png
│       ├── fig9-worker-service.png
│       ├── fig10-api-health-endpoint.png
│       ├── fig11-node-server-terminal.png
│       ├── fig12-device-loan-system-interface.png
│       └── fig13-ci-pipeline-success.png
│
├── Source
│   ├── api
│   ├── worker
│   ├── web
│   └── tests
│
├── .github/workflows
├── README.md
└── .gitignore