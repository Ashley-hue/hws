import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WeldingMachines.css";
import "./WeldingRods.css";
import advrods from "../components/Assets/adsrod.png";
import adrod from "../components/Assets/welro.png";
import migwire from "../components/Assets/migg.png";
import weldro from "../components/Assets/e6010.png";
import cry from "../components/Assets/crying.jpeg";

const WeldingRods = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const navigate = useNavigate();
  const handleImageClick = (item) => {
    console.log("Clicked item:", item);
    navigate(`/product/${item.id}`);
  };


  const categories = [
    { id: "6010", label: "E 6010" },
    { id: "E6013", label: "Mild Steel" },
    { id: "E7018", label: "Low Hydrogen" },
    { id: "Cast Iron", label: "Cast Iron" },
    { id: "Flyer", label: "Filler Rods" },
    { id: "Aluminium", label: "Aluminium Rods" },
    { id: "Migwire", label: "Mig Wire" },
  ];

  const [collapsedSections, setCollapsedSections] = useState({
    rods: false,
    brand: false,
    size: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [rods, setRods] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const rodCategories = [
          "6010",
          "E6013",
          "E7018",
          "Cast Iron",
          "Flyer",
          "Aluminium",
          "Migwire"
        ];

        const imagesRef = collection(db, "images");
        const q = query(imagesRef, where("category", "in", rodCategories));

        const querySnapshot = await getDocs(q);
        const imagesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            url: data.downloadUrl,
          };
        });

        setRods(imagesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images: ", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const toggleCollapse = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = rods.filter(
    (rod) =>
      (!searchTerm ||
        (rod.name || "").toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(rod.category))
  );
  console.log("Filtered Products:", filteredProducts);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, value];
      } else {
        return prevSelectedCategories.filter((category) => category !== value);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Welding Rods</h2>
                <p>
                  Transform your welding projects with our premium welding rods!
                  Designed for superior strength and precision, they guarantee
                  flawless, high-quality welds every time. Trusted by
                  professionals, our welding rods deliver unmatched performance
                  and reliability.
                </p>
              </div>
              <img src={advrods} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Mild Steel</h2>
                <p>
                  Achieve smooth, clean welds effortlessly with E6013 welding
                  rods! Ideal for beginners and professionals alike, these rods
                  offer easy arc striking and minimal spatter. Perfect for thin
                  metal sheets, E6013 ensures high-quality, aesthetically
                  pleasing welds every time.
                </p>
              </div>
              <img src={adrod} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Low Hydrogen</h2>
                <p>
                  Elevate your welding projects with E7018 welding rods, known
                  for their excellent arc stability and low hydrogen content.
                  These rods are perfect for structural welding, providing
                  superior strength and crack-resistant welds. Trust E7018 for
                  top-notch, durable results.
                </p>
              </div>
              <img src={weldro} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Mig Wire</h2>
                <p>
                  Optimize your welding process with top-quality MIG wires!
                  Known for their consistent feed and minimal spatter, our MIG
                  wires provide clean, strong welds on a variety of metals.
                  Choose MIG wires for reliable, high-speed welding performance
                  and exceptional finish.
                </p>
              </div>
              <img src={migwire} alt="" />
            </div>
          </div>
        </Slider>
      </div>

      <div className="product-contents">
        <div className="categories-container">
          <div className="category-selections">
            <h4 className="category-heading">
              Rods
              <span onClick={() => toggleCollapse("rods")}>
                {collapsedSections.rods ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.rods && (
              <div className="categories">
                {categories.map((category) => (
                  <div key={category.id} className="category-items">
                    <input
                      type="checkbox"
                      id={category.id}
                      value={category.id}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={category.id}>{category.label}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="productss">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchinput"
            />
          </div>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((rod) => (
                <div key={rod.filename} className="product-card">
                  <div className="text-container">
                    <h4>{rod.name}</h4>
                    <p>{rod.description}</p>
                    <img
                      src={rod.downloadUrl}
                      alt={rod.filename}
                    />
                    <button
                      className="details-button"
                      onClick={() => handleImageClick(rod)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Sorry! Not in stock!</p>
                <img src={cry} alt="crying" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeldingRods;
