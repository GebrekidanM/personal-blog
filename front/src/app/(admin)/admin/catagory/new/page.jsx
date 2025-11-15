//create Catagory Page
'use client';
import { api } from '@/lib/api';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewCategoryPage = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const navigation = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            const response = await fetch(`${api}/catagory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                const data = await response.json();
                setName('');
                setTimeout(() => {
                    navigation.push('/admin/catagory');
                }, 1500);
                
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
                setIsPublishing(false);
            }
        } catch (error) {
            setIsPublishing(false);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="w-full mx-auto p-6 flex flex-col min-h-screen bg-gray-50">
            <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
            
            <form onSubmit={handleSubmit} className='w-1/2 mx-auto h-auto container px-4 py-8 justify-center flex items-center bg-white shadow-md rounded-lg'>
                <div className="flex flex-col w-full gap-6">
                <h1 className="text-3xl font-bold text-center">Create New Category</h1>
                <div className="flex flex-col gap-4 ml-4">
                     <label htmlFor="nsme" className="block text-lg font-medium text-gray-700">Catagory Name:</label>
                     <input
                        type="text"
                        className="mt-1 block w-full text-lg p-2 border-2 border-gray-200 rounded-md outline-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Category Name"
                        required
                    />
                    <button 
                        type="submit"
                        disabled={isPublishing}
                        className="bg-blue-600 w-1/2 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >Create Category</button>
                </div>
               </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewCategoryPage;