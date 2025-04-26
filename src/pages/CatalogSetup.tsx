import React from 'react';
import { useDropzone } from 'react-dropzone';
import DashboardLayout from '../components/layout/DashboardLayout';

const CatalogSetup = () => {
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Product Image Upload Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">Product Image Upload</h2>
          <p className="mb-4">Upload product images to auto-generate titles, descriptions, and tags using AI.</p>
          {/* Multi-file Image Upload Component */}
          <div
            {...getRootProps()}
            className={`border-dashed border-2 p-6 text-center ${isDragActive ? 'bg-gray-100' : 'bg-white'}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & Drop your images here, or click to select files</p>
            )}
            <p className="text-sm text-gray-500 mt-2">Optional: Upload CSV or JSON for bulk import of SKUs, price, inventory.</p>
          </div>
        </section>

        {/* AI-Powered Auto Title & Description Generator Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">AI-Powered Auto Title & Description Generator</h2>
          <p className="mb-4">Generate product titles, descriptions, and bullet points for eCommerce listings.</p>
          {/* AI Inputs */}
          <div className="space-y-4">
            <input type="text" placeholder="Industry/Niche" className="input w-full" />
            <select className="select w-full">
              <option>Minimal</option>
              <option>Bold</option>
              <option>Playful</option>
              <option>Premium</option>
              <option>Sustainable</option>
            </select>
            <input type="file" accept=".csv" className="input w-full" />
          </div>
        </section>

        {/* AI Category & Tag Suggestions Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">AI Category & Tag Suggestions</h2>
          <p className="mb-4">Help merchants classify their products correctly by suggesting categories and tags.</p>
          {/* Suggestions Display */}
          <div className="border p-4 bg-white">
            <p>Suggested Category Tree: Clothing → Men → Shirts</p>
            <p>Suggested Tags: cotton, red shirt, casual wear, organic fabric, summer style</p>
          </div>
        </section>

        {/* Live Catalog Preview Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">Live Catalog Preview</h2>
          <p className="mb-4">Preview your live product catalog in real-time.</p>
          {/* Product Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product Card Example */}
            <div className="card bg-white shadow-md">
              <img src="/placeholder.svg" alt="Product" className="w-full" />
              <div className="p-4">
                <h3 className="font-bold">Product Title</h3>
                <p>Short Description</p>
                <p>Price: $XX.XX</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chatbot Assistant Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">AI Chatbot Assistant</h2>
          <p className="mb-4">Need help cataloging your products?</p>
          <button className="btn-primary">Launch AI Chatbot</button>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CatalogSetup;