// const compose=function(functions){

const { result } = require("lodash")

//     return function(x){
// return functions.reduceRight((acc,fn)=>fn(acc),x)
//     }
// }


// const x = 1;
// const result = compose(functions)(x);
// console.log(result);


// const hello=(words,ch)=>{
//     let index=words.indexOf(ch)

//     if(index===-1) return words

//     return ch+words.slice(0,index)+words.slice(index+1)
// }

// console.log(hello("abcdef","d"));


// const hello=(nums,init,fn)=>{

//     return nums.reduce((acc,curr)=>fn(acc,curr),init)

// }

// console.log(hello([1,2,3,4],100,function sum(accum, curr) { return accum + curr * curr; }
//     ));


// let hello=(n)=>{

//     let res1=n.toString().split('').reduce((acc,curr)=>acc*Number(curr),1)
//     let res2=n.toString().split('').reduce((acc,curr)=>acc+Number(curr),0)

//     return res1-res2
// }

// console.log(hello(4421));


// let hello=(s,k)=>{

//     return s.split(' ').slice(0,k).join(' ')

// }
// console.log(hello("Hello how are you Contestant",4));

// let hello=(n)=>{
//     let sum=0
//   for(let i=0;i<=n;i++){
//      if(i%3==0 | i%5==0| i%7==0){
//       sum+=i    
//      }
//   }
//   return sum
// }
// console.log(hello(10));


// let sorted=(list1,list2)=>{
//    let res1=list1.concat(list2)
// return res1.sort((a,b)=>a-b)

// }
// console.log(sorted([1,2,4],[1,3,4]));

// let people=(names,heights)=>{
// return names.map((name,index)=>({name,height:heights[index]}))
// .sort((a,b)=>a.height-b.height)
// .map(person=>person.name)
// }
// console.log(people(["Alice","Bob","Bob"],[155,185,150]));

let sum=(str)=>{

   let res=''
   for(let i=0;i<=str.length;i++){
      
   }

}



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { setProducts, editProduct } from "../slice/adminSlice";
import api from '../axiosIntence'

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const deleteProduct = async () => {
    if (productToDelete) {
      try {
        await api.delete(`/admin/products/${productToDelete._id}`); 
        dispatch(setProducts(products.filter((product) => product._id !== productToDelete._id)));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('price', e.target.price.value);
    formData.append('stock', e.target.stock.value);
    formData.append('categories', e.target.category.value);
    formData.append('description', e.target.description.value);
    if (imageFile) {
      formData.append('images', imageFile);
    }
    try {
      await dispatch(editProduct({ 
        _id: currentProduct._id, 
        updatedProduct: formData 
      }));
      setIsEditing(false);
      setCurrentProduct(null);
      setImagePreview("");
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All"
      ? true
      : product.categories?.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div>
      <h2 className="text-xl font-bold">Products</h2>
      <div className="flex space-x-4 mb-4">
        {["All", "Men", "Women"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-4 flex justify-end">
        <Link to="/admin/add" className="bg-green-500 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product._id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.categories}</td>
                <td className="border p-2">
                  <img 
                    src={product.images?.url || product.images} // Handle both object and string
                    alt={product.name} 
                    className="h-12 w-12 object-cover" 
                  />
                </td>
                <td className="border p-2">
                  <button onClick={() => { setProductToDelete(product); setIsDeleteModalOpen(true); }} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  <button onClick={() => { setIsEditing(true); setCurrentProduct(product); }} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Edit</button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input type="text" name="name" defaultValue={currentProduct.name} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input type="number" name="price" defaultValue={currentProduct.price} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Stock</label>
                <input type="number" name="stock" defaultValue={currentProduct.stock} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select name="category" defaultValue={currentProduct.categories} className="p-2 border w-full" required>
                  <option value="men">men</option>
                  <option value="women">women</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Product Image</label>
                <input 
                  type="file" 
                  name="image"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="p-2 border w-full"
                />
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mt-2 h-24 w-24 object-cover"
                  />
                )}
                {!imagePreview && currentProduct.images && (
                  <img 
                    src={currentProduct.images?.url || currentProduct.images} // Handle both object and string
                    alt="Current" 
                    className="mt-2 h-24 w-24 object-cover"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea name="description" defaultValue={currentProduct.description} className="p-2 border w-full" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-md">
            <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
            <p className="mb-4">Do you really want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Products;