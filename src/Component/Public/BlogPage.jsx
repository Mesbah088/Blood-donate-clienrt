import { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://blood-donate-server-two.vercel.app/blogs")
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg">Loading blogs...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Latest Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-red-600">{blog.title}</h2>
              <p className="text-gray-600">{blog.excerpt.slice(0, 100)}...</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => alert("Implement blog details route or modal")}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
