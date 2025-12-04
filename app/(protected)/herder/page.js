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
  cow: ["Тугал", "Бяруу", "Хязаалан", "Соёолон", "Бух", "Үнээ"],
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
    shadow: "shadow-orange-200 dark:shadow-orange-900",
    data: meatTypes,
    label: "Махны төрөл",
  },
  {
    id: "dairy",
    title: "Сүү, сүүн бүтээгдэхүүн",
    icon: Milk,
    color: "from-blue-400 to-cyan-600",
    shadow: "shadow-blue-200 dark:shadow-blue-900",
    data: dairyTypes,
    label: "Бүтээгдэхүүний төрөл",
  },
  {
    id: "hides",
    title: "Арьс, шир, ноолуур",
    icon: Scissors,
    color: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-200 dark:shadow-amber-900",
    data: hideTypes,
    label: "Түүхий эдийн төрөл",
  },
  {
    id: "live",
    title: "Амьд мал",
    icon: PawPrint,
    color: "from-green-500 to-emerald-600",
    shadow: "shadow-green-200 dark:shadow-green-900",
    data: liveTypes,
    label: "Малын нас / хүйс",
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

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setAnimal("cow");
    const category = categories.find((c) => c.id === catId);
    if (category?.data?.cow?.length > 0) {
      setProductType(category.data.cow[0]);
    } else {
      setProductType("");
    }
  };

  const handleAnimalChange = (newAnimal) => {
    setAnimal(newAnimal);
    const category = categories.find((c) => c.id === selectedCategory);
    if (category?.data?.[newAnimal]?.length > 0) {
      setProductType(category.data[newAnimal][0]);
    } else {
      setProductType("");
    }
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
    if (!productType || !price || !desc || !image) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      title: `${animal} - ${productType}`,
      herderName: "Малчин Баяраа",
      animal,
      productType,
      image,
      desc,
      price: Number(price),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("products") || "[]");
    existing.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existing));

    setSuccessMessage(
      "Админд амжилттай илгээгдлээ. Таны постыг админ зөвшөөрсний дараа нийтлэгдэнэ."
    );

    setTimeout(() => setSuccessMessage(""), 3000);

    // Форм цэвэрлэх
    setSelectedCategory(null);
    setAnimal("cow");
    setProductType("");
    setImage(null);
    setDesc("");
    setPrice("");
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  // Эхний хуудас - ангилал сонгох
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        {successMessage && (
          <div className="mb-6 px-6 py-4 bg-green-600 text-white text-lg font-medium rounded-2xl shadow-lg">
            {successMessage}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
          Та юу зарах вэ?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`group relative overflow-hidden rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 ${cat.shadow}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <cat.icon className="w-20 h-20 drop-shadow-lg group-hover:rotate-12 transition" />
                <span className="text-2xl md:text-3xl font-bold text-center">
                  {cat.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Дараагийн хуудас - ангилал сонгогдсон үед
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8">

        {successMessage && (
          <div className="mb-6 px-6 py-4 bg-green-600 text-white text-lg font-medium rounded-2xl shadow-lg text-center">
            {successMessage}
          </div>
        )}

        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Буцах</span>
        </button>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          {currentCategory?.title} оруулах
        </h2>

        {/* ЭНД ТАНЫ ХУУЧИН UI ЯГ ТАЛБАРТАЙГАА ХАМТ ИДЭВХЖЛЭЭ! */}

        {/* Малын төрөл */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Малын төрөл сонгоно уу</h3>
          <div className="grid grid-cols-3 gap-4">
            {(selectedCategory === "dairy" ? animalTypesForDairy : animalTypes).map((a) => (
              <button
                key={a.value}
                onClick={() => handleAnimalChange(a.value)}
                className={`py-4 rounded-xl font-medium transition-all ${animal === a.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                  }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Бүтээгдэхүүний төрөл */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">{currentCategory?.label}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(currentCategory?.data?.[animal] || []).map((type) => (
              <button
                key={type}
                onClick={() => setProductType(type)}
                className={`py-4 rounded-xl font-medium transition-all ${productType === type
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Үнэ, тайлбар, зураг */}
        <div className="space-y-6">
          <input
            type="number"
            placeholder="Үнэ (₮)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-lg"
          />

          <textarea
            placeholder="Нэмэлт тайлбар (заавал биш)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-lg resize-none"
          />

          <label className="block">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <div className="border-4 border-dashed border-gray-400 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500 transition">
              {image ? (
                <img src={image} alt="Оруулсан зураг" className="mx-auto max-h-64 rounded-xl" />
              ) : (
                <div>
                  <Upload className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <p className="text-xl font-bold">Зураг оруулах</p>
                </div>
              )}
            </div>
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl transition transform hover:scale-105"
          >
            АДМИНД ИЛГЭЭХ
          </button>
        </div>
      </div>
    </div>
  );
}