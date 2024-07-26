type welcomeSwipperDataType = {
  id: number;
  image1: any;
  image2: any;
  image3: any;
  top: any;
  right: any;
  bottom: any;
};

type categorySliderDataType = {
  id: any;
  image: any;
  title: string;
};

type promoSliderDataType = {
  id: any;
  image: any;
  title: string;
};

type Avatar = {
  public_id: string;
  url: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: Avatar;
  password?: string;
  courses: any;
  createdAt: Date;
  updatedAt: Date;
};

type BannerDataTypes = {
  bannerImageUrl: any;
};

type fakeDataType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};


type UserInfo = {
  address: UserInfo;
  name: string;
  email: string;
  password: string;
  phone: string;
  ageVerified: boolean;
}

type AuthState = {
  user: null | object;
  token: null | string;
  error: null | string;
  loading: boolean;
}

type UserData = {
  __v: number;
  _id: string;
  ageVerified: boolean;
  createdAt: string;
  email: string;
  is_online: boolean;
  is_verified: boolean;
  name: string;
  password: string;
  phone: string;
  role: number;
  address: string;
  updatedAt: string;
  verify_code: string;
};

type Category = {
  __v: number;
  _id: string;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  updatedAt: string;
}

type Product = {
  __v: number;
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  images: string[]; // Asume que images es un array de strings. Cambia esto si no es correcto.
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}