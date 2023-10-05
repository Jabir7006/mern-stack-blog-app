import React from "react";

const Hero = () => {
  return (
    <section className="h-[80vh] flex items-center">
      <div className="container mx-auto">
        <div className="hero bg-base-200">
          <div className="hero-content flex items-center gap-12">
            <img className="object-cover h-[350px] rounded-lg shadow-2xl" src="https://preview.colorlib.com/theme/magdesign/images/post_lg_3.jpg" />
            <div>
              <h1 className="text-5xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, consequuntur.</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
