const SideImage = ({imageUrl}, alt) => {


  return (
    <div className="xl:block md:block sm:hidden max-w-1/2">
    <img className="xl:h-screen md:h-screen hidden xl:block md:block sm:hidden w-full" src={imageUrl} alt={alt}/>
    </div>
  );
}

export default SideImage;