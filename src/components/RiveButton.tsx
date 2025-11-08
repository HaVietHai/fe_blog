import { useRive, StateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";

export default function RiveButton({ onClick }: { onClick?: () => void }) {
  const riveInputs = useRef<Record<string, StateMachineInput>>({});

  const { RiveComponent, rive } = useRive({
    src: "https://static.canva.com/web/riv/c8cefb7b49258078c162ec0c6a8626fd.riv", // đường dẫn tới file .riv
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Map input state machine
  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs("State Machine 1");
    const map: Record<string, StateMachineInput> = {};
    inputs.forEach((i) => (map[i.name] = i));
    riveInputs.current = map;
  }, [rive]);

  return (
    <div
      style={{
        width: 120,
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onMouseEnter={() => riveInputs.current["onHover"] && (riveInputs.current["onHover"].value = true)}
      onMouseLeave={() => riveInputs.current["onHover"] && (riveInputs.current["onHover"].value = false)}
      onMouseDown={() => riveInputs.current["onMousedown"] && (riveInputs.current["onMousedown"].value = true)}
      onMouseUp={() => {
        if (riveInputs.current["onMousedown"]) riveInputs.current["onMousedown"].value = false;
        if (onClick) onClick();
      }}
    >
      <RiveComponent style={{ width: 120, height: 120 }} />
    </div>
  );
}
