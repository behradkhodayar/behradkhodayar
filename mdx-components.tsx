import type { MDXComponents } from "mdx/types";

// Customizes how MDX elements render across all .mdx files.
// Most prose styling comes from the `prose` wrapper in PostLayout
// (@tailwindcss/typography); here we only override what needs it.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // next/image needs known dimensions and is pointless with `images.unoptimized`
    // under static export, so render a plain responsive <img>.
    // eslint-disable-next-line @next/next/no-img-element
    img: (props) => <img {...props} className="rounded-lg" alt={props.alt ?? ""} />,
    ...components,
  };
}
