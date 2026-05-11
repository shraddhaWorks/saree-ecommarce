"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import { AccountSidebar } from "@/components/sidebar/account-sidebar";
import { WishlistView } from "@/components/wishlist/WishlistView";
import { getAccessToken, authHeaders } from "@/lib/auth-client";

interface UserProfile {
  user: { id: string; email: string };
  profile: { name?: string; phone?: string };
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  totalPaise: number;
  items: { product?: { name: string }; productName?: string }[];
}

interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  isDefault: boolean;
}

function decodeTokenSubject(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decoded = atob(padded);
    const parsed = JSON.parse(decoded) as { sub?: unknown };
    if (typeof parsed.sub !== "string" || !parsed.sub.trim()) return null;
    return parsed.sub;
  } catch {
    return null;
  }
}

function getAddressStorageKey(): string {
  if (typeof window === "undefined") return "user_addresses:guest";
  const token = window.localStorage.getItem("saree_access_token");
  const userId = token ? decodeTokenSubject(token) : null;
  return `user_addresses:${userId ?? "guest"}`;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = getAccessToken();
    if (!token) {
      router.push("/sign-in");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!mounted || !authorized) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Orders":
        return <OrdersTab />;
      case "Wishlist":
        return <WishlistTab />;
      case "Saved Addresses":
        return <AddressesTab />;
      case "Support":
        return <SupportTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-2xl font-semibold">My Account</h1>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AccountSidebar activeTab={activeTab} onSelect={setActiveTab} />
          </div>
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN");
}

function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me", { headers: authHeaders() });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border-soft bg-white p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      {profile ? (
        <div className="mt-4 space-y-2">
          <p>
            <strong>Email:</strong> {profile.user.email}
          </p>
          <p>
            <strong>Name:</strong> {profile.profile?.name || "Not set"}
          </p>
          <p>
            <strong>Phone:</strong> {profile.profile?.phone || "Not set"}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-black/60">Unable to load profile.</p>
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { headers: authHeaders() });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border-soft bg-white p-6">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold">Orders</h2>
      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-black/60">No orders yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-border-soft p-4">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(order.createdAt)}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> Rs. {(order.totalPaise / 100).toFixed(2)}
              </p>
              <p>
                <strong>Items:</strong>{" "}
                {order.items
                  .map((item) => item.product?.name ?? item.productName ?? "Unknown")
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistTab() {
  return (
    <div className="rounded-3xl border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold">Wishlist</h2>
      <div className="mt-4">
        <WishlistView />
      </div>
    </div>
  );
}

function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    // Load addresses from localStorage for the current user
    const stored = localStorage.getItem(getAddressStorageKey());
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Address[];
        setAddresses(parsed);
      } catch (err) {
        console.error("Failed to parse addresses", err);
      }
    }
    setLoading(false);
  }, []);

  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem(getAddressStorageKey(), JSON.stringify(newAddresses));
    setAddresses(newAddresses);
  };

  const handleChange = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const name = form.name.trim();
    const phone = form.phone.trim();
    const line1 = form.line1.trim();
    const city = form.city.trim();

    if (!name || !phone || !line1 || !city) {
      setError("Name, phone, address line, and city are required");
      return;
    }

    const newAddress: Address = {
      id: "addr-" + Date.now(),
      name,
      phone,
      line1,
      city,
      state: form.state.trim() || null,
      postalCode: form.postalCode.trim() || null,
      country: form.country,
      isDefault: form.isDefault,
    };

    let updatedAddresses = [...addresses];
    if (form.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({ ...addr, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    saveAddresses(updatedAddresses);

    setForm({
      name: "",
      phone: "",
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: false,
    });
  };

  const deleteAddress = (id: string) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    saveAddresses(updated);
  };

  return (
    <div className="rounded-3xl border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold">Saved Addresses</h2>
      {loading ? (
        <p className="mt-4 text-sm text-black/60">Loading addresses…</p>
      ) : addresses.length === 0 ? (
        <p className="mt-4 text-sm text-black/60">No saved addresses yet. Add one below.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-3xl border border-border-soft bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{address.name}</p>
                {address.isDefault ? (
                  <span className="rounded-full bg-black/10 px-2 py-1 text-xs">Default</span>
                ) : null}
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="text-red-600 text-sm underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-black/70">{address.phone}</p>
              <p className="text-sm text-black/70">
                {address.line1}, {address.city}
                {address.state ? `, ${address.state}` : ""}
                {address.postalCode ? `, ${address.postalCode}` : ""}
                {address.country ? `, ${address.country}` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="text-black/70">Name</span>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-black/70">Phone</span>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="text-black/70">Address line</span>
          <input
            value={form.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block text-sm">
            <span className="text-black/70">City</span>
            <input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-black/70">PIN</span>
            <input
              value={form.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-black/70">State</span>
            <input
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
          />
          Save this address as default
        </label>
        <button
          type="submit"
          className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Save address
        </button>
      </form>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="rounded-3xl border border-border-soft bg-white p-6">
      <h2 className="text-xl font-semibold">Support</h2>
      <p className="mt-4 text-sm text-black/60">Get help or contact us.</p>
    </div>
  );
}