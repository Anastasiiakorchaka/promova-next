import { fetchAPI } from '@/lib/api';
import PostDetails from '@/components/PostDetails';
interface Props {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = process.env.BASE_URL;
  const data = await fetchAPI(`/posts?filters[slug][$eq]=${slug}&populate=image`);
  const post = data.data[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostDetails post={post} baseUrl={baseUrl} />;
}