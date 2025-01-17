// /components/Results.js
import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <div className="text-gray-700">{results}</div>
        </div>
    );
};

export default Results;
  