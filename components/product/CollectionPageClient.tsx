"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/components/product/product";

interface CollectionPageClientProps {
    handle: string;
    initialProducts: Product[];
    title?: string;
    description?: string;
}

const getUniqueOptions = (products: Product[], key: keyof Product) => {
    const rawVals = products.map((p) => String(p[key])).filter(Boolean);
    return Array.from(new Set(rawVals));
};

export function CollectionPageClient({ handle, initialProducts, title, description }: CollectionPageClientProps) {
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedFabric, setSelectedFabric] = useState<string>("");
    const [selectedDesign, setSelectedDesign] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<string>("");
    const [selectedDiscount, setSelectedDiscount] = useState<string>("");
    const [customProducts, setCustomProducts] = useState<Product[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("customProducts");
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Product[];
                const h = handle.toLowerCase();
                const firstKeyword = h.split('-')[0];
                
                const matchedCustom = parsed.filter(p => {
                    const c = p.category?.toLowerCase() || "";
                    const f = p.fabric?.toLowerCase() || "";
                    const o = p.occasion?.toLowerCase() || "";
                    const t = p.title?.toLowerCase() || "";
                    const d = p.description?.toLowerCase() || "";
                    
                    // Match main keyword from handle
                    if (firstKeyword.length > 3 && (t.includes(firstKeyword) || f.includes(firstKeyword) || o.includes(firstKeyword) || d.includes(firstKeyword) || c.includes(firstKeyword))) {
                        return true;
                    }
                    
                    // Handle specific wedding/traditional overlaps
                    if (h.includes("bridal") || h.includes("haldi") || h.includes("reception") || h.includes("wedding") || h.includes("engagement")) {
                        if (c.includes("wedding") || o.includes("wedding") || o.includes("party")) return true;
                    }
                    if (h.includes("traditional") && c.includes("traditional")) return true;
                    
                    return false;
                });
                setCustomProducts(matchedCustom);
            } catch (e) {
                console.error("Failed to parse customProducts", e);
            }
        }
    }, [handle]);

    const combinedProducts = useMemo(() => {
        return [...customProducts, ...initialProducts];
    }, [initialProducts, customProducts]);

    const brands = getUniqueOptions(combinedProducts, "brand");
    const fabrics = getUniqueOptions(combinedProducts, "fabric");
    const designs = getUniqueOptions(combinedProducts, "occasion");
    const colors = getUniqueOptions(combinedProducts, "color");

    const filteredProducts = useMemo(() => {
        return combinedProducts.filter((p) => {
            if (selectedBrand && p.brand !== selectedBrand) return false;
            if (selectedFabric && p.fabric !== selectedFabric) return false;
            if (selectedDesign && p.occasion !== selectedDesign) return false;
            if (selectedColor && p.color !== selectedColor) return false;
            
            if (selectedPrice) {
                const [min, max] = selectedPrice.split("-").map(Number);
                if (p.price < min || p.price > max) return false;
            }
            if (selectedDiscount) {
                const minDiscount = Number(selectedDiscount);
            
                if ((p.discount || 0) < minDiscount) return false;
            }
            
            return true;
        });
    }, [combinedProducts, selectedBrand, selectedFabric, selectedDesign, selectedColor, selectedPrice, selectedDiscount]);

    // formatting the handle for display title
    const displayTitle = title || handle.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return (
        <div className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto min-h-screen">
            <h1 className="text-3xl md:text-5xl font-[Georgia,'Times New Roman',serif] font-semibold mb-4 text-center tracking-wide">{displayTitle}</h1>
            {description && (
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">{description}</p>
            )}

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 py-5 border-y border-gray-200">
                <div className="text-gray-500 font-medium whitespace-nowrap hidden md:block uppercase tracking-widest text-sm text-black/45">Filters</div>
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 items-center">
                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map((b) => <option key={b as string} value={b as string}>{b as string}</option>)}
                    </select>

                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedFabric}
                        onChange={(e) => setSelectedFabric(e.target.value)}
                    >
                        <option value="">All Cloth Types</option>
                        {fabrics.map((f) => <option key={f as string} value={f as string}>{f as string}</option>)}
                    </select>

                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedDesign}
                        onChange={(e) => setSelectedDesign(e.target.value)}
                    >
                        <option value="">All Designs</option>
                        {designs.map((d) => <option key={d as string} value={d as string}>{d as string}</option>)}
                    </select>

                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        <option value="">All Colors</option>
                        {colors.map((c) => <option key={c as string} value={c as string}>{c as string}</option>)}
                    </select>

                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                        <option value="">All Prices</option>
                        <option value="0-3000">Under ₹3000</option>
                        <option value="3000-6000">₹3000 - ₹6000</option>
                        <option value="6000-10000">₹6000 - ₹10000</option>
                        <option value="10000-999999">Above ₹10000</option>
                    </select>

                    <select
                        className="border border-gray-300 rounded-full px-5 py-2.5 bg-white min-w-[150px] outline-none focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936] appearance-none cursor-pointer transition-colors"
                        value={selectedDiscount}
                        onChange={(e) => setSelectedDiscount(e.target.value)}
                    >
                        <option value="">Any Discount</option>
                        <option value="10">10% or more</option>
                        <option value="20">20% or more</option>
                        <option value="30">30% or more</option>
                    </select>
                </div>
                {(selectedBrand || selectedFabric || selectedDesign || selectedColor || selectedPrice || selectedDiscount) && (
                    <button 
                        onClick={() => { setSelectedBrand(""); setSelectedFabric(""); setSelectedDesign(""); setSelectedColor(""); setSelectedPrice(""); setSelectedDiscount(""); }}
                        className="text-sm text-[#9d2936] underline underline-offset-2 whitespace-nowrap font-medium ml-auto md:ml-0 transition hover:text-[#7d202a]"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center rounded-2xl bg-[#fdfbf7] border border-gray-100 mt-4 shadow-sm animate-in fade-in">
                    <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-[Georgia,'Times New Roman',serif] text-black mb-3">No match found</h3>
                    <p className="text-gray-500 text-[15px] mb-6 max-w-sm mx-auto">Try adjusting your filters or clear them completely to see the collection's full range.</p>
                    <button onClick={() => { setSelectedBrand(""); setSelectedFabric(""); setSelectedDesign(""); setSelectedColor(""); setSelectedPrice(""); setSelectedDiscount(""); }} className="bg-[#9d2936] text-white px-6 py-2.5 rounded-full hover:bg-[#7d202a] transition-colors shadow-sm">
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}
