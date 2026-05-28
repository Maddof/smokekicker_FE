import DropdownMenu from "./DropdownMenu";
import SmallDot from "../circleDotAuthStatus";

export default function DropdownMenuWrapper() {
  return (
    <div className="relative flex">
      <DropdownMenu className="h-6 w-6" />
      <SmallDot />
    </div>
  );
}
