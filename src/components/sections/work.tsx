import { useMessages, useTranslations } from "next-intl";
import BlurFade from "@/components/blur-fade";
import { SectionHeader } from "@/components/card-primitives";
import { ExperienceCard } from "@/components/experience-card";
import { BLUR_FADE_DELAY } from "@/lib/constants";

export default function WorkSection() {
	const t = useTranslations("Work");
	const messages = useMessages() as unknown as IntlMessages;

	return (
		<section id="work">
			<div className="flex min-h-0 flex-col gap-y-3">
				<BlurFade delay={BLUR_FADE_DELAY * 5}>
					<SectionHeader title={t("title")} />
				</BlurFade>

				{messages.Work.experiences.map((experience, i) => (
					<BlurFade
						key={experience.company}
						delay={BLUR_FADE_DELAY * 6 + i * 0.05}
					>
						<ExperienceCard experience={experience} featured={i === 0} />
					</BlurFade>
				))}
			</div>
		</section>
	);
}
