import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/draco_decoder/', '/versioned/decoders/'], // Block problematic paths
            },
        ],
        sitemap: 'https://jokes.mosesadebayo.tech/sitemap.xml', // Add your sitemap if applicable
    };
}
