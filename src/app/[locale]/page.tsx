import { Fragment, Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchGithubProject } from '@/data/githubProject/fetchGithubProject';
import { LayoutMain } from '@/layout/LayoutMain';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { CardReview } from './widgets/card-review';
import { DataExample } from './widgets/DataExample';
import { ProjectExample } from './widgets/ProjectExample';
import { reviews } from './widgets/reviews';

export default async function Pages(props: PageProps) {
  const { locale } = await props.params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations('IndexPage');
  const projectFetcher = fetchGithubProject('vercel/swr');
  return (
    <LayoutMain footerLinks={[]} collections={[]}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-auto p-12">
        <Chip color="primary" variant="flat">
          {t('title')}
        </Chip>
        <DataExample />
        <Suspense fallback={<Spinner variant="gradient" color="primary" />}>
          <ProjectExample projectFetcher={projectFetcher} />
        </Suspense>
        <Fragment>
          <span className="text-2xl font-bold">
            Next.js starter best practices
          </span>
          <section className="mx-auto w-full max-w-6xl md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reviews.map((review, index) => (
                <CardReview key={index} {...review} />
              ))}
            </div>
          </section>
        </Fragment>
      </div>
    </LayoutMain>
  );
}
