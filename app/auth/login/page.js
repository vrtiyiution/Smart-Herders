// app/auth/login/page.js   ← ЯГ ИЙМ БОЛГООД ХУУЛЧИХ!
"use client";

import { useAuth } from "../../context/AuthContext"; // ← зөв импорт!
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  // Хэрвээ аль хэдийн нэвтэрчихсэн бол шууд өөрийн хэсэг рүү шилжүүлнэ
  useEffect(() => {
    if (user) {
      const redirectPath =
        user.role === "herder"
          ? "/herder"
          : user.role === "admin"
          ? "/admin"
          : "/customer";

      router.replace(redirectPath); // replace = хойшоо буцах түүх үүсгэхгүй
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (login(email, password)) {
      // Амжилттай нэвтэрвэл useEffect автоматаар зөв хуудас руу шилжүүлнэ
      // Энд юу ч push хийх шаардлагагүй!
    } else {
      alert("И-мэйл эсвэл нууц үг буруу байна!");
    }
  };

  // Хэрвээ аль хэдийн нэвтэрчихсэн бол юу ч харуулах шаардлагагүй
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Шилжүүлж байна...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Нэвтрэх</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="email"
              type="email"
              required
              placeholder="И-мэйл хаяг"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Нууц үг"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-black transition text-lg font-medium"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
