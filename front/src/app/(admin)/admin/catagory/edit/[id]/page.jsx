//catagory edit page
import EditCatagoryForm from '@/components/EditCatagory';
import { api } from '@/lib/api';
import { notFound } from 'next/navigation';

async function getCatagoryData(id) {
  console.log('Fetching category data for ID:', id);
  try {
    //update the endpoint to match the backend route
    const res = await fetch(`${api}/catagory/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function EditCatagoryPage({ params }) {
  const catagoryData = await getCatagoryData(params.id);

  console.log('Category data fetched:', catagoryData);

  if (!catagoryData) {
    notFound
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Category</h1>
      <EditCatagoryForm catagoryData={catagoryData} />
    </div>
  )
}
