"use client";
import React, { useState, useEffect } from 'react';
import { firebase_app, db } from '@/firebase/config';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Link from "next/link";
import { BsLink } from 'react-icons/bs';

export default function Page({ params }) {
  const [noteText, setNoteText] = useState("");
  const [selectedExpiry, setSelectedExpiry] = useState("immediately"); // Default expiry time: immediately

  useEffect(() => {
    // Function to fetch data from Firestore based on the provided document ID (params.id)
    const fetchNoteData = async () => {
      try {
        // Get the document from the "Notes" collection in Firestore using the provided ID
        const docRef = doc(db, 'Notes', params.id);
        const docSnap = await getDoc(docRef);

        // Check if the document exists in Firestore
        if (docSnap.exists()) {
          // If the document exists, retrieve the "text" field and set it in the state
          const noteData = docSnap.data();
          setNoteText(noteData.text);

          // Set the expiry time from Firestore
          setSelectedExpiry(noteData.Expiry);

          // If the expiry time is "immediately," add an event listener for beforeunload event
          if (noteData.Expiry === "immediately") {
            window.addEventListener('beforeunload', deleteDocumentOnUnload);
          }
        } else {
          // If the document does not exist, show an error message
          Swal.fire({
            title: 'Error!',
            text: 'Note not found or has been deleted.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error('Error fetching note data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while fetching the note data. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    // Call the fetchNoteData function when the component mounts
    fetchNoteData();

    // Clean up: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', deleteDocumentOnUnload);
    };
  }, [params.id]); // Only fetch data when the document ID (params.id) changes

  const deleteDocumentOnUnload = async () => {
    try {
      // Delete the document from Firestore when the user closes the tab or navigates away from the page
      const docRef = doc(db, 'Notes', params.id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting the document:', error);
    }
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
              Your Private Note: {params.id}
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
        </form>
      </main>
    </div>
  );
}