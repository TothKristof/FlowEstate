import Card from "../Card";

function InformationBlock2() {
  const cardData = [
    {
      pic_src:
        "https://res.cloudinary.com/cloudinary-marketing/images/w_1540,h_847/f_auto,q_auto/v1649719151/Web_Assets/blog/video_upload_22341ba3c4/video_upload_22341ba3c4-png?_i=AA",
      title: "Step 1",
      description: "Upload a video of your property walkthrough",
    },
    {
      pic_src:
        "https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Step 2",
      description:
        "Select the key frames where you want to enable navigation points",
    },
    {
      pic_src:
        "https://images.unsplash.com/photo-1742415106160-594d07f6cc23?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Step 3",
      description:
        "Connect the navigation points and enjoy the 3D walkthrough of your property",
    },
  ];
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">How to Use</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cardData.map((card, index) => (
          <Card
            key={index}
            pic_src={card.pic_src}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </>
  );
}

export default InformationBlock2;
