declare type PageProps<
  Param = {
    //
  },
> = {
  params: Promise<{ locale: string } & Param>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// For CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
