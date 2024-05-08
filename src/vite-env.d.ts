/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string,
    readonly VITE_API_TOKEN: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.test.tsx' {
  const component: any;
  export default component;
}

declare module '*.spec.tsx' {
  const component: any;
  export default component;
}