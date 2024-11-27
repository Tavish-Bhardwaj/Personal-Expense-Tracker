// // // // // // // "use client";

// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";

// // // // // // // interface Category {
// // // // // // //   id: number;
// // // // // // //   name: string;
// // // // // // //   createdAt: string;
// // // // // // // }

// // // // // // // const CategoryList = () => {
// // // // // // //   const [categories, setCategories] = useState<Category[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const fetchCategories = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.get("/api/categories/getAll");
// // // // // // //       setCategories(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching categories:", error);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchCategories();
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6">
// // // // // // //       <h2 className="text-2xl font-bold mb-4">Categories</h2>
// // // // // // //       {loading ? (
// // // // // // //         <p>Loading categories...</p>
// // // // // // //       ) : categories.length > 0 ? (
// // // // // // //         <ul className="space-y-4">
// // // // // // //           {categories.map((category) => (
// // // // // // //             <li key={category.id} className="border-b pb-2">
// // // // // // //               <p className="font-medium">ID: {category.id}</p>
// // // // // // //               <p className="font-medium">Name: {category.name}</p>
// // // // // // //               <p className="text-sm text-muted">
// // // // // // //                 Created At: {new Date(category.createdAt).toLocaleString()}
// // // // // // //               </p>
// // // // // // //             </li>
// // // // // // //           ))}
// // // // // // //         </ul>
// // // // // // //       ) : (
// // // // // // //         <p>No categories found.</p>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default CategoryList;

// // // // // // "use client";

// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";

// // // // // // interface Category {
// // // // // //   id: number;
// // // // // //   name: string;
// // // // // //   createdAt: string;
// // // // // // }

// // // // // // const CategoryList = () => {
// // // // // //   const [categories, setCategories] = useState<Category[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   const fetchCategories = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await axios.get("/api/categories/getAll");
// // // // // //       setCategories(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching categories:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchCategories();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6">
// // // // // //       <h2 className="text-2xl font-bold mb-4">Categories</h2>
// // // // // //       {loading ? (
// // // // // //         <p>Loading categories...</p>
// // // // // //       ) : categories.length > 0 ? (
// // // // // //         <ul className="space-y-4">
// // // // // //           {categories.map((category) => (
// // // // // //             <li key={String(category.id)} className="border-b pb-2">
// // // // // //               <p className="font-medium">ID: {category.id}</p>
// // // // // //               <p className="font-medium">Name: {category.name}</p>
// // // // // //               <p className="text-sm text-muted">
// // // // // //                 Created At: {new Date(category.createdAt).toLocaleString()}
// // // // // //               </p>
// // // // // //             </li>
// // // // // //           ))}
// // // // // //         </ul>
// // // // // //       ) : (
// // // // // //         <p>No categories found.</p>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CategoryList;

// // // // // "use client";

// // // // // import React, { useEffect, useState } from "react";
// // // // // import axios from "axios";

// // // // // interface Category {
// // // // //   id: number;
// // // // //   name: string;
// // // // //   createdAt: string;
// // // // // }

// // // // // const CategoryList = () => {
// // // // //   const [categories, setCategories] = useState<Category[]>([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const fetchCategories = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.get("/api/categories/getAll");
// // // // //       setCategories(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching categories:", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchCategories();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
// // // // //       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
// // // // //       {loading ? (
// // // // //         <p>Loading categories...</p>
// // // // //       ) : categories.length > 0 ? (
// // // // //         <div>
// // // // //           <div className="grid grid-cols-3 gap-4 border-b pb-2 font-semibold text-muted-foreground">
// // // // //             <span>ID</span>
// // // // //             <span>Name</span>
// // // // //             <span>Created At</span>
// // // // //           </div>
// // // // //           <ul className="mt-4 space-y-4">
// // // // //             {categories.map((category) => (
// // // // //               <li
// // // // //                 key={String(category.id)}
// // // // //                 className="grid grid-cols-3 gap-4 py-2 border-b border-muted"
// // // // //               >
// // // // //                 <span className="font-medium">{category.id}</span>
// // // // //                 <span className="font-medium">{category.name}</span>
// // // // //                 <span className="text-sm text-muted-foreground">
// // // // //                   {new Date(category.createdAt).toLocaleString()}
// // // // //                 </span>
// // // // //               </li>
// // // // //             ))}
// // // // //           </ul>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p>No categories found.</p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CategoryList;


