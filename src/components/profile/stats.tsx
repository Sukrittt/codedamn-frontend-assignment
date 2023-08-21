import { Icons } from "@/components/icons";

const Stats = () => {
  const dummyStats = [
    {
      id: 1,
      icon: () => <Icons.thunderbolt className="text-purple-500 h-8 w-8" />,
      value: "2",
      label: "Longest streak",
    },
    {
      id: 2,
      icon: () => <Icons.experience className="text-sky-500 h-8 w-8" />,
      value: "1200",
      label: "Experience Points",
    },
    {
      id: 3,
      icon: () => <Icons.trophy className="text-orange-500 h-8 w-8" />,
      value: "Novice",
      label: "Current league",
    },
    {
      id: 4,
      icon: () => <Icons.karma className="text-pink-500 h-8 w-8" />,
      value: "120",
      label: "Karma points",
    },
  ];

  return (
    <div className="space-y-4 mt-6">
      <h1 className="font-bold text-2xl tracking-tight">Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyStats.map((stat) => (
          <div
            key={stat.id}
            className="border bg-accent rounded-xl grid grid-cols-8 p-2"
          >
            <div className="flex items-center justify-center">
              <stat.icon />
            </div>
            <div className="flex flex-col col-span-6">
              <span className="font-bold text-lg text-neutral-800">
                {stat.value}
              </span>
              <span className="text-muted-foreground tracking-tight">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
