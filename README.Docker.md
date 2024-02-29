### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:8081.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

### Kaip paleist aplikaciją su Docker

1. Atsisiusk ir įsidiek [Docker](https://www.docker.com/products/docker-desktop).
2. Atsidaryk terminalą ir nueik į projekto direktoriją (food-app).
3. Parašyk `docker compose up` ir paspausk `Enter`.
4. Parašyk `docker compose watch` ir paspausk `Enter
5. Atsidaryk naršyklę ir nueik į `http://localhost:8081` arba skenuok QR kodą su telefu.
6. profit 🚀
   PS. Jei nori sustabdyti aplikaciją, spausk `Ctrl+C` terminalo lange.
   🚨 !!! Naujiem package'ams įdiegti reikia naudot yarn add, o ne npm install. !!!! 🚨
   `npm install --global yarn` - kad įsidiegtum yarn globaliai savo kompe.
