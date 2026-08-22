const Icon = ({ name, className = '', soft = false }) => (
  <span className={`material-symbols-outlined ${soft ? 'icon-soft' : ''} ${className}`}>
    {name}
  </span>
);

export default Icon;