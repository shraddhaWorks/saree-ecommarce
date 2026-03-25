"use client";

const priceData = [
  {
    img: "/img1.webp",
  },
  {
    img: "/img2.webp",
  },
  {
    img: "/img3.webp",
  },
  {
    img: "/img4.webp",
  },
];

export default function ShopByPrice() {
  return (
    <div className="w-full pt-24 md:pt-32 pb-16 px-4 md:px-6 bg-white">
      
      <h2 className="text-3xl text-center font-semibold mb-6">
        Shop by Price
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[1400px] mx-auto">
        {priceData.map((item, index) => (
          <div key={index} className="block group">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src={item.img}
                alt={`price-${index}`}
                className="w-full aspect-[3/4] transition-transform duration-300 group-hover:scale-105 object-cover"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}