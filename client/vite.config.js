import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const PROD_API_URL = 'https://mern-blog-j69d.onrender.com/api';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    server: {
      proxy: {
        '/api': {
          target: 'https://mern-blog-j69d.onrender.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      __API_BASE__: JSON.stringify(isProd ? PROD_API_URL : '/api'),
    },
    plugins: [react()],
  };
});
