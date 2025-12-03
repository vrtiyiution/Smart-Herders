"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, User, RefreshCw, Trash2, RotateCcw } from "lucide-react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("pending");
  const [showTrash, setShowTrash] = useState(false);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const loadAll = () => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const trash = JSON.parse(localStorage.getItem("deletedProducts") || "[]");

    setPending(all.filter((p) => p.status === "pending"));
    setApproved(all.filter((p) => p.status === "approved"));
    setRejected(all.filter((p) => p.status === "rejected"));
    setDeleted(trash);
  };

  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 3000);
    return () => clearInterval(interval);
  }, []);

  const setStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = all.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    localStorage.setItem("products", JSON.stringify(updated));
    loadAll();
  };

  const approve = (id) => setStatus(id, "approved");
  const reject = (id) => setStatus(id, "rejected");
  const revert = (id) => setStatus(id, "pending");

  const moveToTrash = (id) => {
    if (!confirm("Хогийн сав руу хаях уу?")) return;
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const product = all.find((p) => p.id === id);
    const remaining = all.filter((p) => p.id !== id);
    const trash = JSON.parse(localStorage.getItem("deletedProducts") || "[]");
    trash.push({ ...product, deletedAt: new Date().toISOString() });
    localStorage.setItem("products", JSON.stringify(remaining));
    localStorage.setItem("deletedProducts", JSON.stringify(trash));
    loadAll();
  };

  const restoreFromTrash = (id) => {
    const trash = JSON.parse(localStorage.getItem("deletedProducts") || "[]");
    const product = trash.find((p) => p.id === id);
    const newTrash = trash.filter((p) => p.id !== id);
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    all.push({ ...product, status: "pending" });
    localStorage.setItem("products", JSON.stringify(all));
    localStorage.setItem("deletedProducts", JSON.stringify(newTrash));
    loadAll();
  };

  const permanentDelete = (id) => {
    if (!confirm("Бүрмөсөн устгах уу?")) return;
    const trash = JSON.parse(localStorage.getItem("deletedProducts") || "[]");
    const newTrash = trash.filter((p) => p.id !== id);
    localStorage.setItem("deletedProducts", JSON.stringify(newTrash));
    loadAll();
  };

  const renderProductCard = (p, isTrash = false) => (
    <div key={p.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition">
      <div className="h-48 bg-gray-900 relative">
        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-500">Зураг байхгүй</div>}
        <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-sm flex items-center gap-2"><User className="w-4 h-4" /> {p.herderName || "Малчин"}</div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-white line-clamp-2">{p.animal} – {p.productType}</h3>
        <p className="text-2xl font-bold text-emerald-400">{Number(p.price).toLocaleString()}₮</p>
        <p className="text-gray-400 text-sm line-clamp-2">{p.desc || "Тайлбар байхгүй"}</p>
        <div className="grid gap-2">
          {!isTrash && p.status !== "approved" && <button onClick={() => approve(p.id)} className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Зөвшөөрөх</button>}
          {!isTrash && p.status !== "rejected" && <button onClick={() => reject(p.id)} className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><XCircle className="w-5 h-5" /> Татгалзах</button>}
          {!isTrash && (p.status === "approved" || p.status === "rejected") && <button onClick={() => revert(p.id)} className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><RefreshCw className="w-5 h-5" /> Буцаах</button>}
          {!isTrash ? <button onClick={() => moveToTrash(p.id)} className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><Trash2 className="w-5 h-5" /> Хогийн сав руу</button> : <><button onClick={() => restoreFromTrash(p.id)} className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><RotateCcw className="w-5 h-5" /> Сэргээх</button><button onClick={() => permanentDelete(p.id)} className="bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><Trash2 className="w-5 h-5" /> Бүрмөсөн устгах</button></>}
        </div>
        <div className="text-center pt-2">
          {!isTrash && p.status === "pending" && (
            <span className="text-yellow-400 text-sm flex items-center gap-1 justify-center">
              <Clock className="w-4 h-4" /> Хүлээгдэж байна
            </span>
          )}
          {!isTrash && p.status === "approved" && (
            <span className="text-green-400 text-sm flex items-center gap-1 justify-center">
              <CheckCircle className="w-4 h-4" /> Зөвшөөрсөн
            </span>
          )}
          {!isTrash && p.status === "rejected" && (
            <span className="text-red-400 text-sm flex items-center gap-1 justify-center">
              <XCircle className="w-4 h-4" /> Татгалзсан
            </span>
          )}
          {isTrash && (
            <span className="text-purple-400 text-sm flex items-center gap-1 justify-center">
              <Trash2 className="w-4 h-4" /> Хогийн саванд
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = (list, emptyIcon, emptyTitle, emptyDesc, isTrash = false) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-20 text-gray-300">
          <div className="w-20 h-20 mx-auto mb-6 text-gray-500 flex items-center justify-center">{emptyIcon}</div>
          <p className="text-2xl font-bold">{emptyTitle}</p>
          <p className="text-sm mt-2">{emptyDesc}</p>
        </div>
      );
    }

    return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => renderProductCard(p, isTrash))}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Админы самбар</h1>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {[
            { key: "pending", label: "Хүлээгдэж буй", count: pending.length, icon: Clock },
            { key: "approved", label: "Зөвшөөрсөн", count: approved.length, icon: CheckCircle },
            { key: "rejected", label: "Татгалзсан", count: rejected.length, icon: XCircle },
            { key: "trash", label: "Хогийн сав", count: deleted.length, icon: Trash2 },
          ].map(({ key, label, count, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)} className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 border transition ${tab === key ? "bg-blue-600 border-blue-400" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}`}>
              <Icon className="w-5 h-5" /> {label} ({count})
            </button>
          ))}
        </div>

        {tab !== "trash" ? (
          tab === "pending" ? renderTabContent(pending, <Clock className="w-12 h-12" />, "Шинэ бараа алга", "Бүгдийг шалгасан") : tab === "approved" ? renderTabContent(approved, <CheckCircle className="w-12 h-12" />, "Бүгд зөвшөөрсөн", "Хэрэглэгчдэд харагдана") : renderTabContent(rejected, <XCircle className="w-12 h-12" />, "Татгалзсан бараа байхгүй", "Харагдахгүй")
        ) : (
          renderTabContent(deleted, <Trash2 className="w-12 h-12" />, "Бүгд хогийн саванд", "Сэргээх эсвэл бүр устгах боломжтой", true)
        )}
      </div>
    </div>
  );
}
