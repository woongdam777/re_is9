// components/IconLink.js
export default function IconLink({ href, iconClass, text }) {
  return (
    <li>
      <a href={href} download>
        <span className={`icon ${iconClass}`}></span>
        <span>{text}</span>
      </a>
    </li>
  );
}