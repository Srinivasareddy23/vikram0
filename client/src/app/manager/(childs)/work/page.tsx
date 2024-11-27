import Link from "next/link";
import React from "react";

const Work = () => {
  const tools = [
    {
      name: "ChatGPT",
      description: "An AI chatbot by OpenAI.",
      link: "https://chat.openai.com/",
      bgColor: "bg-blue-500",
    },
    {
      name: "Gemini AI",
      description: "Google's advanced AI model.",
      link: "https://gemini.google.com/app?hl=en-IN",
      bgColor: "bg-purple-500",
    },
    {
      name: "Copilot",
      description: "AI-powered code completion by GitHub.",
      link: "https://github.com/features/copilot",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Link href={'/manager/work/assignwork'}>
      <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-700 float-right text-white">
        Assign Work
      </button>
      </Link>
       
      <h1 className="text-4xl font-bold text-center mb-6">Explore the World of AI</h1>
      <p className="text-center text-lg text-gray-700 mb-8">
        Artificial Intelligence is transforming the way we interact with technology. 
        Below are some groundbreaking tools you can explore to experience the power of AI firsthand. 
        Click on any card to prompt the requirements!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <a
            key={index}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-white ${tool.bgColor}`}
          >
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-sm">{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Work;
