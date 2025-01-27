# Hyperchains Initiator

This repo contains a user interface that simplifies the process of setting up a custom Hyperchain.

## Access

Find a hosted version of the interface over at [init.hyperchains.ae](https://init.hyperchains.ae/) or
feel free to run it on your own machine using the instructions in the following section.

## Local development

### Prerequisites

- **[Node.js](https://nodejs.org/en/download)**: Version 22.13.0 or higher
- **Docker** (optional)

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/aeternity/aepp-hyperchains-initiator/.git
    cd aepp-hyperchains-initiator
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run Development Server**:

    ```bash
    npm run dev
    ```

    The interface is now accessible at http://localhost:3000/

4. **Build for Production**:
    ```bash
    npm run build
    ```

### 🐳 Docker Setup

To use Docker, make sure Docker is installed on your machine. Then, build and run the Docker container:

```bash
docker build -t aepp-hyperchains-initiator .
docker run --name aepp-hyperchains-initiator -p 3000:3000 aepp-hyperchains-initiator
```

## Feedback

For bug reports or feature requests, please use the issues: [https://github.com/aeternity/aepp-hyperchains-initiator/issues/new/choose](https://github.com/aeternity/aepp-hyperchains-initiator/issues/new/choose)

## License

This repository is licensed using the [ISC license](https://github.com/aeternity/aepp-hyperchains-initiator/blob/main/LICENSE.md)
