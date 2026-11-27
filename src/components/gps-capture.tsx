"use client";

import { useState, useEffect } from "react";
import { MapPin, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function GpsCapture({
  latName,
  lngName,
  defaultLat,
  defaultLng,
}: {
  latName: string;
  lngName: string;
  defaultLat?: number | null;
  defaultLng?: number | null;
}) {
  const [lat, setLat] = useState<number | null>(defaultLat ?? null);
  const [lng, setLng] = useState<number | null>(defaultLng ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!defaultLat) captureLocation();
  }, []);

  function captureLocation() {
    if (!navigator.geolocation) {
      setError("GPS not supported on this device.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location permission denied. Please allow GPS access."
            : "Could not get location. Try again.",
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }

  return (
    <div className="rounded-lg bg-white p-3 ring-1 ring-black/5">
      <input type="hidden" name={latName} value={lat ?? ""} />
      <input type="hidden" name={lngName} value={lng ?? ""} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin text-leaf" />
              <span className="text-ink/60">Getting GPS location…</span>
            </>
          ) : lat && lng ? (
            <>
              <CheckCircle2 className="size-4 text-leaf" />
              <span className="text-ink/70">
                <span className="font-mono text-xs">{lat.toFixed(6)}, {lng.toFixed(6)}</span>
              </span>
            </>
          ) : (
            <>
              <MapPin className="size-4 text-ink/40" />
              <span className="text-ink/50">No location captured</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={captureLocation}
          disabled={loading}
          className="rounded-md bg-leaf/10 px-2.5 py-1 text-xs font-medium text-leaf transition-colors hover:bg-leaf/20 disabled:opacity-50"
        >
          {lat ? "Recapture" : "Capture GPS"}
        </button>
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="size-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
