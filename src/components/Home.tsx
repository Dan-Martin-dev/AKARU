import Header from "../components/Header.tsx";
import "../../../akaru/src/styles/home.css";

const Home = () => {
  return (
    <div  className="home-body">

      <div className="image-container">
        <video autoPlay muted loop>
          <source
            src="/AKARU/assets/city_timelapse.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <Header />
    </div>
  );
};

export default Home;
