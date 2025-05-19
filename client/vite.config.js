import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://mern-blog-j69d.onrender.com',
        secure:false,
      },
    },
  },
  plugins: [react()],
});
