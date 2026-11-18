import { useMessages, useTranslations } from "next-intl";
import BlurFade from "@/components/blur-fade";
import { SectionHeader } from "@/components/card-primitives";
import { ProjectCard } from "@/components/project-card";
import { BLUR_FADE_DELAY } from "@/lib/constants";

export default function ProjectsSection() {
	const t = useTranslations("Project");
	const messages = useMessages() as unknown as IntlMessages;

	return (
		<section id="projects" className="flex flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY * 11}>
				<SectionHeader title={t("title")} description={t("description")} />
			</BlurFade>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{messages.Project.projects.map((project, i) => (
					<BlurFade
						key={project.title}
						delay={BLUR_FADE_DELAY * 12 + i * 0.05}
						className="h-full"
					>
						<ProjectCard project={project} />
					</BlurFade>
				))}
			</div>
		</section>
	);
}
