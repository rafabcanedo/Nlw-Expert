import { Image, Text, View } from "react-native";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { Redirect } from "expo-router";

import { PRODUCTS } from "@/utils/data/products";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { formatCurrency } from "@/utils/functions/format-currency";
import { useCartStore } from "@/store/cart-store";
import { Feather } from "@expo/vector-icons"

export default function Product() {
 const cartStore = useCartStore()
 const navigation = useNavigation()
 const { id } = useLocalSearchParams()

 const product = PRODUCTS.find((item) => item.id === id)

 function handleAddToCart() {
  if (product) {
    cartStore.add(product)
    navigation.goBack()
  }
 }

 // Condicial fot not exist products
 if(!product) {
  return <Redirect href="/" />
 }

 return (
  <View className="flex-1">
    <Image 
     source={product.cover}
     className="w-full h-52"
     resizeMode="cover"
    />

    <Text className="text-white text-xl font-heading">
     {product.title}
    </Text>

    <View className="p-5 mt-8 flex-1">
     <Text className="text-lime-400 text-2xl font-heading my-2">
      {formatCurrency(product.price)}
     </Text>

     <Text className="text-slate-400 font-body text-base leading-6 mb-6">
      {product.description}
     </Text>

     {product.ingredients.map((ingredient) => (
      <Text 
       key={ingredient}
       className="text-slate-400 font-body text-base leading-6"
      >
       {"\u2022"} {ingredient}
      </Text>
     ))}
    </View>

    <View className="p-5 pb-8 gap-5">
      <Button onPress={handleAddToCart}>
        <Button.Icon>
          <Feather name="plus-circle" size={20} />
        </Button.Icon>
        <Button.Text>Add to order</Button.Text>
      </Button>

      <LinkButton title="Back to Menu" href="/" />
    </View>
  </View>
 )
}