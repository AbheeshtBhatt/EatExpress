import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


function Home() {
  const [search,setSearch]=useState('');
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItems, setfoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();

    setfoodItems(response[0]);
    setfoodCategory(response[1]);

  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
        <div className="carousel-inner" id='carousal'>
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pasta" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className='container'>
        {
          foodCategory !== []
            ? foodCategory.map((data) => {
              return (
                <div className='row mb-3'>
                 <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItems!==[]
                  ? foodItems.filter((item)=>(item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filteredItem=>{
                    return (
                      <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                        <Card food={filteredItem}/>
                      </div>
                    )
                  }):""
                }
                </div>
               
              )
            }) : <div>loading</div>
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home
