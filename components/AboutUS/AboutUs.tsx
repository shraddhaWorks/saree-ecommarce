"use client";

export default function AboutUs() {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] gap-8">
                <div className="w-full h-full min-h-[300px] sm:min-h-[400px] overflow-hidden">
                    <img
                        src="https://kalanjali.com/cdn/shop/files/7_About_Us_Banner.png?v=1764650631&width=1080"
                        alt="About Us"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex items-center justify-center p-8 sm:p-16">
                    <div className="max-w-lg">

                        {/* TITLE */}
                        <h2 className="text-4xl font-semibold mb-6">
                            About Us
                        </h2>

                        {/* CONTENT */}
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

                        {/* BUTTON */}
                        <button className="border border-gray-400 px-6 py-3 rounded-md hover:bg-black hover:text-white transition">
                            Know More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}