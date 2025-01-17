import { useState } from 'react';
import Header from '../components/Header';
import Instructions from '../components/Instructions';
import Loading from '../components/Loading';
import TestGrid from '../components/TestGrid';
import axios from 'axios';
import { marked } from 'marked';

export default function Home() {
    const [apiKey, setApiKey] = useState('');
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState('');
    const [syllabusFile, setSyllabusFile] = useState(null);
    const [pyqsFiles, setPyqsFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const downloadFile = (filename, content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };
    
    const handleDownloadResults = () => {
        const content = results.exam_analysis; // Get the exam analysis content
        downloadFile('exam_analysis.txt', content);
    };
    
    const handleDownloadPracticeQuestions = () => {
        const content = results.practice_questions; // Get the practice questions content
        downloadFile('practice_questions.txt', content);
    };

    const handleApiKeyChange = (e) => {
        setApiKey(e.target.value);
        setShowUploadOptions(e.target.value !== '');
    };

    const handleSyllabusUpload = (e) => {
        setSyllabusFile(e.target.files[0]);
    };

    const handlePyqsUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 4) {
            setPyqsFiles(files);
        } else {
            alert("You can upload a maximum of 4 files.");
        }
    };

    const handleRunAnalysis = async () => {
        console.log("Run Analysis button clicked.");
        console.log("API Key:", apiKey);
        console.log("Syllabus File:", syllabusFile);
        console.log("Question Files:", pyqsFiles);

        if (!apiKey || !syllabusFile || pyqsFiles.length < 1) {
            alert("Please fill in all fields and upload files.");
            return;
        }

        if (apiKey.length < 10) {
            setErrorMessage("Please enter a valid API key.");
            return;
        }

        setLoading(true);
        setErrorMessage('');
        const formData = new FormData();
        formData.append('api_key', apiKey);
        formData.append('syllabus_file', syllabusFile);
        pyqsFiles.forEach((file) => {
            formData.append('question_files', file);
        });

        try {
            console.log("Sending request to FastAPI...");
            const response = await axios.post('https://xamify-backend.onrender.com/analyze/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Response data:", response.data);
            setResults(response.data);
        } catch (error) {
            console.error("Error during analysis:", error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data.detail || 'Invalid input. Please check your API key and uploaded files.'}`);
            } else if (error.request) {
                setErrorMessage("No response received from the server.");
            } else {
                setErrorMessage("Error in setting up the request: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TestGrid />
            <div className="min-h-screen p-6 relative">
                <Header />
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="bg-white shadow-xl rounded-lg p-6 h-80 overflow-hidden w-full md:w-1/3">
                        <Instructions />
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 w-full md:w-2/3 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">API Key Input</h2>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={handleApiKeyChange}
                            placeholder="Enter your Groq API Key"
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        {showUploadOptions && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-green-700">Upload Syllabus</h3>
                                <label className="block mb-2">
                                    <input type="file" onChange={handleSyllabusUpload} className="hidden" />
                                    <span className="inline-block bg-white border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                                        Choose Syllabus
                                    </span>
                                </label>
                                {syllabusFile && <p className="text-gray-600">Uploaded: {syllabusFile.name}</p>}
                                
                                <h3 className="text-lg font-semibold text-green-700">Upload PYQs</h3>
                                <label className="block mb-2">
                                    <input type="file" onChange={handlePyqsUpload} multiple className="hidden" />
                                    <span className="inline-block bg-white border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                                        Choose PYQs
                                    </span>
                                </label>
                                {pyqsFiles.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-gray-600">Uploaded Files:</p>
                                        <ul className="list-disc pl-5">
                                            {pyqsFiles.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={handleRunAnalysis}
                            disabled={!apiKey}
                            className={`bg-green-500 text-white rounded-full px-4 py-2 transition-transform transform hover:scale-105 hover:bg-green-600 ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Run Analysis
                        </button>
                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    </div>
                </div>
                {/* Results Section */}
                {loading && <Loading />}
                {results && (
                    <div className="mt-4 flex flex-col gap-4">
                        <div className="bg-white shadow-md rounded-lg p-4 max-h-60 overflow-y-auto w-2/3 mx-auto">
                            <h3 className="text-lg font-semibold text-green-700">Results:</h3>
                            <div className="text-green-700" dangerouslySetInnerHTML={{ __html: marked(results.exam_analysis) }} />
                        </div>
                        <button onClick={handleDownloadResults} className="mt-2 bg-green-500 text-white rounded-full px-4 py-2 transition-transform transform hover:scale-105 hover:bg-green-600 w-1/4 mx-auto">
                            Download Results
                        </button>
                        <div className="bg-white shadow-md rounded-lg p-4 max-h-60 overflow-y-auto w-2/3 mx-auto">
                            <h3 className="text-lg font-semibold text-green-700">Practice Questions:</h3>
                            <div className="text-green-700" dangerouslySetInnerHTML={{ __html: marked(results.practice_questions) }} />
                        </div>
                        <button onClick={handleDownloadPracticeQuestions} className="mt-2 bg-green-500 text-white rounded-full px-4 py-2 transition-transform transform hover:scale-105 hover:bg-green-600 w-1/4 mx-auto">
                            Download Practice Questions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}