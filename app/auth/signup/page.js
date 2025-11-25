// app/auth/signup/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultRole = searchParams.get("role") || "customer";
  const [role, setRole] = useState(defaultRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      id: Date.now().toString(),
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: role,
      phone: formData.get("phone") || "",
      address: formData.get("address") || "",
      location: formData.get("location") || "",
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү.");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Бүртгүүлэх</h1>

        <div className="flex gap-2 mb-6">
          {["herder", "customer", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-md text-sm font-medium border ${
                role === r ? "bg-gray-900 text-white" : "bg-gray-50"
              }`}
            >
              {r === "herder"
                ? "Малчин"
                : r === "customer"
                ? "Хэрэглэгч"
                : "Админ"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Овог нэр"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="И-мэйл"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="phone"
            placeholder="Утас"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Нууц үг"
            className="w-full px-3 py-2 border rounded-md"
          />

          {role === "herder" && (
            <input
              name="location"
              placeholder="Байршил (аймаг/сум)"
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
          {role === "customer" && (
            <input
              name="address"
              placeholder="Хүргэлтийн хаяг"
              className="w-full px-3 py-2 border rounded-md"
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-black"
          >
            Бүртгэл үүсгэх
          </button>
        </form>
      </div>
    </div>
  );
}
