"use client";

import { Button } from "@/components/ui/Button";
import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicPlayer({
  trackUrl,
  trackName,
  autoplay = false,
  labels = { play: "Включить музыку", pause: "Пауза" },
}: {
  trackUrl: string;
  trackName?: string;
  autoplay?: boolean;
  labels?: { play: string; pause: string };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onCanPlay = () => setReady(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  useEffect(() => {
    if (!autoplay || !ready) return;
    const tryPlay = () => {
      audioRef.current?.play().catch(() => {
        /* browsers block autoplay — user must click */
      });
    };
    // Soft autoplay after first user interaction
    const onInteract = () => {
      tryPlay();
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    return () => {
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, [autoplay, ready]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => undefined);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-5 md:right-5">
      <audio ref={audioRef} src={trackUrl} loop preload="metadata" />
      <Button
        onClick={toggle}
        variant="secondary"
        size="md"
        className="gap-2 shadow-soft-lg"
        title={trackName}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
        <Music size={14} className="text-[#D4A537]" />
        <span className="hidden max-w-[140px] truncate sm:inline">
          {playing ? labels.pause : labels.play}
        </span>
      </Button>
    </div>
  );
}
