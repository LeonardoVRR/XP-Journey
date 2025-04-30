import "./InfoModal.css";

function InfoModal({
  displayInfoModal,
  setDisplayInfoModal,
  infoModalMessage,
}) {
  return (
    <section
      className={`${displayInfoModal} justify-center items-center absolute w-dvw h-dvh bg-[#00000067] z-100`}
    >
      <article className="modalContainer w-[50dvw] aspect-[3/2] bg-white rounded-2xl flex flex-col items-center justify-center">
        <h1 className="grow-1 text-[2dvw]">Aviso</h1>
        <div className="grow-8 flex justify-center items-center">
          <p className="text-[1.5dvw]">{infoModalMessage}</p>
        </div>
        <button
          onClick={() => setDisplayInfoModal("hidden")}
          className="grow-1"
        >
          OK
        </button>
      </article>
    </section>
  );
}

export default InfoModal;
