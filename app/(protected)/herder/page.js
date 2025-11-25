// app/(protected)/herder/page.js   ← ЯГ ИЙМ БОЛГООД ХУУЛЧИХААРАЙ!
"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function HerderDashboard() {
  const { user } = useAuth(); // ← зөвхөн нэр харуулах эсвэл хэрэглэхэд л ашиглана
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("мах");

  const handleSubmit = (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const newProduct = {
      id: Date.now().toString(),
      title,
      desc,
      price: Number(price),
      category,
      herderId: user.id,
      herderName: user.name,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Бараа амжилттай илгээлээ! Админ баталгаажуулахыг хүлээнэ үү.");

    // Формыг цэвэрлэх
    setTitle("");
    setDesc("");
    setPrice("");
    setCategory("мах");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Малчны самбар – Бараа оруулах
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Барааны нэр
            </label>
            <input
              required
              placeholder="Жишээ: 100% органик хонины мах"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none transition text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Дэлгэрэнгүй тайлбар
            </label>
            <textarea
              required
              placeholder="Малын нас, тэжээл, гарал үүсэл, онцлог..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none transition text-lg h-40 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Үнэ (₮)
              </label>
              <input
                required
                type="number"
                placeholder="150000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none transition text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Ангилал
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none transition text-lg"
              >
                <option value="мах">Мах</option>
                <option value="сүү">Сүү, цагаан идээ</option>
                <option value="ноос">Ноос, арьс шир</option>
                <option value="бусад">Бусад</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-xl hover:bg-black transition font-bold text-xl shadow-lg hover:shadow-2xl"
          >
            Админд илгээх
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p>Таны оруулсан бараа админы баталгаажуулалтыг хүлээнэ.</p>
          <p className="mt-2">Баталгаажвал хэрэглэгчдэд харагдах болно!</p>
        </div>
      </div>
    </div>
  );
}
