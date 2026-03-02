import Link from "next/link";
import Image from "next/image";
import React from "react";
import BankCard from "./BankCard";

const RightSidebar = ({
  user,
  transactions,
  banks,
}: RightSidebarProps) => {  
  return (
    <aside className="right-sidebar">
      {/* Profile Section */}
      <section className="flex flex-col pb-8">
        <div className="profile-banner">
          <div className="profile">
            <div className="profile-img">
              <span className="text-5xl font-bold text-blue-500">
                {user?.name?.[0] || "G"}
              </span>
            </div>

            <div className="profile-details">
              <h1 className="profile-name">
                {user?.name} 
              </h1>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="banks">
        <div className="flex items-center justify-between">
          <h2 className="text-18 font-semibold text-gray-900">
            My Banks
          </h2>

          <Link
            href="/"
            className="flex items-center gap-2 text-14 font-medium text-bankGradient"
          >
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            />
            Add Bank
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {banks?.length > 0 && (
            <>
              <BankCard
                key={banks[0]?.$id || "bank1"}
                account={banks[0]}
                userName={`${user.name}`}
                showBalance={false}
              />

              {banks[1] && (
                <BankCard
                  key={banks[1]?.$id || "bank2"}
                  account={banks[1]}
                  userName={`${user.name}`}
                  showBalance={false}
                />
              )}
            </>
          )}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;