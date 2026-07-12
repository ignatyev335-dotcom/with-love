"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl text-charcoal">Настройки платформы</h1>
      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">Основные</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              Название сервиса
            </label>
            <Input defaultValue="With Love" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              Домен по умолчанию
            </label>
            <Input defaultValue="withlove.app" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              Язык по умолчанию
            </label>
            <Input defaultValue="Русский" />
          </div>
          <Button>Сохранить</Button>
        </CardContent>
      </Card>
    </div>
  );
}
