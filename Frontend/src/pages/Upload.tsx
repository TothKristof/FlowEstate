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
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const methods = useForm<Property>({
    mode: "onChange",
  });
  const { trigger } = methods;
  const [step, setStep] = useState(1);
  const [conditions, setConditions] = useState<string[] | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<string[] | null>(null);
  const stepFields: string[][] = [
    ["owner_name", "owner_phone"],
    ["area", "condition", "price", "room_count", "property_type", "sell", "built_year"],
    ["location.city", "location.street", "location.houseNumber", "location.zipCode"],
    ["imageUrls"],
    []
  ];


  const steps = [
    { label: "Personal Data", element: <PersonalData/> },
    { 
      label: "Property Details", 
      element: <PropertyDetails conditions={conditions ?? []} propertyTypes={propertyTypes ?? []} /> 
    },
    { label: "Location", element: <LocationDetails /> },
    { label: "Pictures", element: <PictureSelect/> },
    { label: "Summary", element: <Summary /> },
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
    }).then(response => {
      console.log("🚀 ~ uploadProperty ~ response:", response.data)
      navigate(`/main/property/${response.data}`);
    });
  }


  return (
    <FormProvider {...methods}>
      <form>
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
                type="button"
                className="btn btn-neutral rounded-full h-10 w-10 p-0 m-2"
                onClick={() => setStep(step - 1)}
                disabled={step <= 1}
              >
                <ArrowLeft />
              </button>
              {step !== steps.length ? (
                <button
                  type="button"
                  className="btn btn-neutral rounded-full h-10 w-10 p-0"
                  onClick={async () => {
                    const valid = await trigger(stepFields[step - 1]);
                    console.log("🚀 ~ valid:", valid);
                    if (valid) {
                      setStep(step + 1);
                    }
                  }}
                  disabled={step >= steps.length}
                >
                  <ArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={methods.handleSubmit(uploadProperty)}
                  className="btn btn-success rounded-[2rem] w-30"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Upload;