// // // // "use client";

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { Button } from "@/components/ui/button"; // Adjust the import path as per your project structure

// // // // interface Category {
// // // //   id: number;
// // // //   name: string;
// // // //   createdAt: string;
// // // // }

// // // // const CategoryList = () => {
// // // //   const [categories, setCategories] = useState<Category[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const fetchCategories = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.get("/api/categories/getAll");
// // // //       setCategories(response.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching categories:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const deleteCategory = async (id: number) => {
// // // //     if (confirm("Are you sure you want to delete this category?")) {
// // // //       try {
// // // //         await axios.delete(`/api/categories/delete/${id}`);
// // // //         setCategories((prev) => prev.filter((category) => category.id !== id));
// // // //       } catch (error) {
// // // //         console.error("Error deleting category:", error);
// // // //       }
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchCategories();
// // // //   }, []);

// // // //   return (
// // // //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
// // // //       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
// // // //       {loading ? (
// // // //         <p>Loading categories...</p>
// // // //       ) : categories.length > 0 ? (
// // // //         <div>
// // // //           <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold text-muted-foreground">
// // // //             <span>ID</span>
// // // //             <span>Name</span>
// // // //             <span>Created At</span>
// // // //             <span>Actions</span>
// // // //           </div>
// // // //           <ul className="mt-4 space-y-4">
// // // //             {categories.map((category) => (
// // // //               <li
// // // //                 key={String(category.id)}
// // // //                 className="grid grid-cols-4 gap-4 py-2 border-b border-muted items-center"
// // // //               >
// // // //                 <span className="font-medium">{category.id}</span>
// // // //                 <span className="font-medium">{category.name}</span>
// // // //                 <span className="text-sm text-muted-foreground">
// // // //                   {new Date(category.createdAt).toLocaleString()}
// // // //                 </span>
// // // //                 <Button
// // // //                   variant="destructive"
// // // //                   className="shadow-md hover:shadow-lg"
// // // //                   onClick={() => deleteCategory(category.id)}
// // // //                 >
// // // //                   Delete
// // // //                 </Button>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </div>
// // // //       ) : (
// // // //         <p>No categories found.</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CategoryList;



// // // "use client";

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Button } from "@/components/ui/button"; // Adjust the import path as per your project structure

// // // interface Category {
// // //   id: number;
// // //   name: string;
// // //   createdAt: string;
// // // }

// // // const CategoryList = () => {
// // //   const [categories, setCategories] = useState<Category[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchCategories = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.get("/api/categories/getAll");
// // //       setCategories(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching categories:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const deleteCategory = async (id: number) => {
// // //     if (confirm("Are you sure you want to delete this category?")) {
// // //       try {
// // //         await axios.delete(`/api/categories/delete/${id}`);
// // //         setCategories((prev) => prev.filter((category) => category.id !== id));
// // //       } catch (error) {
// // //         console.error("Error deleting category:", error);
// // //       }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   return (
// // //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
// // //       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
// // //       {loading ? (
// // //         <p>Loading categories...</p>
// // //       ) : categories.length > 0 ? (
// // //         <div>
// // //           <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold text-muted-foreground">
// // //             <span>ID</span>
// // //             <span>Name</span>
// // //             <span>Created At</span>
// // //             <span>Actions</span>
// // //           </div>
// // //           <ul className="mt-4 space-y-2">
// // //             {categories.map((category) => (
// // //               <li
// // //                 key={String(category.id)}
// // //                 className="grid grid-cols-4 gap-4 py-2 border-b border-muted items-center"
// // //               >
// // //                 <span className="font-medium">{category.id}</span>
// // //                 <span className="font-medium">{category.name}</span>
// // //                 <span className="text-sm text-muted-foreground">
// // //                   {new Date(category.createdAt).toLocaleString()}
// // //                 </span>
// // //                 <Button
// // //                   variant="destructive"
// // //                   className="py-3 px-5 text-sm shadow-sm hover:shadow-md"
// // //                   onClick={() => deleteCategory(category.id)}
// // //                 >
// // //                   Delete
// // //                 </Button>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       ) : (
// // //         <p>No categories found.</p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CategoryList;


