"use client";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Package, User } from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Бараа + сагсыг ачаална + 10 секунд тутам шинэчлэгдэнэ
  const loadData = () => {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const approved = allProducts.filter((p) => p.status === "approved");
    setProducts(approved);

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Сагсанд нэмэх
  const addToCart = (product) => {
    const newCart = [...cart, { ...product, qty: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${product.productType || product.title} сагсанд нэмэгдлээ!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Гарчиг + Сагсны линк */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-5xl font-black text-gray-800 dark:text-white">
            Бүтээгдэхүүнүүд
          </h1>

          {/* ШИНЭ: Тусдаа /cart хуудас руу явна */}
          <Link
            href="/cart"
            className="flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl shadow-2xl text-2xl font-bold hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            <ShoppingCart className="w-10 h-10" />
            Сагс: <span className="text-yellow-300 ml-2">{cart.length}</span>
          </Link>
        </div>

        {/* Бараа байхгүй бол */}
        {products.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-dashed border-gray-300">
            <Package className="w-32 h-32 mx-auto text-gray-400 mb-8" />
            <p className="text-4xl font-bold text-gray-700 dark:text-gray-300">
              Одоогоор баталгаажсан бараа алга байна
            </p>
            <p className="text-xl text-gray-500 mt-6">
              Малчингууд удахгүй шинэ бүтээгдэхүүн оруулна!
            </p>
          </div>
        ) : (
          /* Барааны жагсаалт */
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700"
              >
                {/* Зураг */}
                <div className="relative h-64 bg-gray-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.productType || p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <Package className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {p.herderName || "Малчин"}
                  </div>
                </div>

                {/* Мэдээлэл */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {p.productType || p.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {p.animal && `${p.animal} → `}
                    {p.productType}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-black text-emerald-600">
                      {p.price.toLocaleString()}₮
                    </p>
                  </div>

                  {/* Сагсанд нэмэх */}
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xl py-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="w-7 h-7" />
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