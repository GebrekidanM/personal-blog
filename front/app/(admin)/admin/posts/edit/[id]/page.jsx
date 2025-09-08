import EditPostForm from '../../../EditPostForm';
import { notFound } from 'next/navigation';

async function getPostData(id) {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/by-id/${id}`, { cache: 'no-store' });
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
      <EditPostForm initialPostData={postData} />
    </div>
  );
}