const SideImage = ({imageUrl}, alt) => {


  return (
    <div className=" max-w-1/2">
    <img className="h-screen w-full" src={imageUrl} alt={alt}/>
    </div>
  );
}

export default SideImage;