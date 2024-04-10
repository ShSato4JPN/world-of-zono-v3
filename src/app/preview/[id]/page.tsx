import BlogPreview from "@/components/BlogPreview";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  return <BlogPreview id={id} />;
}

export default Page;
