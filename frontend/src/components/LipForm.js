import React from 'react';


const LipForm = (props) => {
  
  return (
    <div className="LipForm">
      <div>
        
        

        <section className="Index">
          <h4 className = 'Lip_id'>{props.id}</h4>
        </section>

        <section className="Index6">  
          <img height = "200" width = "200" src={props.thumbnail} alt='new' />  
        </section>

        <section className="Index1">  
          <h4 id = 'Lip_name' >{props.name}</h4>  
        </section>
        
        

        <section className="Index2">
          <h4 className = 'Lip_price'>{props.price}원</h4>
        </section> 

        <section className="Index3">
          <h4 className = 'Lip_category'>{props.category}</h4>
        </section>

        <section className="Index4">
          <h4 className = 'Lip_brand'>{props.brand_id}</h4>
        </section>

        <section className="Index5">
          <h4 className = 'Lip_color'>{props.color}</h4>
        </section>

         
      
      </div>
    </div>
  );
};

export default LipForm;