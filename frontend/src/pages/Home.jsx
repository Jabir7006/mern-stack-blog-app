import React, { useContext } from "react";
import Hero from "../components/Hero";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <main>
      <div className="container mx-auto">
        <Hero />
        <div className="grid grid-cols-2">
          <div className="border-r-2 border-gray-300 col-span-1">
            <p>Category Page</p>
          </div>

          <div className="col-span-2">
            {user.fullName ? <p>Hello {user.fullName}</p> : "not Regisater"}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
