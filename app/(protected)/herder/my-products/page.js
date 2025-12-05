"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    ArrowLeft,
    AlertCircle,
    Trash2,
    RotateCcw,
    Eye,
    EyeOff,
} from "lucide-react";

export default function MyProductsPage() {
    const [tab, setTab] = useState("active");
    const [activeProducts, setActiveProducts] = useState([]);
    const [trashProducts, setTrashProducts] = useState([]);

    useEffect(() => {
        const load = () => {
            try {
                const all = JSON.parse(localStorage.getItem("products") || "[]");
                const trash = JSON.parse(localStorage.getItem("herderTrash") || "[]");
                const myName = "Малчин Баяраа";

                setActiveProducts(all.filter(p => p.herderName === myName));
                setTrashProducts(trash.filter(p => p.herderName === myName));
            } catch (e) {
                console.error(e);
            }
        };
        load();
        const interval = setInterval(load, 2000);
        return () => clearInterval(interval);
    }, []);

    const moveToTrash = (id) => {
        if (!confirm("Хогийн сав руу хаях уу?")) return;
        const all = JSON.parse(localStorage.getItem("products") || "[]");
        const trash = JSON.parse(localStorage.getItem("herderTrash") || "[]");
        const product = all.find(p => p.id === id);
        if (product) {
            const newAll = all.filter(p => p.id !== id);
            trash.push({ ...product, trashedAt: new Date().toISOString() });
            localStorage.setItem("products", JSON.stringify(newAll));
            localStorage.setItem("herderTrash", JSON.stringify(trash));
        }
    };

    const restore = (id) => {
        const trash = JSON.parse(localStorage.getItem("herderTrash") || "[]");
        const product = trash.find(p => p.id === id);
        if (!product) return;
        const newTrash = trash.filter(p => p.id !== id);
        const all = JSON.parse(localStorage.getItem("products") || "[]");
        all.push({ ...product, status: "pending", rejectionReason: null });
        localStorage.setItem("products", JSON.stringify(all));
        localStorage.setItem("herderTrash", JSON.stringify(newTrash));
    };

    const permanentDelete = (id) => {
        if (!confirm("Бүрмөсөн устгах уу?")) return;
        const trash = JSON.parse(localStorage.getItem("herderTrash") || "[]");
        const newTrash = trash.filter(p => p.id !== id);
        localStorage.setItem("herderTrash", JSON.stringify(newTrash));
    };

    const getStatusBadge = (status) => {
        if (status === "approved")
            return <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-5 py-2 rounded-full font-bold text-sm shadow-lg"><CheckCircle className="w-5 h-5" />ЗӨВШӨӨРСӨН</div>;
        if (status === "rejected" || status === "trashed")
            return <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-5 py-2 rounded-full font-bold text-sm shadow-lg"><XCircle className="w-5 h-5" />ЦУЦЛАГДСАН</div>;
        return <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-5 py-2 rounded-full font-bold text-sm shadow-lg"><Clock className="w-5 h-5" />ХҮЛЭЭГДЭЖ БАЙНА</div>;
    };

    const renderCard = (p, isTrash = false) => (
        <div key={p.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-4 border-transparent hover:border-indigo-500">
            <div className="relative h-64 bg-gray-100">
                {p.image ? (
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <Package className="w-24 h-24 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-4 left-4">{getStatusBadge(p.status)}</div>
            </div>

            <div className="p-8 space-y-6">
                <h3 className="text-3xl font-black text-center text-gray-900 dark:text-white">{p.productType}</h3>
                <p className="text-xl text-center text-gray-600 dark:text-gray-400">{p.animal} → {p.productType}</p>
                <p className="text-5xl font-black text-center text-emerald-600">{p.price.toLocaleString()}₮</p>

                {p.rejectionReason && (
                    <div className="p-6 bg-red-50 dark:bg-red-900/40 rounded-2xl border-l-4 border-red-600">
                        <p className="text-red-700 dark:text-red-300 font-bold text-center flex items-center justify-center gap-3">
                            <AlertCircle className="w-8 h-8" />
                            {p.rejectionReason}
                        </p>
                    </div>
                )}

                {isTrash ? (
                    <div className="flex gap-4">
                        <button
                            onClick={() => restore(p.id)}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all"
                        >
                            <RotateCcw className="w-7 h-7" />
                            Сэргээх
                        </button>
                        <button
                            onClick={() => permanentDelete(p.id)}
                            className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all"
                        >
                            <Trash2 className="w-7 h-7" />
                            Устгах
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => moveToTrash(p.id)}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all"
                    >
                        <Trash2 className="w-7 h-7" />
                        Хогийн сав руу хаях
                    </button>
                )}

                <p className="text-center text-gray-500 text-sm pt-4 border-t dark:border-gray-700">
                    {isTrash ? "Хаягдсан: " : "Оруулсан: "} {new Date(isTrash ? p.trashedAt || p.createdAt : p.createdAt).toLocaleDateString("mn-MN")}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-6xl font-black text-gray-800 dark:text-white">Миний оруулсан бараа</h1>
                    <Link href="/herder" className="flex items-center gap-4 text-2xl text-indigo-600 hover:text-indigo-700 font-medium">
                        <ArrowLeft className="w-8 h-8" /> Буцах
                    </Link>
                </div>

                {/* Таб – админ шиг гоё */}
                <div className="flex gap-8 mb-12 border-b-4 border-gray-300 dark:border-gray-700">
                    <button
                        onClick={() => setTab("active")}
                        className={`pb-6 px-10 text-2xl font-bold flex items-center gap-4 transition-all ${tab === "active"
                            ? "text-emerald-600 dark:text-emerald-400 border-b-4 border-emerald-600 dark:border-emerald-400"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Eye className="w-8 h-8" />
                        Идэвхтэй ({activeProducts.length})
                    </button>
                    <button
                        onClick={() => setTab("trash")}
                        className={`pb-6 px-10 text-2xl font-bold flex items-center gap-4 transition-all ${tab === "trash"
                            ? "text-red-600 dark:text-red-400 border-b-4 border-red-600 dark:border-red-400"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <EyeOff className="w-8 h-8" />
                        Хогийн сав ({trashProducts.length})
                    </button>
                </div>

                {tab === "active" && activeProducts.length === 0 && (
                    <div className="text-center py-40">
                        <Package className="w-40 h-40 mx-auto text-gray-400 mb-10" />
                        <p className="text-4xl font-bold text-gray-600 dark:text-gray-400">Бараа оруулаагүй байна</p>
                    </div>
                )}

                {tab === "trash" && trashProducts.length === 0 && (
                    <div className="text-center py-40">
                        <Trash2 className="w-40 h-40 mx-auto text-gray-400 mb-10" />
                        <p className="text-4xl font-bold text-gray-600 dark:text-gray-400">Хогийн сав хоосон</p>
                    </div>
                )}

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {(tab === "active" ? activeProducts : trashProducts).map(p => renderCard(p, tab === "trash"))}
                </div>
            </div>
        </div>
    );
}