import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  server: {
    watch: {
      ignored: ['**/.antigravitycli/**']
    }
  }
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
})
