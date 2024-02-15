// pages/about.tsx
import { usePost } from '../contexts/PostContext';

const About = () => {
  const { post } = usePost();

  if (!post) return <p>No post selected</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default About;