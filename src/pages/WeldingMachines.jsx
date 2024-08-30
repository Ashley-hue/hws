import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './WeldingMachines.css'
import QuoteRequestForm from "./QuoteRequestForm";
import tig from "../components/Assets/tig.png"
import mig from "../components/Assets/migmac.png"
import inverter from "../components/Assets/inverter.png"
import arc from "../components/Assets/arc.png"
import cry from "../components/Assets/crying.jpeg"

const WeldingMachines = () => {
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

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuoteRequest = (product) => {
    setSelectedProduct(product);
    setShowQuoteForm(true);
  };

   const handleQuoteSubmit = async (quoteData) => {
     try {
       const response = await fetch("http://localhost:5000/send-quote", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(quoteData),
       });

       if (!response.ok) {
         throw new Error("Failed to send quote request");
       }

       setShowQuoteForm(false);
       alert("Quote request sent successfully!");
     } catch (error) {
       console.error("Error sending quote request:", error);
       alert("Failed to send quote request. Please try again.");
     }
   };

  const navigate = useNavigate();
  const handleImageClick = (item) => {
    console.log("Clicked item:", item);
    navigate(`/product/${item.id}`);
  };

  const categories = [
    { id: "Mig Machines", label: "Mig Machines" },
    { id: "Tig Machines", label: "Tig Machines" },
    { id: "Arc Machines", label: "Arc Machines" },
    { id: "Inverter Machines", label: "Inverter Machines" },
    { id: "Multi-welders", label: "Multi-welders" },
    { id: "Plasma Cutters", label: "Plasma Cutters" },
    { id: "Profile Cutters", label: "Profile Cutters" },
    { id: "Welding Oven", label: "Welding Oven" },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/images')
    .then(response => response.json())
    .then(data => setImages(data))
    .catch(error => console.error('Error fetching images: ', error));
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = images.filter(image =>
    (!searchTerm || (image.name || '').toLowerCase().includes(searchTerm.toLowerCase())) && (selectedCategories.length === 0 || selectedCategories.includes(image.category))
  );
  console.log("Filtered Products:", filteredProducts);

  const handleCheckboxChange = (event) => {
    const {value, checked} = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      if(checked) {
        return [...prevSelectedCategories, value];
      }
      else {
        console.log(`Removing category: ${value}`);
        return prevSelectedCategories.filter(category => category !== value);
      }
    });
  }

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>The Tig Welder</h2>
                <p>
                  Discover the art of welding with our premium TIG welder,
                  renowned for producing high-quality, precision welds on a
                  variety of metals. Perfect for intricate projects, this
                  machine offers superior control and minimal spatter, allowing
                  you to create strong, clean, and visually stunning welds. The
                  TIG welder handles aluminum, stainless steel, and exotic
                  alloys with ease.
                </p>
              </div>
              <img src={tig} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>The Mig Welder</h2>
                <p>
                  Step into a world of effortless welding with our
                  state-of-the-art MIG welder. Designed for speed and
                  versatility, this machine is your ultimate partner in tackling
                  a wide range of welding tasks. Increase your productivity and
                  enjoy the convenience of continuous wire feed and shielding
                  gas that protect your work from contamination. Make every weld
                  count with the MIG welder, where precision meets power.
                </p>
              </div>
              <img src={mig} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>The Inverter Welder</h2>
                <p>
                  Lightweight yet powerful, the inverter welder ensures you get
                  the job done with unparalleled precision and ease. Versatile
                  enough to handle TIG, MIG, and stick welding, this welder is
                  your ticket to mastering various materials, from steel to
                  aluminum. Experience reduced electricity costs and superior
                  performance, all packed in a compact design that's easy to
                  transport and store.
                </p>
              </div>
              <img src={inverter} alt="" />
            </div>
          </div>

          <div className="slider-slide">
            <div className="slide-content">
              <div className="text-content">
                <h2>The Arc Welder</h2>
                <p>
                  Embrace the power and reliability of our classic arc welder,
                  the cornerstone of any welding toolkit. Known for its
                  simplicity and durability, this machine is built to perform
                  under the toughest conditions, making it perfect for outdoor
                  and construction projects. Its robustness and
                  cost-effectiveness make it a trusted choice for strong,
                  durable welds every time. Join the ranks of satisfied welders
                  who rely on the timeless efficiency of the arc welder to get
                  the job done right.
                </p>
              </div>
              <img src={arc} alt="" />
            </div>
          </div>
        </Slider>
      </div>

      <div className="product-content">
        <div className="category-selection">
          <h4 className="category-heading">
            Category
            <span onClick={toggleCollapse}>{isCollapsed ? "▼" : "▲"}</span>
          </h4>
          {!isCollapsed && (
            <div className="categories">
              {categories.map((category) => (
                <div key={category.id} className="category-item">
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
              filteredProducts.map((image) => (
                <div key={image.filename} className="product-card">
                  <div className="text-container">
                    <h4>{image.name}</h4>
                    <p>{image.description}</p>
                    <img
                      src={`http://localhost:5000${image.url}`}
                      alt={image.filename}
                    />
                    <button
                      className="details-button"
                      onClick={() => handleImageClick(image)}
                    >
                      View Details
                    </button>
                    {/* <button
                      className="request-button"
                      onClick={() => handleQuoteRequest(image)}
                    >
                      {" "}
                      Request Quote
                    </button> */}
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
      {showQuoteForm && (
        <QuoteRequestForm
          productName={selectedProduct.name}
          onSubmit={handleQuoteSubmit}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
  );
}

export default WeldingMachines

