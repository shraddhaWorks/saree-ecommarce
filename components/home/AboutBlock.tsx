import Link from "next/link";

type Props = {
  title: string;
  body: string;
  imageUrl: string | null;
};

export function AboutBlock({ title, body, imageUrl }: Props) {
  return (
    <section className="w-full bg-white px-4 py-10">
      <div className="grid min-h-[60vh] grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
        <div className="h-full min-h-[280px] w-full lg:min-h-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg bg-[#f0ebe3] text-sm text-black/45">
              Set an about image in Admin → Storefront
            </div>
          )}
        </div>
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="max-w-lg">
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">{title}</h2>
            {body.trim() ? (
              <div className="mb-8 whitespace-pre-wrap text-gray-700 leading-7">{body}</div>
            ) : (
              <p className="mb-8 text-sm text-black/45">
                Add your story in Admin → Storefront.
              </p>
            )}
            <Link
              href="/contact"
              className="inline-block rounded-md border border-[#8f2333] px-6 py-3 transition hover:bg-[#8f2333] hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
