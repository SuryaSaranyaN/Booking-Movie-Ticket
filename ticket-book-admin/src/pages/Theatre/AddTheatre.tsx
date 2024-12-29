// import { useForm, useFieldArray, FieldError } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { createTheatre,getTheatreById,updateTheatre } from "../../api/apiService";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import React from "react";

// const AddTheatre = () => {

//   const {theatre} = useLocation()?.state || {};
//   console.log('theatre',theatre);
//   const data = theatre || {};

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       theatre_name: "",
//       location: "",
//       amount:" ",
//       show_times: "",
//       screens:[],
//       screen_details: data.screens || [],
//     },
//   });

//     const navigate = useNavigate();
//   const {theatre_id} = useParams<{ theatre_id: string }>(); 
//   console.log('theatre_id',theatre_id);

//   // const theatre_id = useParams();
//   const [isLoading, setIsLoading] = useState(false);

//   const { fields: screens, append: addScreen, remove: removeScreen, replace } =
//     useFieldArray({ control, name: "screen_details" });



//   // const onSubmit = async (data: any) => {
//   //   try {
//   //     const response = await createTheatre(data);
//   //     alert("Theatre created successfully!");
//   //     console.log('create theatre',response)
//   //     reset();
//   //   } catch (error) {
//   //     alert("Error creating theatre. Please try again.");
//   //   }
//   // };

 

//    // Fetch existing data for editing
//    useEffect(() => {
//     if (theatre_id) {
//       setIsLoading(true);
//       getTheatreById(theatre_id)
//         .then((data: any) => {
//           reset(data); // Populate the form with fetched data
//         })
//         .catch((error: any) => {
//           console.error("Failed to fetch theatre data:", error);
//         })
//         .finally(() => setIsLoading(false));
//     }
//     console.log('theatre_id',theatre_id);

//   }, [theatre_id, reset]);

//   const onSubmit = async (data: any) => {
//     try {
//       if (theatre_id) {
//         // Update Theatre
//         await updateTheatre(theatre_id, data);
//         alert("Theatre updated successfully!");
//       } else {
//         // Create Theatre
//         await createTheatre(data);
//         alert("Theatre created successfully!");
//       }
//       reset();
//       navigate("/theatre/manage-theatre");
//     } catch (error) {
//       alert("Error saving theatre. Please try again.");
//     }
//   };

//   return (
//     <div className="mt-10 mx-auto p-4 shadow-lg rounded-lg bg-white max-w-6xl">
//       <h2 className="text-2xl text-center font-bold mb-4">
//       {theatre_id ? "Edit Theatre" : "Create New Theatre"}

//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="p-4 border rounded-md shadow-md">

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">          
//           <div className="mb-2">
//             <label className="block mb-1 font-semibold">Theatre Name</label>
//             <input
//               type="text"
//               {...register("theatre_name", { required: "Theatre name is required" })}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//             />
//             {/* {errors.theatre_name && (
//               <p className="text-red-500 text-sm">{errors.theatre_name.message}</p>
//             )} */}
//                       {errors.theatre_name && <p className="text-red-500 text-sm">{(errors.theatre_name as FieldError).message}</p>}
//             </div>
//            <div>
//               <label className="block mb-1 font-semibold">Location</label>
//               <input
//                 type="text"
//                 {...register("location", { required: "Location is required" })}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//               />
//               {errors.location && (
//                 <p className="text-red-500 text-sm">{errors.location.message}</p>
//               )}
//             </div>
//         </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-semibold">Amount</label>
//               <input
//                 type="number"
//                 {...register("amount", { required: "Amount is required" })}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//               />
//               {errors.amount && (
//                 <p className="text-red-500 text-sm">{errors.amount.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block mb-1 font-semibold">Show Times</label>
//               <input
//                 type="text"
//                 {...register("show_times", { required: "Show times are required" })}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//               />
//               {errors.show_times && (
//                 <p className="text-red-500 text-sm">{errors.show_times.message}</p>
//               )}
//             </div>
//           </div>
//         </div>
//         <div>
//         <div className="flex items-center space-x-2">
//         <div className="flex-1">
//         <h3 className="text-xl font-bold mt-6 mb-4">Screens</h3>
//         </div>

