import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getTheatres, updateMovie, createMovie, getMovieById,getScreenByTheatreId } from "../../api/apiService";

type Theatre = {
  _id: string;
  theatre_name: string;
};

type Screen = {
  _id: string;
  screen_name: string;
};

const AddMovies = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [screens, setScreens] = useState<Screen[]>([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theatres, setTheatres] = useState<Theatre[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // edit movie

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;
  
      try {
        setIsLoading(true); // Show loading while fetching
        const movieData = await getMovieById(movieId);
  
        // Use setValue to populate the form fields
        setValue("name", movieData.name);
        setValue("genre", movieData.genre);
        setValue("duration", movieData.duration);
        setValue("rating", movieData.rating);
        setValue("cast", movieData.cast);
        setValue("releaseDate", movieData.releaseDate); // Format date if needed
        setValue("showDate", movieData.showDate); // Format date if needed
        setValue("theatre_id", movieData.theatre_id);
        setSelectedTheatre(movieData.theatre_id);
        setValue("description", movieData.description);

  
        // Fetch screens for the selected theatre
        if (movieData.theatre_id) {
          const screensData = await getScreenByTheatreId(movieData.theatre_id);
          // setScreens(screensData.screens);
          // setValue("screen_id", movieData.screen_id);
          if (screensData && screensData.screens) {
            setScreens(screensData.screens); // Populate screen dropdown
            setValue("screen_id", movieData.screen_id); // Set the selected screen
          }
        }
  
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };
  
    fetchMovieDetails();
  }, [movieId, setValue]);
  

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const theatresData = await getTheatres();
        setTheatres(theatresData);
      } catch (error) {
        console.error("Error fetching theatres", error);
      }
    };
  
    fetchTheatres();
  }, []); // No dependency needed for movieId
  

   // Fetch screens when selectedTheatre changes
  useEffect(() => {
    if (!selectedTheatre) return;

    const fetchScreens = async () => {
      setIsLoading(true);
      try {
        const screensData = await getScreenByTheatreId(selectedTheatre); 
        setScreens(screensData.screens); // Update the screens state
        console.log("screen data",screensData);
      } catch (error) {
        console.error("Error fetching screens", error);
        setScreens([]); // Clear the screens on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchScreens();
  }, [selectedTheatre]); // Dependency on selectedTheatre

 
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Create a new FormData object
      const formData = new FormData();
      console.log(formData);
  
      // Loop through the data fields and append them to formData
      Object.keys(data).forEach((key) => {
        if (key === "trailer_url" || key === "poster_url") {
          // Check if file exists before appending
          if (data[key] && data[key][0]) {
            formData.append(key, data[key][0]);
          }
        } else {
          // For non-file data, append normally
          formData.append(key, data[key]);
        }
      });
  
      // Check if we are updating or creating a new movie
      if (movieId) {
        // If movieId exists, call the updateMovie function
        await updateMovie(movieId, formData);
        alert("Movie updated successfully!");
      } else {
        // Otherwise, call the createMovie function
        await createMovie(formData);
        alert("Movie added successfully!");
      }
  
      // Redirect to manage-movies after success
      navigate("/movie/manage-movies");
  
    } catch (error) {
      // Handle errors and display an alert
      console.error("Error saving movie", error);
      alert("Failed to save movie. Please try again.");
    } finally {
      // Stop the loading spinner after the operation is completed
      setIsLoading(false);
    }
  };
  

  return (
    <div className="mt-10 mx-auto p-4 shadow-lg rounded-lg bg-white max-w-6xl">
      <h2 className="text-2xl text-center font-bold mb-4">
        {movieId ? "Edit Movie" : "Add Movie"}
      </h2>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" method="POST" action="/create-movie">

        {/* Movie name and genre */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Movie Name</label>
            <input
              type="text"
              {...register("name", { required: "Movie name is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{(errors.name as FieldError).message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Genre</label>
            <input
              type="text"
              {...register("genre", { required: "Genre is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.genre && <p className="text-red-500 text-sm">{(errors.genre as FieldError).message}</p>}
          </div>
        </div>

        {/* Duration and rating */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Duration</label>
            <input
              type="string"
              {...register("duration", { required: "Duration is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.duration && <p className="text-red-500 text-sm">{(errors.duration as FieldError).message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Rating</label>
            <input
              type="number"
              {...register("rating", { required: "Rating is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.rating && <p className="text-red-500 text-sm">{(errors.rating as FieldError).message}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Cast</label>
          <input
            {...register("cast", { required: "Cast is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.cast && <p className="text-red-500 text-sm">{(errors.cast as FieldError).message}</p>}
        </div>
        {/* Release and Show Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Release Date</label>
            <input
              type="date"
              {...register("releaseDate")}
              className="w-full px-4 py-2 border rounded-md"
            />
            {/* {errors.releaseDate && <p className="text-red-500 text-sm">{(errors.releaseDate as FieldError).message}</p>} */}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Show Date</label>
            <input
              type="date"
              {...register("showDate", { required: "Show date is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.showDate && <p className="text-red-500 text-sm">{(errors.showDate as FieldError).message}</p>}
          </div>
        </div>
           

<div className="mb-4">
  <label className="block mb-1 font-semibold">Theatre</label>
  <select
    {...register("theatre_id", { required: "Theatre selection is required" })}
    value={selectedTheatre}
    onChange={(e) => {
      const theatreId = e.target.value;
      setSelectedTheatre(theatreId);

      if (theatreId) {
        (async () => {
          try {
            const screensData = await getScreenByTheatreId(theatreId);
            setScreens(screensData); // Populate screens based on selected theatre
          } catch (error) {
            console.error("Error fetching screens", error);
            setScreens([]); // Clear the screens on error
          }
        })();
      } else {
        setScreens([]); // Reset screens if no theatre is selected
      }
    }}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
  >
    <option value="">Select Theatre</option>
    {theatres.length > 0 ? (
      theatres.map((theatre) => (
        <option key={theatre._id} value={theatre._id}>
          {theatre.theatre_name}
        </option>
      ))
    ) : (
      <option disabled>Loading theatres...</option>
    )}
  </select>
  {errors.theatre_id && <p className="text-red-500 text-sm">{(errors.theatre_id as FieldError).message}</p>}
</div>

  
{selectedTheatre && (
  <div className="mb-4">
    <label className="block mb-1 font-semibold">Screen</label>
    <select
      {...register("screen_id", { required: "Screen selection is required" })}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Select Screen</option>
      {screens.length > 0 ? (
        screens.map((screen) => (
          <option key={screen._id} value={screen._id}>
            {screen.screen_name}
          </option>
        ))
      ) : (
        <option disabled>Loading screens...</option>
      )}
    </select>
    {errors.screen_id && <p className="text-red-500 text-sm">{(errors.screen_id as FieldError).message}</p>}
  </div>
)}

        {/* Other inputs like trailer, image, and description */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Trailer</label>
          <input
            type="file"
            {...register("trailer_url", { required: "Trailer is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.trailer && <p className="text-red-500 text-sm">{(errors.trailer as FieldError).message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            {...register("poster_url", { required: "Image is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.image && <p className="text-red-500 text-sm">{(errors.image as FieldError).message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{(errors.description as FieldError).message}</p>}
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
          >
            {isLoading ? "Saving..." : movieId ? "Update" : "Create"}
            </button>
          <button
            type="submit"
            className="bg-gray-100 text-black px-6 py-2 rounded-md focus:ring-2 focus:ring-gray-400"
            onClick={() => navigate("/movie/manage-movies")}          
        >
            Cancel         
           </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovies;
