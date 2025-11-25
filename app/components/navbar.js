// components/navbar.js   ← ЯГ ИЙМ БОЛГООД ХУУЛЧИХ БАС Л БОЛНО!
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Яг эндээс линкийн актив байдлыг тодорхойлно
  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      pathname === path
        ? "bg-gray-900 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Лого / Нүүр хуудас руу */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Smart Herder
        </Link>

        {/* Баруун талын хэсэг */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {/* Хэрэглэгчийн мэдээлэл */}
              <span className="text-sm text-gray-600 hidden sm:block">
                {user.name}{" "}
                <span className="text-xs">
                  (
                  {user.role === "herder"
                    ? "Малчин"
                    : user.role === "admin"
                    ? "Админ"
                    : "Хэрэглэгч"}
                  )
                </span>
              </span>

              {/* Миний самбар - ЯГ ЭНД ЗӨВ ЗАМААР ЯВНА!!! */}
              <Link
                href={
                  user.role === "herder"
                    ? "/herder"
                    : user.role === "admin"
                    ? "/admin"
                    : "/customer"
                }
                className={linkClass(
                  user.role === "herder"
                    ? "/herder"
                    : user.role === "admin"
                    ? "/admin"
                    : "/customer"
                )}
              >
                Миний самбар
              </Link>

              {/* Гарах товч */}
              <button
                onClick={logout}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Гарах
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={linkClass("/auth/login")}>
                Нэвтрэх
              </Link>
              <Link href="/auth/signup" className={linkClass("/auth/signup")}>
                Бүртгүүлэх
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
