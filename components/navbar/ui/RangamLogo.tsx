import Image from "next/image";

export function RangamLogo() {
    return (
        <div className="flex items-center">
            <Image
                src="/WhatsApp_Image_2025-06-02_at_12_39_05_PM-removebg-preview.png"
                alt="Rangam The Fashion House"
                width={190}
                height={190}
                priority
                className="h-[72px] w-auto object-contain sm:h-[84px]"
            />
        </div>
    );
}
