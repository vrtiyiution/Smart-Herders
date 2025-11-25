// app/(protected)/admin/page.js   ← ЯГ ИЙМ БОЛГООД ХУУЛЧИХ!
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  // Энд useAuth, router, шалгалт гэх мэт ЯМАР Ч redirect байхгүй!
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(all.filter((p) => p.status === "pending"));
  }, []);

  const approve = (id) => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = all.map((p) =>
      p.id === id ? { ...p, status: "approved" } : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated.filter((p) => p.status === "pending"));
  };

  const reject = (id) => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = all.map((p) =>
      p.id === id ? { ...p, status: "rejected" } : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated.filter((p) => p.status === "pending"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Админы самбар – Хүлээгдэж буй бараанууд
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <p className="text-2xl text-gray-600">
              Одоогоор хүлээгдэж буй бараа алга байна
            </p>
            <p className="text-gray-500 mt-4">
              Малчингууд шинэ бараа оруулахыг хүлээж байна
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-xl p-8 border-4 border-yellow-300 hover:border-yellow-400 transition"
              >
                <h3 className="text-2xl font-bold text-gray-900">{p.title}</h3>
                <p className="text-lg text-gray-600 mt-2">
                  Малчин: <span className="font-semibold">{p.herderName}</span>
                </p>
                <p className="text-3xl font-bold text-green-600 mt-4">
                  {p.price.toLocaleString()}₮
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">{p.desc}</p>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => approve(p.id)}
                    className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition font-bold text-lg"
                  >
                    Зөвшөөрөх
                  </button>
                  <button
                    onClick={() => reject(p.id)}
                    className="flex-1 bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition font-bold text-lg"
                  >
                    Татгалзах
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
