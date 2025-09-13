import EditPostForm from '../../../EditPostForm';
import { notFound } from 'next/navigation';
import { api } from '../../../../../../lib/api';
import Link from 'next/link';
import useAuth from '../../../../../../hooks/useAuth';

async function getPostData(id) {
    const { isAuthenticated, loading } = useAuth();
  try {
    const res = await fetch(`${api}/posts/by-id/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function EditPostPage({ params }) {
  const postData = await getPostData(params.id);

  if (!postData) {
    notFound();
  }
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if(isAuthenticated === false && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen"> 
        <p className="text-red-600 font-bold">You must be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
      <EditPostForm initialPostData={postData} />
    </div>
  );
}