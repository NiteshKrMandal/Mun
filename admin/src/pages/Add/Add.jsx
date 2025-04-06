// // import React, { useState } from "react";
// // import "./Add.css";
// // import { assets } from "../../assets/assets";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // const Add = ({ url }) => {
// //   const [image, setImage] = useState(false);
// //   const [data, setData] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     category: "Salad",
// //   });

// //   const onChangeHandler = (event) => {
// //     const name = event.target.name;
// //     const value = event.target.value;
// //     setData((data) => ({ ...data, [name]: value }));
// //   };

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();
// //     const formData = new FormData();
// //     formData.append("name", data.name);
// //     formData.append("description", data.description);
// //     formData.append("price", Number(data.price));
// //     formData.append("category", data.category);
// //     formData.append("image", image);
// //     const response = await axios.post(`${url}/api/food/add`, formData);
// //     if (response.data.success) {
// //       setData({
// //         name: "",
// //         description: "",
// //         price: "",
// //         category: "Salad",
// //       });
// //       setImage(false);
// //       toast.success(response.data.message);
// //     } else {
// //       toast.error(response.data.message);
// //     }
// //   };

// //   return (
// //     <div className="add">
// //       <form className="" onSubmit={onSubmitHandler}>
// //         <div className="add-img-upload">
// //           <p>Upload Image</p>
// //           <label htmlFor="image">
// //             <img
// //               src={image ? URL.createObjectURL(image) : assets.upload_area}
// //               alt=""
// //             />
// //           </label>
// //           <input
// //             onChange={(e) => setImage(e.target.files[0])}
// //             type="file"
// //             id="image"
// //             hidden
// //             required
// //           />
// //         </div>
// //         <div className="add-product-name flex-col">
// //           <p>Product name</p>
// //           <input
// //             onChange={onChangeHandler}
// //             value={data.name}
// //             type="text"
// //             name="name"
// //             placeholder="Type Here"
// //           />
// //         </div>
// //         <div className="add-product-description flex-col">
// //           <p>Product description</p>
// //           <textarea
// //             onChange={onChangeHandler}
// //             value={data.description}
// //             name="description"
// //             rows="6"
// //             placeholder="Write content here"
// //             required
// //           ></textarea>
// //         </div>
// //         <div className="add-category-price">
// //           <div className="add-category ">
// //             <p>Product category</p>
// //             <select onChange={onChangeHandler} name="category">
// //               <option value="Salad">Salad</option>
// //               <option value="Rolls">Rolls</option>
// //               <option value="Deserts">Deserts</option>
// //               <option value="Sandwich">Sandwich</option>
// //               <option value="Cake">Cake</option>
// //               <option value="Pasta">Pasta</option>
// //               <option value="Noodles">Noodles</option>
// //               <option value="Pure Veg">Pure Veg</option>
// //             </select>
// //           </div>
// //           <div className="add-price">
// //             <p>Product Price</p>
// //             <input
// //               onChange={onChangeHandler}
// //               value={data.price}
// //               type="Number"
// //               name="price"
// //               placeholder="RS 20"
// //             />
// //           </div>
// //         </div>
// //         <button type="submit" className="add-btn">
// //           ADD
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Add;

// //AWS

// import React, { useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Add = ({ url }) => {
//   const [image, setImage] = useState(""); // Store S3 image URL
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   // Handle image upload to AWS S3 through backend
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post(`${url}/api/upload`, formData);
//       if (res.data.success) {
//         setImage(res.data.imageUrl);
//         toast.success("Image uploaded");
//       } else {
//         toast.error("Image upload failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error uploading image");
//     }
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (!image) {
//       toast.error("Please upload an image first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     formData.append("image", image); // S3 image URL

//     try {
//       const response = await axios.post(`${url}/api/food/add`, formData);
//       if (response.data.success) {
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Salad",
//         });
//         setImage("");
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add food item");
//     }
//   };

//   return (
//     <div className="add">
//       <form onSubmit={onSubmitHandler}>
//         <div className="add-img-upload">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img src={image ? image : assets.upload_area} alt="Preview" />
//           </label>
//           <input
//             onChange={handleImageUpload}
//             type="file"
//             id="image"
//             hidden
//             required
//           />
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product name</p>
//           <input
//             onChange={onChangeHandler}
//             value={data.name}
//             type="text"
//             name="name"
//             placeholder="Type Here"
//             required
//           />
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product description</p>
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description"
//             rows="6"
//             placeholder="Write content here"
//             required
//           ></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category">
//             <p>Product category</p>
//             <select
//               onChange={onChangeHandler}
//               name="category"
//               value={data.category}
//             >
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Deserts">Deserts</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//               <option value="Pure Veg">Pure Veg</option>
//             </select>
//           </div>
//           <div className="add-price">
//             <p>Product Price</p>
//             <input
//               onChange={onChangeHandler}
//               value={data.price}
//               type="number"
//               name="price"
//               placeholder="RS 20"
//               required
//             />
//           </div>
//         </div>
//         <button type="submit" className="add-btn">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;

import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // 1. Upload image to S3
    let imageUrl = "";
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", image);
      const uploadResponse = await axios.post(
        `${url}/api/upload`,
        imageFormData
      );
      if (uploadResponse.data.success) {
        imageUrl = uploadResponse.data.imageUrl;
      } else {
        toast.error("Image upload failed");
        return;
      }
    } catch (error) {
      toast.error("Image upload error");
      console.log("Upload error:", error);
      return;
    }

    // 2. Submit food data with image URL
    try {
      const response = await axios.post(`${url}/api/food/add`, {
        ...data,
        price: Number(data.price),
        image: imageUrl,
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Food add error");
      console.log(err);
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>

          <div className="add-price">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹ 20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
