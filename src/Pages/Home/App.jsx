import { useEffect, useRef, useState } from "react";
import "./App.css";

import viewIcon from "../../assets/icons/view.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import completeTaskIcon from "../../assets/icons/complete.png";
import pendingTaskIcon from "../../assets/icons/pending.png";
import DescriptionTask from "../../Components/DescriptionTask/DescriptionTask";
import EditTask from "../../Components/EditTask/EditTask";

// import rewardIcon from "../../assets/icons/rewardsIcons/rareReward.png";
// import rewardReceivedIcon from "../../assets/icons/rewardsIcons/rareReward_open.png";
import xpIMG from "../../assets/icons/taskIcons/xp.gif";

import customizeIcon from "../../assets/icons/customizeIcon.png";
import settingsIcon from "../../assets/icons/settingsIcon.png";
import shopIcon from "../../assets/icons/shopIcon.png";

import CustomAvatar from "../../Components/CustomAvatar/CustomAvatar";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";

import treasureIcon from "../../assets/icons/treasureIcon.png";
import dungeonImg from "../../assets/icons/dungeon.png";

import {
  shopCustomAvatar,
  coinSprites,
  chestSprites,
  openChestSprites,
} from "../../Components/ImportAssets/ImportAssets.jsx";
import InfoModal from "../../Components/InfoModal/infoModal.jsx";
import Switch from "../../Components/Switch/Switch.jsx";

//import bannerTeste from "../../assets/banners/banner_6.webp";

