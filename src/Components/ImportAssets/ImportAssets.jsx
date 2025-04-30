// Importando todas as imagens da pasta de avatares de forma dinâmica com import.meta.glob
const defaultAvatars = import.meta.glob(
  "../../assets/avatar/generics/standards/steamAvatars/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const shopAvatars = import.meta.glob(
  "../../assets/shop/avatars/static/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const defaultCustomAvatar = {
  head: import.meta.glob(
    "../../assets/avatar/generics/customizable/standard/head/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  face: import.meta.glob(
    "../../assets/avatar/generics/customizable/standard/face/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  acessory: import.meta.glob(
    "../../assets/avatar/generics/customizable/standard/accessories/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  body: import.meta.glob(
    "../../assets/avatar/generics/customizable/standard/body/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
};

const shopCustomAvatar = {
  head: import.meta.glob(
    "../../assets/shop/avatars/customize/head/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  face: import.meta.glob(
    "../../assets/shop/avatars/customize/face/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  acessory: import.meta.glob(
    "../../assets/shop/avatars/customize/accessories/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
  body: import.meta.glob(
    "../../assets/shop/avatars/customize/body/*.{jpg,jpeg,png,gif,svg}",
    { eager: true }
  ),
};

const defaultBanners = import.meta.glob(
  "../../assets/banners/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const shopBanners = import.meta.glob(
  "../../assets/shop/banners/static/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const shopAnimatedBanners = {
  webp: import.meta.glob(
    "../../assets/shop/banners/animated/webp/*.{jpg,jpeg,png,gif,webp}",
    { eager: true }
  ),
  png: import.meta.glob(
    "../../assets/shop/banners/animated/png/*.{jpg,jpeg,png,gif,webp}",
    { eager: true }
  ),
};

const defaultBackgrounds = import.meta.glob(
  "../../assets/backgrounds/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const shopBackgrounds = import.meta.glob(
  "../../assets/shop/backgrounds/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const coinSprites = import.meta.glob(
  "../../assets/icons/taskIcons/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const chestSprites = import.meta.glob(
  "../../assets/icons/rewardsIcons/defaultRewardsIcons/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const openChestSprites = import.meta.glob(
  "../../assets/icons/rewardsIcons/reciveRewardsIcons/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

export {
  defaultAvatars,
  shopAvatars,
  defaultCustomAvatar,
  shopCustomAvatar,
  defaultBanners,
  shopBanners,
  shopAnimatedBanners,
  defaultBackgrounds,
  shopBackgrounds,
  coinSprites,
  chestSprites,
  openChestSprites,
};
