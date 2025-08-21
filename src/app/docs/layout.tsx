import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { GithubIcon } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
    {...baseOptions}
    tree={source.pageTree}
    links={[
      ...baseOptions.links || [],
      {
        type: 'icon',
        icon: <GithubIcon />,
        text: 'GitHub',
        url: 'https://github.com/dodopayments/billingsdk',
      },
    ]}
  >
    {children}
  </DocsLayout>
  );
}
