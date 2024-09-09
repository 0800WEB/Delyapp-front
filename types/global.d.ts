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
  image2: any;
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
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  ageVerified: boolean;
}

type AuthState = {
  email: string;
  userInfo: any | null;
  token: string | null;
  error: any | null;
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
  images: string[];
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}

type Cart = {
  _id: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  totalPrice: number;
}

type CartProduct ={
  _id: string;
  product: Product;
  quantity: number;
  images: string;
}

type userOrders = {
  __v: number;
  _id: string;
  coupon: string | null;
  createdAt: string;
  deliveryAddress: string;
  paymentMethod: string;
  products: Array<any>; // Reemplaza 'any' con el tipo correcto si tienes un tipo para los productos
  status: string;
  totalPrice: number;
  updatedAt: string;
  user: string;
};

type RootParamList = {
  Home: undefined;
  Details: { itemId: number };
  Carrito: undefined;
  NOSOTROS: undefined;
  '(routes)/map/index': undefined;
  '(routes)/order/index': undefined;
  '(routes)/update-account/index': undefined;
  '(routes)/home/index': undefined;
  '(routes)/search/index': undefined;
  '(routes)/about/index': undefined;
  // Agrega aquí otras rutas según sea necesario
};

type RootStackParamList = {
  '(routes)/start/index': undefined;
  '(routes)/adult-disclaimer/index': undefined;
  '(routes)/welcome-intro/index': undefined;
  '(routes)/select-sign/index': undefined;
  '(routes)/sign-in/index': undefined;
  '(routes)/sign-up/index': undefined;
  '(routes)/verify-account/index': undefined;
  '(routes)/drawer/index': undefined;
  '(routes)/update-account/index': undefined;
  '(routes)/map/index': undefined;
  '(routes)/order/index': undefined;
  '(routes)/search/index': undefined;
  '(routes)/about/index': undefined;
};

type DrawerNavProp = DrawerNavigationProp<RootParamList>;