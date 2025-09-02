import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Property } from "../utils/types/Property";
import type { Room } from "../utils/types/Room";
import { customFetch } from "../utils/fetch";
import { ArrowLeft, Image } from "lucide-react";
import { priceConverter } from "../utils/priceConverter";
import BlueprintRenderer from "../components/SinglePropertyView/RoomOverlay";
import PictureModal from "../components/SinglePropertyView/PictureModal";
import BenefitListing from "../components/BenefitListing";
import VideoModal from "../components/SinglePropertyView/VideoModal";
import { Md3dRotation } from "react-icons/md";

function PropertyView() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>();
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    customFetch({
      path: `property?id=${id}`,
      method: "GET",
      jwt: localStorage.getItem("jwt"),
    }).then((response) => {
      setProperty(response.data);
      // Set mainImage to the first imageUrl if available
      if (response.data?.imageUrls?.[0]) {
        setMainImage(response.data.thumbnailImageUrl);
      }
      console.log("🚀 ~ useEffect ~ response:", response.data);
    });
  }, [id]);

  // Function to handle room click and set main image
  const handleRoomClick = (room: Room) => {
    if (room.imageUrl) {
      setMainImage(room.imageUrl);
    }
  };

  if (!property) return <div>Loading...</div>;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const placeholderImage =
    "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";

  const {
    id: propertyId,
    owner_name,
    owner_phone,
    area,
    built_year,
    price,
    room_count,
    sell,
    condition,
    propertyType,
    location,
    blueprintUrl,
    imageUrls,
    benefits,
    propertyMap,
  } = property;

  const isMobile = window.innerWidth < 640;
  const scale = isMobile ? 0.55 : 1;

  return (
    <div className="flex-col h-full w-full mt-[-60px] p-4 bg-stone-200">
      <PictureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        images={imageUrls}
        selectedImage={modalImage}
        setSelectedImage={setModalImage}
      />
      <div className="bg-white/50 p-4 mt-[80px] rounded-[2rem]">
        <div
          className="flex h-10 gap-1 items-center my-2 mb-4"
        >
          <div className="bold font-[500] sm:text-md md:text-2xl ms-2">
            {location.zipCode}. {location.city}, {location.street}{" "}
            {location.houseNumber}.
          </div>
          <div></div>
        </div>

        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 gap-2">
          <div className="rounded-[2rem] w-full lg:basis-7/12 flex gap-2">
            {/* Responsive: lg alatt csak 1 kép és a photos button a sarkában */}
            <div className="block lg:hidden relative w-full">
              <img
                onClick={() => {
                  setModalImage(
                    mainImage ?? imageUrls?.[0] ?? placeholderImage
                  );
                  setShowModal(true);
                }}
                src={mainImage ?? imageUrls?.[0] ?? placeholderImage}
                alt={`Image of property ${propertyId}`}
                className="rounded-[2rem] w-full object-cover cursor-pointer max-h-80"
              />
              {imageUrls && imageUrls.length > 1 && (
                <button
                  className="btn bg-white/30 absolute right-2 bottom-2 rounded-full text-black"
                  onClick={() => {
                    setModalImage(
                      mainImage ?? imageUrls?.[0] ?? placeholderImage
                    );
                    setShowModal(true);
                  }}
                >
                  <Image /> +{imageUrls.length - 1} photos
                </button>
              )}
            </div>
            {/* lg és felette: 3 képes elrendezés */}
            <div className="hidden lg:flex h-full w-full gap-2">
              {imageUrls && imageUrls.length > 1 ? (
                (() => {
                  // Filter out the mainImage from imageUrls
                  const sideImages = imageUrls.filter(
                    (url) => url !== mainImage
                  );
                  // Pick the first two images that are not the mainImage
                  const [side1, side2] = [
                    sideImages[0] ?? placeholderImage,
                    sideImages[1] ?? placeholderImage,
                  ];
                  return (
                    <>
                      <div className="h-full w-[70%] relative">
                        {propertyMap && (
                          <button
                            className="btn bg-white/70 absolute left-2 top-1 rounded-full z-10"
                            onClick={() => setShowVideoModal(true)}
                          >
                            <Md3dRotation size={30} color="black" />
                          </button>
                        )}

                        <img
                          onClick={() => {
                            setModalImage(
                              mainImage ?? imageUrls?.[0] ?? placeholderImage
                            );
                            setShowModal(true);
                          }}
                          src={mainImage ?? imageUrls?.[0] ?? placeholderImage}
                          alt={`Image of property ${propertyId}`}
                          className="rounded-[2rem] object-cover h-full cursor-pointer"
                        />
                        <VideoModal
                          open={showVideoModal}
                          onClose={() => setShowVideoModal(false)}
                          propertyMap={propertyMap}
                        />
                      </div>
                      <div className="h-full w-[30%] flex flex-col gap-2">
                        <img
                          onClick={() => {
                            setModalImage(side1);
                            setShowModal(true);
                          }}
                          src={side1}
                          alt={`Image 2 of property ${propertyId}`}
                          className="h-1/2 w-full object-cover rounded-[2rem] cursor-pointer"
                        />
                        <div className="h-1/2 relative ">
                          <img
                            onClick={() => {
                              setModalImage(side2);
                              setShowModal(true);
                            }}
                            src={side2}
                            alt={`Image 3 of property ${propertyId}`}
                            className="h-full w-full object-cover rounded-[2rem] cursor-pointer"
                          />
                          <button
                            className="btn bg-white/30 absolute right-2 bottom-1 rounded-full"
                            onClick={() => {
                              setModalImage(side2);
                              setShowModal(true);
                            }}
                          >
                            <Image /> +{imageUrls.length - 3} photos
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()
              ) : (
                <img
                  onClick={() => {
                    setModalImage(
                      mainImage ?? imageUrls?.[0] ?? placeholderImage
                    );
                    setShowModal(true);
                  }}
                  src={mainImage ?? imageUrls?.[0] ?? placeholderImage}
                  alt={`Image of property ${propertyId}`}
                  className="rounded-[2rem] h-full w-full object-cover max-h-100 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex-col flex p-3 rounded-[2rem] bg-emerald-200/50 basis-4/12 mx-auto items-center">
            <div className="flex-col items-between space-y-4">
              <div className="flex justify-center bold font-[1000] md:text-3xl sm:text-xl lg:text-4xl">
                {price && priceConverter(price, sell)}
              </div>
              <div>
                <BenefitListing
                  benefits={benefits}
                  className="flex gap-2 justify-center  flex-wrap"
                ></BenefitListing>
              </div>
            </div>
            <div className="divider"></div>
            <div className="overflow-hidden w-80  md:w-[600px] md:h-[300px] mx-auto flex items-center">
              <BlueprintRenderer
                blueprintUrl={blueprintUrl}
                rooms={property.rooms}
                width={600}
                height={300}
                scale={scale}
                onRoomClick={handleRoomClick}
              />
            </div>
          </div>
        </div>

        <div className="sm:flex-col md:flex md:flex-row gap-2 items-center md:h-30 ">
          <div className="stats shadow border-3 mt-2 sm:stats-vertical md:stats-horizontal w-full max-w-full  basis-7/12">
            <div className="stat justify-center flex-col items-center flex min-w-0">
              <div className="stat-title text-sm sm:text-base">Area</div>
              <div className="stat-value text-lg sm:text-xl md:text-2xl truncate">
                {area} m²
              </div>
            </div>

            <div className="stat justify-center flex-col items-center flex min-w-0">
              <div className="stat-title text-sm sm:text-base">Room count</div>
              <div className="stat-value text-lg sm:text-xl md:text-2xl truncate">
                {room_count}
              </div>
            </div>

            <div className="stat justify-center flex-col items-center flex min-w-0">
              <div className="stat-title text-sm sm:text-base">Build year</div>
              <div className="stat-value text-lg sm:text-xl md:text-2xl truncate">
                {built_year}
              </div>
            </div>
          </div>

          <div className="flex items-center basis-4/12 mt-2 m-auto h-full rounded-full">
            <button className="btn btn-success m-auto w-full rounded-[2rem]">
              Seller contacts
            </button>
          </div>
        </div>

        <div className="sm:flex-col  lg:flex-row lg:flex gap-4">
          <div className="md:basis-7/12 mt-4 flex">
            <div className="border-4 rounded-[2rem] p-4 px-6 my-auto">
              <h2 className="bold font-[800] text-xl md:text-2xl mb-3">
                Description
              </h2>
              <p className="font-[600] text-xs md:text-md">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32. The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham.
              </p>
            </div>
          </div>
          <div className="md:basis-5/12 mt-4">
            <iframe
              width="100%"
              height="300"
              loading="lazy"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(
                `${location.zipCode} ${location.city}, ${location.street} ${location.houseNumber}`
              )}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyView;
