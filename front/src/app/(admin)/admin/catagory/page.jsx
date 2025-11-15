//catagory management page placeholder
'use client';
import { api } from '@/lib/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const page = () => {
    const [catagories, setCatagories] = useState([])

    useEffect(() => {
        //fetch catagories from backend
        const fetchCatagories = async () => {
            try {
                const response = await fetch(`${api}/catagory`);
                const data = await response.json();
                setCatagories(data);
            } catch (error) {
                console.error('Error fetching catagories:', error);
            }
        };

        fetchCatagories();
    }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
        {/**display and add buttons to edit and delete catagory lists */}
        <div className="w-3/4 h-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Category Management</h1>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Category Name</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {catagories.map((catagory) => (
                        <tr key={catagory._id}>
                            <td className="border-b border-gray-200 px-4 py-2">{catagory.name}</td>
                            <td className="border-b border-gray-200 px-4 py-2">
                                <Link href={`/admin/catagory/edit/${catagory._id}`} className="text-blue-600 hover:underline mr-4">Edit</Link>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default page