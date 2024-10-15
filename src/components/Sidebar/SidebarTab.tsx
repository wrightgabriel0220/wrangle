import { Button } from "@chakra-ui/react";
import { View } from "../../types";
import { ReactElement } from "react";

interface SidebarTabProps {
  view: View;
  isActive: boolean;
  setSelectedViewId: React.Dispatch<React.SetStateAction<string>>;
  icon?: ReactElement;
  iconSide?: "left" | "right";
}

export default function SidebarTab({
  view,
  isActive,
  setSelectedViewId,
  icon,
  iconSide = "left",
}: SidebarTabProps) {
  return (
    <Button
      onClick={() => {
        setSelectedViewId(view.id); 
      }}
      borderRadius={0}
      className={isActive ? "sidebar-tab active" : "sidebar-tab"}
      leftIcon={iconSide === "left" ? icon : undefined}
      rightIcon={iconSide === "right" ? icon : undefined}
    >
      {view.name}
    </Button>
  );
}
