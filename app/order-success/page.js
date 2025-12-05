// app/order-success/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowLeft, Home } from "lucide-react";

export default function OrderSuccessPage() {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("lastOrder");
        if (saved) {
            setOrderDetails(JSON.parse(saved));
        }
    }, []);

    // Хэрвээ захиалга байхгүй бол буцаагаад нүүр рүү илгээнэ
    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
                <div className="text-center">
                    <Package className="w-24 h-24 mx-auto text-gray-600 mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Захиалга олдсонгүй</h1>
                    <Link
                        href="/customer"
                        className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl text-xl font-bold text-white"
                    >
                        <Home className="w-6 h-6" />
                        Нүүр хуудас руу буцах
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Амжилтын толгой */}
                <div className="text-center mb-12">
                    <CheckCircle className="w-28 h-28 mx-auto text-emerald-500 mb-6" />
                    <h1 className="text-6xl font-black text-emerald-400 mb-4">
                        Амжилттай захиаллаа!
                    </h1>
                    <p className="text-xl text-gray-300">
                        Таны захиалга хүлээн авлаа. Удалгүй админ тантай утсаар холбогдоно.
                    </p>
                </div>

                {/* Захиалгын дэлгэрэнгүй карт */}
                <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 shadow-2xl">
                    {/* Захиалгын дугаар + Огноо */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-700">
                        <div>
                            <p className="text-gray-400 text-sm">Захиалгын дугаар</p>
                            <p className="text-3xl font-black text-indigo-400 tracking-wider">
                                {orderDetails.orderId}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-sm">Огноо</p>
                            <p className="text-xl font-bold text-gray-200">{orderDetails.timestamp}</p>
                        </div>
                    </div>

                    {/* Барааны жагсаалт */}
                    <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
                        {orderDetails.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-6 py-5 border-b border-gray-700/50 last:border-0"
                            >
                                {/* Зураг */}
                                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-gray-600">
                                    {item.image ? (
                                        <img src={item.image} alt={item.productType} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                                            <Package className="w-10 h-10 text-gray-500" />
                                        </div>
                                    )}
                                </div>

                                {/* Мэдээлэл */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">{item.productType}</h3>
                                    <p className="text-gray-400 text-sm">{item.herderName}</p>
                                </div>

                                {/* Үнэ */}
                                <div className="text-right">
                                    <p className="text-lg text-gray-300">
                                        {item.price.toLocaleString()}₮ × {item.qty}
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-400">
                                        {item.total.toLocaleString()}₮
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Нийт дүн */}
                    <div className="border-t-4 border-emerald-600 pt-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-2xl font-bold text-gray-300">Нийт бараа</p>
                                <p className="text-4xl font-black text-white">{orderDetails.totalItems} ширхэг</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-300">Нийт дүн</p>
                                <p className="text-6xl font-black text-emerald-400">
                                    {orderDetails.totalAmount.toLocaleString()}₮
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Товчнууд */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                    <Link
                        href="/customer"
                        className="inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-10 py-5 rounded-2xl text-xl font-bold text-white transition transform hover:scale-105"
                    >
                        <ArrowLeft className="w-7 h-7" />
                        Дахин худалдан авалт хийх
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.removeItem("lastOrder");
                            window.location.href = "/customer";
                        }}
                        className="inline-flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 px-10 py-5 rounded-2xl text-xl font-bold text-white transition"
                    >
                        Захиалга цэвэрлэх
                    </button>
                </div>
            </div>
        </div>
    );
}