# Campus Device Loan System
**Student Name:** Arshad Aslam  
**Student ID:** K0352250  
**Module:** Cloud Native DevOps (CIS3039-N)  
**University:** Teesside University

## Project Overview
This project implements a cloud native style Campus Device Loan System based on the assessment scenario. The system allows students and staff to browse available devices, reserve devices, and process reservation related events through a simple service based architecture.
The solution is structured around separate containers and responsibilities, including a frontend interface, an API service, and a worker service. The design also considers authentication, monitoring, asynchronous event handling, and cloud deployment readiness.

## Folder Structure
### Documentation
Contains the architecture diagrams, deployment diagram, development plan diagram, component diagram, and explanatory report.

### Media
Contains screenshots and other demonstration evidence showing the working system, Git usage, GitHub Actions pipeline, health endpoint, security response, and service execution.

### Source
Contains the implementation of the system, including:
- `api` for the backend API service
- `worker` for background event processing
- `web` for frontend related files
- `tests` for test related files
- configuration files such as `package.json`

## Key Features Demonstrated
- Device listing and availability view
- Reservation endpoint
- Worker processing of reservation events
- Health endpoint for observability
- Forbidden endpoint example for protected access behaviour
- Git version control workflow
- GitHub Actions continuous integration pipeline
- Cloud ready architecture documented through C4 and deployment diagrams

## Notes
This submission includes the required directories:
- Documentation
- Media
- Source
Prepared by Arshad Aslam for CIS3039 Cloud Native DevOps.