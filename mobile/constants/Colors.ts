// theme.ts
export type ColorSchemeType = {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBarStyle?: string;
};

const themeColors: ColorSchemeType = {
  text: '#f1f1f1',
  background: '#04061F',
  primary: '#FCB900',
  secondary: '#0047AB',
  tint: '#2f95dc', // Assurez-vous de définir toutes les clés nécessaires
  tabIconDefault: '#ccc',
  tabIconSelected: '#2f95dc',
  tabBarStyle: '#FCB900',
};

export default themeColors;
