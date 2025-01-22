# Hyperchains UI

This repo contains an user interface that simplifies the process of setting up a custom Hyperchain.

## Access

Find a hosted version of the interface over at [hyperchains.ae](https://hyperchains.ae) or
feel free to run it on your own machine using the instructions in the following section.

## Local development

### Prerequisites

- **[Node.js](https://nodejs.org/en/download)**: Version 22.13.0 or higher
- **Docker** (optional)

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/aeternity/hyperchains-ui.git
    cd hyperchains-ui
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
docker build -t hyperchains-ui .
docker run --name hyperchains-ui -p 3000:3000 hyperchains-ui
```

## Feedback

For bug reports or feature requests, please use the issues: [https://github.com/aeternity/hyperchains-ui/issues/new/choose](https://github.com/aeternity/hyperchains-uii/issues/new/choose)

## License

This repository is licensed using the [ISC license](https://github.com/aeternity/hyperchains-ui/blob/main/LICENSE.md)
