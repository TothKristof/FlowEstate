
interface CardProps {
  pic_src: string;
  title: string;
  description: string;
}

function Card({ pic_src, title, description }: CardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-48 overflow-hidden">
        <img
          src={pic_src}
          className="w-full h-full object-cover"
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
}

export default Card;
