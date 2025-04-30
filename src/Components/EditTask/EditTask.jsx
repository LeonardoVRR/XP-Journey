function EditTask({
  taskInfo,
  displayTaskEdit,
  setDisplayTaskEdit,
  onEditTaskSubmit,
  editTaskForm,
}) {
  return (
    <div
      className={`absolute z-50 w-dvw h-dvh bg-[#00000040] ${displayTaskEdit} justify-center items-center`}
    >
      <article className="createTask bg-white rounded-2xl w-[60dvw] h-[80dvh] flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl border-b-1 border-gray-300 w-[95%]">
          Editar tarefa
        </h1>

        <form
          ref={editTaskForm}
          onSubmit={(event) => onEditTaskSubmit(event, taskInfo.id)}
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
            />
          </div>
          <div>
            <h2>Dificuldade:</h2>
            <div className="selectDifficulty flex flex-wrap gap-10">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="difficulty"
                  id="easy2"
                  value="Fácil"
                />
                <label htmlFor="easy2">Fácil</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="difficulty"
                  id="medium2"
                  value="Médio"
                />
                <label htmlFor="medium2">Médio</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="difficulty"
                  id="hard2"
                  value="Dificil"
                />
                <label htmlFor="hard2">Dificil</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="difficulty"
                  id="challenge2"
                  value="Desafio"
                />
                <label htmlFor="challenge2">Desafio</label>
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
            ></textarea>
          </div>

          <div className="flex justify-center gap-2">
            <button
              id="cancelTaskBtn"
              type="button"
              onClick={() => setDisplayTaskEdit("hidden")}
              className="bg-red-500"
            >
              Cancelar
            </button>
            <button id="createTaskBtn" type="submit" className="bg-green-400">
              Salvar
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}

export default EditTask;
