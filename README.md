# The Oviedo Lab Website source code

This is the source code for the [oviedolab.org](https://oviedolab.org) website. The webpage is built using [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/), with [Bun](https://bun.sh/) as the JavaScript runtime and package manager. The webpage components are built on top of the [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) UI library.

## Development

### Prerequisites
To set up this project on a new machine, first install the required runtimes and dependencies:

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Bun](https://bun.sh/install)


### Installation
Then, clone the repository and install the dependencies:

1. Clone the repository: 

```bash
git clone https://github.com/oviedolab/oviedolab-website-source.git
```

2. Install the dependencies:

```bash
cd oviedolab-website-source
bun install
```

### Running the development server
To run the development server, use the following command:

```bash
bun run dev

# To expose the server to other devices on your network, use the following command:
bun run dev -- --host
```

This will start the development server and open the website in your default browser. The server will automatically reload the page when you make changes to the source code.

## Deployment

To compile the website for production, use the following command:

```bash
bun run build
```

This will generate a production build of the website in the `build` directory. The contents of this directory can be deployed to a web server or hosted on GitHub Pages.

The current build of the website is available at [Oviedo-Lab/oviedo-lab.github.io](https://github.com/Oviedo-Lab/oviedo-lab.github.io).