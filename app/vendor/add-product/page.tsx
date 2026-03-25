"use client";

import { useState } from "react";
import Footer from "@/components/footer/Footer";

const BRANDS = [
    "Nalli",
    "Meena Bazaar",
    "FabIndia",
    "Biba",
    "W for Woman",
    "Global Desi",
    "Indya",
    "Kalanjali",
    "Other",
];

const FABRICS = [
    "Pure Silk",
    "Banarasi Silk",
    "Handloom Cotton",
    "Chiffon",
    "Georgette",
    "Linen",
    "Organza",
    "Paithani Silk",
    "Other",
];

const DESIGNS = [
    "Wedding & Bridal",
    "Festive Wear",
    "Daily / Casual Wear",
    "Party Wear",
    "Office / Formal Wear",
    "Traditional Hand-woven",
    "Printed Floral",
];

const CATEGORIES = [
    "Traditional",
    "Wedding",
    "Designer & Party Wear",
    "Festive Wear",
    "Casual & Workwear",
    "Dhoti & Kanduva"
];

const COLORS = [
    "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange", "Black", "White", "Gold", "Silver", "Multicolor"
];

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        originalPrice: "",
        description: "",
        stock: "1",
        brand: "",
        fabric: "",
        design: "",
        category: "",
        color: "",
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setImageFiles((prev) => [...prev, ...files]);
            
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newProduct = {
            id: `custom-${Date.now()}`,
            title: formData.title,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice) || undefined,
            description: formData.description,
            stock: Number(formData.stock),
            brand: formData.brand,
            fabric: formData.fabric,
            occasion: formData.design,
            category: formData.category,
            color: formData.color,
            images: imagePreviews.length > 0 ? imagePreviews : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"], // fallback image
            rating: 5,
            reviewsCount: 1
        };

        const existing = JSON.parse(localStorage.getItem('customProducts') || '[]');
        localStorage.setItem('customProducts', JSON.stringify([...existing, newProduct]));

        console.log("Product Saved to localStorage: ", newProduct);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        // Reset form realistically
        setFormData({
            title: "", price: "", originalPrice: "", description: "", stock: "1",
            brand: "", fabric: "", design: "", category: "", color: ""
        });
        setImageFiles([]);
        setImagePreviews([]);
    };

    return (
        <main className="min-h-screen bg-[#f7f0e7]">
            <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
                    <h1 className="text-3xl font-semibold mb-2">Upload Saree Product</h1>
                    <p className="text-gray-500 mb-8">Add a new saree to your catalog. Fill out the details below.</p>

                    {isSubmitted && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-3">
                            <span className="font-medium">Success!</span>
                            Product has been successfully added to your catalog.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title & Price */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 border-b pb-2">Basic Info</label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Saree Name / Title (e.g. Kanchipuram Silk Saree)"
                                    className="w-full border rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-[#9d2936] focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Selling Price (₹)"
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition"
                                />
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleChange}
                                    placeholder="Original Price (₹) (Optional)"
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Dropdowns for Filter Criteria */}
                        <div className="pt-4 space-y-4">
                            <label className="block text-sm font-medium mb-1 border-b pb-2">Categorization & Filters</label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Category</label>
                                    <select
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition appearance-none bg-white"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {CATEGORIES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Color</label>
                                    <select
                                        required
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition appearance-none bg-white"
                                    >
                                        <option value="" disabled>Select Color</option>
                                        {COLORS.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Brand</label>
                                    <select
                                        required
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition appearance-none bg-white"
                                    >
                                        <option value="" disabled>Select Brand</option>
                                        {BRANDS.map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Type of Cloth / Fabric</label>
                                    <select
                                        required
                                        name="fabric"
                                        value={formData.fabric}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition appearance-none bg-white"
                                    >
                                        <option value="" disabled>Select Fabric</option>
                                        {FABRICS.map(f => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Design / Occasion</label>
                                    <select
                                        required
                                        name="design"
                                        value={formData.design}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition appearance-none bg-white"
                                    >
                                        <option value="" disabled>Select Design</option>
                                        {DESIGNS.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Inventory & Media */}
                        <div className="pt-4 space-y-4">
                            <label className="block text-sm font-medium mb-1 border-b pb-2">Inventory & Media</label>
                            
                            <div className="grid grid-cols-4 gap-4 mt-2">
                                <div className="col-span-1">
                                    <input
                                        required
                                        type="number"
                                        name="stock"
                                        min="1"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="Stock"
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <div className="relative border-2 border-dashed border-[#9d2936]/30 bg-[#9d2936]/5 rounded-xl p-6 text-center hover:bg-[#9d2936]/10 transition duration-300 cursor-pointer flex flex-col items-center justify-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <svg className="w-8 h-8 text-[#9d2936] mb-2 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        <span className="text-[15px] text-[#9d2936] font-medium">Click or drag images to upload</span>
                                    </div>
                                    
                                    {imagePreviews.length > 0 && (
                                        <div className="flex gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar">
                                            {imagePreviews.map((src, idx) => (
                                                <div key={idx} className="relative shrink-0 group">
                                                    <img src={src} className="w-20 h-24 object-cover rounded-lg border border-gray-200 shadow-sm" alt="Preview" />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeImage(idx)} 
                                                        className="absolute -top-2 -right-2 bg-white border border-gray-100 text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 pointer-events-auto"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a gorgeous description for your saree..."
                                rows={4}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#9d2936] outline-none transition resize-none"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#9d2936] text-white py-4 rounded-xl font-medium hover:bg-[#7c1f29] transition-colors shadow-sm"
                            >
                                Publish Saree
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}

