export default function AboutUs() {
  const teamMembers = [
    {
      name: "Aditya",
      uid: "22BSC10175",
      image: "/path-to-image/john-doe.jpg",
    },
    {
      name: "Raj",
      uid: "22BSC10151",
      image: "/path-to-image/jane-smith.jpg",
    },
    {
      name: "Aryan",
      uid: "22BSC10158",
      image: "/path-to-image/emily-johnson.jpg",
    },
    {
      name: "Sujal",
      uid: "22BSC10037",
      image: "/path-to-image/emily-johnson.jpg",
    },
  ];

  return (
    <div className="bg-gray-600 min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">Meet Our Team</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* <img
                src={member.image}
                alt={member.name}
                className="h-40 w-40 object-cover mx-auto rounded-full mb-4"
              /> */}
              <h2 className="text-2xl font-semibold text-center">
                {member.name}
              </h2>
              <p className="text-center text-white">{member.uid}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
