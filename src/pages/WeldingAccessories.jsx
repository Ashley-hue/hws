import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WeldingMachines.css";
// import "./WeldingRods.css";
import grindr from "../components/Assets/grinder.png";
import gloves from "../components/Assets/welgloves.png";
import helmet from "../components/Assets/welhel.png";
import regulator from "../components/Assets/acereg.png";
import cry from "../components/Assets/crying.jpeg";

const WeldingAccessories = () => {
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
    const itemwithUrl = {
      ...item,
      image: `http://localhost:5000${item.url}`,
    };
    navigate("/description", { state: itemwithUrl });
  };

  const categories = [
    { id: "Glue", label: "Loctite" },
    { id: "Pipe", label: "Pipes" },
    { id: "Cable Tie", label: "Cable Tie" },
  ];

  const toools = [
    { id: "Grinder", label: "Grinders" },
    { id: "Regulator", label: "Regulators" },
    { id: "Mig Parts", label: "Mig Parts" },
    { id: "Tig Parts", label: "Tig Parts" },
    { id: "Gauge", label: "Gauges" },
    { id: "Brush", label: "Wire Brush" },
    { id: "Clamps", label: "Earth Clamp" },
    { id: "Tape", label: "Measuring Tape" },
    { id: "Electrode Holder", label: "Electrode Holder" },
    { id: "Compressor", label: "Air Compressor" },
  ];

  const safety = [
    { id: "Helmet", label: "Helmets" },
    { id: "Gloves", label: "Welding Gloves" },
    { id: "Apron", label: "Welding Aprons" },
    { id: "Goggles", label: "Welding Goggles" },
    { id: "Glass", label: "Welding Glass" },
  ];

  const consumables = [
    { id: "Tungsten", label: "Tungsten" },
    { id: "Flux", label: "Flux" },
    { id: "Gel", label: "Tip Guard Paste" },
    { id: "Welding Spray", label: "Welding Spray" },
  ];

  const discs = [
    { id: "Grinding", label: "Grinding Disc" },
    { id: "Cutting", label: "Cutting Disc" },
    { id: "Fibre Disc", label: "Fibre Disc" },
  ];

  const [collapsedSections, setCollapsedSections] = useState({
    accessorise: false,
    consumable: false,
    disc: false,
    safeti: false,
    tools: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [accessories, setaccessories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/accessories")
      .then((response) => response.json())
      .then((data) => setaccessories(data))
      .catch((error) => console.error("Error fetching images: ", error));
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

  const filteredProducts = accessories.filter(
    (accessory) =>
      (!searchTerm ||
        (accessory.name || "").toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(accessory.category))
  );
  console.log("Filtered Products:", filteredProducts);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, value];
      } else {
        console.log(`Removing category: ${value}`);
        return prevSelectedCategories.filter((category) => category !== value);
      }
    });
  };

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Bosch Grinder </h2>
                <p>
                  Experience unmatched precision and power with the Bosch
                  Grinder. Engineered for professional welders, this robust tool
                  offers superior performance for cutting, grinding, and
                  polishing. With its ergonomic design and advanced safety
                  features, the Bosch Grinder ensures smooth, effortless
                  operation, making it the perfect addition to your welding
                  toolkit.
                </p>
              </div>
              <img src={grindr} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Welding Gloves</h2>
                <p>
                  Protect your hands with our premium Welding Gloves, designed
                  for maximum safety and comfort. Crafted from high-quality,
                  heat-resistant materials, these gloves provide excellent
                  dexterity while shielding your hands from sparks, heat, and
                  abrasions. Stay safe and work efficiently with the best
                  protection in the industry.
                </p>
              </div>
              <img src={gloves} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Auto-Darkening Helmet</h2>
                <p>
                  Upgrade your safety gear with our Auto-Darkening Welding
                  Helmet. Featuring state-of-the-art technology, this helmet
                  automatically adjusts its shade to provide optimal visibility
                  and protection. Lightweight and comfortable, it offers a clear
                  view of your work while protecting your eyes from harmful UV
                  and IR radiation. Enhance your welding experience with
                  ultimate safety and convenience.
                </p>
              </div>
              <img src={helmet} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>Regulators</h2>
                <p>
                  Achieve precise gas control with our range of high-quality
                  Regulators for O2, CO2, and Acetylene. Designed for
                  reliability and accuracy, these regulators ensure a consistent
                  flow of gas, enhancing the quality of your welds. Durable and
                  easy to use, they are essential for any professional welding
                  setup, providing safety and efficiency in every project.
                </p>
              </div>
              <img src={regulator} alt="" />
            </div>
          </div>
        </Slider>
      </div>

      <div className="product-content">
        <div className="categories-container">
          <div className="category-selections">
            <h4 className="category-heading">
              Accessories
              <span onClick={() => toggleCollapse("accessorise")}>
                {collapsedSections.accessorise ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.accessorise && (
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

          <div className="category-selections">
            <h4 className="category-heading">
              Tools & Equipment
              <span onClick={() => toggleCollapse("tools")}>
                {collapsedSections.tools ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.tools && (
              <div className="categories">
                {toools.map((category) => (
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

          <div className="category-selections">
            <h4 className="category-heading">
              Safety Gear
              <span onClick={() => toggleCollapse("safeti")}>
                {collapsedSections.safeti ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.safeti && (
              <div className="categories">
                {safety.map((category) => (
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

          <div className="category-selections">
            <h4 className="category-heading">
              Consumables
              <span onClick={() => toggleCollapse("consumable")}>
                {collapsedSections.consumable ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.consumable && (
              <div className="categories">
                {consumables.map((category) => (
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

          <div className="category-selections">
            <h4 className="category-heading">
              Discs
              <span onClick={() => toggleCollapse("disc")}>
                {collapsedSections.disc ? "▼" : "▲"}
              </span>
            </h4>
            {!collapsedSections.disc && (
              <div className="categories">
                {discs.map((category) => (
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
        <div className="products">
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
              filteredProducts.map((accessory) => (
                <div key={accessory.filename} className="product-card">
                  <div className="image-container">
                    <img
                      src={`http://localhost:5000${accessory.url}`}
                      alt={accessory.filename}
                    />
                  </div>
                  <div className="text-container">
                    <h4>{accessory.name}</h4>
                    <p>{accessory.description}</p>
                    <button className="details-button" onClick={() => handleImageClick(accessory)}> View Details </button>
                    <button className="request-button"> Request Quote</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Well, this is awkward...</p>
                <img src={cry} alt="crying" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeldingAccessories;
