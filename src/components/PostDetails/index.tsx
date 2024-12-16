'use client';

import { Box, Typography, Card, CardMedia, Grid, Container } from '@mui/material';

interface Post {
  id: number;
  title: string;
  content: {
    children: {
      text: string;
    }[]
  }[];
  date: string;
  readTime: number;
  image: {
    url: string;
  };
}

export default function PostDetails({ post }: { post: Post }) {
  console.log('jjj', post)
  return (
    <Container>
      <Grid md={8} xs={12} sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {post.date} · {post.readTime} min read
        </Typography>
        <Card sx={{ my: 2 }}>
          <CardMedia
            component="img"
            image={process.env.BASE_API_URL + post.image?.url || '/placeholder.jpg'}
            alt={post.title}
          />
        </Card>
        <Box
          sx={{ mt: 4 }}
          dangerouslySetInnerHTML={{ __html: post.content[0]?.children[0]?.text }}
        ></Box>
      </Grid>
    </Container>
  );
}