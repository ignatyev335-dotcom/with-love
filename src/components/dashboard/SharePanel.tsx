"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Check, Copy, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function SharePanel({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const path = `/${locale}/invite/${slug}`;
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${path}`
      : path;

  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
        typeof window !== "undefined"
          ? `${window.location.origin}${path}`
          : path
      )}&bgcolor=FAF7F2&color=282B2B&margin=8`,
    [path]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        typeof window !== "undefined"
          ? `${window.location.origin}${path}`
          : path
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="font-heading text-lg text-charcoal">Поделиться</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSrc}
            alt="QR code"
            width={120}
            height={120}
            className="rounded-2xl border border-border bg-white p-2 shadow-soft"
          />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <p className="text-sm text-muted">
              Отправьте гостям ссылку или QR-код. Ответы появятся в кабинете
              автоматически.
            </p>
            <div className="rounded-2xl border border-border bg-warm-beige/40 px-3 py-2 font-mono text-xs text-charcoal break-all">
              {url}
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Button size="sm" variant="secondary" onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Скопировано" : "Копировать"}
              </Button>
              <Link href={path} target="_blank">
                <Button size="sm" variant="outline">
                  <ExternalLink size={14} />
                  Открыть
                </Button>
              </Link>
              <a
                href={qrSrc}
                download={`withlove-${slug}-qr.png`}
                target="_blank"
                rel="noreferrer"
              >
                <Button size="sm" variant="ghost">
                  <QrCode size={14} />
                  QR
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
