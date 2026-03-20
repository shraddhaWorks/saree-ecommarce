"use client";

export default function AboutUs() {
  return (
    <section className="w-full py-10 px-4 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT IMAGE - FULL COVER */}
        <div className="w-full h-full">
          <img
            src="/7_About_Us_Banner.webp"
            alt="About Us"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex items-center justify-center px-6 sm:px-12 lg:px-16">
          <div className="max-w-lg">

            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              About Us
            </h2>

            <p className="text-gray-700 leading-7 mb-6">
              <span className="font-semibold">Rangam Adhi</span> (A Division of
              MARGADARSI MARKETING PRIVATE LIMITED) is acclaimed for the exclusive
              collection of Indian artefacts, handcrafted furniture, traditional
              sarees, ethnic ladies wear and hand-looms material. It’s a journey
              of discovery into centuries old traditions. It’s a tribute to Art,
              and a celebration of beauty.
            </p>

            <p className="text-gray-700 leading-7 mb-8">
              Kalanjali is a Retail chain store consisting of 5 showrooms with
              presence in two southern states of India (Andhra Pradesh and Telangana).
            </p>

            <button className="border border-[#8f2333] px-6 py-3 rounded-md hover:bg-[#8f2333] hover:text-white transition">
              Know More
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}