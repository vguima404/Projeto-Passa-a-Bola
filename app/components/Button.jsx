const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-transparent hover:text-purple-700 hover:border transition-all duration-500 hover:cursor-pointer mt-2 text-base tracking-wide shadow-sm w-full uppercase"
    style={{fontFamily: 'Poppins, sans-serif'}}
  >
    {children}
  </button>
);

export default Button;
