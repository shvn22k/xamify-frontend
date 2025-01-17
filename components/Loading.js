// /components/Loading.js
import React from 'react';
import Spinner from './Spinner';

const Loading = () => {
    return (
        <div className="text-center mt-4">
            <Spinner />
            <p className="text-lg text-green-500">Loading...</p>
        </div>
    );
};

export default Loading;
