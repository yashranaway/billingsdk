import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Image
          src="/logo/logo-dodo.svg"
          alt="Billing SDK"
          width={28}
          height={28}
        />
        <span className="text-xl ">/</span>
        <Image
          src="/logo/Logo.svg"
          alt="Billing SDK"
          width={120}
          height={120}
        />
      </div>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
