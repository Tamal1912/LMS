# 🎓Blockchain Based Learning Management System (LMS)

A modern, full-stack Learning Management System (LMS) with two powerful branches:

1. **MERN LMS** – A full-featured centralized system using the MERN stack.
2. **Blockchain LMS** – A decentralized system using Ethereum smart contracts and IPFS for credential verification.

---

## 🧱 MERN LMS (Practice Build)

### Project Type

- **Type**: Full Stack MERN Project  
- **Status**: Personal Project / Practice Build

---

### Overview

This is a complete Learning Management System (LMS) built from scratch using the MERN stack. The goal was to create a platform where:

- Students can register, log in, and access video-based courses.
- Admins can manage users and course materials through a protected dashboard.
- The UI is clean, modern, and responsive — reflecting production-level design.

---

### Key Features

#### Student Side

- JWT-based authentication stored securely in HTTP-only cookies.
- Access to courses via dashboard with video support.
- Session persistence via localStorage.
- Fully mobile-responsive layout.

#### Admin Side

- Protected login route for admins.
- Admin dashboard for managing courses and student data.
- Course material file uploads.
- Real-time feedback using React Toastify notifications.

---

### Tech Stack

- **Frontend**: React.js, Tailwind CSS, Zustand (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT, HTTP-only secure cookies
- **Additional Libraries**: Framer Motion (UI animations), React Toastify, File Uploads

---

---

### Why I Built This

- To gain hands-on experience with full-stack architecture.
- To strengthen frontend–backend integration skills.
- To learn user authentication workflows in real scenarios.
- To debug and understand real-world development issues like CORS and token management.

---

### What I Learned

- Proper API design and global state handling with Zustand.
- Implementing secure authentication with cookies and tokens.
- Responsive UI development using Tailwind CSS.
- Managing real-time UI feedback and asynchronous actions.

---

### What’s Next (Future Enhancements)

- Add quizzes and issue downloadable certificates.
- Integrate payments for premium/paid course content.
- Build a comprehensive admin analytics dashboard.
- Add a chat system for real-time mentor-student interaction.
- Implement course progress saving and syncing.

---

## 🔗 Blockchain-Based LMS (Decentralized Credential Verification)

### Overview

This portion of the project handles academic credential storage and verification using Ethereum smart contracts and IPFS.

- Certificates and academic proofs are uploaded to IPFS.
- The resulting IPFS hash is then stored on the blockchain.
- This enables public and tamper-proof verification of credentials.

**Smart Contract Repository:**  
[🔗 LMS-Smartcontract](https://github.com/Manish4567jkl/LMS-Smartcontract)

---

### Blockchain Features

- On-chain hash verification of certificates.
- IPFS ensures decentralized and permanent credential storage.
- Eliminates forgery and central authority dependency.
- Employers or institutions can easily verify authenticity via the blockchain.

---

### Credential Flow

1. A credential file (e.g. PDF certificate) is uploaded by the admin.
2. File is stored on **IPFS**, generating a unique hash.
3. The hash is stored on the **Ethereum blockchain** via a smart contract.
4. Verifiers can upload a credential and check its hash against the on-chain record.

---

## 🧪 Installation (For MERN LMS)

```bash
git clone https://github.com/YOUR_USERNAME/Your-LMS-Repo
cd Your-LMS-Repo
npm install
npm start
```


# 📝 Note

This LMS project (MERN version) is **not currently deployed**. It is intended for:

- Practice and hands-on learning  
- Portfolio showcasing  
- Code structure reference and educational purposes

Feel free to explore, fork, or extend this project as needed.


## 👤 Author

**Manish**  
GitHub: [Manish4567jkl](https://github.com/Manish4567jkl)  
Developer with expertise in full-stack applications and decentralized systems.

---

## 📄 License

This project is licensed under the MIT License.  
You are free to use, distribute, or modify it — with attribution.

---

## 🙌 Final Thoughts

This project demonstrates two approaches to building a learning management system — one traditional, one decentralized. While one focuses on practical full-stack development, the other embraces future-forward credential verification via blockchain and IPFS.

> “Education is the passport to the future. Blockchain is the stamp that makes it permanent.”


