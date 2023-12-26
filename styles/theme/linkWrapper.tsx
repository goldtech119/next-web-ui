import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

export const LinkWrapper = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
);

LinkWrapper.displayName = "LinkWrapper";
