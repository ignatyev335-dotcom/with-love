import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] px-4 text-center">
      <p className="font-serif text-6xl text-[#F76E62]">404</p>
      <h1 className="mt-4 font-serif text-2xl text-[#282B2B]">
        Страница не найдена
      </h1>
      <p className="mt-2 max-w-sm text-sm text-[#8a8580]">
        Возможно, ссылка устарела или приглашение ещё не опубликовано.
      </p>
      <Link
        href="/ru"
        className="mt-8 inline-flex h-11 items-center rounded-2xl bg-[#F76E62] px-6 text-sm font-medium text-white shadow-sm hover:bg-[#e85f54]"
      >
        На главную
      </Link>
    </div>
  );
}
