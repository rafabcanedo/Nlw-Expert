import { ButtonIconProps, ButtonProps, ButtonTextProps } from "@/@types/types";
import { Text, TouchableOpacity } from "react-native";

function Button({ children, ...rest }:ButtonProps) {
 return (
  <TouchableOpacity
   className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
   activeOpacity={0.7}
   {...rest}
  >
    {children}
  </TouchableOpacity>
 )
}

function ButtonText({ children }: ButtonTextProps) {
 return (
  <Text className="text-black font-heading text-base mx-2">
   {children}
  </Text>
 )
}

function ButtonIcon({ children }: ButtonIconProps) {
 return children
}

// Export Button Types
Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }