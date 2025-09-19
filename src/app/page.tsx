"use client";
import { ModalResult } from "@/components/common";
import { Layout } from "@/layout";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Overview() {
  const initData = ["", "", "", "", "", "", "", "", ""];
  const [pieces, setPieces] = useState("x");
  const [scores, setScores] = useState([0, 0]);

  const [data, setData] = useState(initData);

  const checkWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        board[a] === "x"
          ? setScores([scores[0] + 1, scores[1]])
          : setScores([scores[0], scores[1] + 1]);
        setData(initData);
      }
    }
  };

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      const delay = 0;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  useEffect(() => {
    checkWinner(data);
  }, [data]);

  return (
    <Layout>
      <div
        id='id_overview'
        className='w-full h-full flex flex-col items-center justify-center gap-20 relative'>
        {scores?.map((info, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center absolute top-20 ${
              i === 0 ? "left-8" : "right-8"
            }`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke={i === 0 ? "#FF0000" : "#0000FF"}
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'>
              <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
            <div className='flex flex-row justify-center items-center'>
              {i === 0 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#FF0000'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#0000FF'
                  stroke-width='3'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <circle cx='12' cy='12' r='10' />
                </svg>
              )}
              <h1
                className={`text-bold text-[1rem] ${
                  i === 0 ? "text-[#FF0000]" : "text-[#0000FF]"
                }`}>
                : {info}
              </h1>
            </div>
          </div>
        ))}

        <div className='grid grid-cols-3 grid-flow-row gap-1 bg-black'>
          {data?.map((info, i) => (
            <div
              key={i}
              className='bg-[#FFF] p-24 cursor-pointer hover:bg-slate-100 relative flex  items-center justify-center'
              onClick={() => {
                info === "" &&
                  setData(
                    data
                      ?.slice(0, i)
                      ?.concat([pieces])
                      ?.concat(data?.slice(i + 1))
                  );
                info === "" && setPieces(pieces === "x" ? "o" : "x");
              }}>
              {info === "x" ? (
                <motion.svg
                  width='180'
                  height='180'
                  viewBox='0 0 180 180'
                  initial='hidden'
                  animate='visible'
                  className={"h-min w-min absolute "}>
                  <motion.line
                    x1='20'
                    y1='20'
                    x2='160'
                    y2='160'
                    stroke='#FF0000'
                    strokeWidth={10}
                    variants={draw}
                    custom={2}
                  />
                  <motion.line
                    x1='20'
                    y1='160'
                    x2='160'
                    y2='20'
                    stroke='#FF0000'
                    strokeWidth={10}
                    variants={draw}
                    custom={2.5}
                  />
                </motion.svg>
              ) : info === "o" ? (
                <motion.svg
                  width='180'
                  height='180'
                  viewBox='0 0 180 180'
                  initial='hidden'
                  animate='visible'
                  className={"h-min w-min absolute "}>
                  <motion.circle
                    cx='90'
                    cy='90'
                    r='80'
                    stroke='#0000FF'
                    fill='#FFFFFF00'
                    variants={draw}
                    strokeWidth={10}
                    custom={2.5}
                  />
                </motion.svg>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <ModalResult isOpen={false} />
    </Layout>
  );
}
