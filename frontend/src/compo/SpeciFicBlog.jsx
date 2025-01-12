import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SpeciFicBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5004/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        console.log(data)
        console.log(data[0].title)
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  // Show loading message if blog data is not yet available
  if (!blog) {
    return <p>Loading...</p>;
  }

  // Destructure blog properties for readability
  console.log(blog.title)
  const {
    title,
    author,
    authorPic,
    image,
    published_date,
    reading_time,
    category,
    content,
    tags,
  } = blog[0];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img src={image} alt={title} className="w-full rounded-md" />
      <h1 className="text-2xl font-bold mt-4">{title}</h1>
      <p className="text-sm text-gray-600 mt-2">
        Published on {published_date} by {author}
      </p>
      <p className="text-sm text-gray-600">Reading time: {reading_time}</p>
      <p className="text-sm text-gray-600">Category: {category}</p>
      {tags && (
        <div className="mt-2 flex gap-8 items-center">
          <p className="text-sm font-semibold">Tags:</p>
          <ul className="flex gap-2 mt-1">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="my-4" />
      <div className="text-md text-gray-800 leading-7">{content}</div>
      <br />
      <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nisi, incidunt consequuntur animi quisquam suscipit ratione molestiae enim fugit ea culpa beatae. Rerum id sequi animi quaerat vel vitae saepe esse, inventore quasi est explicabo sed voluptates voluptatem, voluptas modi dolor illo fugit autem culpa nobis. <br />Maiores dolorem officiis ut praesentium itaque nulla cupiditate. Magni quaerat nisi id repellat omnis facilis aliquam eveniet reiciendis earum nulla! Recusandae doloremque reprehenderit laborum laudantium, assumenda harum a voluptas molestiae tempora beatae asperiores sapiente nam. Eveniet aliquid quo ad nulla accusamus dolor a quasi. <br />Consectetur vitae doloremque quos saepe magnam voluptatem ducimus veritatis temporibus cum laborum animi inventore deserunt doloribus natus, possimus qui error assumenda, fugit perspiciatis molestiae hic sed, sint illum! Delectus illo dicta rerum saepe quod autem itaque consequuntur. Harum delectus quasi, rem ipsa, voluptates nam qui ipsam temporibus, animi quidem quibusdam explicabo. Veritatis reprehenderit praesentium dolorum incidunt ipsa facere at nisi dolores quaerat porro? Ullam aliquid sequi quasi doloribus officiis iusto voluptatum fuga dolor, est, possimus ipsam delectus consectetur minima autem error perferendis vel placeat et, sapiente nemo? Quasi fugit nostrum aliquid debitis quidem delectus. Veniam exercitationem nulla aliquam ab autem distinctio ipsa voluptatem laborum beatae expedita! Atque quas eligendi voluptate?</div>
    </div>
  );
};

export default SpeciFicBlog;
