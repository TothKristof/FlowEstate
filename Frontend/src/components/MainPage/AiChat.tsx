import React from "react";
import { useState } from "react";
import { getGroqChatCompletion } from "../../utils/AiRequest";
import type { Filter } from "../../utils/types/Filter";

interface AiChatProps {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  filteredSearch: (filter: Filter) => void;
}

function AiChat({ filters, setFilters, filteredSearch }: AiChatProps) {
  const [propertyDeatilsText, setPropertyDeatilsText] = useState<string>("");

  const handleSearch = async () => {
    const chatCompletion = await getGroqChatCompletion({
      systemContent: `
      Te egy ingatlan asszisztens vagy.
      Az a feladatod, hogy a felhasználó üzenetéből készíts egy JSON objektumot, 
      ami az alábbi kulcsokat tartalmazza (és csak ezeket!):
      ${JSON.stringify(filters, null, 2)}

      Ha egy mezőt nem tudsz kitalálni, hagyd null értéken.
      A választ csak érvényes JSON formátumban add vissza, semmi mást ne írj köré.
    `,
      content: propertyDeatilsText,
    });

    const result = chatCompletion.choices[0]?.message?.content || "";
    console.log("AI válasza:", result);

    try {
      const parsedFilters = JSON.parse(result);
      setFilters(parsedFilters);
      filteredSearch(parsedFilters);
    } catch (err) {
      console.error("❌ Nem sikerült JSON-ná alakítani a választ:", err);
    }
  };

  return (
    <div className="flex flex-col items-between justify-between h-70 w-70 bg-white absolute bottom-1 right-17 rounded-lg p-2 border-2 border-success">
      <h5 className=" text-2xl font-bold">
        Tell us what type of property you are looking for
      </h5>
      <div className="flex flex-col items-center justify-center">
        <textarea
          value={propertyDeatilsText}
          onChange={(e) => setPropertyDeatilsText(e.target.value)}
          maxLength={300}
          placeholder="Property details"
          className="textarea w-full h-20 resize-none"
        />
      </div>
      <button className="btn btn-success rounded-full" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default AiChat;
