// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Малчин, хэрэглэгчдэд зориулсан онлайн зах
      </h1>
      <p className="text-gray-300 mb-10 max-w-2xl text-center">
        Малчин мах, сүү, бусад бүтээгдэхүүнээ сертификаттайгаар оруулна. Админ баталгаажуулсны дараа хэрэглэгчид ангиллаар хайж, сагсанд нэмээд захиална.
      </p>

      <div className="grid gap-6 sm:grid-cols-3 max-w-4xl w-full">
        <RoleCard title="Малчин" href="/auth/signup?role=herder" desc="Бараа оруулах, захиалга авах" />
        <RoleCard title="Хэрэглэгч" href="/auth/signup?role=customer" desc="Бараа хайх, сагслах, захиалах" />
        <RoleCard title="Админ" href="/auth/signup?role=admin" desc="Бараа баталгаажуулах, хянах" />
      </div>
    </main>
  );
}

function RoleCard({ title, href, desc }) {
  return (
    <Link href={href} className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </Link>
  );
}