//         <button
//           type="button"
//           onClick={() =>
//             addScreen({ screen_name: "", row_details: [{ row_name: "", seat_count: 0 }] })
//           }
//           className="bg-green-600 text-white px-4 py-2 rounded-md"
//         >
//           Add Screen
//         </button>
//         </div>
//         </div>
//         {screens.map((screen, screenIndex) => (
//           <div key={screen.id} className="border p-4 mb-4 shadow-sm rounded-md">
//             <div className="flex items-center space-x-2">
//               <div className="flex-1">
//                 <label className="block mb-1 font-semibold">Screen Name</label>
//                 <input
//                   type="text"
//                   {...register(`screen_details.${screenIndex}.screen_name`, {
//                     // required: "Screen name is required",
//                   })}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//                 />
//                 {/* {errors?.screen_details?.[screenIndex]?.screen_name && (
//                   <p className="text-red-500 text-sm">
//                     {errors.screen_details[screenIndex].screen_name.message}
//                   </p>
//                 )} */}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => removeScreen(screenIndex)}
//                 className="bg-red-500 text-white mt-4 p-2 rounded-lg"
//               >
//                 Remove Screen
//               </button>
//             </div>

//             <h4 className="text-lg font-bold mt-4">Rows</h4>
//             <RowFields
//               register={register}
//               control={control}
//               screenIndex={screenIndex}
//               data={data} 
//               errors={errors}
//             />
//           </div>
//         ))}          

//            <div className="flex justify-center mt-6 gap-4">
//           <button
//             type="submit"
//             className="bg-gray-800 text-white px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
//           >
//             {isLoading ? "Saving..." : theatre_id ? "Update" : "Create"}
//             </button>
//           <button
//             type="submit"
//             className="bg-gray-100 text-black px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
//             onClick={() => navigate("/theatre/manage-theatre")}          
//         >
//             Cancel         
//            </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const RowFields = ({ register, control, screenIndex,data, errors }: any) => {
//   const { fields: rows, append: addRow, remove: removeRow } = useFieldArray({
//     control,
//     name: `screen_details.${screenIndex}.row_details`,
//   });

//    // Use defaultValues to prefill the fields
//   //  React.useEffect(() => {
//   //   if (data?.screen_details?.[screenIndex]?.row_details?.length) {
//   //     data.screen_details[screenIndex].row_details.forEach((row: any) => addRow(row));
//   //   }
//   // }, [data, screenIndex, addRow]);
  
//   React.useEffect(() => {
//     // Check if rows are empty before pre-filling
//     if (
//       rows.length === 0 &&
//       data?.screen_details?.[screenIndex]?.row_details?.length
//     ) {
//       data.screen_details[screenIndex].row_details.forEach((row: any) =>
//         addRow(row)
//       );
//     }
//   }, [data, screenIndex, addRow, rows.length]);

//   return (
//     <>
//       {rows.map((row, rowIndex) => (
//         <div key={row.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//           <div>
//             <label className="block mb-1 font-semibold">Row Name</label>
//             <input
//               type="text"
//               {...register(
//                 `screen_details.${screenIndex}.row_details.${rowIndex}.row_name`,
//                 // { required: "Row name is required" }
//               )}
//               className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <div className="flex-1">
//               <label className="block mb-1 font-semibold">Seat Count</label>
//               <input
//                 type="number"
//                 min="1"
//                 {...register(
//                   `screen_details.${screenIndex}.row_details.${rowIndex}.seat_count`,
//                   // { required: "Seat count is required", valueAsNumber: true }
//                 )}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
//               />
//             </div>
           
//             <button
//               type="button"
//               onClick={() => removeRow(rowIndex)}
//               className="focus:outline-none mt-4"
//             >
//               <span className="text-red-500">
//                 <FontAwesomeIcon icon={faTrash} size="xl" />
//               </span>
//             </button>              
//           </div>
//         </div>
        
//       ))}
//                 <button
//                   type="button"
//                   onClick={() => addRow({ row_name: "", seat_count: 0 })}
//                   className=" text-green-700 px-4 py-2 mt-4 rounded-md"
//                 >
//                 <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
//                 </button>
      
//     </>
//   );
// };

// export default AddTheatre;



import { useForm, useFieldArray, FieldError } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createTheatre, getTheatreById, updateTheatre } from "../../api/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

