import {
	ExternalLinkIcon,
	GitHubLogoIcon,
	GlobeIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import {
	cardSurface,
	RichText,
	TechBadges,
} from "@/components/card-primitives";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Project {
	title: string;
	href?: string;
	description: string;
	technologies: readonly string[];
	links?: readonly { type: string; href: string }[];
}

const linkIcons: Record<string, typeof GlobeIcon> = {
	website: GlobeIcon,
	code: GitHubLogoIcon,
};

export function ProjectCard({ project }: { project: Project }) {
	const t = useTranslations("Project");
	const { title, href, description, technologies, links } = project;

	return (
		<Card className={cn("flex h-full flex-col gap-3", cardSurface)}>
			<div>
				<h3 className="text-base font-semibold leading-tight">
					{href ? (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="group/link inline-flex items-center gap-1 rounded-sm hover:underline hover:underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
						>
							{title}
							<ExternalLinkIcon className="size-3.5 opacity-0 transition-opacity group-hover/link:opacity-70 group-focus-visible/link:opacity-70" />
						</a>
					) : (
						title
					)}
				</h3>
			</div>

			<RichText>{description}</RichText>

			<div className="mt-auto flex flex-col gap-3">
				<TechBadges items={technologies} />

				{links && links.length > 0 && (
					<div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
						{links.map((link) => {
							const Icon = linkIcons[link.type] ?? GlobeIcon;
							return (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
								>
									<Icon className="size-3.5" aria-hidden />
									{t(`links.${link.type === "code" ? "code" : "website"}`)}
								</a>
							);
						})}
					</div>
				)}
			</div>
		</Card>
	);
}
