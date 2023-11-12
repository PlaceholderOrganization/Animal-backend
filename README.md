# www.OpenAnimals.dk

### Group Members

|                           |          |                                                   |
|---------------------------|:--------:|:--------------------------------------------------:|
| Lotte Face Eliasson       | lott4328 | [GitHub Profile](https://github.com/LotteEliasson) |
| Mikkel Olsen              | mikk39k3 | [GitHub Profile](https://github.com/Selmerr)       |
| Jakob Agger Johannessen   | jako894n | [GitHub Profile](https://github.com/jakobagger)    |
| Hannan Ahmed Mohamad Noor | hann7575 | [GitHub Profile](https://github.com/Hannanxnoor)   |
| Dan Viktor Jørgensen      | danx8076 | [GitHub Profile](https://github.com/davijoe)       |

### Description

Initially the project was divided into a frontend repo and a backend repo. For convenience we merged them both into the backend repository. Our Single Page Application is housed inside the frontend folder found in the root and the rest is a traditional maven setup structered by layers rather than features. Everything is hosted on Azure.

The project serves as an experimental platform for playing around with the OpenAI API to integrate AI services into a web app. 

### Branching Strategy (Short explanation)
Our branching strategy incorporates several key elements commonly used in collaborative software development.

We use the <b>'master'</b> branch as our production-ready codebase. For new developments, we create feature branches. Once a feature is complete, we initiate a pull request to merge it into the <b>'staging'</b> branch. This triggers automated builds and tests via GitHub Actions, and if successful, the changes are deployed to the Azure Web App service for staging.

The <b>'staging'</b> branch acts as our pre-production environment, allowing us to test in a setup that mimics production. After thorough testing and validation, we merge the <b>'staging'</b> branch into <b>'master'</b>, updating our live production environment with the new changes. This strategy ensures that our production environment remains stable and reliable.

<b>Key elements in strategy</b>
1. <b>Master Branch (live production)</b><br>
2. <b>Staging Branch (pre-production)</b><br>
3. <b>Feature Branches</b>
4. <b>Pull Requests (Approval required from another team member)</b>
5. <b>Continuous Integration (CI) with GitHub Actions</b>
6. <b>Deployment with Azure Web App Service</b>
7. <b>Merging Staging into Master</b>
