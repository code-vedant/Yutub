const Input = ({ 
  type = 'text', 
  placeholder, 
  className = '', 
  register,
  name, 
  validation = {}, 
  error,
  ...props 
}) => {
  return (
     <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...(register ? register(name, validation) : {})}
        {...props}
      />
      {error && <p className="ErrorMessage">{error}</p>}
     </>
  );
};

export default Input;