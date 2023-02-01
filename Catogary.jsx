import React from "react";


function Catogary({handleChange}){

    const catogaries = ["smartphones","laptops","fragrances","skincare","groceries","home-decoration","furniture","tops","womens-dresses","womens-shoes","mens-shirts","mens-shoes","mens-watches","womens-watches","womens-bags","womens-jewellery","sunglasses","automotive","motorcycle","lighting"]

    return(
        <div>
           <form>
            <label>Search Products by catogaries</label>
            <select onChange={handleChange}>
                 {catogaries.map((ele, id) => {
                    return(
                        <option key={id}>
                            {ele}
                        </option>
                    )
                 })}
            </select>
           </form>
        </div>
    )
}

export default Catogary;