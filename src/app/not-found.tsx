import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="not-found inner">
      <p>404</p>
      <h1>Page not found</h1>
      <Link href="/" className="view-btn">Back to Home <ArrowRight /></Link>
    </div>
  );
}
