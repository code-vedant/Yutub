const Button = ({ 
    children, 
    type = 'button', 
    disabled = false, 
    isLoading = false, 
    loadingText = 'Loading...', 
    className = '',
    onClick,
    ...props 
  }) => {
    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        className={className}
        onClick={onClick}
        {...props}
      >
        {isLoading ? loadingText : children}
      </button>
    );
  };
  
  export default Button;