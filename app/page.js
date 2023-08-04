"use client";
import React, { useState } from 'react';
import { firebase_app, db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Link from "next/link";
import { BsLink } from 'react-icons/bs';

export default function Home() {
  const [selectedExpiry, setSelectedExpiry] = useState("immediately"); // Default expiry time: immediately
  const [noteText, setNoteText] = useState("");
  const CurrentURL ="https://locknotes.vercel.app"
  const [noteId, setNoteId] = useState(null);

  const handleExpiryChange = (event) => {
    setSelectedExpiry(event.target.value);
  };

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    if (!noteText) {
      // Handle if noteText is empty
      return;
    }

    try {
      const noteData = {
        text: noteText,
        Expiry: selectedExpiry,
      };

      // Add the note to the "Notes" collection in Firestore
      const docRef = await addDoc(collection(db, 'Notes'), noteData);
      const newNoteId = docRef.id;

      // Update the noteId state with the newly created document ID
      setNoteId(newNoteId);

      // Add the note to the "Notes" collection in Firestore
      await addDoc(collection(db, 'Notes'), noteData);

      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Note Created!',
        text: 'Your private note has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Clear the textarea after successful note creation
      setNoteText("");
    } catch (error) {
      // Handle any errors that occur during note creation
      console.error('Error creating note:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating the note. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const copyToClipboard = (text) => {
    // Create a temporary textarea element to copy the URL
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);

    // Select and copy the text from the textarea to the clipboard
    tempTextArea.select();
    document.execCommand('copy');

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextArea);

    // Show a success message using SweetAlert2
    Swal.fire({
      title: 'Copied!',
      text: 'The URL has been copied to the clipboard.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-2">
      <main style={{ width: '80%', margin: '0 auto' }}>
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-3xl font-semibold">Welcome To LinkNote</h1>
        </div>
        <form onSubmit={handleNoteSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
              Your Private Note
            </label>
            <textarea
              id="note"
              name="note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="15"
              placeholder="Write your private note here..."
            ></textarea>
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
        {noteId && ( 
          <div className="flex flex-wrap">
            <div className="px-8 py-6 border-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Your Link Is Ready!
              </h2>
              <p className="leading-relaxed text-base mb-4">
              Send notes that will self-destruct after being read.
              </p>
              <form style={{ flexDirection: 'row', alignItems: 'center' }}>
                <input
                  value={`${CurrentURL}/hidden/${noteId}`}
                  readOnly
                />
                {/* Add a Function here to copy The URL in Input Field  */}
                <span className="ico" title='Copy URL' onClick={() => copyToClipboard(`${CurrentURL}/hidden/${noteId}`)}>
                  <BsLink />
                </span>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
