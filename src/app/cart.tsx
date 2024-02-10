import { useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

import { ProductCartProps, useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5514996229445"

export default function Cart() {

 const cartStore = useCartStore()

 const [address, setAddress] = useState("")

 const navigation = useNavigation()
 
 // Calculation Total Price
 const total = formatCurrency(
  cartStore.products.reduce(
    (total, product) => total + product.price + product.quantity,
    0
  )
 )

 function handleDeleteProduct(product: ProductCartProps) {
  Alert.alert("Remove", `Would you remove ${product.title} from cart?`, [
    {
      text: "Cancel",
    },
    {
      text: "Remove",
      onPress: () => cartStore.remove(product.id)
    },
  ])
 }

 function handleOrder() {
  if(address.trim().length === 0) {
    return Alert.alert("Pedido", "Informe os dados da entrega.")
  }

  const products = cartStore.products
  .map((product) => `\n ${product.quantity} ${product.title}`)
  .join("")

  const message = `
    NEW ORDER 🍔🛵
    \n Address: ${address}

    ${products}

    \n Total Price: ${total}
  `

  Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

  cartStore.clear()
  navigation.goBack()
 }

 return (
  <View className="flex-1 pt-8">
   <Header title="Your cart" />

   <KeyboardAwareScrollView>
   <ScrollView>
   <View className="p-5 flex-1">
   {cartStore.products.length > 0 ? (
    <View className="border-b border-slate-700">
    {
      cartStore.products.map((product) => (
        <Product 
         key={product.id} 
         data={product}
         onPress={() => handleDeleteProduct(product)} 
        />
      ))
    }
   </View>

   ) : (

   <Text className="font-body text-slate-400 text-center my-8">
    Your cart is empty
   </Text>
   )}

   <View className="flex-row gap-2 items-center mt-5 mb-4">
    <Text className="text-white text-xl font-subtitle">Total:</Text>

    <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
   </View>

   <Input 
    placeholder="Write your address, ZIP, number and etc..."
    onChangeText={setAddress}
    blurOnSubmit={true}
    onSubmitEditing={handleOrder}
    returnKeyType="next"
   />
   </View>
   </ScrollView>
   </KeyboardAwareScrollView>

   <View className="p-5 gap-5">
    <Button onPress={handleOrder}>
      <Button.Text>Finish Order</Button.Text>
      <Button.Icon>
        <Feather name="arrow-right-circle" size={20} />
      </Button.Icon>
    </Button>

    <LinkButton title="Back To Menu" href="/" />
   </View>
  </View>
 )
}