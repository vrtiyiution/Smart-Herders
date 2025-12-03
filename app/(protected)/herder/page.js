"use client";

import { useState } from "react";
import {
  Upload,
  X,
  Beef,
  Milk,
  Scissors,
  PawPrint,
  ArrowLeft,
  Check,
  Camera,
} from "lucide-react";

const animalTypes = [
  { value: "cow", label: "Үхэр" },
  { value: "sheep", label: "Хонь" },
  { value: "horse", label: "Адуу" },
  { value: "goat", label: "Ямаа" },
  { value: "camel", label: "Тэмээ" },
];

const animalTypesForDairy = [
  { value: "cow", label: "Үнээ" },
  { value: "sheep", label: "Хонь" },
  { value: "horse", label: "Гүү" },
  { value: "goat", label: "Ямаа" },
  { value: "camel", label: "Ингэ" },
];

const meatTypes = {
  cow: ["Үхрийн цул мах", "Ястай мах", "Яс", "Таван цул"],
  sheep: ["Хонины цул мах", "Ястай мах", "Яс", "Таван цул"],
  goat: ["Ямааны цул мах", "Ястай мах", "Яс", "Таван цул"],
  horse: ["Адууны цул мах", "Ястай мах", "Яс", "Таван цул"],
  camel: ["Тэмээний цул", "Ястай мах", "Яс", "Таван цул"],
};

const dairyTypes = {
  cow: ["Сүү", "Тараг", "Өрөм", "Ааруул", "Ээзгий", "Цөцгий", "Аарц", "Бяслаг"],
  sheep: ["Сүү", "Тараг", "Өрөм", "Ааруул", "Цагаан тос", "Аарц", "Бяслаг"],
  goat: ["Сүү", "Тараг", "Өрөм", "Ааруул", "Ээзгий", "Аарц", "Бяслаг"],
  horse: ["Айраг", "Саам"],
  camel: ["Хоормог", "Ааруул", "Сүү", "Аарц"],
};

const hideTypes = {
  cow: ["Үхрийн шир", "Хөөвөр"],
  sheep: ["Нэхий", "Ноос"],
  goat: ["Ямааны арьс", "Ноолуур"],
  horse: ["Адууны шир", "Дэл", "Сүүл"],
  camel: ["Тэмээний шир", "Ноос"],
};

const liveTypes = {
  cow: ["Тугал", "Бяруу", "Хязаалан", "Соёолон", "Бүдүүн үхэр", "Үнээ"],
  sheep: ["Хурга", "Төлөг", "Хонь", "Хуц"],
  goat: ["Ишиг", "Борлон", "Ямаа", "Ухна"],
  horse: ["Унага", "Даага", "Үрээ", "Гүү", "Азарга", "Морь"],
  camel: ["Ботго", "Тором", "Ат", "Ингэ", "Буур"],
};

const categories = [
  {
    id: "meat",
    title: "Мах, махан бүтээгдэхүүн",
    icon: Beef,
    color: "from-orange-500 to-red-600",
    data: meatTypes,
    label: "Махны төрөл",
  },
  {
    id: "dairy",
    title: "Сүү, сүүн бүтээгдэхүүн",
    icon: Milk,
    color: "from-blue-400 to-cyan-600",
    data: dairyTypes,
    label: "Бүтээгдэхүүний төрөл",
  },
  {
    id: "hides",
    title: "Арьс, шир, ноолуур",
    icon: Scissors,
    color: "from-amber-500 to-yellow-600",
    data: hideTypes,
    label: "Түүхий эдийн төрөл",
  },
  {
    id: "live",
    title: "Амьд мал",
    icon: PawPrint,
    color: "from-green-500 to-emerald-600",
    data: liveTypes,
    label: "Малын нас/хүйс",
  },
];

