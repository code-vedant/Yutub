import React from 'react';
import '../style/about.css';
import logo from "../assets/logo.png"
const About = () => {
  return (
    <div className="about-container">
      <h1>About Yutub</h1>
    <div className="ABTseparator"></div>
      <p>
        Yutub is a web application that allows users to create, upload, and share videos. It is built using React for the frontend and Node.js, Express, and MongoDB for the backend.
        The application is currently in development, and I am actively working on adding new features and improving the existing ones.
      </p>

      <h3>Source Code : <span><a href="https://github.com/code-vedant/Yutub" target='_blank'>Github/yutub</a></span></h3>
    <div className="ABTseparator"></div>
      <div className="ac-img">
      <img src={logo} alt="Yutub Logo" className="yutub-logo" />
      </div>
    <div className="ABTseparator"></div>
      <section className="introduction-section">
        <h2>Introduction</h2>
        <p>
          Yutub is my first full-stack web development project, and I have been working on it for a couple of months. 
          The frontend design is inspired by the YouTube website. While the current version does not include animations 
          or transitions, I plan to incorporate these elements in the upcoming version.
        </p>
        <p>
          The backend of Yutub is based on the YT backend learning series by Channel <span><a href="https://www.youtube.com/@chaiaurcode" target='_blank'>Chai aur Code</a></span>, taught by Hitesh Chaudhary. 
          I have made some upgrades and added additional functions to enhance its capabilities.
        </p>
      </section>
      <div className="ABTseparator"></div>
      <section className="tech-section">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>Frontend:</strong> React, Axios</li>
          <li><strong>Backend:</strong> Node.js, Mongoose, Multer</li>
          <li><strong>Cloud Storage:</strong> Cloudinary</li>
          <li><strong>Full-Stack:</strong> MERN (MongoDB, Express, React, Node.js)</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
        </ul>
      </section>
      <div className="ABTseparator"></div>

      <section className="development-phases">
        <h2>Development Phases</h2>
        
        <h3>Version 1 (V1) <span>[Currently on developement phase]</span></h3>
        <p>
          This version focuses on core functionality. I did not prioritize optimization during this phase, as it was my very first 
          significant project. V1 includes shaping the UI, handling API interactions, and ensuring basic responsiveness.
        </p>

        <h3>Version 2 (V2)</h3>
        <p>
          In this version, I aim to enhance the user experience by improving smoothness and optimization. I will also focus on 
          cleaning up the code and achieving complete responsiveness across devices.
        </p>

        <h3>Version 3 (V3)</h3>
        <p>
          This final version will introduce new and exciting features, further enriching the overall experience for users.
        </p>
      </section>
      <div className="ABTseparator"></div>

      <section className="aboutme-section">
  <h2>About Me</h2>
  <p>
    I am a 2nd-year B.Tech CSE student based in Chhattisgarh, India.
  </p>
  <p>
    My name is Vedant Uekey, and I am a full-stack developer with a passion for
    creating innovative and user-friendly web applications. I have worked on
    various projects, including <strong>Yutub</strong>, and I am excited to
    continue exploring new opportunities.
  </p>
  <p>
    My primary focus is on web development, specializing in React and Node.js. I
    also have experience with MongoDB and Express.js. I am currently looking for
    opportunities to enhance my skills and contribute to open-source projects.
  </p>
</section>

      <div className="ABTseparator"></div>

      <footer className="social-links">
        <h2>Connect with Me</h2>
        <p>
          <a href="https://github.com/code-vedant" target="_blank" rel="noopener noreferrer">GitHub</a> |&nbsp; 
          <a href="https://www.linkedin.com/in/vedant-uekey-052268291" target="_blank" rel="noopener noreferrer">LinkedIn</a> |&nbsp;
          <a href="https://www.instagram.com/vedantuekey" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </footer>
    </div>
  );
};

export default About;
