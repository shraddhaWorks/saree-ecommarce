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
    <div className="w-full py-10 px-4 bg-white">
      
      <h2 className="text-3xl text-center font-semibold mb-6">
        Shop by Price
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {priceData.map((item, index) => (
          <div key={index} className="block group">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src={item.img}
                alt={`price-${index}`}
                className="w-full h-[400px]  transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}