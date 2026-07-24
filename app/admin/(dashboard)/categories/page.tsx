"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/auth-client";

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  async function loadCategories() {
    setLoading(true);

    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setCategories(data.categories ?? []);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function saveCategory() {
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        const res = await fetch(`/api/categories/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            name,
            slug,
            description,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Update failed");
          setSaving(false);
          return;
        }
      } else {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            name,
            slug,
            description,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Create failed");
          setSaving(false);
          return;
        }
      }

      setName("");
      setSlug("");
      setDescription("");
      setEditingId(null);

      loadCategories();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (res.ok) {
      loadCategories();
    } else {
      const data = await res.json();
      alert(data.error ?? "Delete failed");
    }
  }

  function editCategory(category: Category) {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description ?? "");
  }

  return (
    <main className="space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>
      </div>

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-lg font-semibold">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        {error && (
          <p className="mb-4 text-red-600">
            {error}
          </p>
        )}

        <div className="grid gap-4">

          <input
            placeholder="Category Name"
            className="rounded-lg border p-3"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (!editingId) {
                setSlug(slugify(e.target.value));
              }
            }}
          />

          <input
            placeholder="Slug"
            className="rounded-lg border p-3"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
          />

          <textarea
            placeholder="Description"
            className="rounded-lg border p-3"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3">

            <button
              onClick={saveCategory}
              disabled={saving}
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Category"
                : "Create Category"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setSlug("");
                  setDescription("");
                }}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>
            )}
          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white">

        <table className="w-full">

          <thead className="border-b bg-zinc-100">

            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Slug
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-right">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {category.name}
                  </td>

                  <td className="p-4">
                    {category.slug}
                  </td>

                  <td className="p-4">
                    {category.description}
                  </td>

                  <td className="p-4 text-right space-x-3">

                    <button
  onClick={() => {
    console.log(category);
    editCategory(category);
  }}
  className="text-blue-600 hover:underline"
>
  Edit
</button>

                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}