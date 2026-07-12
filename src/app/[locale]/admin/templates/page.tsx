"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { TEMPLATES } from "@/lib/seed";
import Image from "next/image";

export default function AdminTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Шаблоны</h1>
        <p className="mt-1 text-sm text-[#8a8580]">
          Управление библиотекой дизайнов
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TEMPLATES.map((t) => (
          <Card key={t.id} hover>
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              <Image
                src={t.preview}
                alt={t.name}
                fill
                className="object-cover"
                sizes="250px"
              />
            </div>
            <CardContent className="pt-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-[#8a8580]">{t.category}</p>
                </div>
                <Badge variant={t.premium ? "gold" : "success"}>
                  {t.premium ? "Premium" : "Free"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
