# Quick Note App

This is a simple note-taking application with CRUD operations and authentication.

## Getting Started (Backend is undeployed on 15 April,2024)

To access the live version of this project, click [here](https://quick-note-nine.vercel.app//).

## Features

- Create, Read, Update, and Delete notes (CRUD operations)
- User authentication
- User-friendly interface

## Technologies Used

- Backend: NestJS
- Database: MongoDB
- Frontend: NextJS
- Authentication: JSON Web Tokens (JWT), Next Auth
- Deployment: **Vercel** (for NextJS) and **AWS Lambda** (for NestJS)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB installed and running or Mongo atlas URI
- A code editor of your choice

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amresh-kumar-singh/quick-note.git
   ```

2. Navigate to project directroy:

   ```bash
   cd quick-note
   ```

### Server

1. Navigate to server directroy:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```

### Client

1. Navigate to client directroy:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
    NEXTAUTH_SECRET=your_next_auth_secret
    NEXTAUTH_URL=your_next_auth_url
    NEXT_PUBLIC_SERVER_PATH=your_url_to_api
   ```

## Start project locally

### Server

1. Navigate to server directroy:

   ```bash
   cd server
   ```

2. Start:

   ```bash
   npm run start:dev
   ```

### Client

1. Navigate to client directroy:

   ```bash
   cd client
   ```

2. Start:

   ```bash
   npm run dev
   ```

## Deployment

### Client Deployment with Vercel

- Sign up or log in to Vercel on their website.

- Once logged in, click on the "Add New" button on the dashboard and select "Project".

- Import Git repository of project. Connect your git repository if not connected already to vercel.

- Click on import button next to your project.

- A new prompt will open.
  - Select Project name(by default git project name is selected).
  - Choose framework preset from dropdown if not selected already.
  - Click "Edit" and choose **client** as root directory.
  - Add your "Environment Variable".
  - Click "Deploy".

Note: Please create a local build using **npm run build** to check for any errors that may occur during the project's compilation.

### Server Deployment with AWS Lambda

There are multiple ways to deploy an application on AWS Lambda, but for this project, we will utilize the **serverless** package for deployment. Additionally, **serverless offline** functionality allows us to test the deployment locally.

#### Set up the project for local AWS Lambda deployment

1. First we will install few production and development dependencies in our server root:

   ```bash
   npm i @codegenie/serverless-express aws-lambda
   npm i -D @types/aws-lambda serverless-offline
   ```

2. After installation create serverless.yml file to configure the Serverless framework.
3. The project's entry point is **main.ts**, where the application listens on a specific port. We will leave main.ts unchanged and create a new file **serverless.ts**, which will serve as the entry point for the serverless functions.
4. In the serverless.yml file, the main entry point for the function is defined as follows:
   ```bash
     functions:
          main:
            handler: dist/serverless.handler
   ```
5. Open up the tsconfig.json file and make sure to enable the esModuleInterop option to make the @codegenie/serverless-express package load properly:
   ```bash
   {
         "compilerOptions": {
           ...
           "esModuleInterop": true
         }
   }
   ```
6. To test our deployment set up works locally first create build and deploy application using commands:

   ```bash
   npm run build
   npx serverless offline
   ```

7. If our local deployment works fine, we can proceed with AWS deployment. To do so, we need to add AWS credentials to our system, which can be accomplished using"
   ```bash
   npx serverless config credentials --provider aws --key <Access Key ID> --secret <Secret Access Key>
   ```
8. Deploy application on AWS Lambda:
   ```bash
   npx serverless deploy --stage prod
   ```
9. Additionally to check server logs:

   ```bash
   npx serverless logs -f main --stage prod

   ```

## Licence

This project is licensed under the MIT.
