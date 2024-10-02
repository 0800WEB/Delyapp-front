import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { useFonts } from "expo-font";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import { clearSelectedProduct } from "@/store/products/productsActions";
import { router } from "expo-router";

type LayoutChangeEvent = {
  nativeEvent: {
    layout: {
      x: number; // La posición x del componente
      y: number; // La posición y del componente
      width: number; // El ancho del componente
      height: number; // La altura del componente
    };
  };
};

const AccordionSection: React.FC<{
  title: string;
  content: string;
  expanded: boolean;
  toggleExpand: () => void;
}> = ({ title, content, expanded, toggleExpand }) => {
  let [fontsLoaded, fontError] = useFonts({
    "Aristotelica Pro Cdn Extralight": require("../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    ...FontAwesome.font,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const animationController = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string>("opcion1");

  useEffect(() => {
    if (expanded) {
      Animated.timing(animationController, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationController, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded]);

  const arrowRotation = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const animatedHeight = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight + 15],
  });

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <AntDesign name="down" size={20} color="white" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <ScrollView
          style={{ maxHeight: 300 }} // Ajusta el valor de 300 según sea necesario
          onLayout={(event: LayoutChangeEvent) =>
            setContentHeight(event.nativeEvent.layout.height)
          }
        >
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const AboutScreen: React.FC = () => {
  let [fontsLoaded, fontError] = useFonts({
    "Aristotelica Pro Cdn Extralight": require("../../assets/fonts/Aristotelica-pro-cdn-extralight.otf"),
    "Aristotelica Pro Display Extralight": require("../../assets/fonts/Aristotelica-pro-display-extralight.otf"),
    "Aristotelica Pro Text Extralight": require("../../assets/fonts/Aristotelica-pro-text-extralight.otf"),
    ...FontAwesome.font,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();

  const sections = [
    {
      title: "TERMINOS Y CONDICIONES",
      content: `Términos y Condiciones de Uso de Dringo
Última actualización: [Fecha]
Bienvenido a Dringo (en adelante, "la App"). Al descargar, acceder o utilizar la App, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, no debes utilizar la App.
1. Uso de la App
Dringo es una aplicación de comercio electrónico que permite a los usuarios comprar bebidas alcohólicas en línea. Al utilizar la App, declaras que tienes al menos 18 años de edad o la mayoría de edad legal en tu país de residencia para consumir bebidas alcohólicas. Si eres menor de edad, no puedes utilizar esta App.
Al acceder a la App, aceptas no usarla para ningún propósito ilegal o prohibido por estos términos.
2. Licencia de Uso
Te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para utilizar la App en dispositivos compatibles de acuerdo con estos términos.
No debes copiar, modificar, distribuir, vender, o alquilar ninguna parte de la App ni realizar ingeniería inversa del software de la App.
3. Registro y Seguridad de la Cuenta
Para acceder a ciertas funciones de la App, se te solicitará crear una cuenta proporcionando información precisa y completa, incluyendo tu nombre, correo electrónico, ubicación y edad.
Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos de inmediato cualquier uso no autorizado de tu cuenta o cualquier otra violación de seguridad.
4. Compras Dentro de la App
La App ofrece compras dentro de la misma para adquirir productos. Al realizar una compra, aceptas proporcionar información válida para el pago y autorizas a Dringo a procesar el pago utilizando el método que elijas.
Todas las transacciones son finales y no reembolsables, excepto en los casos establecidos en nuestra política de reembolsos (ver sección 5).
5. Política de Reembolsos
Si hay un error en el pedido (producto incorrecto entregado, cantidad incorrecta, etc.) o el producto está en mal estado o dañado por razones imputables a Dringo o a nuestros proveedores, ofrecemos un reembolso del 100% en la compra afectada.
Para solicitar un reembolso, debes contactarnos a través de [desarrollo@dringo.com.mx] dentro de los 7 días naturales siguientes a la recepción del producto, proporcionando detalles de la compra y una descripción del problema.
No cubrimos productos que hayan sido dañados por uso inadecuado, negligencia, accidente, o cualquier modificación o manipulación del producto por parte del usuario.
6. Monetización y Publicidad
La App puede mostrar anuncios y contenido patrocinado. Al utilizar la App, aceptas que estos anuncios puedan aparecer en la interfaz de usuario.
La App cumple con las políticas de Google Play y Apple App Store respecto a la monetización a través de anuncios.
7. Recolección y Uso de Datos Personales
Dringo recopila datos personales como nombre, correo electrónico, ubicación y edad para mejorar tu experiencia en la App y cumplir con las regulaciones aplicables.
Todos los datos personales se manejan de acuerdo con nuestra [Política de Privacidad], disponible en la App y en nuestro sitio web. Esta política detalla cómo recopilamos, usamos y protegemos tu información.
Los datos recopilados pueden ser utilizados para ofrecer servicios personalizados, mejorar la App, y mostrarte anuncios relevantes. No compartimos tus datos personales con terceros sin tu consentimiento, salvo lo dispuesto por la ley.
8. Limitación de Responsabilidad
La App se proporciona "tal cual" y "según disponibilidad". No ofrecemos garantías de ningún tipo, expresas o implícitas, sobre su funcionamiento, precisión, fiabilidad, disponibilidad o capacidad para cumplir con tus expectativas.
No garantizamos que la App esté libre de errores, virus u otros componentes dañinos. Los usuarios son responsables de tomar sus propias medidas de protección, como el uso de software antivirus adecuado.
9. Modificaciones de los Términos
Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos cualquier cambio publicando los términos actualizados en la App o a través de otros medios razonables. Tu uso continuado de la App después de cualquier modificación constituye tu aceptación de los términos modificados.
10. Terminación
Podemos suspender o cancelar tu acceso a la App en cualquier momento, con o sin causa, con o sin previo aviso. En caso de terminación, todas las disposiciones de estos términos que, por su naturaleza, deban sobrevivir a la terminación, seguirán vigentes.
11. Ley Aplicable y Jurisdicción
Estos términos se regirán e interpretarán de acuerdo con las leyes de México. Cualquier disputa que surja en relación con estos términos se someterá a la jurisdicción exclusiva de los tribunales competentes de Querétaro, México.
12. Contacto
Si tienes alguna pregunta o inquietud sobre estos términos, puedes contactarnos a través de [desarrollo@dringo.com.mx].
`,
    },
    // {
    //   title: "AVISO DE PRIVACIDAD",
    //   content:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum, sapien nec dapibus vestibulum, justo neque eleifend enim, vel interdum libero dolor sit amet magna. Nulla facilisi. Curabitur id sapien ut erat ultrices elementum. Vivamus non metus libero. Proin sagittis mi ut felis consequat, ut dignissim sem hendrerit. In hac habitasse platea dictumst. Fusce convallis vehicula mi, a fermentum elit hendrerit ac. Nulla aliquam fringilla augue, et vulputate risus lacinia id. Etiam sit amet turpis ac ex elementum volutpat vel at turpis. Nam eget erat et quam tincidunt facilisis sit amet ac sapien. Sed vehicula posuere justo, et interdum purus tempor ac. Nam quis lorem sed ligula lacinia lacinia. Suspendisse pharetra velit sed dolor pretium, at bibendum mi vulputate",
    // },
  ];

  const goToHome = async () => {
    dispatch(clearSelectedProduct());
    router.back();
  };
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const toggleExpand = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };
  return (
    <LinearGradient
      colors={["#000026", "#000026"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.fullscreenImage}
          source={require("@/assets/images/ABOUT.png")}
        />
      </View>
      <View style={styles.top}>
        <Text style={[styles.topText, { marginTop: 2 }]}>
          ACERCA DE NOSOTROS
        </Text>
        <TouchableOpacity onPress={() => goToHome()} >
          <AntDesign
            name="close"
            size={20}
            color="white"
            style={{ height: 40,aspectRatio:1}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centeredContainer}>
        <Image
          style={[
            {
              transform: [{ scale: 1 }],
              alignSelf: "center",
              marginVertical: 30,
            },
          ]}
          source={require("@/assets/images/ABOUT_PNG.png")}
        />
        {sections && sections?.map((section, index) => (
          <AccordionSection
            key={index}
            title={section?.title}
            content={section?.content}
            expanded={expandedSection === index}
            toggleExpand={() => toggleExpand(index)}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "auto",
            marginTop: 15,
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.facebook.com")}
          >
            <AntDesign name="facebook-square" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.facebook.com")}
          >
            <AntDesign name="instagram" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    paddingTop: 18,
    paddingLeft: 15,
    borderBottomColor: "#A1A1A1",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 25,
  },
  topText: {
    fontFamily: "Aristotelica Pro Display Extralight",
    fontSize: 15,
    color: "white",
    textAlign: "left",
  },
  closeIcon: {
    height: 40,
    aspectRatio: 1,
  },
  imageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  centeredContainer: {
    // position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: "auto",
    marginTop: -70,
    // justifyContent:"space-between",
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "white",
  },
  centeredText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "15%",
    textAlign: "center",
  },
  fullscreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Aristotelica Pro Display Extralight",
  },
  contentText: {
    color: "white",
    textAlign: "justify",
    fontFamily: "Aristotelica Pro Text Extralight",
    paddingLeft: 25,
    paddingRight: 25,
  },
});
export default AboutScreen;
