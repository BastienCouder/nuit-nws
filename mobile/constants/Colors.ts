const tintColorLight = '#2f95dc';
const tintColorDark = '#0047AB';

type ColorSchemeType = {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBarStyle?: string;
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    primary: '#FCB900',
    secondary: '#FCB900',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  } as ColorSchemeType, 

  dark: {
    text: '#f1f1f1',
    background: '#04061F',
    primary: '#FCB900',
    secondary: '#0047AB',
    tint: tintColorDark,
    tabIconDefault: '#0047AB',
    tabBarStyle: '#FCB900',
    tabIconSelected: tintColorDark,
  } as ColorSchemeType, 
}