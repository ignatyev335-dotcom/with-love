"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useState } from "react";

export default function SettingsPage() {
  const user = useAppStore((s) => s.user);
  const wedding = useAppStore((s) => s.wedding);
  const [name, setName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
        Настройки
      </h1>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">Профиль</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">Имя</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Email</label>
            <Input value={user?.email ?? ""} disabled />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Тариф</label>
            <Input value={user?.plan ?? "free"} disabled />
          </div>
          <Button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? "Сохранено!" : "Сохранить"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">Свадьба</h2>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted">
          <p>
            <span className="text-charcoal">Пара:</span>{" "}
            {wedding?.coupleNames}
          </p>
          <p>
            <span className="text-charcoal">Дата:</span>{" "}
            {wedding?.date
              ? new Date(wedding.date).toLocaleDateString("ru-RU")
              : "—"}
          </p>
          <p>
            <span className="text-charcoal">Место:</span> {wedding?.venue}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