export default function HerderDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animal, setAnimal] = useState("cow");
  const [productType, setProductType] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setAnimal("cow");
    const firstOption = currentCategory?.data?.cow?.[0] || "";
    setProductType(firstOption);
  };

  const handleAnimalChange = (newAnimal) => {
    setAnimal(newAnimal);
    const options = currentCategory?.data?.[newAnimal] || [];
    setProductType(options[0] || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !animal || !productType || !price || !image || !desc) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      herderName: "Малчин Баяраа",
      animal,
      productType,
      image,
      desc,
      price: Number(price),
      status: "pending",
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("products") || "[]");
    existing.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existing));

    setSuccessMessage("Амжилттай илгээгдлээ! Админ зөвшөөрсний дараа нийтлэгдэнэ");

    setTimeout(() => {
      setSuccessMessage("");
      setSelectedCategory(null);
      setAnimal("cow");
      setProductType("");
      setImage(null);
      setDesc("");
      setPrice("");
    }, 3000);
  };

  // Хэрэв ямар ч ангилал сонгоогүй бол → эхний хуудас
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black flex flex-col items-center justify-center p-6">
        {successMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-5 bg-green-600 text-white text-xl font-bold rounded-2xl shadow-2xl animate-pulse">
            {successMessage}
          </div>
        )}

        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-gray-800 dark:text-white">
          Та юу зарах вэ?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group relative overflow-hidden rounded-3xl h-72 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-4"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-8">
                <cat.icon className="w-28 h-28 mb-6 drop-shadow-2xl group-hover:scale-110 transition" />
                <h3 className="text-3xl md:text-4xl font-black text-center">{cat.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Ангилал сонгогдсон үед → форм харагдана
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {successMessage && (
          <div className="mb-8 px-8 py-5 bg-green-600 text-white text-xl font-bold rounded-2xl shadow-2xl text-center animate-bounce">
            {successMessage}
          </div>
        )}

        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-bold text-lg mb-8"
        >
          <ArrowLeft className="w-7 h-7" /> Буцах
        </button>

        <h2 className="text-4xl font-black text-center mb-10 text-gray-800 dark:text-white">
          {currentCategory.title} зарна уу
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">

          {/* Малын төрөл */}
          <div>
            <label className="block text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
              Малын төрөл
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {(selectedCategory === "dairy" ? animalTypesForDairy : animalTypes).map((a) => (
                <button
                  key={a.value}
                  onClick={() => handleAnimalChange(a.value)}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${animal === a.value
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Бүтээгдэхүүний төрөл */}
          <div>
            <label className="block text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
              {currentCategory.label}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(currentCategory.data[animal] || []).map((type) => (
                <button
                  key={type}
                  onClick={() => setProductType(type)}
                  className={`py-4 px-6 rounded-xl font-medium transition-all ${productType === type
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Үнэ */}
          <div>
            <label className="block text-lg font-bold mb-3 text-gray-700 dark:text-gray-300">
              Үнэ (төгрөгөөр)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Жишээ нь: 250000"
              className="w-full px-6 py-5 rounded-xl text-xl font-medium bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>

          {/* Тайлбар */}
          <div>
            <label className="block text-lg font-bold mb-3 text-gray-700 dark:text-gray-300">
              Нэмэлт тайлбар (заавал биш)
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              placeholder="Жишээ нь: Органик, шинэхэн, гэртээ хийсэн..."
              className="w-full px-6 py-5 rounded-xl text-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Зураг оруулах */}
          <div>
            <label className="block text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
              Зураг оруулах (заавал)
            </label>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="border-4 border-dashed border-gray-400 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 transition">
                {image ? (
                  <div className="space-y-4">
                    <img src={image} alt="Таны оруулсан" className="mx-auto max-h-80 rounded-xl shadow-xl" />
                    <p className="text-green-600 font-bold text-xl">Зураг амжилттай орууллаа!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-20 h-20 mx-auto text-gray-500" />
                    <p className="text-xl font-bold text-gray-600">Зураг сонгохын тулд энд дарна уу</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Илгээх товч */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-black text-2xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4"
          >
            <Check className="w-10 h-10" />
            АДМИНД ИЛГЭЭХ
          </button>
        </div>
      </div>
    </div>
  );
}