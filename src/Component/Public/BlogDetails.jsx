import { useParams } from "react-router";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000//blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!blog) return <div className="text-center py-20 text-red-500">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded-xl mb-6" />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        Posted by {blog.author || "Unknown"} | {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
