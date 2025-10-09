import NotFollowingBack from "@/components/notFollowingBack";
import "../../styles/main.scss";

const FollowersAndFollowing = () => {
  return (
    <main className="dashboard-main">
      <section className="dashboard-welcome">
        <h1>👥 Followers & Following Analysis</h1>
        <p>Upload your Instagram data to find who's not following you back.</p>
      </section>
      <NotFollowingBack />
    </main>
  );
};

export default FollowersAndFollowing;
