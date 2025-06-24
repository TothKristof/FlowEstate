import { useEffect, useState } from "react";
import Gradient from "../assets/gradient.png";
import { ArrowLeft, ArrowRight} from "lucide-react";
import PersonalData from "../components/UploadForms/PersonalDetailsForm";
import PropertyDetails from "../components/UploadForms/PropertyDetails";
import LocationDetails from "../components/UploadForms/LocationDetailsForm";
import PictureSelect from "../components/UploadForms/PictureSelectForm";
import Summary from "../components/UploadForms/Summary";
import "../styling/update.css";
import { customFetch } from "../utils/fetch";
import type { Property } from "../utils/types/Property";

function Upload() {
  const [step, setStep] = useState(1);
  const [conditions, setConditions] = useState<string[] | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<string[] | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<Property>({
    id: null,
    owner_name: null,
    owner_phone: null,
    area: null,
    built_year: null,
    price: null,
    room_count: null,
    sell: true,
    condition: null,
    property_type: null,
    location: {
      city: "",
      street: "",
      houseNumber: "",
      zipCode: 0,
    },
    imageUrls: null
  });

  
  const handleChange = (field: string, value: string | number | boolean | null | string[]) => {
    setPropertyDetails((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        if (parent === "location" && child in prev.location) {
          return {
            ...prev,
            location: { ...prev.location, [child]: value },
          };
        }
      }
      return { ...prev, [field]: value };
    });
  };

  const steps = [
    { label: "Personal Data", element: <PersonalData handleChange={handleChange} propertyDetails={propertyDetails} /> },
    { 
      label: "Property Details", 
      element: <PropertyDetails handleChange={handleChange} propertyDetails={propertyDetails} conditions={conditions ?? []} propertyTypes={propertyTypes ?? []} /> 
    },
    { label: "Location", element: <LocationDetails handleChange={handleChange} propertyDetails={propertyDetails} /> },
    { label: "Pictures", element: <PictureSelect propertyDetails={propertyDetails} handleChange={handleChange} /> },
    { label: "Summary", element: <Summary propertyDetails={propertyDetails} /> },
  ];

  useEffect(() => {
    customFetch({
      path: "property/options",
      method: "GET",
      jwt: localStorage.getItem("jwt"),
    }).then((response) => {
      console.log(response.data);
      setConditions(response.data.conditions);
      setPropertyTypes(response.data.propertyTypes);
    });
  }, []);

  function uploadProperty(property: Property) {
    customFetch({
      path: "property/upload",
      method: "POST",
      body: property,
      jwt: localStorage.getItem("jwt"),
    });
  }


  return (
    <div
      className="h-[105dvh] bg-center bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="w-[70%] bg-white shadow-sm md:p-2 rounded-[1rem] h-150 flex-col justify-between">
        <div className="w-full flex h-20">
          <ul className="steps mx-auto steps-vertical md:steps-horizontal">
            {steps.map((s, index) => (
              <li
                key={index}
                className={`step ${step > index ? "step-success" : ""}`}
              >
                {s.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-110 flex items-center justify-center">
          <div className="formdiv">
            {steps[step - 1].element}
          </div>
        </div>
        <div className="flex justify-end items-center h-20">
          <button
            className="btn btn-neutral rounded-full h-10 w-10 p-0 m-2"
            onClick={() => setStep(step - 1)}
            disabled={step <= 1}
          >
            <ArrowLeft />
          </button>
          {step !== steps.length ? (
            <button
              className="btn btn-neutral rounded-full h-10 w-10 p-0"
              onClick={() => setStep(step + 1)}
              disabled={step >= steps.length}
            >
              <ArrowRight />
            </button>
          ) : (
            <button
              className="btn btn-success rounded-[2rem] w-30"
              onClick={() => uploadProperty(propertyDetails)}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;