import React, { useState, useEffect } from 'react'
import ImageCard from './components/Imagecard';
import ImageSearch from './components/ImageSearch';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.
    REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setIsLoading(false)
    })
    .catch(err => console.log(err));
  }, [term]);

  return (
   <div className="container mx-auto">
     <ImageSearch searchText = {(text) => setTerm(text)} />

     {!isLoading && images.length === 0 && <h1 
     className='text-center text-4xl mx-auto mt-32'>Images not found</h1>}

     { isLoading ? <h1 className='text-center text-4xl mx-auto mt-32'>Image Loading!!!</h1>
      : <div className='grid grid-cols-3 gap-5'>
        {images.map(image =>(
          <ImageCard key={image.id} image={image} />
        ))}
     </div>}
   </div>
  );
}

export default App;
