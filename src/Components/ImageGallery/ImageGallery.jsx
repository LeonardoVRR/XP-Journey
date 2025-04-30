import React, { useEffect, useRef, useMemo } from "react";
import "./ImageGallery.css";

function ImageGallery({
  images,
  imgSelected,
  shopItems,
  shopItemInfo,
  customAvatar,
  displayShop,
  rectangularItemStyle,
  changeStoreType,
  setChangeStoreType,
  accountOptionBtnSelected,
  animatedItem,
}) {
  let prevAvatar = useRef(null);
  let prevCustomAvatar = useRef(null);

  let ImageGalleryRef = useRef(null);

  // Geração segura da lista de imagens
  const imageList = useMemo(() => {
    if (!images || images == undefined) return [];

    if (customAvatar !== undefined && images[customAvatar]) {
      return Object.values(images[customAvatar]).map((img) => img.default);
    } else {
      return Object.values(images).map((img) => img.default);
    }
  }, [images, customAvatar]);

  useEffect(() => {
    if (customAvatar != undefined) {
      if (
        customAvatar != prevCustomAvatar.current &&
        prevCustomAvatar.current != null
      ) {
        //console.log("Informações resetadas");
        imgSelected(null);
        shopItemInfo(null);

        if (!ImageGalleryRef.current) return;
        Array.from(ImageGalleryRef.current.children).forEach((item) => {
          if (item.classList.contains("selectedAvatar")) {
            //console.log(item);
            item.classList.remove("selectedAvatar");
          }
        });
      }
      // else {
      //   console.log("Sem alteração");
      // }
    }
  }, [customAvatar]);

  useEffect(() => {
    if (changeStoreType != undefined) {
      // console.log("sessão atual:");
      // console.log(changeStoreType);

      if (changeStoreType) {
        //console.log("Informações resetadas - mudando de sessão");
        imgSelected(null);
        shopItemInfo(null);

        if (!ImageGalleryRef.current) return;
        Array.from(ImageGalleryRef.current.children).forEach((item) => {
          if (item.classList.contains("selectedAvatar")) {
            //console.log(item);
            item.classList.remove("selectedAvatar");
          }
        });
      } else {
        //console.log("Sem alteração na sessção");
      }

      setChangeStoreType(false);
    }
  }, [changeStoreType]);

  useEffect(() => {
    if (displayShop != undefined && displayShop == "hidden") {
      //console.log("Informações resetadas");
      imgSelected(null);
      shopItemInfo(null);

      if (!ImageGalleryRef.current) return;
      Array.from(ImageGalleryRef.current.children).forEach((item) => {
        if (item.classList.contains("selectedAvatar")) {
          //console.log(item);
          item.classList.remove("selectedAvatar");
        }
      });
    }
  }, [displayShop]);

  function selectedAvatar(event) {
    const avatar = event.target;

    if (avatar.tagName == "BUTTON") {
      const currentAvatar = avatar;

      if (currentAvatar != prevAvatar.current && prevAvatar.current == null) {
        currentAvatar.classList.add("selectedAvatar");
      } else if (currentAvatar != prevAvatar.current) {
        currentAvatar.classList.add("selectedAvatar");
        prevAvatar.current.classList.remove("selectedAvatar");
      } else {
        if (currentAvatar.classList.contains("selectedAvatar")) {
          currentAvatar.classList.remove("selectedAvatar");
        } else {
          currentAvatar.classList.add("selectedAvatar");
        }
      }

      //console.log(avatar);

      if (imgSelected != undefined) {
        imgSelected(
          currentAvatar.classList.contains("selectedAvatar")
            ? avatar.dataset.src
            : null
        );

        //console.log(avatar.dataset.src);

        if (shopItemInfo != undefined) {
          shopItemInfo(
            currentAvatar.classList.contains("selectedAvatar")
              ? {
                  id: currentAvatar.id,
                  rarity: currentAvatar.dataset.rarity,
                  price: currentAvatar.dataset.price,
                  unlocked: currentAvatar.dataset.unlocked,
                }
              : null
          );
        }
      }

      prevAvatar.current = currentAvatar;
      prevCustomAvatar.current =
        customAvatar != undefined ? customAvatar : null;
    }
  }

  return (
    <section
      ref={ImageGalleryRef}
      onClick={selectedAvatar}
      className="galleryContainer grid grid-cols-4 gap-6 overflow-hidden overflow-y-auto max-w-full max-h-full"
    >
      {shopItems == undefined
        ? imageList.map((src, index) => (
            <button
              key={`avatarKey-${index}`}
              data-src={src}
              className="overflow-hidden rounded-full aspect-square"
            >
              <img
                src={src}
                alt={`Imagem ${index}`}
                className="max-w-full max-h-full"
              />
            </button>
          ))
        : shopItems.map((item, index) => (
            <button
              key={`avatarKey-${index}`}
              id={item.id}
              data-src={
                animatedItem != undefined && animatedItem ? item.webp : item.src
              }
              data-rarity={item.rarity}
              data-price={item.price}
              data-unlocked={item.unlocked}
              className={`overflow-hidden ${
                rectangularItemStyle != undefined && rectangularItemStyle
                  ? "aspect-[3/2]"
                  : "rounded-full aspect-square"
              }`}
            >
              <img
                src={
                  animatedItem != undefined && animatedItem
                    ? item.png
                    : item.src
                }
                alt={`Imagem ${index}`}
                loading="lazy"
                className={`max-w-full max-h-full ${
                  item.unlocked &&
                  accountOptionBtnSelected != undefined &&
                  accountOptionBtnSelected == "Loja"
                    ? "grayscale-100"
                    : ""
                }`}
              />
            </button>
          ))}
    </section>
  );
}

export default ImageGallery;
