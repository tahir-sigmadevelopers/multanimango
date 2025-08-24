import React from "react";

const mangoImages = [
  "https://media.istockphoto.com/id/980812590/photo/fresh-raw-mangoes.jpg?s=612x612&w=0&k=20&c=cMyKeUk3tv0r295jMTZiWLCZ_WAAsajJqR9cnafq7PA=",  
  "https://www.shutterstock.com/image-photo/ripe-mango-isolated-on-white-260nw-2500576635.jpg",  
  "https://media.istockphoto.com/id/168370138/photo/mango.webp?a=1&b=1&s=612x612&w=0&k=20&c=x8iJL8-Q6KQw8weDwH4o5o6nW0f07ho369GGkyOjF7s=",  
  "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ298ZW58MHx8MHx8fDA%3D",  
  "https://media.istockphoto.com/id/463651383/photo/mangoes-composition.webp?a=1&b=1&s=612x612&w=0&k=20&c=f3k27uCI4cJox8UDkamYqpQ9wKTFJYSlrQqfc_OSTGM=",  
  "https://plus.unsplash.com/premium_photo-1724255863045-2ad716767715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuZ298ZW58MHx8MHx8fDA%3D",  
];


const MangoGallery = () => {
  // Repeat images 2x for seamless loop
  const repeatedImages = [...mangoImages, ...mangoImages];

  return (
    <section className="bg-yellow-50 py-24 px-4 overflow-hidden mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-700 text-center mb-12">
        Our Premium Mangoes 🥭
      </h2>

      <div className="relative w-full h-72 overflow-hidden">
        <div className="flex w-max animate-loop-scroll space-x-6">
          {repeatedImages.map((src, idx) => (
            <div
              key={idx}
              className="w-64 h-64 min-w-[16rem] flex-shrink-0 rounded-3xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-500"
            >
              <img
                src={src}
                alt={`Mango ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MangoGallery;
