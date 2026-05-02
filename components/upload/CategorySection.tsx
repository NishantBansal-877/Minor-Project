import TestCard from "./TestCard";

export default function CategorySection({
  title,
  icon,
  tests,
  selected,
  toggle,
}: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tests.map((test: any) => (
          <TestCard
            key={test.id}
            name={test.name}
            desc={test.desc}
            active={selected.includes(test.id)}
            onClick={() => toggle(test.id)}
          />
        ))}
      </div>
    </div>
  );
}
