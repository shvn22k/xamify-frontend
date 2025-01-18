// /components/Instructions.js
import React from 'react';
import styles from './Instructions.module.css'; // Import the CSS Module

const Instructions = () => {
    return (
        <div className={styles.instructionsContainer}>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ul className="list-disc pl-5">
                <li>
                    Step 1: Enter your Groq API key (see how to get it 
                    <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> here</a>).
                </li>
                <li>Step 2: Upload your syllabus PDF.</li>
                <li>Step 3: Upload past question papers (2-4).</li>
                <li>Step 4: Run analysis and view results!</li>
                <li>Sample pdfs: <a href="https://drive.google.com/drive/folders/1zsIkWRVqH-YUBVudCZWOC06tQqsOU6kf?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">drive link</a> </li>
            </ul>
        </div>
    );
};

export default Instructions;
  
