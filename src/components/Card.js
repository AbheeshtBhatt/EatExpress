import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


function Card({food}) {

const [qty,setQty]=useState(1);
const [size,setSize]=useState("");

let dispatch=useDispatchCart();
let data=useCart();
let options=food.options[0];
let priceOptions=Object.keys(options);

const priceRef=useRef();
let finalPrice=qty* parseInt(options[size]);
useEffect(() => {
setSize(priceRef.current.value)
}, [])


const handleAddToCart=async()=>{
  await dispatch({type:"ADD",id:food._id,name:food.name,price:finalPrice,qty:qty,size:size,image:food.img})
console.log(data);
}

  return (
    <div>
      <div>
      <div className="card mt-4" style={{"width": "18rem","maxHeight":"360px"}}>
  <img src={food.img} className="card-img-top" alt="..." style={{height:"200px",objectFit:"fill"}} />
  <div className="card-body">
    <h5 className="card-title">{food.name}</h5>
    <div className="container w-100">
        <select  className="m-2 h-100  bg-info" onChange={(e)=>setQty(e.target.value)}>
         {
            Array.from(Array(6),(e,i)=>{
                return (
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })
         }
        </select>
        <select  className="m-2 h-100  bg-info" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {
              priceOptions.map((data)=>{
                return (
                  <option key={data} value={data}>{data}</option>
                )
              })
            }
        </select>
        <div className='d-inline h-100 fs-5'> 
          Rs.{finalPrice}/-
        </div>
    </div>
    <hr />
    <button className='btn btn-primary justify-center ms-2' onClick={handleAddToCart}>Add To Cart</button>
  </div>
</div>
      </div>
    </div>
  )
}

export default Card
