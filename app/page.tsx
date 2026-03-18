import { FrontendBlueprintPage } from "@/features/storefront/frontend-blueprint-page";
import Carousel from "@/components/common/Carousel";

export default function Home() {
  const slides = [
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black" key="1">
      <img
        src="	https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 1"
        className="h-full w-full object-contain object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
    </div>,
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black" key="2">
      <img
        src="	https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 2"
        className="h-full w-full object-contain object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
    </div>,
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black" key="3">
      <img
        src="	https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 3"
        className="h-full w-full object-contain object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
    </div>,
  ];

  return (
    <div className="space-y-16 pt-[180px] lg:pt-[196px]">
      <div className="mx-auto w-[90vw] max-w-[100vw] px-4">
        <Carousel slides={slides} />
      </div>
      <FrontendBlueprintPage />

    </div>
  );
}
