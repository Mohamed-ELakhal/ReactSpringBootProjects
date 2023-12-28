import { useQuery } from '@tanstack/react-query';
import { useParams ,useLocation  } from 'react-router-dom';
import {getAllProducts} from "../util/http";
import Products from "./products/Products";
import Pagination from "./pagination/Pagination";
import { useEffect, useState } from 'react';
const Home=()=>{
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const pageNumberString  = queryParams.get('pageNumber');
  const categoryIdString  = queryParams.get('categoryId');
  const searchString  = queryParams.get('search');
  let pageNumber=1;
  if(pageNumberString)
    pageNumber=parseInt(pageNumberString, 10);
  


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['/',pageNumberString ,categoryIdString,searchString],
        queryFn:()=> getAllProducts(pageNumber,categoryIdString,searchString,20),
      });
      let content = <p>Please enter a search term and to find events.</p>;
      if(data){
        console.log(pageNumber);
        console.log(categoryIdString);
        content=data.content.map((product) => <Products key={product.id} product={product} />);
      }
    return (
      <>
      <section className="main-section">
    <div className="container">
    <div className="row">{
      content
      }
      </div>
    </div>
  </section>
  {data &&<Pagination  pageNumber={pageNumber} totalPages={data.totalPages}></Pagination>}
      </>
      
    )
}
export default Home;