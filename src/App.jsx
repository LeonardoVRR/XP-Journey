import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Search } from "lucide";

import viewIcon from "./assets/icons/view.png";
import editIcon from "./assets/icons/edit.png";
import deleteIcon from "./assets/icons/delete.png";
import completeTaskIcon from "./assets/icons/complete.png";
import pendingTaskIcon from "./assets/icons/pending.png";

function App() {
  if (localStorage.getItem("toDoList") == null) {
    localStorage.setItem("toDoList", JSON.stringify([]));
  }

  let toDoList = JSON.parse(localStorage.getItem("toDoList"));

  const [tasks, setTasks] = useState(toDoList);
  const createTaskForm = useRef(null);

  const [xpMax, setXpMax] = useState(100);
  const [xp, setXp] = useState(20);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [coins, setCois] = useState(0);
  const [level, setLevel] = useState(1);
  const [date, setDate] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [displayCreateTask, setDisplayCreateTask] = useState("hidden");

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const hoje = new Date();
  const dia = hoje.getDate();
  const diaDaSemana = diasDaSemana[hoje.getDay()];
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  useEffect(() => {
    const currentDate = `${diaDaSemana}, ${
      dia < 10 ? `0${dia}` : dia
    } de ${mes} de ${ano}`;
    setDate(currentDate);
  }, []);

  function visibilityCreateTask() {
    let visibility;

    if (displayCreateTask == "flex") {
      visibility = "hidden";
      createTaskForm.current.reset();
    } else {
      visibility = "flex";
    }

    setDisplayCreateTask(visibility);
  }

  function createTask(event) {
    event.preventDefault();

    let selectedDifficulty;

    const mes = hoje.getMonth() + 1;

    const currentDate = `${dia < 10 ? `0${dia}` : dia}/${
      mes < 10 ? `0${mes}` : mes
    }/${ano}`;

    const title = event.currentTarget.children[0].querySelector("input").value;
    const difficulty = event.currentTarget.children[1].querySelectorAll(
      'input[name="difficulty"]'
    );
    const description =
      event.currentTarget.children[2].querySelector("textarea").value;

    for (const checkedDifficulty of difficulty) {
      if (checkedDifficulty.checked) {
        selectedDifficulty = checkedDifficulty.value;
        break;
      }
    }

    console.log(title, currentDate, selectedDifficulty, description);

    onAddTaskSubmit(title, currentDate, selectedDifficulty, description);

    createTaskForm.current.reset();
    setDisplayCreateTask("hidden");
  }

  function onAddTaskSubmit(title, currentDate, difficulty, description) {
    const newTasks = [...tasks];

    newTasks.push({
      id: tasks.length,
      title: title,
      creationDate: currentDate,
      difficulty: difficulty,
      description: description,
      isCompleted: false,
    });

    // console.log(`Lista Novas Tarefas:`);
    // console.log(newTasks);

    localStorage.setItem("toDoList", JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  return (
    <div className="w-dvw h-dvh grid grid-cols-4 grid-rows-1 bg-[#f0f0f0]">
      <div
        className={`absolute z-50 w-dvw h-dvh bg-[#00000040] ${displayCreateTask} justify-center items-center`}
      >
        <article className="createTask bg-white rounded-2xl w-[60dvw] h-[80dvh] flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl border-b-1 border-gray-300 w-[95%]">
            Criar nova tarefa
          </h1>

          <form
            ref={createTaskForm}
            onSubmit={createTask}
            id="createTask"
            className="w-[95%] h-full flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label htmlFor="taskTitle">Titulo da tarefa:</label>
              <input
                type="text"
                name=""
                id="taskTitle"
                className="bg-gray-100 rounded-2xl"
                required
              />
            </div>
            <div>
              <h2>Dificuldade:</h2>
              <div className="selectDifficulty flex flex-wrap gap-10">
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name="difficulty"
                    id="easy"
                    value="Facil"
                    required
                  />
                  <label htmlFor="easy">Fácil</label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name="difficulty"
                    id="medium"
                    value="Medio"
                    required
                  />
                  <label htmlFor="medium">Médio</label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name="difficulty"
                    id="hard"
                    value="Dificil"
                    required
                  />
                  <label htmlFor="hard">Dificil</label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name="difficulty"
                    id="challenge"
                    value="Desafio"
                    required
                  />
                  <label htmlFor="challenge">Desafio</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 h-full">
              <label htmlFor="taskDescription">Descrição da tarefa:</label>
              <textarea
                form="createTask"
                name=""
                id="taskDescription"
                className="bg-gray-100 resize-none"
                required
              ></textarea>
            </div>

            <div className="flex justify-center gap-2">
              <button
                id="cancelTaskBtn"
                type="button"
                onClick={visibilityCreateTask}
                className="bg-red-500"
              >
                Cancelar
              </button>
              <button id="createTaskBtn" type="submit" className="bg-green-400">
                Criar
              </button>
            </div>
          </form>
        </article>
      </div>

      <section className="col-span-1 flex items-center justify-center">
        <article
          id="userProfile"
          className="bg-white w-[90%] h-[90%] flex flex-col items-center justify-around rounded-xl"
        >
          <div className="bg-gray-400 rounded-full w-[50%] aspect-square"></div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-center">Username</h1>
            <p id="level">Nivel: {level}</p>
            <p id="level-title">Noob</p>
          </div>
          <section className="w-full">
            <p>
              XP: {xp} / {xpMax}
            </p>
            <progress value={xp} max={100} className="w-full"></progress>
          </section>
          <section className="w-full grid grid-cols-2 grid-rows-1 border-1 border-black place-items-center">
            <div className="text-center" style={{ padding: "10px" }}>
              <h2>Tarefas concluidas:</h2>
              <p>{completedTasks}</p>
            </div>
            <div className="text-center" style={{ padding: "5px" }}>
              <h2>Moedas:</h2>
              <p>{coins}</p>
            </div>
          </section>
          <div className="w-full grid grid-cols-2 grid-rows-1 place-items-center">
            <button>Loja de Pontos</button>
            <button>Personalizar</button>
          </div>
        </article>
      </section>
      <section className="col-start-2 col-span-3 flex items-center justify-center">
        <article className="bg-white w-[95%] h-[90%] rounded-xl overflow-hidden grid grid-cols-1 grid-rows-3">
          <header
            id="banner"
            className="w-full row-span-1 flex flex-col justify-end"
          >
            <h1 className="text-white font-bold text-[2.5rem]">
              Tarefas do dia
            </h1>
            <p className="text-white">{date}</p>
          </header>
          <main
            id="to_do_list_container"
            className="row-start-2 row-span-3 grid grid-rows-1 grid-cols-4 gap-1 pt-1"
          >
            <section id="filters" className="flex flex-col gap-2">
              <div
                id="searchBar"
                className="border-1 border-black rounded-2xl flex justify-between gap-1"
              >
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Pesquisar Tarefa"
                  className="w-full h-full"
                />
                <button type="button" className="cursor-pointer max-w-[100%]">
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
                    className="lucide lucide-search-icon lucide-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>
              <hr />
              <section className="flex flex-col gap-1 overflow-hidden overflow-y-auto self-stretch max-w-full">
                <div id="filter_Container">
                  <h2>Status</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        id="Pendente"
                        value="Pendente"
                      />
                      <label htmlFor="Pendente">Pendente</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        id="Completo"
                        value="Completo"
                      />
                      <label htmlFor="Completo">Completo</label>
                    </div>
                  </div>
                </div>
                <div id="filter_Container">
                  <h2>Data</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="data"
                        id="maisRecentes"
                        value="maisRecentes"
                      />
                      <label htmlFor="maisRecentes">Mais recentes</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="data"
                        id="maisAntigas"
                        value="maisAntigas"
                      />
                      <label htmlFor="maisAntigas">Mais antigas</label>
                    </div>
                  </div>
                </div>

                <div id="filter_Container">
                  <h2>Dificuldade</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="easy"
                        value="Fácil"
                      />
                      <label htmlFor="easy">Fácil</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="medium"
                        value="Médio"
                      />
                      <label htmlFor="medium">Médio</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="hard"
                        value="Dificil"
                      />
                      <label htmlFor="hard">Dificil</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="challenge"
                        value="Desafio"
                      />
                      <label htmlFor="challenge">Desafio</label>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <section className="col-span-3">
              <div className="overflow-hidden overflow-y-auto max-h-full">
                <table
                  id="to_do_list"
                  className="relative border-collapse text-center w-full h-full"
                >
                  <thead className="sticky top-0 z-10 w-full">
                    <tr>
                      <th>Status</th>
                      <th>Nome</th>
                      <th>Data de criação</th>
                      <th>Dificuldade</th>
                      <th>
                        <button onClick={visibilityCreateTask}>+ Criar</button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>
                        <img src={pendingTaskIcon} alt="" />
                      </td>
                      <td>Tarefa 1</td>
                      <td>00/00/0000</td>
                      <td>Fácil</td>
                      <td>
                        <button>
                          <img src={viewIcon} alt="" />
                        </button>
                        <button>
                          <img src={editIcon} alt="" />
                        </button>
                        <button>
                          <img src={deleteIcon} alt="" />
                        </button>
                      </td>
                    </tr> */}
                    {tasks.map((task) => {
                      return (
                        <tr key={task.id}>
                          <td>
                            <img
                              src={
                                task.isCompleted
                                  ? completeTaskIcon
                                  : pendingTaskIcon
                              }
                              alt=""
                            />
                          </td>
                          <td>{task.title}</td>
                          <td>{task.creationDate}</td>
                          <td>{task.difficulty}</td>
                          <td>
                            <button>
                              <img src={viewIcon} alt="" />
                            </button>
                            <button>
                              <img src={editIcon} alt="" />
                            </button>
                            <button>
                              <img src={deleteIcon} alt="" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </article>
      </section>
    </div>
  );
}

export default App;
