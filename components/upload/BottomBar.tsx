import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BottomBar({ count }: { count: number }) {
  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur border-t">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {count} test{count !== 1 && "s"} selected
        </p>

        <div className="flex gap-3">
          <Link href="/admin/upload">
            <Button variant="outline">Back</Button>
          </Link>

          <Button disabled={!count}>Continue →</Button>
        </div>
      </div>
    </div>
  );
}