interface Screen {
  screen_name: string;
  rows: { row_name: string; seats: string | number }[];
}

const AddTheatre = () => {
  const { theatre } = useLocation()?.state || {};
  const data = theatre || {};

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      theatre_name: "",
      location: "",
      amount: "",
      show_times: "",
      screens: data?.screens || [
        { screen_name: "", rows: [{ row_name: "", seats: "" }] },
      ],
    },
  });

  const navigate = useNavigate();
  const { theatre_id } = useParams<{ theatre_id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const { fields: screens, append: addScreen, remove: removeScreen } =
    useFieldArray({ control, name: "screens" });

  useEffect(() => {
    if (theatre_id) {
      setIsLoading(true);
      getTheatreById(theatre_id)
        .then((response: any) => {
          reset({
            ...response,
            screens: response.screens || [
              { screen_name: "", rows: [{ row_name: "", seats: "" }] },
            ],
          });
        })
        .catch((error: any) => {
          console.error("Failed to fetch theatre data:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [theatre_id, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (theatre_id) {
        await updateTheatre(theatre_id, data);
        alert("Theatre updated successfully!");
      } else {
        await createTheatre(data);
        alert("Theatre created successfully!");
      }
      reset();
      navigate("/theatre/manage-theatre");
    } catch (error) {
      alert("Error saving theatre. Please try again.");
    }
  };

  return (
    <div className="mt-10 mx-auto p-4 shadow-lg rounded-lg bg-white max-w-6xl">
      <h2 className="text-2xl text-center font-bold mb-4">
        {theatre_id ? "Edit Theatre" : "Create New Theatre"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 border rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block mb-1 font-semibold">Theatre Name</label>
              <input
                type="text"
                {...register("theatre_name", {
                  required: "Theatre name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
              />
              {errors.theatre_name && (
                <p className="text-red-500 text-sm">
                  {(errors.theatre_name as FieldError).message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold mt-6 mb-4">Screens</h3>
              <button
                type="button"
                onClick={() =>
                  addScreen({ screen_name: "", rows: [{ row_name: "", seats: "" }] })
                }
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add Screen
              </button>
            </div>
            {screens.map((screen, screenIndex) => (
              <div key={screen.id} className="border p-4 mb-4 shadow-sm rounded-md">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="block mb-1 font-semibold">Screen Name</label>
                    <input
                      type="text"
                      {...register(`screens.${screenIndex}.screen_name`, {
                        required: "Screen name is required",
                      })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeScreen(screenIndex)}
                    className="bg-red-500 text-white mt-4 p-2 rounded-lg"
                  >
                    Remove Screen
                  </button>
                </div>
                <RowFields
                  register={register}
                  control={control}
                  screenIndex={screenIndex}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              {isLoading ? "Saving..." : theatre_id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="bg-gray-100 text-black px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
              onClick={() => navigate("/theatre/manage-theatre")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const RowFields = ({ register, control, screenIndex, data, errors }: any) => {
  const { fields: rows, append: addRow, remove: removeRow } = useFieldArray({
    control,
    name: `screens.${screenIndex}.rows`,
  });

  React.useEffect(() => {
    // Check if rows are empty before pre-filling
    if (
      rows.length === 0 &&
      data?.screens?.[screenIndex]?.rows?.length
    ) {
      data.screens[screenIndex].rows.forEach((row: any) =>
        addRow(row) // Ensure backend `rows` structure matches this
      );
    }
  }, [data, screenIndex, addRow, rows.length]);

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={row.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block mb-1 font-semibold">Row Name</label>
            <input
              type="text"
              {...register(`screens.${screenIndex}.rows.${rowIndex}.row_name`)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
           
           />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Seat Count</label>
              <input
                type="number"
                {...register(`screens.${screenIndex}.rows.${rowIndex}.seats`)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-400"
            
             />
            </div>
            <button
              type="button"
              onClick={() => removeRow(rowIndex)}
              className="focus:outline-none mt-4"
            >
              <span className="text-red-500">
                <FontAwesomeIcon icon={faTrash} size="xl" />
              </span>
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addRow({ row_name: "", seats: "" })}
        className="text-green-700 px-4 py-2 mt-4 rounded-md"
      >
        <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
      </button>
    </>
  );
};

export default AddTheatre;
