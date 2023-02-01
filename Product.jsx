import React, {useEffect, useState} from "react";
import Catogary from "../Catogary/Catogary";
import "./Style/style.css";

function Products(){
    const [list, setList] = useState([]);

    const [popup, setPopup] = useState(true);
    const[count, setCount] = useState(1);
    const [display, setDisplay] = useState(false)
    const [display2, setDisplay2] = useState(true)
    const [index, setIndex] = useState(false);
    const [ok, setOk] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [which, setWhich] = useState(true)

    const prev = () => {
        setCount(count-1)
        setDisplay(count * 10);
        setDisplay2(count * 10 + 10)
    }

    const next = () => {
        setCount(count+1);
        setDisplay(count * 10);
        setDisplay2(count * 10 + 10)
    }


    useEffect(() => {
        fetch('https://dummyjson.com/products?skip=0&limit=100')
        .then(res => res.json())
        .then(json => setList(json.products))
        .catch(err => console.log(err))    
        })
         //This function is a prop function from Catogary component and used to get the catogary input
          const handleChange = (e) => {
            setWhich(!which)
            setFiltered(list.filter((ele) => ele.category === e.target.value));
          }

          const hovering = () => {
             setPopup(true)
          }

          const hoverStop = () => {
            setPopup(false)
          }


    return(
        <div id="product-list-page">
            <Catogary handleChange={handleChange}/>
            <h1>Top Rated Products</h1>

            <div id="product-view-page">
                {!which ? filtered && filtered.map((ele, id) => {
                    return(
                        <div key={id} id="filtered">
                            <img src={ele.thumbnail} alt="product"/>
                        </div>
                        
                    )
                }) : list && list.sort((a, b) => b.rating - a.rating).slice(display, display2).map((ele, id) => {
                    return(
                        <div key={id}>
                            <div id="product-card" onMouseOver={() => {setIndex(id); setOk(true)}} onMouseOut={() => setOk(false)}>
                           <img src={ele.thumbnail} alt={"product name"}/>
                           </div>
                        {ok && index === id ? <div id="popup">
                           <h2> {ele.category}</h2>
                            <div id="main-con">
                                <div id="img-con"><img src={ele.thumbnail} alt="product"/></div>
                                <div id="des">{ele.description}</div>
                            </div>
                        </div> : null}
                        </div>
                    )
                })}

            </div>
            {which ? 
            <div id="pagination">
            {count >= 2 ? <button onClick={prev}>Prev</button> : null}
               <h2> {count}</h2>
               {count <= 4 ? <button onClick={next}>next</button> : null}
               </div> : <button onClick={() => setWhich(!which)}>back to top products</button>}
        </div>
    )
}

export default Products;