import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://renatorrocha.dev",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
			alternates: {
				languages: {
					pt: "https://renatorrocha.dev/pt",
					en: "https://renatorrocha.dev/en",
				},
			},
		},
	];
}
