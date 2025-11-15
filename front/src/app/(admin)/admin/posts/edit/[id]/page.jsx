import EditPostForm from '../../../EditPostForm';
import { notFound } from 'next/navigation';
import { api } from '../../../../../../lib/api';
import Link from 'next/link';

async function getPostData(id) {
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

 
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
      <EditPostForm initialPostData={postData} />
    </div>
  );
}