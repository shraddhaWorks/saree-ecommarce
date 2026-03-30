import { OutOrInLink } from "@/lib/external-link";

export type PromoItem = {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
};

type Props = {
  title: string;
  items: PromoItem[];
  /** 4 = wedding/crafts, 4 = price, 2 = occasion large */
  columnsClass: string;
  tall?: boolean;
};

export function HomePromoGrid({ title, items, columnsClass, tall }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="w-full bg-white py-10">
      <div className="mb-8 px-6 text-center">
        <h2 className="text-xl font-semibold text-foreground md:text-3xl">{title}</h2>
      </div>
      <div className={`grid gap-5 px-6 ${columnsClass}`}>
        {items.map((item) => {
          const inner = (
            <>
              <div className="relative overflow-hidden rounded-xl bg-surface">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full object-cover object-[center_top] transition duration-500 group-hover:scale-105 ${
                    tall ? "h-[550px]" : "h-[400px]"
                  }`}
                />
                {!tall ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)/60] via-transparent to-transparent" />
                    <h3 className="absolute bottom-8 left-5 max-w-[70%] break-words text-lg font-semibold leading-tight text-white transition-all duration-300 group-hover:bottom-12 md:text-xl">
                      {item.title}
                    </h3>
                    <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition duration-300 group-hover:rotate-[-30deg]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />
                    <div className="absolute bottom-16 left-0 right-0 text-center">
                      <h3 className="text-5xl text-white">{item.title}</h3>
                    </div>
                  </>
                )}
              </div>
            </>
          );

          return (
            <div key={item.id} className="group">
              {item.linkUrl ? (
                <OutOrInLink href={item.linkUrl} className="group block">
                  {inner}
                </OutOrInLink>
              ) : (
                <div className="group cursor-default">{inner}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
