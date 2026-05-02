import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  desc: string;
  active: boolean;
  onClick: () => void;
};

export default function TestCard({ name, desc, active, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition border ${
        active
          ? "border-emerald-500 bg-emerald-500/10"
          : "border-white/10 hover:bg-white/5"
      }`}
    >
      <CardContent className="p-4 flex justify-between items-start">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>

        {active && (
          <Badge className="bg-emerald-500 text-black">Selected</Badge>
        )}
      </CardContent>
    </Card>
  );
}
