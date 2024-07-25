import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import Categories from "@/components/categories/categories";
import SearchInput from "@/components/search/searchInput";
import Highlights from "@/components/highlights/highlights";
import Promos from "@/components/promos/promos";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#F9F6F7", "#F9F6F7"]}
      style={{ flex: 1, paddingTop: 30 }}
    >
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <SearchInput homeScreen={true} />
        <Categories />
        <Highlights />
        <Promos />
      </ScrollView>
    </LinearGradient>
  );
}
