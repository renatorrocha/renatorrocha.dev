import {
	ArchiveIcon,
	GitHubLogoIcon,
	HomeIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export const BLUR_FADE_DELAY = 0.1;

/** Icon names that don't follow the default slug rule; null = no icon available. */
const skillIconOverrides: Record<string, string | null> = {
	"Tailwind CSS": "tailwindcss",
	"Material UI": "mui",
	"Hugging Face": "huggingface",
	"GitHub Actions": "githubactions",
	"shadcn/ui": "shadcn",
	"TanStack Query": "reactquery",
	"AI SDK": null,
};

export type SkillCategoryKey =
	| "languages"
	| "frameworks"
	| "databases"
	| "cloud"
	| "ai";

export interface SkillCategory {
	key: SkillCategoryKey;
	skills: string[];
}

export const SKILLS: SkillCategory[] = [
	{
		key: "languages",
		skills: ["TypeScript", "JavaScript", "Python", "Go", "Node.js", "Bun"],
	},
	{
		key: "frameworks",
		skills: [
			"React",
			"React Native",
			"Expo",
			"Next.js",
			"Nest.js",
			"Express",
			"Elysia",
			"FastAPI",
			"TanStack Query",
			"Zustand",
			"Vite",
			"Tailwind CSS",
			"shadcn/ui",
			"Material UI",
		],
	},
	{
		key: "databases",
		skills: [
			"PostgreSQL",
			"Redis",
			"RabbitMQ",
			"Prisma",
			"Drizzle",
			"Supabase",
		],
	},
	{
		key: "cloud",
		skills: [
			"Docker",
			"AWS",
			"Linux",
			"Git",
			"GitHub Actions",
			"Vercel",
			"Railway",
			"Cloudflare",
			"Grafana",
		],
	},
	{
		key: "ai",
		skills: ["LangChain", "AI SDK", "Hugging Face", "Ollama", "n8n"],
	},
];

/**
 * Icon URL for a skill, or null when the icon service has none.
 */
export function getSkillIconUrl(skillName: string): string | null {
	const override = skillIconOverrides[skillName];
	if (override === null) return null;
	const apiName = override ?? skillName.toLowerCase().replace(/[\s.]+/g, "");
	return `https://go-skill-icons.vercel.app/api/icons?i=${apiName}`;
}

export const DATA = {
	name: "Renato Rocha Rodrigues",
	initials: "RR",
	avatarUrl: "/my-pic.jpg",
	navbar: [
		{
			href: "/",
			icon: HomeIcon,
			label: "Home",
		},
		// {
		// 	href: "/projects-and-certifications",
		// 	icon: ArchiveIcon,
		// 	label: "Projects & Certifications",
		// },
	],
	contact: {
		email: "renatorrodrigues2002@gmail.com",
		phone: "(27) 99311-7272",
		social: {
			Linkedin: {
				name: "Linkedin",
				url: "https://www.linkedin.com/in/renato-rrodrigues/",
				icon: LinkedInLogoIcon,
				navbar: true,
			},
			Github: {
				name: "Github",
				url: "https://github.com/renatorrocha",
				icon: GitHubLogoIcon,
				navbar: true,
			},
		},
	},
};
