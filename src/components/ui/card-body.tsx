interface Profile {
  id: number;
  name: string;
  email: string;
  old: number;
  skills: string[];
}

export const CardBody = ({ profiles }: { profiles: Profile }) => {
  return (
    <div className="px-6 py-3 shadow-md border border-gray-200 rounded-lg bg-[#F1F0EE] hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold font-playfair">{profiles.name}</h3>
      <p className="line-clamp-1 font-lato">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur veniam suscipit ad nisi enim deleniti!</p>
      <div className="mt-6">
        <p className="text-md font-lato">{profiles.email}</p>
      </div>
    </div>
  );
};
