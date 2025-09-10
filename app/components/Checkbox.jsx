const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-2 text-xs text-gray-500 mt-2 w-full" style={{fontFamily: 'Poppins, sans-serif'}}>
    <input type="checkbox" className="accent-purple-700" {...props} />
    <span>{label}</span>
  </label>
);

export default Checkbox;
