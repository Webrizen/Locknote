"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from "@/assets/logo.png";
import Link from "next/link";

export default function Home() {
  const [selectedExpiry, setSelectedExpiry] = useState("1h"); // Default expiry time: 1 hour

  const handleExpiryChange = (event) => {
    setSelectedExpiry(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-2">
      <main style={{ width: '80%', margin: '0 auto' }}>
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-3xl font-semibold">Welcome To LinkNote</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
              Your Private Note
            </label>
            <textarea
              id="note"
              name="note"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="15"
              placeholder="Write your private note here..."
            ></textarea>
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry">
              Select Expiry Time
            </label>
            <select
              id="expiry"
              name="expiry"
              value={selectedExpiry}
              onChange={handleExpiryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="immediately">Immediately</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className='button'
            >
              Create Note
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
