// app/(protected)/customer/page.js   ← ЯГ ИЙМ БОЛГООД ХУУЛЧИХААРАЙ!
"use client";

import { useAuth } from "../../context/AuthContext"; // ← зөвхөн хэрэглэгчийн нэр харуулахад л хэрэглэнэ
import { useState, useEffect } from "react";

export default function CustomerDashboard() {
  const { user } = useAuth(); // ← Хэрэглэгчийн мэдээлэл (жишээ нь: "Бат (Хэрэглэгч)" гэж navbar-д харуулахад хэрэглэнэ)
  const [products, setProducts] = useState([]); // ← Баталгаажсан бүх барааг энд хадгална
  const [cart, setCart] = useState([]); // ← Хэрэглэгчийн сагс

  // Нэг удаа л localStorage-оос бараа, сагсыг ачаална
  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(allProducts.filter((p) => p.status === "approved"));

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сагсанд нэмэх функц
  const addToCart = (product) => {
    const newCart = [...cart, { ...product, qty: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${product.title} сагсанд нэмэгдлээ!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Хуудасны гарчиг + Сагсны тоо */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Бүтээгдэхүүнүүд</h1>
          <div className="bg-gray-900 text-white px-8 py-4 rounded-xl text-2xl font-bold shadow-lg flex items-center gap-3">
            Сагс <span className="text-yellow-400">{cart.length}</span>
          </div>
        </div>

        {/* Барааны жагсаалт */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <p className="text-3xl text-gray-600 font-medium">
              Одоогоор баталгаажсан бараа алга байна
            </p>
            <p className="text-gray-500 mt-4 text-lg">
              Малчингууд удахгүй шинэ бараа оруулна!
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3"
              >
                {/* Зурагны placeholder */}
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-64 flex items-center justify-center border-b-4 border-dashed border-gray-400">
                  <span className="text-gray-600 font-medium text-lg">
                    Зураг удахгүй...
                  </span>
                </div>

                {/* Барааны мэдээлэл */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-lg text-gray-600 mt-2">
                    Малчин:{" "}
                    <span className="font-semibold">{p.herderName}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {p.category === "мах"
                      ? "Мах"
                      : p.category === "сүү"
                      ? "Сүү, цагаан идээ"
                      : p.category}
                  </p>

                  <p className="text-4xl font-bold text-green-600 mt-6">
                    {p.price.toLocaleString()}₮
                  </p>

                  {/* Сагсанд нэмэх товч */}
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full mt-8 bg-gray-900 text-white py-5 rounded-xl hover:bg-black transition font-bold text-xl shadow-md hover:shadow-xl"
                  >
                    Сагсанд нэмэх
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