function App() {
  const navigate = useNavigate();

  if (localStorage.getItem("user") == null) {
    return (
      <div
        id="noAccount"
        className="w-dvw h-dvh flex flex-col justify-center items-center gap-4"
      >
        <h1 className="text-center text-[2.5dvw] w-[70%] text-[#000000]">
          Os portões do destino permanecem selados... apenas os registrados
          podem cruzá-los. Crie sua conta e marque seu nome na história.
        </h1>
        <button
          onClick={() => navigate(`/`)}
          className="bg-blue-300 text-white"
        >
          Registre-se
        </button>
      </div>
    );
  }

  // inicializa a lista de tarefas
  if (localStorage.getItem("toDoList") == null) {
    localStorage.setItem("toDoList", JSON.stringify([]));
  }

  let userAccount = JSON.parse(localStorage.getItem("user"));
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  let shopItems = JSON.parse(localStorage.getItem("shopItems"));
  let unlockedItems = JSON.parse(localStorage.getItem("unlockedItems"));

  const levelTitles = [
    "Recruta das Terras Desconhecidas", //lvl 1
    "Aspirante a Herói", //lvl 2-5
    "Guardião Jovem", //lvl 6-10
    "Herói de Primeira Ordem", //lvl 11-20
    "Vingador das Sombras", //lvl 21-30
    "Campeão das Eras", //lvl 31-40
    "Lâmina das Estrelas", //lvl 41-50
    "Sábio dos Reinos Perdidos", //lvl 51-60
    "Guardião do Destino", //lvl 61-70
    "Mestre da Jornada", //lvl 100
  ];

  const rewardsList = {
    facil: {
      coins: 2,
      xp: 5,
      coinIMG: "bronze_coin.png",
    },
    medio: {
      coins: 5,
      xp: 15,
      coinIMG: "silver_coin.png",
    },
    dificil: {
      coins: 20,
      xp: 50,
      coinIMG: "gold_coin.png",
    },
    desafio: {
      coins: 50,
      xp: 100,
      coinIMG: "diamond_coin.png",
    },
  };

  const [rewardsIcons, setRewardsIcons] = useState(null);

  let listImgCoins = useRef([]);
  const [coinIMG, setCoinIMG] = useState(null);
  const [date, setDate] = useState(null);

  //const [imageList, setImageList] = useState(shopAvatars);
  const [customAvatarSession, setCustomAvatarSession] = useState("head");

  // const testTask = [
  //   {
  //     creationDate: "15/04/2025",
  //     description: "ggggggg",
  //     difficulty: "Desafio",
  //     id: 0,
  //     isCompleted: false,
  //     title: "Estudar React",
  //   },
  //   {
  //     creationDate: "14/04/2025",
  //     description: "ggggggg",
  //     difficulty: "Desafio",
  //     id: 0,
  //     isCompleted: false,
  //     title: "Estudar React",
  //   },
  //   {
  //     creationDate: "13/04/2025",
  //     description: "ggggggg",
  //     difficulty: "Desafio",
  //     id: 0,
  //     isCompleted: false,
  //     title: "Estudar React",
  //   },
  //   {
  //     creationDate: "15/04/2022",
  //     description: "ggggggg",
  //     difficulty: "Desafio",
  //     id: 0,
  //     isCompleted: false,
  //     title: "Estudar React",
  //   },
  // ];

  const [tasks, setTasks] = useState(toDoList);
  const createTaskForm = useRef(null);
  const editTaskForm = useRef(null);
  //const toDoListRef = useRef(null);

  const [userName, setUserName] = useState(userAccount.name);
  const [title, setTitle] = useState(userAccount.title);
  const [xpMax, setXpMax] = useState(userAccount.xpMax);
  const [xp, setXp] = useState(userAccount.xp);
  const [completedTasks, setCompletedTasks] = useState(
    userAccount.completedTasks
  );
  const [coins, setCoins] = useState(userAccount.coins);
  const [level, setLevel] = useState(userAccount.level);
  const [avatarType, setAvatarType] = useState(userAccount.avatarType);
  const [avatar, setAvatar] = useState(userAccount.avatar);
  //const [avatarAvailable, setAvatarAvailable] = useState(false);
  const [banner, setBanner] = useState(userAccount.bannerSelected);
  const [background, setBackground] = useState(userAccount.backgroundSelected);

  const [displayCreateTask, setDisplayCreateTask] = useState("hidden");
  const [displayTaskDescription, setDisplayTaskDescription] =
    useState("hidden");
  const [displayTaskEdit, setDisplayTaskEdit] = useState("hidden");
  const [displayRewardContainer, setDisplayRewardContainer] =
    useState("hidden");
  const [displayShop, setDisplayShop] = useState("hidden");
  const [displayInfoModal, setDisplayInfoModal] = useState("hidden");
  const [displayAccountSettings, setDisplayAccountSettings] =
    useState("hidden");
  const [displayDeletAccount, setDisplayDeletAccount] = useState("hidden");

  const [infoModalMessage, setInfoModalMessage] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("semFiltro");
  const [dateFilter, setDateFilter] = useState("semFiltro");
  const [difficultyFilter, setDifficultyFilter] = useState("semFiltro");

  const [emptyListMessage, setEmptyListMessage] = useState(true);
  const rewardSelectedTask = useRef(null);
  const [accountOptionBtnSelected, setAccountOptionBtnSelected] = useState("");
  const [shopAreaSelected, setShopAreaSelected] = useState("home");
  const [selectedStoreType, setSelectedStoreType] = useState("avatars");
  const [changeStoreType, setChangeStoreType] = useState(false);
  const [selectedStoreItemType, setSelectedStoreItemType] = useState("static");
  const [storeItemStyle, setStoreItemStyle] = useState(false);

  const [avatarShopSelected, setAvatarShopSelected] = useState(null);
  const [itemInfoSelected, setItemInfoSelected] = useState(null);
  const [animatedShopItem, setAnimatedShopItem] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [positionBanner, setpositionBanner] = useState(
    userAccount.bannerPosition
  );

  const [changeCustomAvatar, setChangeCustomAvatar] = useState(
    userAccount.customAvatar
  );

  let listaFiltrada = tasks.filter((task) => {
    const nameTask = task.title.toLowerCase().includes(nameFilter);

    const difficulty =
      difficultyFilter == "semFiltro" ||
      task.difficulty.toLowerCase() == difficultyFilter.toLowerCase();

    const taskStatus = task.isCompleted ? "Completo" : "Pendente";
    const status = statusFilter == "semFiltro" || taskStatus == statusFilter;

    return difficulty && status && nameTask;
  });

  let [taskInfo, setTaskInfo] = useState(null);
  let [statusClickDescription, setStatusClickDescription] = useState(null);

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

    const rewardsIconsSrc = Object.values(chestSprites).map(
      (img) => img.default
    );

    const reciveRewardsSrc = Object.values(openChestSprites).map(
      (img) => img.default
    );

    let rewardIconsList = {};

    rewardsIconsSrc.forEach((item, index) => {
      const rarity = item.split("/");
      const name = rarity[rarity.length - 1].replace(".png", "");
      //console.log(name);

      let difficulty =
        name == "legendaryReward"
          ? "desafio"
          : name == "epicReward"
          ? "dificil"
          : name == "rareReward"
          ? "medio"
          : "facil";

      rewardIconsList[difficulty] = {
        rewardIcon: item,
        reciveRewardIcon: reciveRewardsSrc[index],
      };
    });

    setRewardsIcons(rewardIconsList);

    //
  }, []);

  useEffect(() => {
    setEmptyListMessage(tasks.length > 0 ? false : true);
  }, [tasks]);

  useEffect(() => {
    // Extraindo os caminhos (src) das imagens
    const imgCoins = Object.values(coinSprites).map((img) => img.default);
    //listImgCoins.current = imgCoins;

    imgCoins.forEach((item) => {
      const coinName = item.split("/");
      if (coinName[coinName.length - 1] != "xp.gif") {
        listImgCoins.current.push({
          name: coinName[coinName.length - 1],
          src: item,
        });

        //console.log(item);
      }

      //console.log(coinName);
    });

    //console.log(imgCoins);
  }, []);

  //verificardor de XP
  useEffect(() => {
    if (xp >= xpMax) {
      const newXp = xp > xpMax ? xp - xpMax : 0;
      const newXpMax = Math.round(xpMax * 1.2);
      const newLevel = level + 1;

      let newTitle = title;
      if (newLevel <= 1) {
        newTitle = levelTitles[0];
      } else if (newLevel <= 5) {
        newTitle = levelTitles[1];
      } else if (newLevel <= 10) {
        newTitle = levelTitles[2];
      } else if (newLevel <= 20) {
        newTitle = levelTitles[3];
      } else if (newLevel <= 30) {
        newTitle = levelTitles[4];
      } else if (newLevel <= 40) {
        newTitle = levelTitles[5];
      } else if (newLevel <= 50) {
        newTitle = levelTitles[6];
      } else if (newLevel <= 60) {
        newTitle = levelTitles[7];
      } else if (newLevel <= 70) {
        newTitle = levelTitles[8];
      } else if (newLevel >= 100) {
        newTitle = levelTitles[9];
      }

      const updatedAccount = {
        ...userAccount,
        xp: newXp,
        xpMax: newXpMax,
        level: newLevel,
        title: newTitle,
      };

      setXp(newXp);
      setXpMax(newXpMax);
      setLevel(newLevel);
      if (newTitle !== title) {
        setTitle(newTitle);
      }

      localStorage.setItem("user", JSON.stringify(updatedAccount));
    }
  }, [xp, xpMax, level, title, levelTitles]); // evita dependência instável de `userAccount`

  function organizarLista(lista) {
    if (dateFilter == "semFiltro") return lista;

    let listaOrganizada =
      dateFilter == "maisAntigas"
        ? lista.sort(
            (a, b) => convertDate(a.creationDate) - convertDate(b.creationDate)
          )
        : lista.sort(
            (a, b) => convertDate(b.creationDate) - convertDate(a.creationDate)
          );

    //console.log(lista);

    return listaOrganizada;
  }

  function convertDate(task) {
    const date = task.split("/");

    const formattedDate = `${date[2]}-${date[1]}-${date[0]}`;

    //console.log(Date.parse(formattedDate));

    return Date.parse(formattedDate);
  }

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

    //console.log(title, currentDate, selectedDifficulty, description);

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
      rewardReceived: false,
    });

    // console.log(`Lista Novas Tarefas:`);
    // console.log(newTasks);

    localStorage.setItem("toDoList", JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        // console.log(`Lista Original:`);
        // console.log(tasks);
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    localStorage.setItem("toDoList", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks
      .filter((task) => task.id != taskId)
      .map((task, index) => {
        return {
          ...task,
          id: index,
        };
      });

    setTasks(newTasks);
    localStorage.setItem("toDoList", JSON.stringify(newTasks));
  }

  function onEditTask(taskId) {
    const selectedTask = tasks.find((task) => task.id === taskId);

    //console.log(selectedTask);

    setTaskInfo(selectedTask);
  }

  function onEditTaskSubmit(event, taskId) {
    if (editTaskForm.current == null) return;

    event.preventDefault();

    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        const newTitle =
          event.currentTarget.children[0].querySelector("input").value;

        const difficulty = event.currentTarget.children[1].querySelectorAll(
          'input[name="difficulty"]'
        );

        const newDescription =
          event.currentTarget.children[2].querySelector("textarea").value;

        let newDifficulty;

        for (const checkedDifficulty of difficulty) {
          if (checkedDifficulty.checked) {
            newDifficulty = checkedDifficulty.value;
            break;
          }
        }

        // console.log(`Lista Original:`);
        //console.log(newDifficulty);
        return {
          ...task,
          title: newTitle != "" ? newTitle : task.title,
          difficulty:
            newDifficulty != undefined ? newDifficulty : task.difficulty,
          description: newDescription != "" ? newDescription : task.description,
        };
      }

      return task;
    });

    event.currentTarget.children[2].querySelector("textarea").value = "";
    editTaskForm.current.reset();
    setDisplayTaskEdit("hidden");
    localStorage.setItem("toDoList", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  async function onDescriptionTaskClick(selectedTask) {
    setDisplayTaskDescription("block");

    const task = tasks.find((task) => task.id == selectedTask.id); // Usando 'find' para encontrar a tarefa

    if (task) {
      // Verificando se a tarefa foi encontrada
      const resp = await new Promise(async (resolve) => {
        const coin = await import(
          `../../assets/icons/taskIcons/${
            rewardsList[removerAcentuacao(task.difficulty)].coinIMG
          }`
        ); // A importação precisa ser aguardada

        resolve({
          status: true,
          taskInfo: selectedTask,
          coin: coin.default,
        });
      });

      setStatusClickDescription(resp.status);
      setTaskInfo(resp.taskInfo);
      setCoinIMG(resp.coin);
    }
  }

  function displayReward(taskId) {
    setDisplayRewardContainer("flex");

    tasks.forEach((task) => {
      if (task.id == taskId) {
        rewardSelectedTask.current = task;
      }
    });

    const coin =
      rewardsList[removerAcentuacao(rewardSelectedTask.current.difficulty)]
        .coinIMG;

    listImgCoins.current.forEach((item) => {
      if (item.name == coin) {
        //console.log(item.src);
        setCoinIMG(item.src);
      }
    });

    //console.log(coin);
  }

  function reciveReward(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        // console.log(`Lista Original:`);
        // console.log(tasks);

        if (task.isCompleted && !task.rewardReceived) {
          // console.log(
          //   `Moedas recebidas: ${
          //     rewardsList[removerAcentuacao(task.difficulty)]["coins"]
          //   }`
          // );

          userAccount.coins +=
            rewardsList[removerAcentuacao(task.difficulty)].coins;

          userAccount.xp += rewardsList[removerAcentuacao(task.difficulty)].xp;

          userAccount.completedTasks += 1;

          return {
            ...task,
            rewardReceived: true,
          };
        } else {
          console.log("Sem alteração");
          return task;
        }
      }

      return task;
    });
    localStorage.setItem("user", JSON.stringify(userAccount));
    setCompletedTasks(userAccount.completedTasks);
    setCoins(userAccount.coins);
    setXp(userAccount.xp);
    // console.log(userAccount);
    localStorage.setItem("toDoList", JSON.stringify(newTasks));
    setTasks(newTasks);
    setDisplayRewardContainer("hidden");
  }

  function removerAcentuacao(str) {
    return str
      .normalize("NFD") // normaliza a string para decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // remove os acentos
      .toLowerCase();
  }

  function browseShop(event) {
    if (event.target.id != "") {
      const selectedArea = event.target.id;
      //console.log(selectedArea);
      setShopAreaSelected(selectedArea);

      if (selectedArea.toLowerCase() == "avatars") {
        setSelectedStoreType("avatars");
        setStoreItemStyle(false);
      } else if (selectedArea.toLowerCase() == "banners") {
        setSelectedStoreType("banners");
        setStoreItemStyle(true);
      } else if (selectedArea.toLowerCase() == "backgrounds") {
        setSelectedStoreType("backgrounds");
        setStoreItemStyle(true);
      }

      if (selectedArea == "normalAvatars") {
        setAnimatedShopItem(false);

        setSelectedStoreItemType("static");
      } else if (selectedArea == "normalBanners") {
        setAnimatedShopItem(false);

        setSelectedStoreItemType("static");
      } else if (selectedArea == "animatedBanners") {
        setAnimatedShopItem(true);

        setSelectedStoreItemType("animated");
      } else if (selectedArea == "backgrounds") {
        setAnimatedShopItem(false);

        setSelectedStoreItemType("static");
      }

      // if (accountOptionBtnSelected == "Loja") {
      //   if (selectedArea == "normalAvatars") {
      //     setImageList(shopAvatars);
      //   } else if (selectedArea == "normalBanners") {
      //     setImageList(shopBanners);
      //   } else if (selectedArea == "animatedBanners") {
      //     setImageList(shopAnimatedBanners.png);
      //   } else if (selectedArea == "backgrounds") {
      //     setImageList(shopBackgrounds);
      //   }
      // } else if (accountOptionBtnSelected == "Customizar") {

      // }
    }
  }

  function closeShop() {
    setDisplayShop("hidden");
    setShopAreaSelected("home");
  }

  function buyItemStore(shopItemType) {
    if (!itemInfoSelected) return;

    console.log(shopItemType);

    if (shopItemType == "customAvatar") {
      const item =
        shopItems.avatars.customize[customAvatarSession][itemInfoSelected.id];
      //console.log(item);

      if (coins < item.price) {
        setDisplayInfoModal("flex");
        setInfoModalMessage(
          "Moedas insuficientes! Complete mais missões para conquistar este tesouro."
        );
      } else {
        console.log("Item Comprado");
        userAccount.coins -= item.price;

        let unlockedItem = { ...item };

        if (unlockedItems.avatars.customize[customAvatarSession].length != 0) {
          unlockedItem.id =
            unlockedItems.avatars.customize[customAvatarSession].length;
          unlockedItem.unlocked = true;
        }

        unlockedItems.avatars.customize[customAvatarSession].push(unlockedItem);

        console.log(`Item desbloqueado`);
        console.log(unlockedItems.avatars.customize[customAvatarSession]);

        const updateShopItem = shopItems.avatars.customize[
          customAvatarSession
        ].map((item) => {
          return {
            ...item,
            unlocked: item.id == itemInfoSelected.id ? true : item.unlocked,
          };
        });
        //console.log(updateShopItem);
        shopItems.avatars.customize[customAvatarSession] = updateShopItem;

        console.log("Itens do Shop");
        console.log(shopItems);

        localStorage.setItem("shopItems", JSON.stringify(shopItems));
        shopItems = JSON.parse(localStorage.getItem("shopItems"));
        localStorage.setItem("unlockedItems", JSON.stringify(unlockedItems));
        unlockedItems = JSON.parse(localStorage.getItem("unlockedItems"));
        localStorage.setItem("user", JSON.stringify(userAccount));
        setCoins(userAccount.coins);
      }
    } else {
      const item =
        shopItems[selectedStoreType][selectedStoreItemType][
          itemInfoSelected.id
        ];
      //console.log(item);

      if (coins < item.price) {
        setDisplayInfoModal("flex");
        setInfoModalMessage(
          "Moedas insuficientes! Complete mais missões para conquistar este tesouro."
        );
      } else {
        console.log("Item Comprado");
        userAccount.coins -= item.price;

        let unlockedItem = { ...item };

        unlockedItem.id =
          unlockedItems[selectedStoreType][selectedStoreItemType].length;
        unlockedItem.unlocked = true;

        unlockedItems[selectedStoreType][selectedStoreItemType].push(
          unlockedItem
        );

        console.log(`Item desbloqueado`);
        console.log(unlockedItems[selectedStoreType][selectedStoreItemType]);

        const updateShopItem = shopItems[selectedStoreType][
          selectedStoreItemType
        ].map((item) => {
          return {
            ...item,
            unlocked: item.id == itemInfoSelected.id ? true : item.unlocked,
          };
        });

        shopItems[selectedStoreType][selectedStoreItemType] = updateShopItem;

        console.log("Itens do Shop");
        console.log(shopItems);

        localStorage.setItem("shopItems", JSON.stringify(shopItems));
        shopItems = JSON.parse(localStorage.getItem("shopItems"));
        localStorage.setItem("unlockedItems", JSON.stringify(unlockedItems));
        unlockedItems = JSON.parse(localStorage.getItem("unlockedItems"));
        localStorage.setItem("user", JSON.stringify(userAccount));
        setCoins(userAccount.coins);
      }
    }
  }

  function customizeAccout(shopItemType) {
    if (!itemInfoSelected) return;

    if (shopItemType == "customAvatar") {
      console.log("Salvando avatar customizado!");
      console.log(customAvatarSession);

      const item =
        unlockedItems.avatars.customize[customAvatarSession][
          itemInfoSelected.id
        ].src;

      console.log("Item selecionado:");
      console.log(item);
      userAccount.customAvatar[customAvatarSession] = item;

      setChangeCustomAvatar((prev) => ({
        ...prev,
        [customAvatarSession]: item,
      }));

      userAccount.avatarType = "createAvatar";
      setAvatarType("createAvatar");

      localStorage.setItem("user", JSON.stringify(userAccount));
    } else {
      const item =
        shopItemType == "animated"
          ? unlockedItems[selectedStoreType][selectedStoreItemType][
              itemInfoSelected.id
            ].webp
          : unlockedItems[selectedStoreType][selectedStoreItemType][
              itemInfoSelected.id
            ].src;

      console.log("Salvo com sucesso!");
      console.log(item);

      userAccount.avatarType = "chooseAvatar";
      setAvatarType("chooseAvatar");

      if (selectedStoreType == "avatars") {
        userAccount.avatar = item;
        setAvatar(item);
      } else if (selectedStoreType == "banners") {
        userAccount.bannerSelected = item;
        setBanner(item);
      } else {
        userAccount.backgroundSelected = item;
        setBackground(item);
      }

      localStorage.setItem("user", JSON.stringify(userAccount));
    }
  }

  function changeUserName(event) {
    event.preventDefault();

    const newUserName = event.target.children[1].value;

    userAccount.name = newUserName;
    localStorage.setItem("user", JSON.stringify(userAccount));
    setUserName(newUserName);

    event.target.children[1].value = "";
  }

  function changePositionBanner(newPosition) {
    userAccount.bannerPosition = newPosition;
    localStorage.setItem("user", JSON.stringify(userAccount));
    setpositionBanner(newPosition);
  }

  function deleteAccount() {
    navigate(`/`);
    localStorage.clear();
  }

  function formatCompactNumber(value, locale = "en") {
    const formatter = new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
    });

    return formatter.format(value);
  }

  function formatToBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
      }}
      className={`mainContainer w-dvw h-dvh grid grid-cols-4 grid-rows-1`}
    >
      <div
        className={`${
          displayDeletAccount != "hidden" ? "flex" : "hidden"
        } absolute z-50 w-dvw h-dvh bg-[#00000040] justify-center items-center`}
      >
        <article
          className={`deleteAccountModal createTask ${
            darkMode ? "darkModeTheme" : "bg-white"
          } rounded-2xl w-[60dvw] h-[80dvh] grid grid-rows-7 grid-cols-1 gap-4`}
        >
          <h1 className="text-center self-center text-[2dvw]">
            Exclusão de conta
          </h1>
          <div className="deleteAccountMsg row-span-5 flex items-center justify-center relative">
            <p className="text-[1.8dvw] w-[80%] text-center z-30">
              Toda jornada chega ao fim... ao excluir sua conta, todos os
              feitos, tesouros e glórias serão esquecidos. Tem certeza de que
              deseja partir?
            </p>
            <img
              style={{
                transform: "translate(-50%, -50%)",
              }}
              src={`${dungeonImg}`}
              alt=""
              className="pointer-events-none select-none absolute top-[50%] left-[50%] max-w-full max-h-full w-[50%] opacity-35"
            />
          </div>
          <div className="deleteAccountOptions flex items-center justify-center gap-2">
            <button
              className="bg-green-400"
              onClick={() => setDisplayDeletAccount("hidden")}
            >
              Cancelar
            </button>
            <button onClick={deleteAccount} className="bg-red-500">
              Excluir
            </button>
          </div>
        </article>
      </div>
      <div
        className={`absolute z-50 w-dvw h-dvh bg-[#00000040] ${displayCreateTask} justify-center items-center`}
      >
        <article
          className={`createTask ${
            darkMode ? "darkModeTheme" : "bg-white"
          } rounded-2xl w-[60dvw] h-[80dvh] flex flex-col items-center gap-4`}
        >
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
                    value="Fácil"
                    required
                  />
                  <label htmlFor="easy">Fácil</label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="radio"
                    name="difficulty"
                    id="medium"
                    value="Médio"
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

      <InfoModal
        displayInfoModal={displayInfoModal}
        setDisplayInfoModal={setDisplayInfoModal}
        infoModalMessage={infoModalMessage}
      />

      <EditTask
        taskInfo={taskInfo}
        displayTaskEdit={displayTaskEdit}
        setDisplayTaskEdit={setDisplayTaskEdit}
        onEditTaskSubmit={onEditTaskSubmit}
        editTaskForm={editTaskForm}
      />

      <section
        className={`absolute w-dvw h-dvh bg-[#00000067] z-90 ${displayRewardContainer} justify-center items-center`}
      >
        <article
          className={`rewardContainer w-[50dvw] aspect-[3/2] ${
            darkMode ? "darkModeTheme" : "bg-white"
          } rounded-2xl grid grid-rows-7 grid-cols-1 `}
        >
          <h1 className="text-center text-[2dvw]">Recompensas recebidas</h1>
          <div className="row-span-5 grid grid-cols-2 place-items-center">
            <div className="flex justify-center items-center gap-2">
              <p>
                {`${
                  rewardSelectedTask.current != null
                    ? rewardsList[
                        removerAcentuacao(rewardSelectedTask.current.difficulty)
                      ].coins
                    : "0"
                } Moedas`}
              </p>
              <img
                src={coinIMG}
                alt=""
                className="max-w-full max-h-full aspect-square w-[3.5dvw]"
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <p>
                {`${
                  rewardSelectedTask.current != null
                    ? rewardsList[
                        removerAcentuacao(rewardSelectedTask.current.difficulty)
                      ].xp
                    : "0"
                } Xp`}
              </p>
              <img
                src={xpIMG}
                alt=""
                className="max-w-full max-h-full aspect-square w-[4dvw]"
              />
            </div>
          </div>
          <button
            onClick={() => reciveReward(rewardSelectedTask.current.id)}
            className="receiveRewardBtn w-[20%] h-[60%] justify-self-center text-[1.1dvw]"
          >
            Receber
          </button>
        </article>
      </section>

      <section
        className={`${displayShop} absolute w-dvw h-dvh bg-[#00000067] z-90 justify-center items-center`}
      >
        <article
          className={`shopContainer w-[80dvw] h-[80dvh] bg-white rounded-2xl ${
            shopAreaSelected == "home" ? "grid" : "hidden"
          } grid-rows-5 grid-cols-1 gap-2`}
        >
          <h1 className="text-center text-[2dvw]">
            {accountOptionBtnSelected}
          </h1>
          <div
            onClick={browseShop}
            className="optionShopBtnContainer row-span-3 overflow-hidden overflow-y-auto flex flex-col items-center gap-2 max-h-full"
          >
            <button id="avatars" className="optionShopBtn">
              Avatares
            </button>
            <button id="banners" className="optionShopBtn">
              Banners
            </button>
            <button id="backgrounds" className="optionShopBtn">
              Planos de fundo
            </button>
          </div>

          <button
            onClick={closeShop}
            className="receiveRewardBtn w-[20%] h-[60%] justify-self-center self-end text-[1.1dvw]"
          >
            Fechar
          </button>
        </article>

        <article
          className={`avatarShop w-[80dvw] h-[80dvh] bg-white rounded-2xl ${
            shopAreaSelected != "home" ? "grid" : "hidden"
          } grid-rows-7 grid-cols-1 gap-2 relative`}
        >
          <button
            onClick={() => {
              shopAreaSelected == "customAvatars" ||
              shopAreaSelected == "normalAvatars"
                ? setShopAreaSelected("avatars")
                : shopAreaSelected == "animatedBanners" ||
                  shopAreaSelected == "normalBanners"
                ? setShopAreaSelected("banners")
                : setShopAreaSelected("home");
              setChangeStoreType(true);
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
          <h1 className="text-center text-[2dvw]">
            {accountOptionBtnSelected}
          </h1>
          <div
            onClick={browseShop}
            className={`row-span-5 ${
              shopAreaSelected == "avatars" || shopAreaSelected == "banners"
                ? "grid"
                : "hidden"
            } grid-cols-[2fr_0.5fr_2fr] grid-rows-1 place-items-center`}
          >
            <button
              id={
                shopAreaSelected == "avatars"
                  ? "normalAvatars"
                  : "normalBanners"
              }
              className="border-1 border-black rounded-2xl aspect-square w-[50%] justify-self-end"
            >
              {shopAreaSelected == "avatars"
                ? "Avatares normais"
                : "Banners normais"}
            </button>
            <button
              id={
                shopAreaSelected == "avatars"
                  ? "customAvatars"
                  : "animatedBanners"
              }
              className="col-start-3 border-1 border-black rounded-2xl aspect-square w-[50%] justify-self-start"
            >
              {shopAreaSelected == "avatars"
                ? "Avatar customizavel"
                : "Banners animados"}
            </button>
          </div>

          {shopAreaSelected != "customAvatars" ? (
            <div
              className={`row-span-5 ${
                shopAreaSelected == "normalAvatars" ||
                shopAreaSelected == "normalBanners" ||
                shopAreaSelected == "animatedBanners" ||
                shopAreaSelected == "backgrounds"
                  ? "grid"
                  : "hidden"
              } grid-cols-3 grid-rows-1 gap-3`}
            >
              <section className="flex flex-col justify-center items-center gap-4">
                <h1>
                  {shopAreaSelected == "normalBanners" ||
                  shopAreaSelected == "animatedBanners"
                    ? "Banner"
                    : shopAreaSelected == "backgrounds"
                    ? "Plano de fundo"
                    : "Avatar"}
                  Selecionado:
                </h1>
                <div
                  className={`${
                    shopAreaSelected == "normalAvatars"
                      ? "rounded-full w-[50%] aspect-square"
                      : "rounded-[20px] aspect-[3/2] w-[80%]"
                  } overflow-hidden border-1 border-black`}
                >
                  <div
                    style={
                      avatarShopSelected
                        ? {
                            backgroundImage: `url(${avatarShopSelected})`,
                          }
                        : {
                            backgroundColor: "#00000000",
                          }
                    }
                    className={`w-full h-full ${
                      storeItemStyle ? "bg-contain" : "bg-cover"
                    } bg-no-repeat bg-center flex justify-center items-center`}
                  >
                    <p
                      className={`text-center ${
                        !avatarShopSelected ? "block" : "hidden"
                      }`}
                    >
                      Sem avatar
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                  <div className="text-center">
                    <h1>Raridade:</h1>
                    <p>
                      {itemInfoSelected ? itemInfoSelected.rarity : "------"}
                    </p>
                  </div>
                  <div
                    className={`text-center ${
                      accountOptionBtnSelected.toLowerCase() == "customizar"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <h1>Preço:</h1>
                    <p>
                      {itemInfoSelected ? itemInfoSelected.price : "------"}{" "}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h1>Status:</h1>
                  <p>
                    {itemInfoSelected
                      ? accountOptionBtnSelected == "Loja"
                        ? shopItems[selectedStoreType][selectedStoreItemType][
                            itemInfoSelected.id
                          ].unlocked
                          ? "Desbloqueado"
                          : "Bloqueado"
                        : unlockedItems[selectedStoreType][
                            selectedStoreItemType
                          ][itemInfoSelected.id].unlocked
                        ? "Desbloqueado"
                        : "Bloqueado"
                      : "------"}
                  </p>
                </div>

                <div className="btnOptionContainer flex gap-4">
                  <button
                    onClick={() => {
                      if (
                        !shopItems[selectedStoreType][selectedStoreItemType][
                          itemInfoSelected.id
                        ].unlocked
                      ) {
                        buyItemStore(shopAreaSelected);
                      } else {
                        console.log("Item Vendido");
                      }
                    }}
                    className={`${
                      accountOptionBtnSelected.toLowerCase() == "loja"
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => {
                      if (itemInfoSelected) {
                        customizeAccout(selectedStoreItemType);
                      } else {
                        console.log("Nada salvo!");
                      }
                    }}
                    className={`${
                      accountOptionBtnSelected.toLowerCase() == "loja"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    Salvar
                  </button>
                </div>
              </section>
              <div
                className={`col-span-2 ${
                  unlockedItems[selectedStoreType][selectedStoreItemType]
                    .length == 0
                    ? "flex items-center justify-center"
                    : ""
                }`}
              >
                {accountOptionBtnSelected == "Loja" ? (
                  shopItems[selectedStoreType][selectedStoreItemType].length >
                  0 ? (
                    <ImageGallery
                      imgSelected={setAvatarShopSelected}
                      shopItems={
                        shopItems[selectedStoreType][selectedStoreItemType]
                      }
                      shopItemInfo={setItemInfoSelected}
                      displayShop={displayShop}
                      rectangularItemStyle={storeItemStyle}
                      changeStoreType={changeStoreType}
                      setChangeStoreType={setChangeStoreType}
                      accountOptionBtnSelected={accountOptionBtnSelected}
                      animatedItem={animatedShopItem}
                    />
                  ) : (
                    <div
                      className={`emptyShopContainer w-[90%] h-full flex flex-col gap-6 justify-center items-center relative`}
                    >
                      <p className="text-center w-[80%] z-30 text-[2dvw]">
                        O eco do vazio ressoa em seu inventário... mas grandes
                        artefatos aguardam por sua escolha na Loja dos Heróis.
                      </p>
                      <img
                        style={{
                          transform: "translate(-50%, -50%)",
                        }}
                        src={`${treasureIcon}`}
                        alt=""
                        className="pointer-events-none select-none absolute top-[50%] left-[50%] max-w-full max-h-full w-[50%] opacity-30"
                      />
                    </div>
                  )
                ) : unlockedItems[selectedStoreType][selectedStoreItemType]
                    .length > 0 ? (
                  <ImageGallery
                    imgSelected={setAvatarShopSelected}
                    shopItems={
                      unlockedItems[selectedStoreType][selectedStoreItemType]
                    }
                    shopItemInfo={setItemInfoSelected}
                    displayShop={displayShop}
                    rectangularItemStyle={storeItemStyle}
                    changeStoreType={changeStoreType}
                    setChangeStoreType={setChangeStoreType}
                    accountOptionBtnSelected={accountOptionBtnSelected}
                    animatedItem={animatedShopItem}
                  />
                ) : (
                  <div
                    className={`emptyShopContainer w-[90%] h-full flex flex-col gap-6 justify-center items-center relative`}
                  >
                    <p className="text-center w-[80%] z-30 text-[2dvw]">
                      O eco do vazio ressoa em seu inventário... mas grandes
                      artefatos aguardam por sua escolha na Loja dos Heróis.
                    </p>
                    <img
                      style={{
                        transform: "translate(-50%, -50%)",
                      }}
                      src={`${treasureIcon}`}
                      alt=""
                      className="pointer-events-none select-none absolute top-[50%] left-[50%] max-w-full max-h-full w-[50%] opacity-30"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`row-span-5 ${
                shopAreaSelected == "customAvatars" ? "grid" : "hidden"
              } grid-cols-3 grid-rows-1 gap-3`}
            >
              <section className="grid grid-cols-1 grid-rows-[2fr_1fr_2fr] gap-2 place-items-center overflow-hidden overflow-y-auto">
                <section className="flex flex-col justify-center items-center gap-2">
                  <div
                    className={`rounded-full w-[50%] aspect-square overflow-hidden ${
                      accountOptionBtnSelected != "Loja" ? "block" : "hidden"
                    }`}
                  >
                    <CustomAvatar
                      selectedHead={changeCustomAvatar.head}
                      selectedFace={changeCustomAvatar.face}
                      selectedBody={changeCustomAvatar.body}
                      selectedAccessory={changeCustomAvatar.acessory}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-4 w-full">
                    <div className="text-center">
                      <h1>Raridade:</h1>
                      <p>
                        {itemInfoSelected ? itemInfoSelected.rarity : "------"}
                      </p>
                    </div>
                    <div
                      className={`text-center ${
                        accountOptionBtnSelected.toLowerCase() == "customizar"
                          ? "hidden"
                          : "block"
                      }`}
                    >
                      <h1>Preço:</h1>
                      <p>
                        {itemInfoSelected ? itemInfoSelected.price : "------"}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h1>Status:</h1>
                    <p>
                      {itemInfoSelected
                        ? accountOptionBtnSelected == "Loja"
                          ? shopItems.avatars.customize[customAvatarSession][
                              itemInfoSelected.id
                            ].unlocked
                            ? "Desbloqueado"
                            : "Bloqueado"
                          : unlockedItems.avatars.customize[
                              customAvatarSession
                            ][itemInfoSelected.id].unlocked
                          ? "Desbloqueado"
                          : "Bloqueado"
                        : "------"}
                    </p>
                  </div>

                  <div className="btnOptionContainer flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        //console.log(itemInfoSelected);
                        if (
                          !shopItems.avatars.customize[customAvatarSession][
                            itemInfoSelected.id
                          ].unlocked
                        ) {
                          buyItemStore("customAvatar");
                        } else {
                          console.log("Item Vendido");
                        }
                      }}
                      className={`${
                        accountOptionBtnSelected.toLowerCase() == "loja"
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      Comprar
                    </button>
                    <button
                      onClick={() => {
                        if (itemInfoSelected) {
                          customizeAccout("customAvatar");
                        } else {
                          console.log("Nada salvo!");
                        }
                      }}
                      className={`${
                        accountOptionBtnSelected.toLowerCase() == "loja"
                          ? "hidden"
                          : "block"
                      }`}
                    >
                      Salvar
                    </button>
                  </div>
                </section>
                <section
                  className={`customAvatarShopBtnOptions row-start-3 ${
                    accountOptionBtnSelected != "Loja"
                      ? "grid grid-cols-2 grid-rows-2 gap-2"
                      : "flex flex-col items-center justify-center gap-2"
                  } `}
                >
                  <button onClick={() => setCustomAvatarSession("head")}>
                    Cabeça
                  </button>
                  <button onClick={() => setCustomAvatarSession("face")}>
                    Rosto
                  </button>
                  <button onClick={() => setCustomAvatarSession("acessory")}>
                    Acessório
                  </button>
                  <button onClick={() => setCustomAvatarSession("body")}>
                    Roupa
                  </button>
                </section>
              </section>
              <div className="col-span-2">
                {shopItems.avatars.customize[customAvatarSession].length > 0 ? (
                  <ImageGallery
                    images={shopCustomAvatar}
                    imgSelected={setAvatarShopSelected}
                    shopItems={
                      accountOptionBtnSelected == "Loja"
                        ? shopItems.avatars.customize[customAvatarSession]
                        : unlockedItems.avatars.customize[customAvatarSession]
                    }
                    shopItemInfo={setItemInfoSelected}
                    customAvatar={customAvatarSession}
                    displayShop={displayShop}
                  />
                ) : (
                  <div
                    className={`emptyShopContainer w-[90%] h-full flex flex-col gap-6 justify-center items-center relative`}
                  >
                    <p className="text-center w-[80%] z-30 text-[2dvw]">
                      O eco do vazio ressoa em seu inventário... mas grandes
                      artefatos aguardam por sua escolha na Loja dos Heróis.
                    </p>
                    <img
                      style={{
                        transform: "translate(-50%, -50%)",
                      }}
                      src={`${treasureIcon}`}
                      alt=""
                      className="pointer-events-none select-none absolute top-[50%] left-[50%] max-w-full max-h-full w-[50%] opacity-30"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={closeShop}
            className="receiveRewardBtn w-[20%] h-[60%] justify-self-center self-center text-[1.1dvw]"
          >
            Fechar
          </button>
        </article>
      </section>

      <section className="col-span-1 flex items-center justify-center">
        <article
          id="userProfile"
          className={`${
            darkMode ? "darkModeTheme" : "bg-white"
          } w-[90%] h-[90%] ${
            displayAccountSettings == "hidden" ? "flex" : "hidden"
          } flex-col gap-4 items-center justify-around rounded-xl overflow-hidden overflow-y-auto`}
        >
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div
              className={`rounded-full w-[50%] aspect-square overflow-hidden ${
                avatarType == "createAvatar" ? "" : "border-1 border-black"
              }`}
            >
              {avatarType == "createAvatar" ? (
                <CustomAvatar
                  selectedHead={userAccount.customAvatar.head}
                  selectedFace={userAccount.customAvatar.face}
                  selectedBody={userAccount.customAvatar.body}
                  selectedAccessory={userAccount.customAvatar.acessory}
                />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${avatar})`,
                  }}
                  className="w-full h-full bg-amber-300 bg-cover bg-no-repeat bg-center"
                ></div>
              )}
            </div>
            <h1
              title={userName}
              className="text-center text-[1.7dvw] max-w-[90%] truncate"
            >
              {userName}
            </h1>
          </div>
          <div className="flex flex-col gap-1 w-full justify-center items-center text-[1.1dvw]">
            <div className="flex flex-col items-center justify-center">
              <p id="level">Nivel:</p>
              <p id="level">{level}</p>
            </div>
            <p id="level-title">{title}</p>
          </div>
          <section className="w-full">
            <p>
              XP: {xp} / {xpMax}
            </p>
            <progress value={xp} max={xpMax} className="w-full"></progress>
          </section>
          <section className="w-full grid grid-cols-2 grid-rows-1 border-1 border-black place-items-center text-[1.2dvw]">
            <div className="text-center" style={{ padding: "10px" }}>
              <h2>Tarefas concluidas:</h2>
              <p title={formatToBRL(completedTasks)}>
                {formatCompactNumber(completedTasks)}
              </p>
            </div>
            <div className="text-center" style={{ padding: "5px" }}>
              <h2>Moedas:</h2>
              <p title={formatToBRL(coins)}>{formatCompactNumber(coins)}</p>
            </div>
          </section>
          <div
            onClick={(event) => {
              if (event.target.id != "") {
                //console.log(event.target.id);
                const optionSelected =
                  event.target.id == "shopBtn"
                    ? "Loja"
                    : event.target.id == "customizeBtn"
                    ? "Customizar"
                    : "Configurações";
                setAccountOptionBtnSelected(optionSelected);
              }
            }}
            className="accountBtnsContainer w-full grid grid-cols-3 grid-rows-1 place-items-center gap-2"
          >
            <button
              id="shopBtn"
              onClick={() => setDisplayShop("flex")}
              title="Shop"
            >
              <img src={shopIcon} alt="" />
            </button>
            <button
              id="customizeBtn"
              title="Customizar"
              onClick={() => {
                //console.log(userAccount);
                //console.log(accountOptionBtnSelected);
                setDisplayShop("flex");
              }}
            >
              <img src={customizeIcon} alt="" />
            </button>
            <button
              onClick={() => {
                setDisplayAccountSettings("grid");
              }}
              id="settingsBtn"
              title="Configurações"
            >
              <img src={settingsIcon} alt="" />
            </button>
          </div>
        </article>

        <article
          className={`accountConfigsContainer ${
            darkMode ? "darkModeTheme" : "bg-white"
          } w-[90%] h-[90%] relative ${
            displayAccountSettings != "hidden" ? "grid" : "hidden"
          } grid-rows-[1fr_repeat(4,2fr)] grid-cols-1  rounded-xl overflow-hidden overflow-y-auto`}
        >
          <button
            onClick={() => setDisplayAccountSettings("hidden")}
            className=" absolute top-2 left-2"
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

          <form
            onSubmit={changeUserName}
            className="changeUserName row-start-2 flex flex-col gap-2"
          >
            <label htmlFor="changeUserName">Mudar nome de usuário</label>
            <input
              type="text"
              name=""
              id="changeUserName"
              className="border-1 border-black "
              required
            />
            <button className="self-center" type="submit">
              Salvar
            </button>
          </form>
          <div className="row-start-3 flex flex-col gap-2 justify-center items-center">
            <h1>Ativar modo escuro:</h1>
            <Switch setDarkMode={setDarkMode} />
          </div>
          <div className="row-start-4 flex flex-col gap-2 justify-center items-center">
            <h1 className="grow-1">Ajustar posição do banner</h1>
            <div className="grow-2 changePositionBanner grid grid-cols-3 grid-rows-2 gap-2">
              <button onClick={() => changePositionBanner("top")}>Cima</button>
              <button onClick={() => changePositionBanner("bottom")}>
                Baixo
              </button>
              <button onClick={() => changePositionBanner("right")}>
                Direita
              </button>
              <button onClick={() => changePositionBanner("left")}>
                Esquerda
              </button>
              <button onClick={() => changePositionBanner("center")}>
                Centro
              </button>
            </div>
          </div>
          <div className="deleteAccount row-start-5 flex flex-col gap-2 justify-center items-center">
            <h1>Excluir Conta</h1>
            <button onClick={() => setDisplayDeletAccount("flex")}>
              Excluir
            </button>
          </div>
        </article>
      </section>
      <section className="col-start-2 col-span-3 flex items-center justify-center">
        <article
          className={`${
            darkMode ? "darkModeTheme" : "bg-white"
          } w-[95%] h-[90%] rounded-xl overflow-hidden grid grid-cols-1 grid-rows-3`}
        >
          <header
            id="banner"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundPosition: `${positionBanner}`,
            }}
            className="w-full row-span-1 flex flex-col justify-end"
          >
            <h1 className="text-white font-bold text-[2.5rem]">
              Tarefas do dia
            </h1>
            <p className="text-white">{date}</p>
          </header>
          <main
            id="to_do_list_container"
            className="to_do_list_container row-start-2 row-span-3 grid grid-rows-1 grid-cols-4 gap-1 pt-1"
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
                  onChange={(e) => setNameFilter(e.target.value.toLowerCase())}
                />
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
                  className="lucide lucide-search-icon lucide-search max-w-[100%]"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <hr />
              <section className="flex flex-col gap-1 overflow-hidden overflow-y-auto self-stretch max-w-full">
                <div id="filter_Container" className="filter_Container">
                  <h2>Status</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        id="semFiltroStatus"
                        value="semFiltro"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      />
                      <label htmlFor="semFiltroStatus">Sem filtro</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        id="Pendente"
                        value="Pendente"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      />
                      <label htmlFor="Pendente">Pendente</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        id="Completo"
                        value="Completo"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      />
                      <label htmlFor="Completo">Completo</label>
                    </div>
                  </div>
                </div>
                <div id="filter_Container" className="filter_Container">
                  <h2>Data</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="data"
                        id="semFiltroData"
                        value="semFiltro"
                        onChange={(e) => setDateFilter(e.target.value)}
                      />
                      <label htmlFor="semFiltroData">Sem filtro</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="data"
                        id="maisRecentes"
                        value="maisRecentes"
                        onChange={(e) => setDateFilter(e.target.value)}
                      />
                      <label htmlFor="maisRecentes">Mais recentes</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="data"
                        id="maisAntigas"
                        value="maisAntigas"
                        onChange={(e) => setDateFilter(e.target.value)}
                      />
                      <label htmlFor="maisAntigas">Mais antigas</label>
                    </div>
                  </div>
                </div>

                <div id="filter_Container" className="filter_Container">
                  <h2>Dificuldade</h2>
                  <div id="filter" className="flex flex-col w-full">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="semFiltroDificuldade"
                        value="semFiltro"
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      />
                      <label htmlFor="semFiltroDificuldade">Sem filtro</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="easy"
                        value="Fácil"
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      />
                      <label htmlFor="easy">Fácil</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="medium"
                        value="Médio"
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      />
                      <label htmlFor="medium">Médio</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="hard"
                        value="Dificil"
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      />
                      <label htmlFor="hard">Dificil</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name="difficulty"
                        id="challenge"
                        value="Desafio"
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      />
                      <label htmlFor="challenge">Desafio</label>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <section className="col-span-3">
              {taskInfo &&
              statusClickDescription &&
              displayTaskDescription != "hidden" ? (
                <DescriptionTask
                  taskInfo={taskInfo}
                  displayTaskDescription={displayTaskDescription}
                  setDisplayTaskDescription={setDisplayTaskDescription}
                  rewards={rewardsList[removerAcentuacao(taskInfo.difficulty)]}
                  coinIMG={coinIMG}
                  xpIMG={xpIMG}
                />
              ) : (
                <div
                  className={`overflow-hidden overflow-y-auto overflow-x-auto max-h-full ${
                    emptyListMessage ? "w-full h-full" : ""
                  } ${displayTaskDescription == "hidden" ? "block" : "hidden"}`}
                >
                  {toDoList.length > 0 && !emptyListMessage ? (
                    <table
                      // ref={toDoListRef}
                      id="to_do_list"
                      className="to_do_list relative border-collapse text-center w-full h-full"
                    >
                      <thead className="sticky top-0 z-10 w-full">
                        <tr>
                          <th>Status</th>
                          <th>Nome</th>
                          <th>Data de criação</th>
                          <th>Dificuldade</th>
                          <th>Recompensa</th>
                          <th>
                            <button
                              title="Criar nova tarefa"
                              onClick={visibilityCreateTask}
                            >
                              + Criar
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!nameFilter &&
                        statusFilter === "semFiltro" &&
                        dateFilter === "semFiltro" &&
                        difficultyFilter === "semFiltro"
                          ? tasks.map((task) => (
                              <tr key={task.id}>
                                <td>
                                  <button
                                    title={`Tarefa ${
                                      task.isCompleted ? "completa" : "pendente"
                                    }`}
                                    data-status={
                                      task.isCompleted ? "completo" : "pendente"
                                    }
                                    onClick={() => onTaskClick(task.id)}
                                  >
                                    <img
                                      src={
                                        task.isCompleted
                                          ? completeTaskIcon
                                          : pendingTaskIcon
                                      }
                                      alt=""
                                    />
                                  </button>
                                </td>
                                <td title={task.title}>{task.title}</td>
                                <td>{task.creationDate}</td>
                                <td>{task.difficulty}</td>
                                <td className="relative">
                                  <button
                                    onClick={() => {
                                      if (
                                        task.isCompleted &&
                                        !task.rewardReceived
                                      )
                                        displayReward(task.id);
                                    }}
                                    className={`rewardButton aspect-square max-w-6`}
                                  >
                                    <img
                                      style={
                                        task.isCompleted && !task.rewardReceived
                                          ? {
                                              boxShadow:
                                                "0px 0px 5px 2px rgba(253,209,121,0.75)",
                                              backgroundColor:
                                                "rgba(253,209,121,0.75)",
                                            }
                                          : {}
                                      }
                                      src={
                                        task.rewardReceived
                                          ? rewardsIcons[
                                              removerAcentuacao(task.difficulty)
                                            ].reciveRewardIcon
                                          : rewardsIcons[
                                              removerAcentuacao(task.difficulty)
                                            ].rewardIcon
                                      }
                                      alt=""
                                      className={`max-w-full max-h-full scale-150`}
                                    />
                                  </button>
                                </td>
                                <td>
                                  <button
                                    title="Ver tarefa"
                                    onClick={() => onDescriptionTaskClick(task)}
                                  >
                                    <img
                                      src={viewIcon}
                                      alt=""
                                      style={
                                        darkMode
                                          ? { filter: "invert(100%)" }
                                          : {}
                                      }
                                    />
                                  </button>
                                  <button
                                    title="Editar tarefa"
                                    onClick={() => {
                                      setDisplayTaskEdit("flex");
                                      onEditTask(task.id);
                                    }}
                                  >
                                    <img
                                      src={editIcon}
                                      alt=""
                                      style={
                                        darkMode
                                          ? { filter: "invert(100%)" }
                                          : {}
                                      }
                                    />
                                  </button>
                                  <button
                                    title="Excluir tarefa"
                                    onClick={() => onDeleteTaskClick(task.id)}
                                  >
                                    <img src={deleteIcon} alt="" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          : organizarLista(listaFiltrada).map((task) => (
                              <tr key={task.id}>
                                <td>
                                  <button
                                    title={`Tarefa ${
                                      task.isCompleted ? "completa" : "pendente"
                                    }`}
                                    data-status={
                                      task.isCompleted ? "completo" : "pendente"
                                    }
                                    onClick={() => onTaskClick(task.id)}
                                  >
                                    <img
                                      src={
                                        task.isCompleted
                                          ? completeTaskIcon
                                          : pendingTaskIcon
                                      }
                                      alt=""
                                    />
                                  </button>
                                </td>
                                <td title={task.title}>{task.title}</td>
                                <td>{task.creationDate}</td>
                                <td>{task.difficulty}</td>
                                <td className="relative">
                                  <button
                                    onClick={() => {
                                      if (
                                        task.isCompleted &&
                                        !task.rewardReceived
                                      )
                                        displayReward(task.id);
                                    }}
                                    className={`rewardButton aspect-square max-w-6`}
                                  >
                                    <img
                                      style={
                                        task.isCompleted && !task.rewardReceived
                                          ? {
                                              boxShadow:
                                                "0px 0px 5px 2px rgba(253,209,121,0.75)",
                                              backgroundColor:
                                                "rgba(253,209,121,0.75)",
                                            }
                                          : {}
                                      }
                                      src={
                                        task.rewardReceived
                                          ? rewardsIcons[
                                              removerAcentuacao(task.difficulty)
                                            ].reciveRewardIcon
                                          : rewardsIcons[
                                              removerAcentuacao(task.difficulty)
                                            ].rewardIcon
                                      }
                                      alt=""
                                      className={`max-w-full max-h-full scale-150`}
                                    />
                                  </button>
                                </td>
                                <td>
                                  <button
                                    title="Ver tarefa"
                                    onClick={() => onDescriptionTaskClick(task)}
                                  >
                                    <img
                                      src={viewIcon}
                                      alt=""
                                      style={
                                        darkMode
                                          ? { filter: "invert(100%)" }
                                          : {}
                                      }
                                    />
                                  </button>
                                  <button
                                    title="Editar tarefa"
                                    onClick={() => {
                                      setDisplayTaskEdit("flex");
                                      onEditTask(task.id);
                                    }}
                                  >
                                    <img
                                      src={editIcon}
                                      alt=""
                                      style={
                                        darkMode
                                          ? { filter: "invert(100%)" }
                                          : {}
                                      }
                                    />
                                  </button>
                                  <button
                                    title="Excluir tarefa"
                                    onClick={() => onDeleteTaskClick(task.id)}
                                  >
                                    <img src={deleteIcon} alt="" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      className={`noTaskMessage w-full h-full text-white text-center relative ${
                        emptyListMessage ? "block" : "hidden"
                      }`}
                    >
                      <div className="absolute top-[30%] left-[50%] translate-[-50%] w-full flex flex-col gap-8 justify-center items-center">
                        <h1 className="text-[1.8dvw] w-[70%]">
                          Nenhuma missão em vista... mas o espírito do herói
                          jamais repousa. Forje uma nova aventura e avance rumo
                          à glória!
                        </h1>
                        <button
                          onClick={visibilityCreateTask}
                          className="bg-blue-800 rounded-4xl"
                        >
                          + Nova Quest
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>
        </article>
      </section>
    </div>
  );
}

export default App;
