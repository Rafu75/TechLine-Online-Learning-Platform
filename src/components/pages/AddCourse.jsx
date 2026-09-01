import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const AddCourse = () => {
  const { user } = useAuth(); 
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a course!");
      return;
    }

    const courseData = {
      ...formData,
      instructorName: user.displayName,
      instructorEmail: user.email,
      instructorPhoto: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("https://dev-stride-server.vercel.app/courses", courseData);
      if (res.data.insertedId) {
        toast.success("Course added successfully!");
        setFormData({
          title: "",
          image: "",
          price: "",
          duration: "",
          category: "",
          description: "",
          isFeatured: false,
        });
      } else {
        toast.success("Course added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g. 6 weeks)"
          className="w-full p-2 border rounded"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
