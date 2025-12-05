// app/cart/page.jsx (эсвэл page.tsx)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Package, Trash2, User, Plus, Minus, X, CheckCircle, Banknote } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    // ==== localStorage ачааллах + ижил барааг нэгтгэх (таны код яг ижил) ====
    useEffect(() => {
        try {
            const saved = localStorage.getItem("cart");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const mergedMap = new Map();

                    parsed.forEach((item) => {
                        const key = `${item.productType}-${item.herderName}-${item.price}-${item.image || "noimg"}`;
                        if (mergedMap.has(key)) {
                            const existing = mergedMap.get(key);
                            existing.qty = (existing.qty || 1) + (item.qty || 1);
                        } else {
                            mergedMap.set(key, { ...item, qty: item.qty || 1 });
                        }
                    });

                    const mergedCart = Array.from(mergedMap.values());
                    setCart(mergedCart);
                    localStorage.setItem("cart", JSON.stringify(mergedCart));
                }
            }
        } catch (e) {
            console.error("Cart load error:", e);
        }
    }, []);

    const getId = (item) =>
        `${item.productType}-${item.herderName}-${item.price}-${item.image || "noimg"}`;

    const removeFromCart = (id) => {
        setCart((prev) => {
            const updated = prev.filter((i) => getId(i) !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    const updateQty = (id, delta) => {
        setCart((prev) => {
            const updated = prev
                .map((item) => {
                    if (getId(item) === id) {
                        const newQty = (item.qty || 1) + delta;
                        return newQty <= 0 ? null : { ...item, qty: newQty };
                    }
                    return item;
                })
                .filter(Boolean);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const totalAmount = cart.reduce((sum, i) => sum + Number(i.price || 0) * (i.qty || 1), 0);

    // Захиалга баталгаажуулах → модал нээх
    const handleConfirmOrder = () => {
        setShowPaymentModal(true);
    };

    // Төлбөр төлсөн гэдгийг баталгаажуулах (энэ жишээнд симуляци)
    const handlePaymentDone = () => {
        setOrderConfirmed(true);
        // Сагсыг хоослох
        setCart([]);
        localStorage.removeItem("cart");

        // 3 секундын дараа модалыг хаах
        setTimeout(() => {
            setShowPaymentModal(false);
            setOrderConfirmed(false);
        }, 3500);
    };

    if (cart.length === 0 && !showPaymentModal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
                <div className="text-center space-y-8">
                    <Package className="w-32 h-32 mx-auto text-gray-600" />
                    <h1 className="text-4xl font-bold text-white">Сагс хоосон байна</h1>
                    <Link href="/customer" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-10 py-5 rounded-2xl text-xl font-bold text-white">
                        Бүтээгдэхүүн сонгох
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header – таны одоогийн */}
            <div className="sticky top-0 z-50 bg-gray-900/98 backdrop-blur-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-white">
                        <ShoppingCart className="w-10 h-10 text-indigo-500" />
                        Миний сагс ({totalItems})
                    </h1>
                    <Link href="/customer" className="text-indigo-400 hover:text-indigo-300 text-lg font-medium">
                        Бүтээгдэхүүн үзэх
                    </Link>
                </div>
            </div>

            {/* Гол контент */}
            <div className="max-w-7xl mx-auto p-6 pb-40">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Барааны жагсаалт – таны одоогийн яг ижил */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => {
                            const id = getId(item);
                            const qty = item.qty || 1;
                            const itemTotal = Number(item.price || 0) * qty;

                            return (
                                <div key={id} className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-6 flex items-center gap-6 hover:border-indigo-500 transition-all">
                                    <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden border border-gray-600">
                                        {item.image ? (
                                            <img src={item.image} alt={item.productType} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                                                <Package className="w-16 h-16 text-gray-500" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">{item.productType}</h3>
                                        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                                            <User className="w-4 h-4" /> {item.herderName || "Малчин"}
                                        </p>
                                        <p className="text-lg text-gray-300 mt-3">
                                            {Number(item.price || 0).toLocaleString()}₮ × {qty} ={" "}
                                            <span className="text-2xl font-bold text-emerald-400">
                                                {itemTotal.toLocaleString()}₮
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-5">
                                        <div className="flex items-center bg-gray-800/80 backdrop-blur-md border border-gray-600 rounded-2xl overflow-hidden shadow-xl">
                                            <button onClick={() => updateQty(id, -1)} className="w-11 h-11 bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all active:scale-95">
                                                <Minus className="w-5 h-5" strokeWidth={3} />
                                            </button>
                                            <div className="px-6 font-bold text-xl text-white min-w-16 text-center">{qty}</div>
                                            <button onClick={() => updateQty(id, +1)} className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all active:scale-95">
                                                <Plus className="w-5 h-5" strokeWidth={3} />
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(id)} className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1.5 transition">
                                            <Trash2 className="w-4 h-4" /> Устгах
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Захиалгын хураангуй + Товч */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-gray-800/95 backdrop-blur-2xl border border-gray-700 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold mb-8 text-center text-white">Захиалгын хураангуй</h2>
                            <div className="space-y-6 text-lg">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Нийт бараа:</span>
                                    <span className="font-bold text-xl text-white">{totalItems} ширхэг</span>
                                </div>
                                <div className="border-t border-gray-600 pt-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-bold text-white">Нийт дүн:</span>
                                        <span className="text-4xl font-black text-emerald-400">
                                            {totalAmount.toLocaleString()}₮
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <button
                                    onClick={handleConfirmOrder}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-3"
                                >
                                    <Banknote className="w-8 h-8" />
                                    Захиалга баталгаажуулах
                                </button>
                                <p className="text-center text-sm text-gray-400 mt-4">
                                    Дараа нь төлбөрийн мэдээлэл гарч ирнэ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ТӨЛБӨРИЙН МОДАЛ */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-6">
                    <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full p-10 relative border border-gray-800">
                        {/* Хаах товч */}
                        {!orderConfirmed && (
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        )}

                        {!orderConfirmed ? (
                            <>
                                <h2 className="text-4xl font-black text-center text-white mb-10">
                                    Төлбөрийн мэдээлэл
                                </h2>

                                {/* Нийт дүн томоор */}
                                <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-600/50 rounded-2xl p-8 text-center mb-8">
                                    <p className="text-gray-400 text-lg">Төлөх дүн</p>
                                    <p className="text-6xl font-black text-emerald-400">
                                        {totalAmount.toLocaleString()} ₮
                                    </p>
                                </div>

                                <div className="space-y-6 text-lg">
                                    <div className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700">
                                        <p className="text-gray-400">Банк</p>
                                        <p className="text-2xl font-bold text-white">Хаан Банк</p>
                                    </div>
                                    <div className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700">
                                        <p className="text-gray-400">Дансны дугаар</p>
                                        <p className="text-3xl font-mono text-yellow-400 tracking-wider select-all">
                                            5023 4567 8901
                                        </p>
                                    </div>
                                    <div className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700">
                                        <p className="text-gray-400">Хүлээн авагчийн нэр</p>
                                        <p className="text-2xl font-bold text-white">Малчны Холбоо ХХК</p>
                                    </div>
                                </div>

                                {/* Гүйлгээний утга */}
                                <div className="mt-8 text-center">
                                    <p className="text-gray-400 mb-2">Гүйлгээний утга (заавал оруулна уу)</p>
                                    <p className="text-3xl font-black text-indigo-400 tracking-wider select-all">
                                        ZAKHIA{Date.now().toString().slice(-6)}
                                    </p>
                                </div>

                                <button
                                    onClick={handlePaymentDone}
                                    className="w-full mt-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-4"
                                >
                                    <CheckCircle className="w-9 h-9" />
                                    Би төлбөр төлсөн
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <CheckCircle className="w-32 h-32 mx-auto text-emerald-500 mb-8" />
                                <h3 className="text-5xl font-black text-emerald-400 mb-4">
                                    Амжилттай захиаллаа!
                                </h3>
                                <p className="text-xl text-gray-300">
                                    Таны захиалга хүлээн авлаа. Удалгүй админ тантай холбогдоно.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}