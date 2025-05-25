# ClothinX Backend 👔  
An e-commerce backend for men's fashion — powered by Node.js, Express, MongoDB, and deployed on AWS EC2 using Terraform.

## 📚 Overview  
The ClothinX backend powers the API for a full-featured e-commerce platform focused on men's clothing. It supports product management, user authentication, filtering, and order management. The backend is securely deployed on AWS EC2 via infrastructure-as-code using Terraform, ensuring a scalable and reproducible setup.

## 🚀 Features  
- 🔐 JWT Authentication for secure access  
- 👕 Product API: Trousers, shirts, sportswear, and more  
- 🎯 Filtering: Based on size, item type, and color  
- 📦 Order Management  
- 🌐 RESTful API following best practices  
- ☁️ Deployed on AWS EC2 via Terraform  

## 🛠️ Tech Stack  
- Node.js with Express.js  
- MongoDB Atlas (Cloud DB)  
- JWT for user authentication  
- Terraform for AWS infrastructure provisioning  
- Jenkins for automated CI/CD  

## 🏗️ Infrastructure (AWS via Terraform)  
This project provisions the following AWS resources using Terraform:  
- VPC  
- Public Subnet  
- Security Groups  
- EC2 Instance with Elastic IP  
- SSH Key Pair (optional)  
- Application deployment via Jenkins pipeline  

## 📁 Project Structure  
/controllers → Business logic  
/routes → API route definitions  
/models → Mongoose models  
/middleware → Auth & error handling  
/config → MongoDB connection & JWT  
/app.js → Main Express app  
/index.js → Entry point  
/terraform → Terraform configuration files  

## ⚙️ Setup Instructions  

### 1. Clone the repository  
git clone https://github.com/your-username/clothinx-backend.git  
cd clothinx-backend  

### 2. Install dependencies  
npm install  

### 3. Configure environment variables  
Create a `.env` file in the root directory with:  
PORT=5002  
MONGODB_URI=your_mongodb_atlas_connection_string  
JWT_SECRET=your_jwt_secret  

### 4. Run the backend  
npm start  

## 🚀 Terraform Deployment  
1. Navigate to the Terraform directory:  
cd Terraform-configuration  

2. Initialize and apply:  
terraform init  
terraform apply  

3. Update your `.env` and Jenkinsfile to match the deployed server IP.  

## 🔄 CI/CD with Jenkins  
This backend is integrated with Jenkins for automatic builds and deployment on each push to the main branch.  

## 🔗 Links  
Frontend Repo: https://github.com/your-username/clothinx-frontend  
Live Demo: https://clothinx.netlify.app  
