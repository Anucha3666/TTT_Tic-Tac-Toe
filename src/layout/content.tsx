import React, { FC } from "react";
import { Footer, Navbar } from ".";

const content: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // document.scrollingElement
  return (
    <main className='w-screen h-screen flex flex-col items-center justify-between overflow-clip relative'>
      <Navbar />
      <div
        className='w-full h-full overflow-auto'
        // onScroll={(e: React.UIEvent<HTMLDivElement>) =>
        //   console.log(e.currentTarget.scrollTop)
        // }
        // onClick={() => console.log(window.scrollY)}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default content;
