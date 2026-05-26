"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  tests: any[];
  onExtract: (values: Record<string, string>) => void;
};

export default function ReportScanner({ tests, onExtract }: Props) {
  const webcamRef = useRef<Webcam | null>(null);

  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const capture = () => {
    const img = webcamRef.current?.getScreenshot();

    if (img) {
      setImage(img);
    }
  };

  const scanImage = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const result = await Tesseract.recognize(image, "eng");

      const text = result.data.text;

      const extracted: Record<string, string> = {};

      tests.forEach((test) => {
        const regex = new RegExp(`${test.name}\\s*[:\\-]?\\s*([0-9.]+)`, "i");

        const match = text.match(regex);

        if (match?.[1]) {
          extracted[test.key] = match[1];
        }
      });

      onExtract(extracted);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Card className="bg-white/5 border-white/10 p-4 space-y-4">
      {!image ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment",
          }}
          className="rounded-xl w-full"
        />
      ) : (
        <img src={image} alt="preview" className="rounded-xl w-full" />
      )}

      <div className="flex gap-3">
        {!image ? (
          <Button type="button" onClick={capture}>
            Capture
          </Button>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => setImage(null)}
              variant="outline"
            >
              Retake
            </Button>

            <Button type="button" onClick={scanImage} disabled={loading}>
              {loading ? "Scanning..." : "Extract Values"}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
