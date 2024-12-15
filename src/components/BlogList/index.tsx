'use client';

import { Box, Grid, Card, CardMedia, CardContent, Typography, Pagination, Container } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: number;
  image: {
    url: string;
  };
}

interface Props {
  posts: Post[];
  pagination: {
    page: number;
    pageCount: number;
  };
  currentPage: number;
}

export default function BlogList({ posts, pagination, currentPage }: Props) {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Grid md={8} xs={12} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Blog Posts
          </Typography>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px',
              marginBottom: '20px',
              width: '100%',
              maxWidth: '400px',
            }}
          />
        </Box>

        <Grid container spacing={2}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={process.env.BASE_API_URL + post.image?.url || '/placeholder.jpg'}
                  alt={post.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.date} · {post.readTime} min read
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Read more
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pagination.pageCount}
            page={currentPage}
            onChange={(e, value) => {
              window.location.href = `/blog?page=${value}`;
            }}
          />
        </Box>
      </Grid>
    </Container>
  );
}