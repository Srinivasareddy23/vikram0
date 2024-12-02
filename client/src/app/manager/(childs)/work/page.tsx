'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { jsPDF } from "jspdf";

const Work = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pdfName, setPdfName] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a query.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.log('Error:', err);
      setResponse('An unexpected error occurred.');
    }
  };

  const handlePDFDownload = () => {
    if (!pdfName.trim()) {
      alert('Please enter a name for the PDF.');
      return;
    }
    const doc = new jsPDF();
    doc.text(response, 10, 10);
    doc.save(`${pdfName}.pdf`);
    setShowModal(false);
  };

  return (
    <div className="mt-4">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex justify-end mb-8">
          <Link href={'/manager/work/assignwork'}>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md">
              Assign Work
            </button>
          </Link>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Ask Your AI Assistant</h1>
          <p className="text-gray-600 mt-4">
            Type your query below and let AI assist you with a quick response. Create a PDF of the results with a single click!
          </p>
        </div>

        {/* Input Section */}
        <div className="flex justify-center items-center mb-12 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-3xl border border-gray-300 rounded-lg py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400 transition"
            placeholder="Type your query here..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Response Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Conditional Button Rendering */}
          {response && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                AI Response
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition flex items-center space-x-2"
              >
                <span>📄</span>
                <span>Convert to PDF</span>
              </button>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Your AI-generated response will appear below:
          </p>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner text-gray-800">
            {response ? (
              <p className="whitespace-pre-wrap">{response}</p>
            ) : (
              <p className="text-gray-500">Your response will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">Enter PDF Name</h2>
            <input
              type="text"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter file name"
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePDFDownload}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
