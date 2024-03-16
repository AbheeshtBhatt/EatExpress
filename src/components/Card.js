import React from 'react'

function Card() {
  return (
    <div>
      <div>
      <div className="card mt-4" style={{"width": "18rem","maxHeight":"360px"}}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Card</p>
    <div className="container w-100">
        <select  className="m-2 h-100  bg-info">
         {
            Array.from(Array(6),(e,i)=>{
                return (
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })
         }
        </select>
        <select  className="m-2 h-100  bg-info">
            <option value="half">Half</option>
            <option value="full">Full</option>
        </select>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default Card
