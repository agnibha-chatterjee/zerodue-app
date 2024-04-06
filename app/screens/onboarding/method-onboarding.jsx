import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import LoaderIcon from "@assets/icons/loader.svg";
import { View } from "react-native";
import { MethodFiDialog } from "@components/MethodFiDialog";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Button } from "@components/button";
import { Text } from "@components/text";

export default function MethodOnboarding() {
  const [token, setToken] = useState(null);
  const [cancelledByUser, setCancelledByUser] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToken("pk_elem_VrNytbD8nAMXn6K8RDLV7jGWCaDgqKT4");
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  if (!token)
    return (
      <DarkSafeAreaView>
        <View
          style={{ flex: 1, flexDirection: "column", paddingHorizontal: 20 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "auto",
            }}
          >
            <LoaderIcon />
          </View>
          {cancelledByUser && (
            <Button
              style={{ marginBottom: 25 }}
              onPress={() => {
                setToken("pk_elem_VrNytbD8nAMXn6K8RDLV7jGWCaDgqKT4");
              }}
            >
              <Text>Add cards</Text>
            </Button>
          )}
        </View>
      </DarkSafeAreaView>
    );

  return (
    <MethodFiDialog
      env="dev"
      token={token}
      onOpen={(payload) => console.log("onOpen", payload)}
      onSuccess={(payload) => console.log("onSuccess", payload)}
      onEvent={(payload) => console.log("onEvent", payload)}
      onExit={(payload) => {
        console.log("onExit", payload);
        setToken(null);
        setCancelledByUser(true);
        Toast.show({
          type: "error",
          text1: "Cancelled by user",
        });
      }}
      onError={(payload) => console.log("onError", payload)}
    />
  );
}
