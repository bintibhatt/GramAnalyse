import React from "react";
import Link from "next/link";
import "../styles/main.scss";

export default function Home() {
  return (
    <main className="dashboard-main">
      <section className="dashboard-welcome">
        <h1>Welcome to GramAnalyse</h1>
        <p>Your Instagram analytics dashboard.</p>
        <ul className="dashboard-links">
          <li>
            <Link href="/followers-and-following">Followers & Following</Link>
          </li>
          <li>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
