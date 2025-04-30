import { useEffect, useState } from "react";
import "./DescriptionTask.css";

function DescriptionTask({
  taskInfo,
  displayTaskDescription,
  setDisplayTaskDescription,
  rewards,
  coinIMG,
  xpIMG,
}) {
  const statusClickDescription = taskInfo.isCompleted
    ? " Concluida"
    : " Pendente";

  console.log(coinIMG);

  return (
    <div
      id="taskDescription"
      className={`rounded-md shadow w-full h-full text-center flex flex-col gap-4 overflow-hidden overflow-y-auto relative`}
    >
      <button
        className="absolute"
        onClick={() => {
          console.log(displayTaskDescription);
          setDisplayTaskDescription("hidden");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-undo2-icon lucide-undo-2"
        >
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
      </button>
      <h1 className="text-black font-medium text-2xl">{taskInfo.title}</h1>
      <h2 className="text-lg">
        Status da tarefa:
        <span
          className={`font-bold ${
            taskInfo.isCompleted ? "text-green-400" : "text-red-600"
          }`}
        >
          {statusClickDescription}
        </span>
      </h2>
      <div className="absolute top-0 right-[1%] text-right flex flex-col items-end justify-center">
        <h2>Recompensas:</h2>
        <div
          className={` reward ${
            taskInfo.rewardReceived ? "opacity-50 line-through" : ""
          }`}
        >
          <p>{rewards.coins} moedas</p>
          <img src={coinIMG} alt="" className="w-[2.5dvw]" />
        </div>
        <div
          className={`reward ${
            taskInfo.rewardReceived ? "opacity-50 line-through" : ""
          }`}
        >
          <p>{rewards.xp} xp</p>
          <img src={xpIMG} alt="" className="w-[3dvw]" />
        </div>
      </div>
      <div className="overflow-hidden overflow-y-auto max-w-full max-h-full">
        <p className="w-full h-full text-justify">{taskInfo.description}</p>
      </div>
    </div>
  );
}

export default DescriptionTask;
