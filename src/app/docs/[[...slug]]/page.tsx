import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { CombinedAIButton } from '@/components/page-actions';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  
  // Map component paths to their corresponding component IDs in the registry
  const getComponentName = (slug?: string[]): string | undefined => {
    if (!slug || slug.length < 2) return undefined;
    
    // Check if this is a component page (starts with 'components')
    if (slug[0] !== 'components') return undefined;
    
    // Map component paths to their corresponding registry IDs
    const componentMap: Record<string, string> = {
      // Simple mappings where the ID is the last part of the path
      'banner': 'banner',
      'invoice-history': 'invoice-history',
      'payment-method-selector': 'payment-method-selector',
      'usage-table': 'usage-table',
      'subscription-management': 'subscription-management',
      'usage-meter/usage-meter-circle': 'usage-meter',
      'usage-meter/usage-meter-linear': 'usage-meter',
      
      // Pricing tables
      'pricing-table/pricing-table-one': 'pricing-table-one',
      'pricing-table/pricing-table-two': 'pricing-table-two',
      'pricing-table/pricing-table-three': 'pricing-table-three',
      'pricing-table/pricing-table-five': 'pricing-table-five',
      
      // Cancel subscription components
      'cancel-subscription/cancel-subscription-card': 'cancel-subscription-card',
      'cancel-subscription/cancel-subscription-dialog': 'cancel-subscription-dialog',
      
      // Update plan components
      'update-plan/update-plan-card': 'update-plan-card',
      'update-plan/update-plan-dialog': 'update-plan-dialog',
    };
    
    const componentPath = slug.slice(1).join('/');
    return componentMap[componentPath];
  };
  
  const componentName = getComponentName(params.slug);

  return (
    <DocsPage
      full={page.data.full}
      breadcrumb={{
        includePage: true,
        includeSeparator: true,
      }}
    >
      <DocsTitle className="mt-2 flex flex-row justify-between">
        {page.data.title}
        <div className="hidden md:block">
          <CombinedAIButton
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/dodopayments/billingsdk/tree/main/content/docs/${page.path}`}
            componentName={componentName}
          />
        </div>
      </DocsTitle>
      <DocsDescription className="mb-5">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6 mb-5 md:hidden">
        <CombinedAIButton
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/dodopayments/billingsdk/tree/main/content/docs/${page.path}`}
          componentName={componentName}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
