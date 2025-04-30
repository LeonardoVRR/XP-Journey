import "./CustomAvatar.css";

function CustomAvatar({
  selectedHead,
  selectedFace,
  selectedBody,
  selectedAccessory,
}) {
  return (
    <div className="col-start-2 col-span-2 w-full aspect-square border-2 border-black rounded-[100%] grid grid-rows-2 grid-cols-1 content-center overflow-hidden relative">
      <div className="head flex justify-center aspect-square max-w-[60%] absolute">
        <img src={selectedHead} alt="" />
        <div className="face w-full h-full absolute flex justify-center">
          <img src={selectedFace} alt="" />
        </div>
        <div className="acessory w-full h-full absolute flex justify-center">
          <img src={selectedAccessory} alt="" />
        </div>
      </div>
      <div className="body row-start-2 flex justify-center">
        <img src={selectedBody} alt="" />
      </div>
    </div>
  );
}

export default CustomAvatar;
