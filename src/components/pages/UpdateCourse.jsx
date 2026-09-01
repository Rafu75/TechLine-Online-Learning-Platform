import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    imageURL: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  // load exist course
  useEffect(() => {
    axios.get(`https://dev-stride-server.vercel.app/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // update handler
  const handleSubmit = async (e) => {
    e.preventDefault();


    const updateCourse = { ...course };
    delete updateCourse._id;

    try {
      const res = await axios.patch(`https://dev-stride-server.vercel.app/courses/${id}`, updateCourse);
      if (res.data.modifiedCount > 0) {
        toast.success("Course updated successfully!");
        navigate("/myCourse");
      } else {
        toast("No changes made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    }
  };

  //  input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({
      ...course,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Update Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="imageURL"
          value={course.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full rounded"
        />
        <input
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full rounded"
        />
        <input
          name="duration"
          value={course.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="border p-2 w-full rounded"
        />
        <input
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
        ></textarea>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={course.isFeatured}
            onChange={handleChange}
          />
          <span>Featured Course</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
