import NotFollowingBack from "@/components/notFollowingBack";
import "../../styles/main.scss";
import RecentlyUnfollowed from "@/components/recentlyUnfollowed";

const FollowersAndFollowing = () => {
  return (
    <main className="dashboard-main">
      <section className="dashboard-welcome">
        <h1>👥 Followers & Following Analysis</h1>
        <p>
          Upload your Instagram data to find who's not following you back and
          whom you recently unfollowed.
        </p>
      </section>
      <div className="content-wrapper">
        <NotFollowingBack />
        <RecentlyUnfollowed />
      </div>
    </main>
  );
};

export default FollowersAndFollowing;
