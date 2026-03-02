import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {

  const loggedIn = await getLoggedInUser();
  console.log("User", loggedIn);
  return (
    <section className="home">
  <div className="home-content">
    <header className="home-header">
      <HeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.name || "Guest"}
        subtext="Access and manage your account and transactions efficiently"
      />

      <TotalBalanceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1250.35}
      />
    </header>
  </div>

  <RightSidebar
    user={loggedIn}
    transactions={[]}
    banks={[
      { currentBalance: 1560.5 },
      { currentBalance: 250.0 },
    ]}
  />
</section>
  )
}

export default Home
