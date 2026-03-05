// svelte-sitemap.config.ts
import type { OptionsSvelteSitemap } from 'svelte-sitemap';

const config: OptionsSvelteSitemap = {
    domain: 'https://oviedolab.org',
    trailingSlashes: true,
    resetTime: true,
    ignore: [
        '404.html',
    ],
};

export default config;