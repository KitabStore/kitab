import React from 'react'

const ProductsPlaceholder = ({postsPerPage}) => {
    let posts = [];
    for(let i=1; i <= postsPerPage; i++){
        posts.push(i);
    }
  return (
    <div  className='row p-0'>
        {posts.map((post, index) => {
            return(
                <div className='col-6 col-sm-4 col-lg-2 product-placeholder' aria-hidden="true" key={index}>
                    <div className='card bg-dark mb-3 placeholder-glow'>
                        <div className='mask image-placeholder bg-light placeholder rounded-top'></div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-wave">
                                <span className="placeholder bg-light col-12"></span>
                            </h5>
                            <p className="card-text placeholder-glow m-0">
                                <span className="placeholder bg-light col-7"></span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ProductsPlaceholder;