// // "use client";

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button } from "@/components/ui/button"; // Adjust this import path according to your project

// // interface Category {
// //   id: number;
// //   name: string;
// //   createdAt: string;
// // }

// // const CategoryList = () => {
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchCategories = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get("/api/categories/getAll");
// //       setCategories(response.data);
// //     } catch (error) {
// //       console.error("Error fetching categories:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteCategory = async (id: number) => {
// //     if (confirm("Are you sure you want to delete this category?")) {
// //       try {
// //         await axios.delete(`/api/categories/delete/${id}`); // Fixed backticks here
// //         setCategories((prev) => prev.filter((category) => category.id !== id));
// //       } catch (error) {
// //         console.error("Error deleting category:", error);
// //       }
// //     }
// //   };
  

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   return (
// //     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
// //       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
// //       {loading ? (
// //         <p>Loading categories...</p>
// //       ) : categories.length > 0 ? (
// //         <div>
// //           <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold text-muted-foreground">
// //             <span>ID</span>
// //             <span>Name</span>
// //             <span>Created At</span>
// //             <span>Actions</span>
// //           </div>
// //           <ul className="mt-4 space-y-2">
// //             {categories.map((category) => (
// //               <li
// //                 key={String(category.id)}
// //                 className="grid grid-cols-4 gap-4 py-2 border-b border-muted items-center"
// //               >
// //                 <span className="font-medium">{category.id}</span>
// //                 <span className="font-medium">{category.name}</span>
// //                 <span className="text-sm text-muted-foreground">
// //                   {new Date(category.createdAt).toLocaleString()}
// //                 </span>
// //                 <Button
// //                   variant="destructive"
// //                   size="sm" // Explicitly set to "sm"
// //                   className="py-2  px-1 text-xs shadow-sm hover:shadow-md"
// //                   onClick={() => deleteCategory(category.id)}
// //                 >
// //                   Delete
// //                 </Button>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       ) : (
// //         <p>No categories found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CategoryList;



// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button"; // Adjust this import path according to your project

// interface Category {
//   id: number;
//   name: string;
//   createdAt: string;
// }

// const CategoryList = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/categories/getAll");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteCategory = async (id: number) => {
//     if (confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`/api/categories/delete/${id}`);
//         fetchCategories(); // Refresh the categories after deletion
//       } catch (error) {
//         console.error("Error deleting category:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
//       {loading ? (
//         <p>Loading categories...</p>
//       ) : categories.length > 0 ? (
//         <div>
//           <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold text-muted-foreground">
//             <span>Serial No</span>
//             <span>ID</span>
//             <span>Name</span>
//             <span>Created At</span>
//             <span>Actions</span>
//           </div>
//           <ul className="mt-4 space-y-2">
//             {categories.map((category, index) => (
//               <li
//                 key={String(category.id)}
//                 className="grid grid-cols-5 gap-4 py-2 border-b border-muted items-center"
//               >
//                 <span className="font-medium">{index + 1}</span> {/* Serial Number */}
//                 <span className="font-medium">{category.id}</span>
//                 <span className="font-medium">{category.name}</span>
//                 <span className="text-sm text-muted-foreground">
//                   {new Date(category.createdAt).toLocaleString()}
//                 </span>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   className="py-2 px-1 text-xs shadow-sm hover:shadow-md"
//                   onClick={() => deleteCategory(category.id)}
//                 >
//                   Delete
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No categories found.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryList;


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Adjust this import path according to your project

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/categories/getAll");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/api/categories/delete/${id}`);
        fetchCategories(); // Refresh the categories after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-4 border-b pb-2 font-semibold text-muted-foreground">
            <span>Serial No</span>
            <span>ID</span>
            <span>Name</span>
            <span>Created At</span>
            <span>Actions</span>
          </div>
          <ul className="mt-4 space-y-2">
            {categories.map((category, index) => (
              <li
                key={String(category.id)}
                className="grid grid-cols-5 gap-4 py-2 border-b border-muted items-center"
              >
                <span className="font-medium">{index + 1}</span> {/* Serial Number */}
                <span className="font-medium">{category.id}</span>
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(category.createdAt).toLocaleString()}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  className="py-2 px-1 text-xs shadow-sm hover:shadow-md"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;