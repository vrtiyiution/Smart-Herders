"use client";

import { useState } from "react";

const animalTypes = [
  { value: "cow", label: "Үхэр" },
  { value: "sheep", label: "Хонь" },
  { value: "goat", label: "Ямаа" },
  { value: "horse", label: "Адуу" },
  { value: "camel", label: "Тэмээ" },
];

// Ямар ч төрөл заахгүй – зөвхөн энгийн object
const meatTypes = {
  cow: ["Үхрийн мах", "Ястай мах", "Дотор мах", "Өөхтэй мах"],
  sheep: ["Хонины мах", "Ястай мах", "Дотор мах", "Өөх"],
  goat: ["Ямааны мах", "Ястай мах", "Дотор мах"],
  horse: ["Адууны мах", "Ястай мах"],
  camel: ["Тэмээний мах", "Ястай мах", "Бөх"],
};

export default function HerderDashboard() {
  const [animal, setAnimal] = useState("cow");
  const [meatType, setMeatType] = useState(meatTypes.cow[0]);

  return (
    <>
      {/* ТАБ МЕНЮ */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="flex flex-wrap gap-4 justify-center border-b border-border pb-8">
          {["МАХ", "ЦАГААН ИДЭЭ", "АМЬД МАЛ", "АРЬС ШИР"].map((tab) => (
            <button
              key={tab}
              className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all ${
                tab === "МАХ"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white scale-105 shadow-lg"
                  : "bg-card text-primary border-2 border-border hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* МАХ ОРУУЛАХ ФОРМ */}
      <div className="max-w-4xl mx-auto mt-12 px-4 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
          Малчны самбар – Мах оруулах
        </h2>

        <div className="space-y-10 bg-card rounded-3xl p-10 shadow-2xl">
          {/* Амьтны төрөл */}
          <div>
            <label className="block text-2xl font-bold mb-6 text-blue-400">Амьтны төрөл</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
              {animalTypes.map((a) => (
                <button
                  key={a.value}
                  onClick={() => {
                    setAnimal(a.value);
                    setMeatType(meatTypes[a.value][0]);
                  }}
                  className={`py-6 rounded-2xl font-bold text-xl transition-all transform ${
                    animal === a.value
                      ? "bg-blue-600 text-white shadow-xl scale-110"
                      : "bg-gray-200 dark:bg-gray-800 text-primary border-2 border-border hover:scale-105"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Махны төрөл */}
          <div>
            <label className="block text-2xl font-bold mb-6 text-green-400">Махны төрөл</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {meatTypes[animal].map((type) => (
                <button
                  key={type}
                  onClick={() => setMeatType(type)}
                  className={`py-6 rounded-2xl font-medium text-lg transition-all ${
                    meatType === type
                      ? "bg-green-600 text-white shadow-xl ring-4 ring-green-400 ring-opacity-60"
                      : "bg-gray-200 dark:bg-gray-800 text-primary border-2 border-border hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Барааны нэр – автоматаар */}
          <div>
            <label className="block text-lg font-semibold mb-3">Барааны нэр</label>
            <input
              type="text"
              value={meatType}
              readOnly
              className="w-full px-8 py-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-2xl font-bold text-center cursor-not-allowed"
            />
          </div>

          {/* Тайлбар */}
          <div>
            <label className="block text-lg font-semibold mb-3">Дэлгэрэнгүй тайлбар</label>
            <textarea
              rows={5}
              placeholder="Жишээ: 18 сартай, органик тэжээлтэй, тал хээрт өссөн..."
              className="w-full px-6 py-5 rounded-2xl border-2 border-border focus:border-blue-500 focus:outline-none resize-none text-lg"
            />
          </div>

          {/* Үнэ + Илгээх */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
            <div>
              <label className="block text-lg font-semibold mb-3">Үнэ (₮ / кг)</label>
              <input
                type="number"
                placeholder="150000"
                className="w-full px-6 py-6 rounded-2xl border-2 border-border focus:border-blue-500 focus:outline-none text-2xl font-bold text-center"
              />
            </div>
            <button className="py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-2xl transform hover:scale-105">
              Админд илгээх
            </button>
          </div>
        </div>
      </div>
    </>
  );
}