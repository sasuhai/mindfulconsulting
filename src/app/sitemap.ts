import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mindfulconsulting-538b9.web.app';

    const routes = [
        '',
        '/about',
        '/mission',
        '/programs',
        '/calendar',
        '/gallery',
        '/insights',
        '/contact',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
