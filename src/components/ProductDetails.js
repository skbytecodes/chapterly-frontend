import React from "react";
import "../styles/ProductDetails.css";

function ProductDetails({book}) {
  
  return (
    <div className="productDetails">
      <h3 style={{color:"#d51912"}}>Product Details</h3>
      <div className="prod_det text-sm">
        <p> <span className="bold_text">Publisher:</span> {book?.publisher}</p>
        <p> <span className="bold_text">Publisher Imprint:</span> {book?.publisher}</p>
        {/* <p><span className="bold_text">Depth:</span> 51</p> */}
        <p> <span className="bold_text">Language:</span> {book?.language}</p>
        <p> <span className="bold_text">Returnable:</span> Y</p>
        {/* <p><span className="bold_text">Spine Width:</span> 46 mm</p> */}
        {/* <p><span className="bold_text">Weight:</span> 1214 gr</p> */}
      </div>
      <div className="prod_det text-sm">
        <p><span className="bold_text">ISBN:</span> {book?.isbn} </p>
        <p> <span className="bold_text">Publisher Date:</span> {book?.publicationDate}</p>
        <p><span className="bold_text"> Binding:</span> {book?.format}</p>
        {/* <p><span className="bold_text"> Height:</span> 218 mm</p> */}
        <p><span className="bold_text">No of Pages:</span> {book?.pages}</p>
        <p><span className="bold_text">Series Title:</span> {book?.title}</p>
        {/* <p><span className="bold_text"> Sub Title:</span> Invincible Under the Sun VIZBIG Edition</p> */}
        {/* <p> <span className="bold_text">Width:</span> 145 mm</p> */}
      </div>
    </div>
  );
}

export default ProductDetails;
