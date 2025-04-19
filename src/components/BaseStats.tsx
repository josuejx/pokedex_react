import Stat from "../types/stat";

export default function BaseStats({ stats }: { stats: Stat[] }) {
  function transformName(statName: string) {
    if (statName.startsWith("special-")) {
      return "SP. " + statName.split("-")[1].toUpperCase();
    } else {
      return statName.toUpperCase();
    }
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div className="bg-white rounded-lg p-2 text-sm border border-gray-300 shadow-md">
          {transformName(stat.stat.name)}: {stat.base_stat}
        </div>
      ))}
    </div>
  );
}
