# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Docker Build & Run
1. Build the image: `docker build . -t "{image_name}:v{version_of_image}"`
2. Run the Container: `docker run -dp 3000:3000 {image_name}:v{version_of_image}`
3. Stop the Running Container: `docker ps` to get the ID and then `docker stop {ID}`