import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PatientBanner() {
  return (
    <Card className="mb-6 border-white/10 bg-white/5">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            👤
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Selected Patient</p>
            <p className="font-medium">Ashok Kumar</p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="text-emerald-400 border-emerald-500/30"
        >
          LIS-ASH-001
        </Badge>
      </CardContent>
    </Card>
  );
}
