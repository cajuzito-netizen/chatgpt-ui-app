import type { Config } from "@react-router/dev/config";

export default {
  // Framework mode with SSR (not SPA). Client store still hydrates from localStorage.
  ssr: true,
} satisfies Config;
