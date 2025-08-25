import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import mapData from "../../../map.json";

type Props = { onSelect: (country: { name: string }) => void };

export default function WorldPicker({ onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCountryClick = (name: string) => {
    setSelected(name);
    onSelect({ name });
  };

  return (
    <div 
      style={{ 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none"
      }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <ComposableMap 
          projection="geoMercator"
          projectionConfig={{ 
            scale: 200,
            center: [0, 30]
          }} 
          style={{ 
            width: "100%", 
            height: "100%",
            outline: "none"
          }}
        >
          <Geographies geography={mapData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const p: any = geo.properties ?? {};
                const name = p.name || "Unknown";
                const isSelected = selected === name;
                const isHovered = hovered === name;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleCountryClick(name)}
                    style={{
                      default: { 
                        fill: isSelected ? "#34456a" : "#1a2234", 
                        stroke: "#2a3550", 
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: { 
                        fill: isSelected ? "#34456a" : "#26324a", 
                        cursor: "pointer",
                        outline: "none"
                      },
                      pressed: { 
                        fill: "#34456a",
                        outline: "none"
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip that follows mouse */}
        {hovered && (
          <div 
            style={{ 
              position: "fixed",
              left: mousePosition.x + 10,
              top: mousePosition.y - 30,
              padding: "8px 12px",
              borderRadius: 8,
              background: "#121826",
              color: "#e6e9ef",
              fontSize: 14,
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              pointerEvents: "none",
              zIndex: 1000,
              whiteSpace: "nowrap",
              userSelect: "none"
            }}
          >
            {hovered}
          </div>
        )}
      </div>
    </div>
  );
}
