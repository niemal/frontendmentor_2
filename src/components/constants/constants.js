export const COLORS = {
  moderate_blue: "hsl(238, 40%, 52%)",
  soft_red: "hsl(358, 79%, 66%)",
  light_gray_blue: "hsl(239, 57%, 85%)",
  pale_red: "hsl(357, 100%, 86%)",
  dark_blue: "hsl(212, 24%, 26%)",
  dark_blue_fade: "hsl(212 24% 26% / 0.6)",
  gray_blue: "hsl(211, 10%, 45%)",
  light_gray: "hsl(223, 19%, 93%)",
  very_light_gray: "hsl(228, 33%, 97%)",
  white: "hsl(0, 0%, 100%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  laptop: 900, // height because low budget laptops or something
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-height: ${BREAKPOINTS.laptop / 16}rem)`, // very weird
  motion: `(prefers-reduced-motion: no-preference)`,
};
