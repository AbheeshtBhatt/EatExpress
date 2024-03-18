import React from 'react'

function Card({food}) {

let options=food.options[0];
let priceOptions=Object.keys(options);

  return (
    <div>
      <div>
      <div className="card mt-4" style={{"width": "18rem","maxHeight":"360px"}}>
  <img src={food.img} className="card-img-top" alt="..." style={{height:"200px",objectFit:"fill"}} />
  <div className="card-body">
    <h5 className="card-title">{food.name}</h5>
    <div className="container w-100">
        <select  className="m-2 h-100  bg-info">
         {
            Array.from(Array(6),(e,i)=>{
                return (
                    <option key={i+1} value={i+1}>{food.option}</option>
                )
            })
         }
        </select>
        <select  className="m-2 h-100  bg-info">
            {
              priceOptions.map((data)=>{
                return (
                  <option key={data} value={data}>{data}</option>
                )
              })
            }
        </select>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default Card
