import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from "nativewind";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { VELOCITY_EPS } from "react-native-reanimated/lib/typescript/animation/decay/utils";
cssInterop(LinearGradient, {
  className: "style",
});

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#040d27]"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#040d27",
      }}
    >

      <View className="relative min-h-[620px] w-full overflow-hidden md:min-h-[600px] flex-row justify-center items-center">
        {/* Gradiente principal diagonal */}
        <LinearGradient
          colors={[
            "#FDAAC2",
            "#F2489F",
            "#B52FA7",
            "#63258D",
            "#101735",
          ]}
          locations={[0, 0.28, 0.5, 0.72, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />

        {/* Escurecimento da parte inferior */}
        <LinearGradient
          colors={[
            "rgba(232,44,149,0)",
            "rgba(232,44,149,0.24)",
            "rgba(85,32,112,0.50)",
            "rgba(14,25,56,0.94)",
          ]}
          locations={[0, 0.25, 0.58, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0"
          pointerEvents="none"
        />
        <View className=" relative px-20">
          <View>
            <Image
              source={require('../../assets/images/Logo_Koldan.png')}
              style={{ width: 300, height: 200, marginTop: -50, marginLeft: -40, marginBottom: -30 }}
              resizeMode="contain"
            />
          </View>
          <View className="py-5">
            <View className="self-start rounded-full border border-white/20 bg-white/15 p-2">
              <Text className="text-white font-bold">
                CONTROLE DE PRESENÇA INTELIGENTE
              </Text>
            </View>
            <Text className="-ml-2 text-white text-9xl font-bold">Koldan</Text>
            <Text className="text-white font-medium text-2xl">
              Mais agilidade. Mais Controle.{"\n"}
              Mais sucesso no seu evento.
            </Text>
            <Text className="text-white mt-3 leading-6 font-light text-xl">
              O Koldan é o aplicativo que transforma a forma {"\n"}
              como você gerencia a entrada de participantes {"\n"}
              no seu evento com validação por código de barras.
            </Text>

          </View>
          <LinearGradient
            colors={["#D94BDB", "#B83BC8", "#E65CE5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-xl self-start"
          >
            <TouchableOpacity className="flex-row items-center gap-2 px-6 py-4">
              <Feather name="download" size={22} color="white" />
              <Text className="text-white font-semibold text-base">
                Baixar template CSV
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Image
          source={require('../../assets/images/Imagem_cod_barras_koldan.png')}
          style={{ width: 900, height: 700 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-1 bg-[#040d27] py-7 px-20 items-center">
        <View className="items-center gap-3">
          <Text className="font-medium text-4xl text-white">Por que usar o Koldan?</Text>
          <Text className="text-white text-base">Tudo o que você precisa para ter controle total do seu evento.</Text>
        </View>

        <View className="flex flex-row mt-5 gap-4">
          <View className="relative items-center">
            {/* Círculo */}
            <View className="absolute -top-15 z-20 w-20 h-20 bg-[#bd53dd] rounded-full items-center justify-center">
              <Ionicons name="flash" size={40} color="white" />
            </View>

            {/* Card */}
            <View className=" mt-10 w-[300px] bg-[#0a112d] items-center gap-4 p-4">
              <LinearGradient
                colors={[
                  "rgb(39, 29, 79)",
                  "rgb(36, 27, 76)",
                  "rgb(29, 24, 69)",
                  "rgb(24, 24, 65)",
                ]}
                locations={[0, 0.25, 0.58, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0 rounded-2xl"
                pointerEvents="none"
              />

              <Text className="mt-10 text-white font-bold text-[18px]">
                Entrada rápida
              </Text>

              <Text className="text-center text-white">
                Validação por código de {"\n"}
                barras em segundos, {"\n"}
                sem filas e sem complicação.
              </Text>
            </View>
          </View>


          <View className="relative items-center">
            {/* Círculo */}
            <View className="absolute -top-15 z-20 w-20 h-20 bg-[#bd53dd] rounded-full items-center justify-center">
              <Ionicons name="stats-chart" size={40} color="white" />
            </View>

            {/* Card */}
            <View className=" mt-10 w-[300px] bg-[#0a112d] items-center gap-4 p-4">
              <LinearGradient
                colors={[
                  "rgb(39, 29, 79)",
                  "rgb(36, 27, 76)",
                  "rgb(29, 24, 69)",
                  "rgb(24, 24, 65)",
                ]}
                locations={[0, 0.25, 0.58, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0 rounded-2xl"
                pointerEvents="none"
              />

              <Text className="mt-10 text-white font-bold text-[18px]">
                Controle em tempo real
              </Text>

              <Text className="text-center text-white">
                Acompanhe as entradas{"\n"}
                e visualize dados atualizados{"\n"}
                do seu evento.
              </Text>
            </View>
          </View>

          <View className="relative items-center">
            {/* Círculo */}
            <View className="absolute -top-15 z-20 w-20 h-20 bg-[#bd53dd] rounded-full items-center justify-center">
              <Ionicons name="ticket-outline" size={40} color="white" />
            </View>

            {/* Card */}
            <View className=" mt-10 w-[300px] bg-[#0a112d] items-center gap-4 p-4">
              <LinearGradient
                colors={[
                  "rgb(39, 29, 79)",
                  "rgb(36, 27, 76)",
                  "rgb(29, 24, 69)",
                  "rgb(24, 24, 65)",
                ]}
                locations={[0, 0.25, 0.58, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0 rounded-2xl"
                pointerEvents="none"
              />

              <Text className="mt-10 text-white font-bold text-[18px]">
                Check-in sem papel
              </Text>

              <Text className="text-center text-white">
                Deixe as listas manuais de lado {"\n"}
                e organize as entradas {"\n"}
                diretamente pelo aplicativo.
              </Text>
            </View>
          </View>

          <View className="relative items-center">
            {/* Círculo */}
            <View className="absolute -top-15 z-20 w-20 h-20 bg-[#bd53dd] rounded-full items-center justify-center">
              <Ionicons name="cloud-download" size={40} color="white" />
            </View>

            {/* Card */}
            <View className=" mt-10 w-[300px] bg-[#0a112d] items-center gap-4 p-4">
              <LinearGradient
                colors={[
                  "rgb(39, 29, 79)",
                  "rgb(36, 27, 76)",
                  "rgb(29, 24, 69)",
                  "rgb(24, 24, 65)",
                ]}
                locations={[0, 0.25, 0.58, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0 rounded-2xl"
                pointerEvents="none"
              />

              <Text className="mt-10 text-white font-bold text-[18px]">
                Entrada rápida
              </Text>

              <Text className="text-center text-white">
                Exporte a lista de presença {"\n"}
                a qualquer momento {"\n"}
                em formato PDF
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full mt-5 flex-1 p-8 gap-y-7 items-center">
          <LinearGradient
            colors={[
              "rgb(39, 29, 79)",
              "rgb(36, 27, 76)",
              "rgb(29, 24, 69)",
              "rgb(24, 24, 65)",
            ]}
            locations={[0, 0.25, 0.58, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="absolute inset-0 rounded-2xl"
            pointerEvents="none"
          />
          <Text className="text-white text-center font-medium text-3xl">Como funciona</Text>
          <View className="flex-row items-center gap-5">
            <View className="flex-row gap-x-5">
              <View className=" relative w-20 h-20 rounded-2xl bg-[#bd53dd] items-center justify-center">
                <View className="absolute -top-3 -left-3 items-center justify-center rounded-full h-8 w-8 bg-[#da57a2]">
                  <Text className="font-bold">1</Text>
                </View>
                <Ionicons name="document-outline" size={40} color="white" />
              </View>
              <View>
                <Text className="font-medium text-white text-xl">Importe sua lista</Text>
                <Text className="text-white">
                  Baixe o template CSV, preencha {"\n"}
                  com os dados dos participantes {"\n"}
                  e importe no aplicativo.
                </Text>
              </View>
            </View>
            <Text className="text-[#da57a2]">----------------------------------------------------------</Text>
            <View className="flex-row gap-x-5">
              <View className=" relative w-20 h-20 rounded-2xl bg-[#bd53dd] items-center justify-center">
                <View className="absolute -top-3 -left-3 items-center justify-center rounded-full h-8 w-8 bg-[#da57a2]">
                  <Text className="font-bold">2</Text>
                </View>
                <Ionicons name="barcode-outline" size={40} color="white" />
              </View>
              <View>
                <Text className="font-medium text-white text-xl">Valide na entrada</Text>
                <Text className="text-white">
                  Use a câmera para ler o código {"\n"}
                  de barras do participante e {"\n"}
                  validar a presença.
                </Text>
              </View>
            </View>
            <Text className="text-[#da57a2]">----------------------------------------------------------</Text>
            <View className="flex-row gap-x-5">
              <View className=" relative w-20 h-20 rounded-2xl bg-[#bd53dd] items-center justify-center">
                <View className="absolute -top-3 -left-3 items-center justify-center rounded-full h-8 w-8 bg-[#da57a2]">
                  <Text className="font-bold">3</Text>
                </View>
                <Ionicons name="checkmark-circle-outline" size={40} color="white" />
              </View>
              <View>
                <Text className="font-medium text-white text-xl">Presença confirmada</Text>
                <Text className="text-white">
                  Pronto! A presença é registrada{"\n"}
                  automaticamente e você acompanha{"\n"}
                  tudo em tempo real.
                </Text>
              </View>
            </View>
          </View>

        </View>
      </View>

    </ScrollView>
  );
}