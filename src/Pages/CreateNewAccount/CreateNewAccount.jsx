import Button from "../../Components/Button/Button";
import "./CreateNewAccount.css";

import face from "../../assets/avatar/generics/customizable/standard/face/Smile.svg";
import head from "../../assets/avatar/generics/customizable/standard/head/Short 5.svg";
import body from "../../assets/avatar/generics/customizable/standard/body/Button Shirt 1.svg";
import acessory from "../../assets/avatar/generics/customizable/standard/accessories/None.svg";
import { useEffect, useRef, useState } from "react";
import CustomAvatar from "../../Components/CustomAvatar/CustomAvatar";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";
import { useNavigate } from "react-router-dom";

import {
  defaultAvatars,
  defaultCustomAvatar,
  defaultBanners,
  defaultBackgrounds,
  shopAvatars,
  shopCustomAvatar,
  shopBanners,
  shopAnimatedBanners,
  shopBackgrounds,
} from "../../Components/ImportAssets/ImportAssets.jsx";
import InfoModal from "../../Components/InfoModal/infoModal.jsx";

function CreateNewAccount() {
  const [displayLoginAccount, setDisplayLoginAccount] = useState("hidden");

  // let userAccount = JSON.parse(localStorage.getItem("user"));
  const itemRarityList = ["common", "rare", "epic", "legendary"];
  const rarityItem = {
    common: {
      name: "Comum",
      price: 100,
    },
    rare: {
      name: "Raro",
      price: 250,
    },
    epic: {
      name: "Épico",
      price: 500,
    },
    legendary: {
      name: "Lendária",
      price: 1000,
    },
  };

  const navigate = useNavigate();

  const [chooseName, setChooseName] = useState("grid");
  const [chooseAvatarType, setChooseAvatarType] = useState("hidden");
  const [createAvatar, setCreateAvatar] = useState("hidden");
  const [selectAvatar, setSelectAvatar] = useState("hidden");

  //config. criação de avatar
  const [selectedBody, setSelectedBody] = useState(body);
  const [selectedBodyNumber, setSelectedBodyNumber] = useState(0);
  const [selectedFace, setSelectedFace] = useState(face);
  const [selectedFaceNumber, setSelectedFaceNumber] = useState(0);
  const [selectedHead, setSelectedHead] = useState(head);
  const [selectedHeadNumber, setSelectedHeadNumber] = useState(0);
  const [selectedAccessory, setSelectedAccessory] = useState(acessory);
  const [selectedAccessoryNumber, setSelectedAccessoryNumber] = useState(0);

  let userName = useRef(null);
  let [userAvatar, setUserAvatar] = useState(null);

  const [displayInfoModal, setDisplayInfoModal] = useState("hidden");
  const [infoModalMessage, setInfoModalMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setDisplayLoginAccount("flex");
    } else {
      setDisplayLoginAccount("hidden");
    }
  }, []);

  async function changeHead(change) {
    const headOptions = ["Short 5", "Pomp", "Medium 1", "Medium 2"];

    let currentHeadNumber = selectedHeadNumber;

    if (change == "next") {
      if (currentHeadNumber < headOptions.length - 1) {
        currentHeadNumber += 1;
      } else {
        currentHeadNumber = 0;
      }
    } else {
      {
        if (currentHeadNumber > 0) {
          currentHeadNumber -= 1;
        } else {
          currentHeadNumber = headOptions.length - 1;
        }
      }
    }

    setSelectedHeadNumber(currentHeadNumber);

    const head = await import(
      `../../assets/avatar/generics/customizable/standard/head/${headOptions[currentHeadNumber]}.svg`
    );

    setSelectedHead(head.default);
  }

  async function changeFace(change) {
    const faceOptions = ["Smile", "Calm", "Smile Teeth Gap"];

    let currentFaceNumber = selectedFaceNumber;

    if (change == "next") {
      if (currentFaceNumber < faceOptions.length - 1) {
        currentFaceNumber += 1;
      } else {
        currentFaceNumber = 0;
      }
    } else {
      {
        if (currentFaceNumber > 0) {
          currentFaceNumber -= 1;
        } else {
          currentFaceNumber = faceOptions.length - 1;
        }
      }
    }

    setSelectedFaceNumber(currentFaceNumber);

    const face = await import(
      `../../assets/avatar/generics/customizable/standard/face/${faceOptions[currentFaceNumber]}.svg`
    );

    setSelectedFace(face.default);
  }

  async function changeBody(change) {
    const bodyOptions = [
      "Button Shirt 1",
      "Blazer Black Tee",
      "Device",
      "Dress",
    ];

    let currentBodyNumber = selectedBodyNumber;

    if (change == "next") {
      if (currentBodyNumber < bodyOptions.length - 1) {
        currentBodyNumber += 1;
      } else {
        currentBodyNumber = 0;
      }
    } else {
      {
        if (currentBodyNumber > 0) {
          currentBodyNumber -= 1;
        } else {
          currentBodyNumber = bodyOptions.length - 1;
        }
      }
    }

    setSelectedBodyNumber(currentBodyNumber);

    const body = await import(
      `../../assets/avatar/generics/customizable/standard/body/${bodyOptions[currentBodyNumber]}.svg`
    );

    setSelectedBody(body.default);
  }

  async function changeAcessory(change) {
    const acessoryOptions = ["None", "Glasses"];

    let currentAcessoryNumber = selectedAccessoryNumber;

    if (change == "next") {
      if (currentAcessoryNumber < acessoryOptions.length - 1) {
        currentAcessoryNumber += 1;
      } else {
        currentAcessoryNumber = 0;
      }
    } else {
      {
        if (currentAcessoryNumber > 0) {
          currentAcessoryNumber -= 1;
        } else {
          currentAcessoryNumber = acessoryOptions.length - 1;
        }
      }
    }

    setSelectedAccessoryNumber(currentAcessoryNumber);

    const acessory = await import(
      `../../assets/avatar/generics/customizable/standard/accessories/${acessoryOptions[currentAcessoryNumber]}.svg`
    );

    setSelectedAccessory(acessory.default);
  }

  function chooseUserName(event) {
    event.preventDefault();
    userName.current = event.currentTarget.querySelector("input").value;

    event.currentTarget.querySelector("input").value = "";

    setChooseName("hidden");
    setChooseAvatarType("flex");
  }

  function createAccount(event) {
    //console.log(shopAnimatedBanners);

    const defaultAvatarsImgs = Object.values(defaultAvatars).map(
      (img) => img.default
    );

    // Extraindo os caminhos (src) das imagens
    const shopAvatarsImgs = Object.values(shopAvatars).map(
      (img) => img.default
    );

    const defaultCustomAvatarImgs = {
      head: Object.values(defaultCustomAvatar.head).map((img) => img.default),
      face: Object.values(defaultCustomAvatar.face).map((img) => img.default),
      acessory: Object.values(defaultCustomAvatar.acessory).map(
        (img) => img.default
      ),
      body: Object.values(defaultCustomAvatar.body).map((img) => img.default),
    };

    const shopCustomAvatarImgs = {
      head: Object.values(shopCustomAvatar.head).map((img) => img.default),
      face: Object.values(shopCustomAvatar.face).map((img) => img.default),
      acessory: Object.values(shopCustomAvatar.acessory).map(
        (img) => img.default
      ),
      body: Object.values(shopCustomAvatar.body).map((img) => img.default),
    };

    const defaultStaticBannersImgs = Object.values(defaultBanners).map(
      (img) => img.default
    );

    const shopStaticBannersImgs = Object.values(shopBanners).map(
      (img) => img.default
    );

    const shopAnimatedBannersImgs = {
      webp: Object.values(shopAnimatedBanners.webp).map((img) => img.default),
      png: Object.values(shopAnimatedBanners.png).map((img) => img.default),
    };

    const defaultStaticBackgroundsImgs = Object.values(defaultBackgrounds).map(
      (img) => img.default
    );

    const shopStaticBackgroundsImgs = Object.values(shopBackgrounds).map(
      (img) => img.default
    );

    const avatarType =
      event.currentTarget.parentElement.id == "chooseAvatar"
        ? "chooseAvatar"
        : "createAvatar";

    if (!userAvatar && avatarType == "chooseAvatar") {
      setDisplayInfoModal("flex");
      setInfoModalMessage("Escolhar um avartar anstes de proseguir!");
      return;
    }

    // console.log(avatar);

    const userAccount = {
      name: userName.current,
      level: 1,
      title: "Recruta das Terras Desconhecidas",
      xp: 0,
      xpMax: 100,
      coins: 0,
      completedTasks: 0,
      bannerSelected: defaultStaticBannersImgs[0],
      bannerPosition: "bottom",
      backgroundSelected: defaultStaticBackgroundsImgs[0],
      avatarType: avatarType,
      avatar: avatarType == "chooseAvatar" ? userAvatar : defaultAvatarsImgs[0],
      customAvatar:
        avatarType == "createAvatar"
          ? {
              head: selectedHead,
              face: selectedFace,
              acessory: selectedAccessory,
              body: selectedBody,
            }
          : {
              head: defaultCustomAvatarImgs.head[0],
              face: defaultCustomAvatarImgs.face[0],
              acessory: defaultCustomAvatarImgs.acessory[0],
              body: defaultCustomAvatarImgs.body[0],
            },
    };

    const unlockedItems = {
      avatars: {
        static: [],
        animated: [],
        customize: {
          head: [],
          face: [],
          acessory: [],
          body: [],
        },
      },
      banners: {
        static: [],
        animated: [],
      },
      backgrounds: {
        static: [],
        animated: [],
      },
    };

    const shopItems = {
      avatars: {
        static: [],
        animated: [],
        customize: {
          head: [],
          face: [],
          acessory: [],
          body: [],
        },
      },
      banners: {
        static: [],
        animated: [],
      },
      backgrounds: {
        static: [],
        animated: [],
      },
    };

    defaultAvatarsImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.avatars.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopAvatarsImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.avatars.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    defaultCustomAvatarImgs.head.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.avatars.customize.head.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopCustomAvatarImgs.head.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.avatars.customize.head.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    defaultCustomAvatarImgs.face.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.avatars.customize.face.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopCustomAvatarImgs.face.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.avatars.customize.face.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    defaultCustomAvatarImgs.acessory.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.avatars.customize.acessory.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopCustomAvatarImgs.acessory.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.avatars.customize.acessory.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    defaultCustomAvatarImgs.body.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.avatars.customize.body.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopCustomAvatarImgs.body.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.avatars.customize.body.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    defaultStaticBannersImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.banners.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopStaticBannersImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.banners.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    shopAnimatedBannersImgs.webp.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.banners.animated.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        webp: img,
        png: shopAnimatedBannersImgs.png[index],
      });
    });

    defaultStaticBackgroundsImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      unlockedItems.backgrounds.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: true,
        rarity: rarityItem.common.name,
        price: rarityItem.common.price,
        src: img,
      });
    });

    shopStaticBackgroundsImgs.forEach((img, index) => {
      const srcImage = img.split("/");

      const rarity =
        itemRarityList[Math.floor(Math.random() * itemRarityList.length)];

      shopItems.backgrounds.static.push({
        id: index,
        name: srcImage[srcImage.length - 1],
        unlocked: false,
        rarity: rarityItem[rarity].name,
        price: rarityItem[rarity].price,
        src: img,
      });
    });

    localStorage.setItem("user", JSON.stringify(userAccount));
    localStorage.setItem("shopItems", JSON.stringify(shopItems));
    localStorage.setItem("unlockedItems", JSON.stringify(unlockedItems));

    navigate(`/home`);
  }

  return (
    <div className="w-dvw h-dvh grid grid-rows-1 grid-cols-2">
      <InfoModal
        displayInfoModal={displayInfoModal}
        setDisplayInfoModal={setDisplayInfoModal}
        infoModalMessage={infoModalMessage}
      />

      <section className="container-left text-white flex flex-col justify-center items-center gap-5">
        <h1 className="welcomeMsg">Bem-vindo ao</h1>
        <h1 className="projectName">XP JOURNEY!</h1>
        <p className="text-center w-[70%] text-[1.5dvw]">
          Transforme suas tarefas diárias em missões épicas e conquiste sua
          melhor versão.
        </p>
      </section>
      <article className="flex flex-col justify-center items-center">
        <div
          className={`userNameContainer w-full h-full ${chooseName} grid-cols-1 ${
            displayLoginAccount == "hidden"
              ? "grid-rows-1"
              : "grid-rows-[3fr_1fr] gap-4"
          } overflow-hidden overflow-y-auto`}
        >
          <form
            onSubmit={chooseUserName}
            className={`createAccountForm w-full h-full flex flex-col justify-center items-center gap-12`}
          >
            <h1 className="text-[4dvw] text-center">
              Iniciar uma nova jornada
            </h1>
            <div className="flex flex-col w-[50%]">
              <label htmlFor="userName">Nome de usuário</label>
              <input
                type="text"
                name=""
                id="userName"
                className="border-1 w-full"
                required
              />
            </div>
            <Button buttonName={"Avançar"} typeButton={"submit"} />
          </form>
          <section
            className={`loginAccountContainer ${displayLoginAccount} flex-col gap-3 items-center `}
          >
            <div className="flex flex-col">
              <h1 className="text-[2dvw]">Jornada anterior detectada.</h1>
              <p className="text-[1.2dvw] text-center">
                Deseja continuar de onde parou?
              </p>
            </div>
            <button
              onClick={() => navigate("/home")}
              className="bg-red-500 text-white rounded-xl w-[20%]"
            >
              Continuar
            </button>
          </section>
        </div>

        <section
          className={`w-full h-full ${chooseAvatarType} flex-col justify-center items-center gap-10 relative`}
        >
          <button
            onClick={() => {
              if (chooseAvatarType != "hidden") {
                setChooseName("grid");
                setChooseAvatarType("hidden");
              }
            }}
            className="absolute top-5 left-5"
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
              className="lucide lucide-chevron-left-icon lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-[4dvw]">Avatar</h1>
          <div className="chooseAvatarType w-full flex justify-center items-center gap-6">
            <button
              onClick={() => {
                setChooseAvatarType("hidden");
                setSelectAvatar("flex");
              }}
            >
              Escolher avatar
            </button>
            <button
              onClick={() => {
                setChooseAvatarType("hidden");
                setCreateAvatar("flex");
              }}
            >
              Criar avatar
            </button>
          </div>
        </section>

        <section
          id="chooseAvatar"
          className={`w-full h-full ${selectAvatar} flex-col justify-center items-center gap-6 relative`}
        >
          <button
            onClick={() => {
              if (selectAvatar != "hidden") {
                setChooseAvatarType("flex");
                setSelectAvatar("hidden");
              }
            }}
            className="absolute top-5 left-5"
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
              className="lucide lucide-chevron-left-icon lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-[3dvw]">Escolha o seu avatar</h1>
          <div className="w-full h-[70%]">
            <ImageGallery images={defaultAvatars} imgSelected={setUserAvatar} />
          </div>
          <Button
            buttonName={"Finalizar"}
            typeButton={"button"}
            onClickFunction={createAccount}
          />
        </section>

        <section
          id="createAvatar"
          className={`createAvatar w-full h-full ${createAvatar} flex-col items-center justify-items-center gap-4 relative`}
        >
          <button
            onClick={() => {
              if (createAvatar != "hidden") {
                setChooseAvatarType("flex");
                setCreateAvatar("hidden");
              }
            }}
            className="absolute top-5 left-5"
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
              className="lucide lucide-chevron-left-icon lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-5xl">Crie o seu avatar</h1>
          <div className="grow-2 max-w-[90%] grid grid-rows-1 grid-cols-3 w-full items-center justify-items-stretch">
            <div className="appearanceOptions grid grid-rows-5 grid-cols-1 content-around items-center justify-items-center h-[70%]">
              <div>
                <h2>Cabeça:</h2>
                <div className="flex gap-2">
                  <button onClick={() => changeHead("prev")}>
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
                      className="lucide lucide-chevron-left-icon lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <p>{selectedHeadNumber + 1}</p>
                  <button onClick={() => changeHead("next")}>
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
                      className="lucide lucide-chevron-right-icon lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h2>Rosto:</h2>
                <div className="flex gap-2">
                  <button onClick={() => changeFace("prev")}>
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
                      className="lucide lucide-chevron-left-icon lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <p>{selectedFaceNumber + 1}</p>
                  <button onClick={() => changeFace("next")}>
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
                      className="lucide lucide-chevron-right-icon lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h2>Acessorio:</h2>
                <div className="flex gap-2">
                  <button onClick={() => changeAcessory("prev")}>
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
                      className="lucide lucide-chevron-left-icon lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <p>{selectedAccessoryNumber}</p>
                  <button onClick={() => changeAcessory("next")}>
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
                      className="lucide lucide-chevron-right-icon lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h2>Roupa:</h2>
                <div className="flex gap-2">
                  <button onClick={() => changeBody("prev")}>
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
                      className="lucide lucide-chevron-left-icon lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <p>{selectedBodyNumber + 1}</p>
                  <button onClick={() => changeBody("next")}>
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
                      className="lucide lucide-chevron-right-icon lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <CustomAvatar
              selectedHead={selectedHead}
              selectedFace={selectedFace}
              selectedBody={selectedBody}
              selectedAccessory={selectedAccessory}
            />
          </div>

          <Button
            buttonName={"Finalizar"}
            typeButton={"button"}
            onClickFunction={createAccount}
          />
        </section>
      </article>
    </div>
  );
}

export default CreateNewAccount;
