export default function AboutSection() {
  return (
    <section className="px-12 py-16 grid grid-cols-3 items-center justify-between">
      <div className="my-4 col-span-2">
        <h1 className="text-4xl font-bold mb-6 font-playfair">
          Siapa <span className="text-[#C67C4E]">Kami?</span>
        </h1>
        <div className="flex flex-col gap-2 max-w-4xl">
          <p className="text-md font-lato">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nulla temporibus, optio iure veniam laboriosam, expedita officiis non sed animi tempora facilis culpa. Illo, beatae. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ipsum error, facere voluptates quasi repellat magni iure accusamus aut est rem.
          </p>
          <p className="text-md font-lato">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur inventore cum facilis! Quod ullam repudiandae perspiciatis velit id quidem dolores voluptatum dolorem. Libero laudantium sunt consectetur voluptatem totam sapiente
            nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, consectetur nisi, esse iure nobis vel dolore explicabo architecto sit, quaerat repellat! Expedita amet maxime eius!
          </p>
          <p className="text-md font-lato">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque voluptas reiciendis recusandae esse eum eaque a neque voluptates, quasi, odio, quam molestias! Vitae laboriosam dolore incidunt nam quaerat autem dicta beatae, ex
            fugiat aliquam, distinctio ratione voluptatem inventore perferendis nemo sunt deleniti error illum obcaecati, sint cumque id est sed.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center justify-center col-span-1"></div>
    </section>
  );
}
