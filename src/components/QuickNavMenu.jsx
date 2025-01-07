import React from "react";

const QuickNavMenu = ({ onRotate }) => {
  const positions = [
    { id: 1, name: "About Me", rotation: 5 },
    { id: 2, name: "Skills", rotation: 3 },
    { id: 3, name: "Portfolio", rotation: 0.5 },
  ];

  return (
    <div className="absolute bottom-4 right-4 p-4 bg-zinc-800/30 backdrop-blur-sm round-border-quicknav">
      <div className="flex flex-col gap-2">
        <b className="text-white mb-2 underline">Quick Navigation:</b>
        {positions.map((pos) => (
          <button
            key={pos.id}
            variant="outline"
            className="text-white hover:bg-zinc-700 round-border-quicknav-button"
            onClick={() => onRotate(pos.rotation)}
          >
            {pos.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickNavMenu;
