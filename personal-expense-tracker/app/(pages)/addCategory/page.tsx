// // "use client";

// // import React, { useState } from "react";
// // import CategoryForm from "../../components/CategoryForm";
// // import CategoryList from "../../components/CategoryList";

// // const CategoriesPage = () => {
// //   const [refresh, setRefresh] = useState(false);

// //   const handleCategoryAdded = () => {
// //     setRefresh((prev) => !prev); // Toggle state to trigger re-fetch
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-muted text-foreground py-6">
// //       <div className="space-y-8 w-full max-w-3xl">
// //         <CategoryForm onCategoryAdded={handleCategoryAdded} />
// //         <CategoryList key={refresh ? 'refresh' : 'no-refresh'} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoriesPage;



// "use client";

// import React, { useState } from "react";
// import CategoryForm from "../../components/CategoryForm";
// import CategoryList from "../../components/CategoryList";

// const CategoriesPage = () => {
//   const [refresh, setRefresh] = useState(false);

//   const handleCategoryAdded = () => {
//     setRefresh((prev) => !prev); // Toggle state to trigger re-fetch
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-muted text-foreground py-6">
//       <div className="space-y-8 w-full max-w-3xl">
//         <CategoryForm onCategoryAdded={handleCategoryAdded} />
//         <CategoryList key={refresh ? 'refresh' : 'no-refresh'} />
//       </div>
//     </div>
//   );
// };

// export default CategoriesPage;


"use client";

import React, { useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import CategoryList from "../../components/CategoryList";

const CategoriesPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleCategoryAdded = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger re-fetch
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted text-foreground py-6">
      {/* Container for CategoryForm */}
      <div className="w-full max-w-3xl mb-8 mt-10 flex justify-center "> 
        <CategoryForm onCategoryAdded={handleCategoryAdded} />
      </div>
      
      {/* Container for CategoryList */}
      <div className="w-full max-w-3xl">
        <CategoryList key={refresh ? 'refresh' : 'no-refresh'} />
      </div>
    </div>
  );
};

export default CategoriesPage;