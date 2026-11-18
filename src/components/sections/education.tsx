import { useMessages, useTranslations } from "next-intl";
import BlurFade from "@/components/blur-fade";
import { SectionHeader } from "@/components/card-primitives";
import { ExperienceCard } from "@/components/experience-card";
import { BLUR_FADE_DELAY } from "@/lib/constants";

export default function EducationSection() {
	const t = useTranslations("Education");
	const messages = useMessages() as unknown as IntlMessages;

	return (
		<section id="education">
			<div className="flex min-h-0 flex-col gap-y-3">
				<BlurFade delay={BLUR_FADE_DELAY * 7}>
					<SectionHeader title={t("title")} />
				</BlurFade>
				{messages.Education.records.map((education, i) => (
					<BlurFade
						key={education.institution}
						delay={BLUR_FADE_DELAY * 8 + i * 0.05}
					>
						<ExperienceCard
							variant="education"
							experience={{
								company: education.institution,
								href: education.href,
								logoUrl: education.logoUrl,
								roles: education.programs.map((program) => ({
									title: program.degree,
									start: program.start,
									end: program.end,
								})),
							}}
						/>
					</BlurFade>
				))}
			</div>
		</section>
	);
}
