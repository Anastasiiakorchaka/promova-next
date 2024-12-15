import { fetchAPI } from '@/lib/api';
import BlogList from '@/components/BlogList';

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const PAGE_SIZE = 5;

  const params = await searchParams || {};
  const currentPage = params.page ? parseInt(params.page) : 1;

  const data = await fetchAPI(`/posts?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${PAGE_SIZE}`);
  const posts = data.data;
  const meta = data.meta.pagination;

  return <BlogList posts={posts} pagination={meta} currentPage={currentPage} />;
}