// 올바른 _app.js 또는 _app.tsx 예시
import { PostProvider } from '../contexts/PostContext';

function MyApp({ Component, pageProps }) {
  return (
    <PostProvider>
      <Component {...pageProps} />
    </PostProvider>
  );
}

export default MyApp;
