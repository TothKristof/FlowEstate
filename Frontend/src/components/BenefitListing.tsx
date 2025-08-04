import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import type { Benefit } from "../utils/types/Benefit";

const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    if (iconName.startsWith("Fa")) return FaIcons[iconName as keyof typeof FaIcons];
    if (iconName.startsWith("Md")) return MdIcons[iconName as keyof typeof MdIcons];
    return null;
  };

  interface BenefitListingProps {
    benefits: Benefit[];
    choosenBenefits: Benefit[];
    handleBenefitClick: (benefit: Benefit) => void;
    className : string
    text: boolean
}

function BenefitListing({benefits, choosenBenefits, handleBenefitClick, className, text}:BenefitListingProps) {
  return (
    <div className={className}>
        {benefits && benefits.map((benefit) => {
            const IconComponent = getIconComponent(benefit.icon);

            return (
              <div
                key={benefit.name}
                className={`flex flex-col items-center gap-1 px-2 py-1 border rounded-lg cursor-pointer ${choosenBenefits && choosenBenefits.some((b) => b.name === benefit.name) ? `bg-success` : `bg-white`}`}
                onClick={() => handleBenefitClick(benefit)}
              >
                {IconComponent && <IconComponent className="text-3xl" />}
                {text && <span className="">{benefit.name}</span>}
              </div>
            );
          })}
    </div>
  )
}

export default BenefitListing