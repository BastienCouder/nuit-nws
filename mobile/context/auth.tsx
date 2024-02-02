import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import * as React from "react";

const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return React.useContext(AuthContext);
}
export function AuthProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = React.useState<string | undefined>("");

  React.useEffect(() => {
    if (user === undefined) return;
    if (!user && rootSegment !== "(auth)") {
      router.replace("/(auth)/login");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/");
    }
  }, [user, rootSegment]);

  React.useEffect(() => {
    const loadUserData = async () => {
      const storedUserToken = await AsyncStorage.getItem('userToken');
      const storedUserDetails = await AsyncStorage.getItem('userDetails');

      if (storedUserToken && storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setUser(userDetails.nom);
      }
    };

    loadUserData();
  }, []);


  const signInWithToken = async (token: string, userDetails: any) => {
    await AsyncStorage.setItem('userToken', JSON.stringify(token));
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    setUser(userDetails.nom); // Mettre à jour l'état de l'utilisateur
    router.replace("/"); // Redirection vers l'écran principal ou autre selon votre flux d'application
  };

  const signOut = async () => {
    try {
      setUser("")
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userDetails');
      router.replace("/(auth)/login");
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signInWithToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}