import Link from "next/link";

export const CommonIcon = () => {
  return (
    <ul className="login-social">
      <li>
        <Link href="https://www.linkedin.com/login" target="_blank">
          <i className="icon-linkedin" />
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com/login?lang=en" target="_blank">
          <i className="icon-twitter" />
        </Link>
      </li>
      <li>
        <Link href="https://www.facebook.com/" target="_blank">
          <i className="icon-facebook" />
        </Link>
      </li>
      <li>
        <Link href="https://www.instagram.com/" target="_blank">
          <i className="icon-instagram" />
        </Link>
      </li>
    </ul>
  );
};
