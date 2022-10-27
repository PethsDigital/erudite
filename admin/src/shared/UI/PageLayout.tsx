import React from "react";
import { Footer, Header } from "../../components";

interface PageLayoutProps {
  Page: () => JSX.Element;
}

export default function PageLayout({ Page }: PageLayoutProps) {
  return (
    <React.Fragment>
      <div className="w-full fixed h-full bg-[#3D90EF80]/50 opacity-5 z-[2]"></div>
      <div className="relative z-10">
        <div className="max-w-[1240px] mx-2 xl:mx-auto sm:mt-8">
          <Header />
          <div className="mt-[83px]"></div>
          <Page />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
