import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { WebView } from "react-native-webview";

export default function SpinWheelDim() {
  const [showWebView, setShowWebView] = useState(false);

  const handleWebViewMessage = (event) => {
    // Data received from WebView
    console.log("Message received from WebView:", event.nativeEvent.data);
  };

  const injectedJavaScript = `
  (function() {
    var oldLog = console.log;
    console.log = function(message) {
      window.ReactNativeWebView.postMessage('agony');
      oldLog.apply(console, arguments);
    };
  })();
`;

  return (
    <DarkSafeAreaView>
      {showWebView && (
        <>
          {/* <Pressable
            onPress={() => setShowWebView(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 10,
              width: "100%",
              backgroundColor: "#f6f5fa",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Text color={colors.black}>Exit</Text>
          </Pressable> */}
          <WebView
            incognito
            onMessage={handleWebViewMessage}
            scrollEnabled={false}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled
            source={{
              html: `
              <html>
                <head>
                    <title>SpinWheel Drop in Module</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, content-width=1.0">
                </head>
                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>

                    <div id="spinwheel-identity-connect" style="background-color: red;">
                        Agnonyyy
                    </div>

                    <script src="https://cdn.spinwheel.io/dropin/v1/dim-initialize.js"></script>

                    <script type="text/javascript">
                    const config = {
                        containerId: 'spinwheel-identity-connect',
                        env: 'sandbox',
                        onSuccess: (metadata) => {
                        console.log('onSuccess', metadata);
                        },
                        onLoad: (metadata) => {
                        console.log('onLoad', metadata);
                        },
                        onExit: () => {
                            window.ReactNativeWebView.postMessage('agonyqweqwe');
                        },
                        onEvent: (metadata) => {
                        console.log('onEvent', metadata);
                        },
                        dropinConfig: {
                        module: 'identity-connect',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjY2NjExNmQ2LWRlYjMtNGViZS1iOTkzLWZkNWMxMTAzMjllNyIsInBhcnRuZXJJZCI6IjQ1ZWUwOGJmLTllOTAtNDQ1Ny1hNTFmLTNjOTAzZTJmYTg0NyIsImV4dFVzZXJJZCI6InRlc3QtaWQiLCJzcGlud2hlZWxVc2VySWQiOiJlMjhiNzQ4NS1kZGNlLTRjOWEtYWIzNy05NTVjMTI4NzU1MGIiLCJ0b2tlbkV4cGlyeUluU2VjIjo2MDAsImlzQ2RuUmVxdWVzdCI6dHJ1ZSwiZW52Ijoic2FuZGJveCIsImlzRGVmYXVsdEV4cGlyeVRpbWUiOnRydWUsImlhdCI6MTcxNDcyMTgzMywiZXhwIjoxNzE0NzIyNDMzfQ.ooqA5OUyxOQNCT647Rg9Ny0IUTwGZGjd_WO11dxKw8o',
                        },
                    };

                    const handler = window.Spinwheel && window.Spinwheel.create(config);
                    handler.open();

                    // window.ReactNativeWebView.postMessage('agony');

                    // window.addEventListener("message", (event) => {
                    //     window.ReactNativeWebView.postMessage('agony');
                    //   });

                    window.ReactNativeWebView.postMessage(document.querySelector('iframe').contentDocument.body);

                    </script>
                </body>
                </html>
            `,
            }}
          />
        </>
      )}
      {!showWebView && (
        <Button onPress={() => setShowWebView(true)}>
          <Text>Show spinwheel dim</Text>
        </Button>
      )}
    </DarkSafeAreaView>
  );
}
