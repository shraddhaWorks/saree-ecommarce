"use client";

const occasionData = [
  {
    title: "Festive",
    img: "/img5.webp",  // your public folder path
    
  },
  {
    title: "Wedding",
    img: "/img6.webp",
    
  },
   {
    title: "Casual",
    img: "/img7.webp",
    
  },
   {
    title: "Party",
    img: "/img8.webp",
    
  },
];

export default function ShopByOccausion() {
  return (
    <div className="w-full py-12 px-4 bg-white">
      
      {/* Heading */}
      <h2 className="text-center text-3xl font-semibold mb-8">
        Shop by Occasion
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {occasionData.map((item, index) => (
          <a key={index}  className="relative group overflow-hidden rounded-xl">
            
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[550px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300"></div>

            {/* Text */}
            <div className="absolute bottom-15 left-0 right-0 text-center ">
              <h3 className="text-white text-5xl">
                {item.title}
              </h3>
            </div>

          </a>
        ))}
      </div>

    </div>
  );
}