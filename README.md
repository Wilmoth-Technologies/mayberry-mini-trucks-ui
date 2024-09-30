# Docker Build & Run
1. Build the image: `docker build . -t "{image_name}:v{version_of_image}"`
2. Run the Container: `docker run -dp 3000:3000 {image_name}:v{version_of_image}`
3. Stop the Running Container: `docker ps` to get the ID and then `docker stop {ID}`
